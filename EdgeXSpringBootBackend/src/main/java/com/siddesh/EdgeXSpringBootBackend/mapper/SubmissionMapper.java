package com.siddesh.EdgeXSpringBootBackend.mapper;

import com.siddesh.EdgeXSpringBootBackend.dto.response.SubmissionResultResponse;
import com.siddesh.EdgeXSpringBootBackend.dto.response.TestCaseResultResponse;
import com.siddesh.EdgeXSpringBootBackend.entity.Submission;
import com.siddesh.EdgeXSpringBootBackend.entity.SubmissionResult;

public class SubmissionMapper {

    private SubmissionMapper() {
        // utility class, no instances
    }

    public static TestCaseResultResponse toResultResponse(SubmissionResult result) {
        TestCaseResultResponse response = new TestCaseResultResponse();
        response.setTestCaseId(result.getTestCase().getId());
        response.setPassed(result.isPassed());
        response.setStatus(result.getStatus());
        response.setActualOutput(result.getActualOutput());
        response.setExecutionTimeMs(result.getExecutionTimeMs());
        return response;
    }

    public static SubmissionResultResponse toResponse(Submission submission) {
        SubmissionResultResponse response = new SubmissionResultResponse();
        response.setSubmissionId(submission.getId());
        response.setOverallStatus(submission.getOverallStatus());
        response.setResults(
                submission.getResults().stream()
                        .map(SubmissionMapper::toResultResponse)
                        .toList()
        );
        return response;
    }
}