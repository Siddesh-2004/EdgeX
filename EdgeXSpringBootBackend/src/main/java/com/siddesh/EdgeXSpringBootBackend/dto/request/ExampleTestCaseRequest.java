package com.siddesh.EdgeXSpringBootBackend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

// Client-provided example. Category is implicitly EXAMPLE — set by the service, not sent by client.
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExampleTestCaseRequest {

    @NotBlank
    private String input;

    @NotBlank
    private String expectedOutput;
}