package com.arc.ArchLab.repository;

import com.arc.ArchLab.managed.DatabaseClients;
import org.neo4j.driver.Driver;
import org.neo4j.driver.Session;

public class GraphRepository {

    private final Driver neo4jDriver;

    public GraphRepository(Driver neo4jDriver) {
        this.neo4jDriver = neo4jDriver;
    }

    public void createGraph(String neoGraphId) {
        try (Session session = neo4jDriver
                .session()) {

            session.executeWrite(tx -> {
                tx.run("""
                    CREATE (g:Graph {id: $id})
                    """,
                        java.util.Map.of("id", neoGraphId)
                );
                return null;
            });
        }
    }
}
