package com.arc.ArchLab.services.contracts;

import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.dao.request.GraphMetaSearchRequest;
import com.arc.ArchLab.model.GraphMeta;

import java.util.List;

public interface GraphService {

    GraphMeta createGraphMetaData(GraphMetaRequest graphMetaRequest, String userid);

    GraphMeta getGraphMeta(String graphMetaId);

    List<GraphMeta> searchGraphMeta(GraphMetaSearchRequest graphMetaSearchRequest, String userId);
}
