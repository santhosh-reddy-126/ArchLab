package com.arc.ArchLab.mappers;

import com.arc.ArchLab.dao.request.GraphRequest;
import com.arc.ArchLab.model.Graph;
import com.arc.ArchLab.model.GraphDTO;

public class GraphMapper {

    public static GraphDTO toGraphDTO(GraphRequest graphRequest, String neoGraphId){
        return new GraphDTO(graphRequest.getTitle(), graphRequest.getDescription(), neoGraphId);
    }

    public static Graph toGraph(GraphDTO graphDTO, String id){
        return new Graph(id, graphDTO.getTitle(), graphDTO.getDescription(), graphDTO.getNeoGraphId());

    }
}
