package com.arc.ArchLab.services.impl;

import com.arc.ArchLab.dao.request.GraphMetaRequest;
import com.arc.ArchLab.dao.request.GraphMetaSearchRequest;
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
import java.util.List;
import java.util.Optional;
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
            log.error("Unable to create graph meta: {}", ioException.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }


    }


    @Override
    public GraphMeta getGraphMeta(String graphMetaId){
        try{
            Optional<GraphMeta> graphMetaOptional = graphMetaRepository.getGraphMeta(graphMetaId);
            if(graphMetaOptional.isEmpty()){
                throw new ArchException(ErrorCode.GRAPH_NOT_FOUND);
            }
            return graphMetaOptional.get();
        }catch (IOException ioException){
            log.error("Unable to get graph meta: {}", ioException.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }


    @Override
    public List<GraphMeta> searchGraphMeta(GraphMetaSearchRequest graphMetaSearchRequest, String userId){
        try{
            return graphMetaRepository.searchGraphMeta(graphMetaSearchRequest, userId);
        }catch (IOException ioException){
            log.error("Unable to search graph meta: {}", ioException.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
