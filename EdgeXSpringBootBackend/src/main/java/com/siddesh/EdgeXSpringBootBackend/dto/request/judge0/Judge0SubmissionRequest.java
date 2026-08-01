package com.siddesh.EdgeXSpringBootBackend.dto.request.judge0;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Mirrors Judge0's expected submission shape. @JsonProperty bridges Judge0's
// snake_case naming to Java's camelCase convention.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Judge0SubmissionRequest {

    @JsonProperty("source_code")
    private String sourceCode;

    @JsonProperty("language_id")
    private int languageId;

    @JsonProperty("stdin")
    private String stdin;
}