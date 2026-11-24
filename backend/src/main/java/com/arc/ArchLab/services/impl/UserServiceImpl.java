package com.arc.ArchLab.services.impl;

import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.exceptions.ArchException;
import com.arc.ArchLab.exceptions.ErrorCode;
import com.arc.ArchLab.model.User;
import com.arc.ArchLab.repository.UserRepository;
import com.arc.ArchLab.services.contracts.UserService;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Optional;

@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }

    @Override
    public String createUser(UserRequest userRequest){
        try{
            Optional<User> existingUser = userRepository.getByUserName(userRequest.getUsername());
            if(existingUser.isPresent()){
                throw new ArchException(ErrorCode.USER_ALREADY_EXISTS);
            }
            return userRepository.save(userRequest);
        } catch (IOException e) {
            log.error("Failed to create User: {}", e.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    public User getUserById(String userId) {
        try{
            Optional<User> existingUser = userRepository.get(userId);
            if(existingUser.isEmpty()){
                throw new ArchException(ErrorCode.USER_NOT_FOUND);
            }

            return existingUser.get();

        } catch (IOException e) {
            log.error("Failed to get User: {}", e.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }
    }


}
