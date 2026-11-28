package com.arc.ArchLab.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.arc.ArchLab.constants.ESIndexes;
import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.dao.request.GraphMetaSearchRequest;
import com.arc.ArchLab.model.GraphMeta;
import com.arc.ArchLab.model.GraphMetaDTO;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

public class GraphMetaRepository {

    private final ElasticsearchClient client;

    public GraphMetaRepository(ElasticsearchClient client) {
        this.client = client;
    }

    public String save(GraphMetaDTO graphDTO) throws IOException {
        IndexResponse response = client.index(i -> i
                .index(ESIndexes.GRAPH_INDEX)
                .document(graphDTO)
        );
        return response.id();
    }

    public Optional<GraphMeta> getGraphMeta(String graphMetaId) throws IOException{
        GetResponse<GraphMeta> response = client.get(i -> i.index(ESIndexes.GRAPH_INDEX).id(graphMetaId), GraphMeta.class);

        if(!response.found() || Objects.isNull(response.source())){
            return Optional.empty();
        }

        return Optional.of(new GraphMeta(response.id(), response.source().getUserId(), response.source().getTitle(), response.source().getDescription(), response.source().getNeoGraphId()));
    }

    public List<GraphMeta> searchGraphMeta(GraphMetaSearchRequest request, String userId) throws IOException {
        String title = request.getTitle();
        SearchResponse<GraphMeta> response = client.search(i -> i
                .index(ESIndexes.GRAPH_INDEX)
                .size(100)
                .query(q -> q.bool(b -> {
                    b.must(m -> m.term(t -> t
                            .field("userId.keyword")
                            .value(userId)));
                    if (title != null && !title.isBlank()) {
                        b.must(m -> m.match(t -> t
                                .field("title")
                                .query(title)));
                    }
                    return b;
                })), GraphMeta.class);

        return response.hits().hits().stream()
                .map(hit -> {
                    assert hit.source() != null;
                    return new GraphMeta(
                            hit.id(),
                            hit.source().getUserId(),
                            hit.source().getTitle(),
                            hit.source().getDescription(),
                            hit.source().getNeoGraphId()
                    );
                })
                .toList();
    }

}
