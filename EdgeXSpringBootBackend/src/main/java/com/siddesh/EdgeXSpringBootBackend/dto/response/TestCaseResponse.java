package com.siddesh.EdgeXSpringBootBackend.dto.response;

import com.siddesh.EdgeXSpringBootBackend.entity.TestCaseCategory;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class TestCaseResponse {

    private Long id;
    private String input;
    private String expectedOutput;
    private TestCaseCategory category;
}