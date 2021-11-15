package com.springboot.grocery.exception;

import org.springframework.http.HttpStatus;

public class GroceryAPIException extends RuntimeException {

    private HttpStatus status;
    private String message;

    public GroceryAPIException(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }

    public GroceryAPIException(String message, HttpStatus status, String message1) {
        super(message);
        this.status = status;
        this.message = message1;
    }

    public HttpStatus getStatus() {
        return status;
    }

    @Override
    public String getMessage() {
        return message;
    }
}

