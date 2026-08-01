package com.siddesh.EdgeXSpringBootBackend.exception;

import org.springframework.http.HttpStatus;

// Specifically for Judge0 failures — separate from Gemini/other external services
// so callers and logs can tell exactly which system broke.
public class JudgeExecutionException extends ExternalServiceException {

    public JudgeExecutionException(String message) {
        super(HttpStatus.BAD_GATEWAY, message);
    }
}