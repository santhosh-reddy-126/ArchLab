package com.arc.ArchLab.services.impl;

import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.exceptions.ArchException;
import com.arc.ArchLab.exceptions.ErrorCode;
import com.arc.ArchLab.mappers.GraphMetaMapper;
import com.arc.ArchLab.model.GraphMeta;
import com.arc.ArchLab.model.GraphMetaDTO;
import com.arc.ArchLab.repository.GraphMetaRepository;
import com.arc.ArchLab.repository.GraphRepository;
import com.arc.ArchLab.services.contracts.GraphService;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.UUID;

@AllArgsConstructor
@Slf4j
public class GraphServiceImpl implements GraphService {

    private final GraphMetaRepository graphMetaRepository;
    private final GraphRepository graphRepository;

    @Override
    public GraphMeta createGraphMetaData(GraphMetaRequest graphMetaRequest, String userId){
        try{
            String neoGraphId = UUID.randomUUID().toString();
            graphRepository.createGraph(neoGraphId);
            GraphMetaDTO graphDTO = GraphMetaMapper.toGraphMetaDTO(graphMetaRequest, neoGraphId, userId);
            String id = graphMetaRepository.save(graphDTO);
            return GraphMetaMapper.toGraphMeta(graphDTO, id);
        }catch (IOException ioException){
            log.error("Unable to login: {}", ioException.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }


    }
}
