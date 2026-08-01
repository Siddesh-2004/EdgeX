package com.siddesh.EdgeXSpringBootBackend.dto.request;

import com.siddesh.EdgeXSpringBootBackend.entity.Difficulty;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProblemRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotBlank
    private String inputFormat;

    @NotBlank
    private String outputFormat;

    @NotNull
    private Difficulty difficulty;

    @NotEmpty
    @Valid
    private List<ConstraintRequest> constraints;

    // Client-provided examples. Not AI-generated.
    @NotEmpty
    @Valid
    private List<ExampleTestCaseRequest> examples;
}