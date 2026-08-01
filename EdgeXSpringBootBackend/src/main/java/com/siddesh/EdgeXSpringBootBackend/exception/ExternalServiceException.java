package com.siddesh.EdgeXSpringBootBackend.exception;

import org.springframework.http.HttpStatus;

// Base for failures calling external systems (Judge0, Gemini). Subclassed so the
// handler and logs can distinguish which external system actually failed.
public class ExternalServiceException extends ApiException {

    public ExternalServiceException(String message) {
        super(HttpStatus.BAD_GATEWAY, message);
    }

    protected ExternalServiceException(HttpStatus status, String message) {
        super(status, message);
    }
}