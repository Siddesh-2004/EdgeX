package com.siddesh.EdgeXSpringBootBackend.service;

import tools.jackson.databind.json.JsonMapper;
import com.siddesh.EdgeXSpringBootBackend.dto.judge0.Judge0BatchRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.judge0.Judge0BatchResultResponse;
import com.siddesh.EdgeXSpringBootBackend.dto.judge0.Judge0SubmissionRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.judge0.Judge0SubmissionResult;
import com.siddesh.EdgeXSpringBootBackend.dto.judge0.Judge0TokenResponse;
import com.siddesh.EdgeXSpringBootBackend.entity.Language;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCase;
import com.siddesh.EdgeXSpringBootBackend.exception.JudgeExecutionException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class JudgeService {

    private static final long BASE_DELAY_MS = 500;
    private static final long MAX_DELAY_MS = 8000;
    private static final long TOTAL_TIMEOUT_MS = 30_000;

    private final RestTemplate restTemplate;
    private final JsonMapper objectMapper;

    @Value("${judge0.base-url}")
    private String judge0BaseUrl;

    // Submits one batch containing all test cases for a given source code + language.
    // Judge0 processes these asynchronously — this only returns tokens, not results.
    // Returns a token -> TestCase map so callers can match results back to the correct
    // TestCase explicitly by token, rather than relying on Judge0's response ordering.
    public Map<String, TestCase> submitBatch(List<TestCase> testCases, String sourceCode, Language language) {
        String encodedSourceCode = encodeBase64(sourceCode);

        List<Judge0SubmissionRequest> submissions = new ArrayList<>();
        for (TestCase testCase : testCases) {
            Judge0SubmissionRequest submission = new Judge0SubmissionRequest();
            submission.setSourceCode(encodedSourceCode);
            submission.setLanguageId(language.getJudge0Id());
            submission.setStdin(encodeBase64(testCase.getInput()));
            submissions.add(submission);
        }

        Judge0BatchRequest batchRequest = new Judge0BatchRequest();
        batchRequest.setSubmissions(submissions);

        String url = judge0BaseUrl + "/submissions/batch?base64_encoded=true";

        try {
            // RestTemplate's default Jackson message converter streams the body
            // without knowing its length upfront, forcing chunked transfer encoding
            // regardless of the underlying HTTP client — Judge0's server fails to
            // parse chunked bodies correctly. Serializing to byte[] ourselves first
            // gives RestTemplate a known Content-Length, avoiding chunking entirely.
            byte[] body = objectMapper.writeValueAsBytes(batchRequest);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            HttpEntity<byte[]> requestEntity = new HttpEntity<>(body, headers);

            Judge0TokenResponse[] response = restTemplate.postForObject(
                    url,
                    requestEntity,
                    Judge0TokenResponse[].class
            );

            if (response == null) {
                throw new JudgeExecutionException("Judge0 returned an empty response for batch submit");
            }

            if (response.length != testCases.size()) {
                throw new JudgeExecutionException(
                        "Judge0 returned " + response.length + " tokens for " + testCases.size() + " test cases"
                );
            }

            // Judge0 returns tokens in the same order submissions were sent, so index
            // pairing here is safe — this is the ONLY place order is relied upon.
            // From here on, everything is matched explicitly by token.
            Map<String, TestCase> tokenToTestCase = new LinkedHashMap<>();
            for (int i = 0; i < response.length; i++) {
                tokenToTestCase.put(response[i].getToken(), testCases.get(i));
            }
            return tokenToTestCase;

        } catch (RestClientException ex) {
            throw new JudgeExecutionException("Failed to submit batch to Judge0: " + ex.getMessage());
        } catch (Exception ex) {
            throw new JudgeExecutionException("Failed to serialize batch request: " + ex.getMessage());
        }
    }

    // Polls Judge0 until every submission in the batch reaches a terminal status,
    // using exponential backoff (base 500ms, capped at 8s per wait, 30s total timeout).
    public List<Judge0SubmissionResult> pollBatchResults(List<String> tokens) {
        String tokenParam = String.join(",", tokens);
        String url = judge0BaseUrl + "/submissions/batch?tokens=" + tokenParam + "&base64_encoded=true";

        long startTime = System.currentTimeMillis();
        int attempt = 0;

        while (true) {
            Judge0BatchResultResponse response;
            try {
                response = restTemplate.getForObject(url, Judge0BatchResultResponse.class);
            } catch (RestClientException ex) {
                throw new JudgeExecutionException("Failed to poll batch results from Judge0: " + ex.getMessage());
            }

            if (response == null || response.getSubmissions() == null) {
                throw new JudgeExecutionException("Judge0 returned an empty response while polling");
            }

            List<Judge0SubmissionResult> results = response.getSubmissions();
            boolean allTerminal = results.stream().allMatch(r -> r.getStatus().isTerminal());

            if (allTerminal) {
                System.out.println("Successfully polled Judge0 results for result "+results);
                decodeOutputs(results);
                return results;
            }

            long elapsed = System.currentTimeMillis() - startTime;
            if (elapsed >= TOTAL_TIMEOUT_MS) {
                throw new JudgeExecutionException("Judge0 processing timed out after " + TOTAL_TIMEOUT_MS + "ms");
            }

            attempt++;
            long delay = Math.min(BASE_DELAY_MS * (1L << (attempt - 1)), MAX_DELAY_MS);

            try {
                Thread.sleep(delay);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new JudgeExecutionException("Interrupted while waiting for Judge0 results");
            }
        }
    }

    // Judge0 returns stdout/stderr as base64 when base64_encoded=true — decode
    // them back to plain text so callers don't have to deal with encoding.
    private void decodeOutputs(List<Judge0SubmissionResult> results) {
        for (Judge0SubmissionResult result : results) {
            if (result.getStdout() != null) {
                result.setStdout(decodeBase64(result.getStdout()));
            }
            if (result.getStderr() != null) {
                result.setStderr(decodeBase64(result.getStderr()));
            }
        }
        System.out.println("Decoded Judge0 outputs for results "+results);
    }

    private String decodeBase64(String value) {
        // Judge0 sometimes appends a trailing newline to the base64 string itself,
        // which Java's strict decoder rejects — trim before decoding.
        return new String(Base64.getDecoder().decode(value.trim()), StandardCharsets.UTF_8);
    }

    private String encodeBase64(String value) {
        return Base64.getEncoder().encodeToString(value.getBytes(StandardCharsets.UTF_8));
    }
}