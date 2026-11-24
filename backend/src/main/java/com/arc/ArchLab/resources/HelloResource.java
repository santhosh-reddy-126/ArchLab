package com.arc.ArchLab.resources;

import io.swagger.v3.oas.annotations.tags.Tag;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

@Path("/api/v1/hello")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Hello Resource", description = "Say Hello")
public class HelloResource {

    @GET
    public Response sayHello(){
        return Response.ok().entity(Map.of("message","Welcome to Archlab!")).build();
    }
}
