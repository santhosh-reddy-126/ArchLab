package com.arc.ArchLab.exceptions;

public enum ErrorCode {
    USER_NOT_FOUND(
            404,
            "User does not exist"
    ),

    USER_ALREADY_EXISTS(
            409,
            "User already exists"
    ),

    INVALID_CREDENTIALS(
            401,
            "Invalid email or password"
    ),

    GRAPH_NOT_FOUND(
            404,
            "Graph not found"
    ),

    INTERNAL_SERVER_ERROR(
            500,
            "Something went wrong!"
    );


    private final int status;
    private final String message;

    ErrorCode(
            int status,
            String message
    ) {
        this.status = status;
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }
}
