package com.siddesh.EdgeXSpringBootBackend.controller;

import com.siddesh.EdgeXSpringBootBackend.dto.request.SubmissionRequest;
import com.siddesh.EdgeXSpringBootBackend.dto.response.SubmissionResultResponse;
import com.siddesh.EdgeXSpringBootBackend.service.SubmissionService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/submissions")
@RequiredArgsConstructor
public class SubmissionController {

    private final SubmissionService submissionService;

    @PostMapping
    public ResponseEntity<SubmissionResultResponse> submitCode(@Valid @RequestBody SubmissionRequest request) {
        SubmissionResultResponse response = submissionService.submitCode(request);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}