package com.arc.ArchLab.exceptions;

public class ArchException extends RuntimeException{

    private final ErrorCode errorCode;

    public ArchException(
            ErrorCode errorCode
    ) {
        super(errorCode.getMessage());
        this.errorCode = errorCode;
    }

    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
