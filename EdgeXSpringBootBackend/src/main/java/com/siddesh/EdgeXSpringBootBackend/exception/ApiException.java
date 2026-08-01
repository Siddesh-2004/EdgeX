package com.siddesh.EdgeXSpringBootBackend.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

// Base for all custom exceptions. Carries an HTTP status so GlobalExceptionHandler
// can build a consistent response without guessing what status each exception type means.
@Getter
public abstract class ApiException extends RuntimeException {

    private final HttpStatus status;

    protected ApiException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }

}