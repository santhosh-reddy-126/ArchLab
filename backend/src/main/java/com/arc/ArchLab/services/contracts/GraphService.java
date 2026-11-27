package com.arc.ArchLab.services.contracts;

import com.arc.ArchLab.dao.request.GraphRequest;
import com.arc.ArchLab.model.Graph;

public interface GraphService {

    Graph createGraphMetaData(GraphRequest graphRequest);
}
