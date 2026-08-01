package com.siddesh.EdgeXSpringBootBackend.dto.response;

import com.siddesh.EdgeXSpringBootBackend.entity.Difficulty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ProblemResponse {

    private Long id;
    private String title;
    private String description;
    private String inputFormat;
    private String outputFormat;
    private Difficulty difficulty;
    private LocalDateTime createdAt;

    private List<ConstraintResponse> constraints;

    // All test cases returned — practice site, nothing hidden from the user.
    private List<TestCaseResponse> testCases;
}