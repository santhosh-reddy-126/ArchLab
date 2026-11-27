package com.arc.ArchLab.resources;


import com.arc.ArchLab.dao.request.GraphRequest;
import com.arc.ArchLab.dao.request.LoginRequest;
import com.arc.ArchLab.services.contracts.GraphService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/v1/api/graph")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
@Tag(name = "Graph Resource", description = "CRUD Graphs")
public class GraphResource {

    private final GraphService graphService;

    public GraphResource(GraphService graphService){
        this.graphService = graphService;
    }

    @POST
    @Operation(summary = "Create a graph")
    public Response createGraph(@Valid GraphRequest graphRequest){
        return Response.status(200).entity(graphService.createGraphMetaData(graphRequest)).build();
    }
}
