package com.arc.ArchLab.repository;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch.core.GetResponse;
import co.elastic.clients.elasticsearch.core.IndexResponse;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import co.elastic.clients.elasticsearch.core.search.Hit;
import com.arc.ArchLab.constants.ESIndexes;
import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.model.User;

import java.io.IOException;
import java.util.Objects;
import java.util.Optional;


public class UserRepository {
    private final ElasticsearchClient client;

    public UserRepository(ElasticsearchClient client) {
        this.client = client;
    }

    public String save(UserRequest userRequest) throws IOException {
        IndexResponse response = client.index(i -> i
                .index(ESIndexes.USERS_INDEX)
                .document(userRequest)
        );
        return response.id();
    }

    public Optional<User> get(String id) throws IOException{
        GetResponse<User> response = client.get(g -> g.index(ESIndexes.USERS_INDEX).id(id), User.class);

        if(!response.found()){
            return Optional.empty();
        }
        return Optional.ofNullable(response.source());
    }

    public Optional<User> getByUserName(String userName) throws IOException{
        SearchResponse<User> userSearchResponse = client.search(s -> s.index(ESIndexes.USERS_INDEX).query(q -> q.term(t -> t.field("username").value(userName))), User.class);
        return userSearchResponse.hits().hits().stream()
                .map(Hit::source)
                .filter(Objects::nonNull)
                .findFirst();
    }

}
