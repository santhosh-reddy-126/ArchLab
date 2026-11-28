package com.arc.ArchLab.mappers;

import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.model.GraphMeta;
import com.arc.ArchLab.model.GraphMetaDTO;

public class GraphMetaMapper {

    public static GraphMetaDTO toGraphMetaDTO(GraphMetaRequest graphMetaRequest, String neoGraphId){
        return new GraphMetaDTO(graphMetaRequest.getTitle(), graphMetaRequest.getDescription(), neoGraphId);
    }

    public static GraphMeta toGraphMeta(GraphMetaDTO graphDTO, String id){
        return new GraphMeta(id, graphDTO.getTitle(), graphDTO.getDescription(), graphDTO.getNeoGraphId());

    }
}
