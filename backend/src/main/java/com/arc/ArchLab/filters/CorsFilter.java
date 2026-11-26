package com.arc.ArchLab.filters;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.Arrays;

public class CorsFilter implements ContainerRequestFilter, ContainerResponseFilter {

    private static final String ALLOWED_ORIGINS = System.getenv()
            .getOrDefault("CORS_ALLOWED_ORIGINS", "http://localhost:5173,http://localhost:3000");

    @Override
    public void filter(ContainerRequestContext requestContext) throws IOException {
        if ("OPTIONS".equalsIgnoreCase(requestContext.getMethod())) {
            requestContext.abortWith(Response.ok().build());
        }
    }

    @Override
    public void filter(
            ContainerRequestContext requestContext,
            ContainerResponseContext responseContext) {

        MultivaluedMap<String, Object> headers = responseContext.getHeaders();
        String origin = requestContext.getHeaderString("Origin");

        if (origin != null && isAllowed(origin)) {
            headers.putSingle("Access-Control-Allow-Origin", origin);
            headers.putSingle("Vary", "Origin");
            headers.putSingle("Access-Control-Allow-Credentials", "true");
        }

        headers.putSingle("Access-Control-Allow-Headers", "Content-Type, Authorization");
        headers.putSingle("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        headers.putSingle("Access-Control-Max-Age", "86400");
    }

    private boolean isAllowed(String origin) {
        return Arrays.stream(ALLOWED_ORIGINS.split(","))
                .map(String::trim)
                .anyMatch(origin::equals);
    }
}
