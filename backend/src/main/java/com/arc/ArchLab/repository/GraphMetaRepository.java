package com.arc.ArchLab.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import com.arc.ArchLab.constants.ESIndexes;
import com.arc.ArchLab.dao.request.GraphRequest;
import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.model.GraphDTO;

import java.io.IOException;

public class GraphMetaRepository {

    private final ElasticsearchClient client;

    public GraphMetaRepository(ElasticsearchClient client) {
        this.client = client;
    }

    public String save(GraphDTO graphDTO) throws IOException {
        IndexResponse response = client.index(i -> i
                .index(ESIndexes.GRAPH_INDEX)
                .document(graphDTO)
        );
        return response.id();
    }
}
