package com.siddesh.EdgeXSpringBootBackend.dto.request;

import com.siddesh.EdgeXSpringBootBackend.entity.Language;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionRequest {

    @NotNull
    private Long problemId;

    @NotBlank
    private String sourceCode;

    @NotNull
    private Language language;
}