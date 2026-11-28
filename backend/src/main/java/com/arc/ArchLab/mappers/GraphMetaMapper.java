package com.arc.ArchLab.mappers;

import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.model.GraphMeta;
import com.arc.ArchLab.model.GraphMetaDTO;

public class GraphMetaMapper {

    public static GraphMetaDTO toGraphMetaDTO(GraphMetaRequest graphMetaRequest, String neoGraphId, String userId){
        return new GraphMetaDTO(graphMetaRequest.getTitle(), userId, graphMetaRequest.getDescription(), neoGraphId);
    }

    public static GraphMeta toGraphMeta(GraphMetaDTO graphDTO, String id){
        return new GraphMeta(id, graphDTO.getUserId(), graphDTO.getTitle(), graphDTO.getDescription(), graphDTO.getNeoGraphId());

    }
}
