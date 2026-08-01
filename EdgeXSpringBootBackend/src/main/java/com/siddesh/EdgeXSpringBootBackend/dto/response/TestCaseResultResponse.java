package com.siddesh.EdgeXSpringBootBackend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseResultResponse {

    private Long testCaseId;
    private boolean passed;
    private String status;
    private String actualOutput;
    private Integer executionTimeMs;
}