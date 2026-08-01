package com.siddesh.EdgeXSpringBootBackend.exception;

import org.springframework.http.HttpStatus;

public class ResourceNotFoundException extends ApiException {

    public ResourceNotFoundException(String message) {
        super(HttpStatus.NOT_FOUND, message);
    }

    // Convenience constructor for the common "X not found with id: Y" case.
    public ResourceNotFoundException(String resourceName, Long id) {
        super(HttpStatus.NOT_FOUND, resourceName + " not found with id: " + id);
    }
}