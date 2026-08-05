package com.siddesh.EdgeXSpringBootBackend.controller;

import com.siddesh.EdgeXSpringBootBackend.dto.request.CreateProblemRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.response.ProblemResponse;
import com.siddesh.EdgeXSpringBootBackend.service.AiGenerationService;
import com.siddesh.EdgeXSpringBootBackend.service.ProblemService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/problems")
@RequiredArgsConstructor
public class ProblemController {

    private final ProblemService problemService;
    private final AiGenerationService aiGenerationService;

    @PostMapping
    public ResponseEntity<ProblemResponse> createProblem(@Valid @RequestBody CreateProblemRequest request) {
        ProblemResponse response = problemService.createProblem(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProblemResponse> getProblem(@PathVariable Long id) {
        ProblemResponse response = problemService.getProblem(id);
        return ResponseEntity.ok(response);
    }

    @GetMapping
    public ResponseEntity<List<ProblemResponse>> getAllProblems() {
        List<ProblemResponse> response = problemService.getAllProblems();
        return ResponseEntity.ok(response);
    }

    @PostMapping("/{id}/generate-test-cases")
    public ResponseEntity<ProblemResponse> generateTestCases(@PathVariable Long id) {
        aiGenerationService.generateAndPopulateTestCases(id);
        ProblemResponse response = problemService.getProblem(id);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable Long id) {
        problemService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteAllProblems() {
        problemService.deleteAllProblems();
        return ResponseEntity.noContent().build();
    }
}