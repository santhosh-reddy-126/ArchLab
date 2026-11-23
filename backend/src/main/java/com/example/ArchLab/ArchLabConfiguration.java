package com.example.ArchLab;

import io.dropwizard.core.Configuration;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

public class ArchLabConfiguration extends Configuration {

        @Valid
        @NotNull
        private Neo4jConfig neo4j;

        @Valid
        @NotNull
        private ElasticsearchConfig elasticsearch;

        public Neo4jConfig getNeo4j() {
                return neo4j;
        }

        public ElasticsearchConfig getElasticsearch() {
                return elasticsearch;
        }

    public static class Neo4jConfig {
            private String uri;
            private String username;
            private String password;

            public String getUri() {
                    return uri;
            }

            public String getUsername() {
                    return username;
            }

            public String getPassword() {
                    return password;
            }
        }

        public static class ElasticsearchConfig {
            private String host;
            private int port;
            private String scheme;

            public String getHost() {
                    return host;
            }

            public int getPort() {
                    return port;
            }

            public String getScheme() {
                    return scheme;
            }
        }
}
