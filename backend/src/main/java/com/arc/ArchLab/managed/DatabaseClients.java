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
    @Getter
    private Driver neo4jDriver;
    private final ElasticsearchTransport transport;
    @Getter
    private ElasticsearchClient elasticsearchClient;

    public DatabaseClients(ArchLabConfiguration config) {
        var es = config.getElasticsearch();
        RestClient restClient = RestClient.builder(
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
        elasticsearchClient = new ElasticsearchClient(transport);

        var neo = config.getNeo4j();
        neo4jDriver = GraphDatabase.driver(
                neo.getUri(),
                AuthTokens.basic(
                        neo.getUsername(),
                        neo.getPassword()
                )
        );
    }

    @Override
    public void start() throws Exception {
        neo4jDriver.verifyConnectivity();
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
