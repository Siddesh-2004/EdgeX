package com.siddesh.EdgeXSpringBootBackend.service;

import com.siddesh.EdgeXSpringBootBackend.dto.judge0.Judge0SubmissionResult;
import com.siddesh.EdgeXSpringBootBackend.dto.request.SubmissionRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.response.SubmissionResultResponse;
import com.siddesh.EdgeXSpringBootBackend.entity.Problem;
import com.siddesh.EdgeXSpringBootBackend.entity.Submission;
import com.siddesh.EdgeXSpringBootBackend.entity.SubmissionResult;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCase;
import com.siddesh.EdgeXSpringBootBackend.exception.ResourceNotFoundException;
import com.siddesh.EdgeXSpringBootBackend.mapper.SubmissionMapper;
import com.siddesh.EdgeXSpringBootBackend.repository.ProblemRepository;
import com.siddesh.EdgeXSpringBootBackend.repository.SubmissionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class SubmissionService {

    private static final String STATUS_ACCEPTED = "ACCEPTED";
    private static final String STATUS_WRONG_ANSWER = "WRONG_ANSWER";
    private static final String STATUS_SKIPPED = "SKIPPED";
    private static final String STATUS_NO_GRADED_TEST_CASES = "NO_GRADED_TEST_CASES";

    private final ProblemRepository problemRepository;
    private final SubmissionRepository submissionRepository;
    private final JudgeService judgeService;

    @Transactional
    public SubmissionResultResponse submitCode(SubmissionRequest request) {
        Problem problem = problemRepository.findById(request.getProblemId())
                .orElseThrow(() -> new ResourceNotFoundException("Problem", request.getProblemId()));

        List<TestCase> allTestCases = problem.getTestCases();

        // Only test cases with a known expectedOutput can actually be graded.
        List<TestCase> gradableTestCases = new ArrayList<>();
        List<TestCase> ungradedTestCases = new ArrayList<>();
        for (TestCase testCase : allTestCases) {
            if (testCase.getExpectedOutput() != null) {
                gradableTestCases.add(testCase);
            } else {
                ungradedTestCases.add(testCase);
            }
        }

        Submission submission = new Submission();
        submission.setProblem(problem);
        submission.setSourceCode(request.getSourceCode());
        submission.setLanguage(request.getLanguage());
        submission.setOverallStatus("PENDING");
        submission = submissionRepository.save(submission);

        List<SubmissionResult> results = new ArrayList<>();

        // Ungraded test cases never touch Judge0 — record them as skipped immediately.
        for (TestCase testCase : ungradedTestCases) {
            results.add(buildSkippedResult(submission, testCase));
        }

        if (!gradableTestCases.isEmpty()) {
            Map<String, TestCase> tokenToTestCase =
                    judgeService.submitBatch(gradableTestCases, request.getSourceCode(), request.getLanguage());

            List<Judge0SubmissionResult> judgeResults =
                    judgeService.pollBatchResults(new ArrayList<>(tokenToTestCase.keySet()));

            for (Judge0SubmissionResult judgeResult : judgeResults) {
                TestCase testCase = tokenToTestCase.get(judgeResult.getToken());
                results.add(buildGradedResult(submission, testCase, judgeResult));
            }
        }

        submission.setResults(results);
        submission.setOverallStatus(determineOverallStatus(results, gradableTestCases.isEmpty()));
        submission = submissionRepository.save(submission);

        return SubmissionMapper.toResponse(submission);
    }

    private SubmissionResult buildSkippedResult(Submission submission, TestCase testCase) {
        SubmissionResult result = new SubmissionResult();
        result.setSubmission(submission);
        result.setTestCase(testCase);
        result.setPassed(false);
        result.setStatus(STATUS_SKIPPED);
        result.setActualOutput(null);
        result.setExecutionTimeMs(null);
        return result;
    }

    private SubmissionResult buildGradedResult(Submission submission, TestCase testCase, Judge0SubmissionResult judgeResult) {
        SubmissionResult result = new SubmissionResult();
        result.setSubmission(submission);
        result.setTestCase(testCase);

        String actualOutput = judgeResult.getStdout() != null ? judgeResult.getStdout().trim() : "";
        result.setActualOutput(actualOutput);

        if (judgeResult.getTime() != null) {
            // Judge0 reports time in seconds as a decimal string — convert to ms.
            result.setExecutionTimeMs((int) (Double.parseDouble(judgeResult.getTime()) * 1000));
        }

        // Judge0's status only tells us whether the program RAN successfully —
        // it has no idea what the "correct" answer is. If the run itself failed
        // (compile error, runtime error, TLE, etc.), that's an automatic fail
        // regardless of whatever ended up in stdout — never compare output in that case.
        boolean ranSuccessfully = judgeResult.getStatus().getId() == 3;

        if (!ranSuccessfully) {
            result.setPassed(false);
            result.setStatus(judgeResult.getStatus().getDescription());
            return result;
        }

        String expectedOutput = testCase.getExpectedOutput().trim();
        boolean passed = actualOutput.equals(expectedOutput);

        result.setPassed(passed);
        result.setStatus(passed ? STATUS_ACCEPTED : STATUS_WRONG_ANSWER);
        return result;
    }

    private String determineOverallStatus(List<SubmissionResult> results, boolean noGradableTestCases) {
        if (noGradableTestCases) {
            return STATUS_NO_GRADED_TEST_CASES;
        }

        boolean allGradedPassed = results.stream()
                .filter(r -> !STATUS_SKIPPED.equals(r.getStatus()))
                .allMatch(SubmissionResult::isPassed);

        return allGradedPassed ? STATUS_ACCEPTED : STATUS_WRONG_ANSWER;
    }
}