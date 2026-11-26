package com.arc.ArchLab.resources;


import com.arc.ArchLab.dao.request.LoginRequest;
import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.services.contracts.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/api/v1/auth")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Auth Resource", description = "Authentication")
public class AuthResource {

    private final AuthService authService;

    public AuthResource(AuthService authService){
        this.authService = authService;
    }

    @POST
    @Path("/login")
    @Operation(summary = "Login a user")
    public Response login(@Valid LoginRequest loginRequest){
        return Response.status(200).entity(authService.login(loginRequest)).build();
    }

    @POST
    @Path("/signUp")
    @Operation(summary = "Signup a user")
    public Response signUp(@Valid UserRequest userRequest){
        return Response.status(200).entity(authService.signUp(userRequest)).build();
    }
}
