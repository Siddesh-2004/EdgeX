package com.siddesh.EdgeXSpringBootBackend.exception;

import org.springframework.http.HttpStatus;

// For business-rule validation failures beyond basic @NotBlank-style checks —
// e.g. a rule that needs custom logic to evaluate, not just annotation-based validation.
public class InvalidRequestException extends ApiException {

    public InvalidRequestException(String message) {
        super(HttpStatus.BAD_REQUEST, message);
    }
}