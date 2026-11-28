package com.arc.ArchLab.resources;


import com.arc.ArchLab.auth.JWT.UserPrincipal;
import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.dao.request.GraphMetaSearchRequest;
import com.arc.ArchLab.services.contracts.GraphService;
import io.dropwizard.auth.Auth;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

@Path("/v1/api/graph")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "GraphMeta Resource", description = "CRUD Graphs")
@SecurityScheme(
        name = "bearerAuth",
        type = SecuritySchemeType.HTTP,
        scheme = "bearer",
        bearerFormat = "JWT"
)
public class GraphResource {

    private final GraphService graphService;

    public GraphResource(GraphService graphService){
        this.graphService = graphService;
    }

    @POST
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Create a graph")
    public Response createGraphMeta(@Parameter(hidden = true) @Auth UserPrincipal user, @Valid GraphMetaRequest graphMetaRequest){
        return Response.status(200).entity(graphService.createGraphMetaData(graphMetaRequest, user.getUserId())).build();
    }

    @GET
    @Path("/{id}")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Get Graph meta")
    public Response getGraphMeta(@Parameter(hidden = true) @Auth UserPrincipal user, @PathParam("id") String id){
        return Response.status(200).entity(graphService.getGraphMeta(id)).build();
    }

    @POST
    @Path("/search")
    @SecurityRequirement(name = "bearerAuth")
    @Operation(summary = "Search Graphs meta")
    public Response searchGraphMeta(@Parameter(hidden = true) @Auth UserPrincipal user, GraphMetaSearchRequest graphMetaSearchRequest){
        return Response.status(200).entity(Map.of("data", graphService.searchGraphMeta(graphMetaSearchRequest, user.getUserId()))).build();
    }
}
