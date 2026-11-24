package com.arc.ArchLab.exceptions;


import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;

public class ArchExceptionMapper implements ExceptionMapper<ArchException> {

    @Override
    public Response toResponse(
            ArchException exception
    ) {

        ErrorCode errorCode =
                exception.getErrorCode();

        ErrorResponse response =
                new ErrorResponse(
                        errorCode.name(),
                        errorCode.getMessage()
                );

        return Response
                .status(errorCode.getStatus())
                .entity(response)
                .build();
    }
}
