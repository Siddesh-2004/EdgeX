package com.siddesh.EdgeXSpringBootBackend.service;

// Generates a reference solution and hidden test cases for a Problem, then runs
// the solution through Judge0 to populate each test case's expectedOutput.
//
// Kept as an interface so a DummyAiGenerationServiceImpl (hardcoded, deterministic)
// can validate the full pipeline first, before swapping in a real
// GeminiAiGenerationServiceImpl later — isolates AI non-determinism from
// everything else (entities, Judge0 integration, grading) while testing.
public interface AiGenerationService {

    void generateAndPopulateTestCases(Long problemId);
}