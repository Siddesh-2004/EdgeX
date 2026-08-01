package com.siddesh.EdgeXSpringBootBackend.mapper;

import com.siddesh.EdgeXSpringBootBackend.dto.request.ExampleTestCaseRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.response.TestCaseResponse;
import com.siddesh.EdgeXSpringBootBackend.entity.Problem;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCase;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCaseCategory;

public class TestCaseMapper {

    private TestCaseMapper() {
        // utility class, no instances
    }

    // Client-provided example — category is always EXAMPLE, not sent by client.
    public static TestCase fromExampleRequest(ExampleTestCaseRequest request, Problem problem) {
        TestCase testCase = new TestCase();
        testCase.setProblem(problem);
        testCase.setInput(request.getInput());
        testCase.setExpectedOutput(request.getExpectedOutput());
        testCase.setCategory(TestCaseCategory.EXAMPLE);
        return testCase;
    }

    public static TestCaseResponse toResponse(TestCase testCase) {
        TestCaseResponse response = new TestCaseResponse();
        response.setId(testCase.getId());
        response.setInput(testCase.getInput());
        response.setExpectedOutput(testCase.getExpectedOutput());
        response.setCategory(testCase.getCategory());
        return response;
    }
}