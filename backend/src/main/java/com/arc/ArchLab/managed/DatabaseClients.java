package com.arc.ArchLab.managed;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import com.arc.ArchLab.ArchLabConfiguration;
import io.dropwizard.lifecycle.Managed;
import lombok.Getter;
import org.apache.http.HttpHost;
import org.elasticsearch.client.RestClient;
import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.Driver;
import org.neo4j.driver.GraphDatabase;

public class DatabaseClients implements Managed {
    private final ArchLabConfiguration config;

    @Getter
    private Driver neo4jDriver;
    private RestClient restClient;
    private ElasticsearchTransport transport;
    private ElasticsearchClient elasticsearchClient;

    public DatabaseClients(ArchLabConfiguration config) {
        this.config = config;
    }

    @Override
    public void start() throws Exception {

        // Neo4j initialization
        var neo = config.getNeo4j();

        neo4jDriver = GraphDatabase.driver(
                neo.getUri(),
                AuthTokens.basic(
                        neo.getUsername(),
                        neo.getPassword()
                )
        );

        neo4jDriver.verifyConnectivity();

        // Elasticsearch initialization
        var es = config.getElasticsearch();

        restClient = RestClient.builder(
                new HttpHost(
                        es.getHost(),
                        es.getPort(),
                        es.getScheme()
                )
        ).build();

        transport = new RestClientTransport(
                restClient,
                new JacksonJsonpMapper()
        );

        elasticsearchClient =
                new ElasticsearchClient(transport);
    }

    @Override
    public void stop() throws Exception {
        if (neo4jDriver != null) {
            neo4jDriver.close();
        }

        if (transport != null) {
            transport.close();
        }
    }
}
