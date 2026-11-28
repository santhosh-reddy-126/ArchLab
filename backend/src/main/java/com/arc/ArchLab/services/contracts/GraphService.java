package com.arc.ArchLab.services.contracts;

import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.model.GraphMeta;

public interface GraphService {

    GraphMeta createGraphMetaData(GraphMetaRequest graphMetaRequest);
}
