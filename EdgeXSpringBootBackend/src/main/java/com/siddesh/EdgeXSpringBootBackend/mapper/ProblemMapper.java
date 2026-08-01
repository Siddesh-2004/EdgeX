package com.siddesh.EdgeXSpringBootBackend.mapper;

import com.siddesh.EdgeXSpringBootBackend.dto.request.ConstraintRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.request.CreateProblemRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.request.ExampleTestCaseRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.response.ProblemResponse;
import com.siddesh.EdgeXSpringBootBackend.entity.Constraint;
import com.siddesh.EdgeXSpringBootBackend.entity.Problem;
import com.siddesh.EdgeXSpringBootBackend.entity.TestCase;

import java.util.ArrayList;
import java.util.List;

public class ProblemMapper {

    private ProblemMapper() {
        // utility class, no instances
    }

    // Builds a fully-formed Problem (with linked Constraints and example TestCases)
    // that is NOT yet saved. The service layer is responsible for calling
    // problemRepository.save(problem) — cascade = CascadeType.ALL on both
    // relationships means Hibernate inserts the children automatically,
    // since each child already has its `problem` back-reference set here.
    public static Problem toEntity(CreateProblemRequest request) {
        Problem problem = new Problem();
        problem.setTitle(request.getTitle());
        problem.setDescription(request.getDescription());
        problem.setInputFormat(request.getInputFormat());
        problem.setOutputFormat(request.getOutputFormat());
        problem.setDifficulty(request.getDifficulty());

        List<Constraint> constraints = new ArrayList<>();
        for (ConstraintRequest constraintRequest : request.getConstraints()) {
            constraints.add(ConstraintMapper.toEntity(constraintRequest, problem));
        }
        problem.setConstraints(constraints);

        List<TestCase> testCases = new ArrayList<>();
        for (ExampleTestCaseRequest exampleRequest : request.getExamples()) {
            testCases.add(TestCaseMapper.fromExampleRequest(exampleRequest, problem));
        }
        problem.setTestCases(testCases);

        return problem;
    }

    public static ProblemResponse toResponse(Problem problem) {
        ProblemResponse response = new ProblemResponse();
        response.setId(problem.getId());
        response.setTitle(problem.getTitle());
        response.setDescription(problem.getDescription());
        response.setInputFormat(problem.getInputFormat());
        response.setOutputFormat(problem.getOutputFormat());
        response.setDifficulty(problem.getDifficulty());
        response.setCreatedAt(problem.getCreatedAt());

        response.setConstraints(
                problem.getConstraints().stream()
                        .map(ConstraintMapper::toResponse)
                        .toList()
        );

        response.setTestCases(
                problem.getTestCases().stream()
                        .map(TestCaseMapper::toResponse)
                        .toList()
        );

        return response;
    }
}