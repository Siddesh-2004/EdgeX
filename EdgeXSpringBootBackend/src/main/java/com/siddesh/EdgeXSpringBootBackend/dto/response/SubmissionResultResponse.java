package com.siddesh.EdgeXSpringBootBackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionResultResponse {

    private Long submissionId;
    private String overallStatus;
    private List<TestCaseResultResponse> results;
}