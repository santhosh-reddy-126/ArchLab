package com.arc.ArchLab.services.impl;

import com.arc.ArchLab.dao.request.LoginRequest;
import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.dao.response.LoginResponse;
import com.arc.ArchLab.dao.response.UserResponse;
import com.arc.ArchLab.exceptions.ArchException;
import com.arc.ArchLab.exceptions.ErrorCode;
import com.arc.ArchLab.mappers.UserMapper;
import com.arc.ArchLab.model.User;
import com.arc.ArchLab.repository.UserRepository;
import com.arc.ArchLab.services.contracts.AuthService;
import com.arc.ArchLab.utils.AuthUtils;
import com.arc.ArchLab.utils.JwtUtils;
import lombok.extern.slf4j.Slf4j;

import java.io.IOException;
import java.util.Optional;

@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;

    public AuthServiceImpl(UserRepository userRepository){
        this.userRepository = userRepository;
    }


    @Override
    public LoginResponse login(LoginRequest loginRequest){
        try{
            Optional<User> user = userRepository.getByUserName(loginRequest.getUsername());
            if(user.isEmpty()){
                throw new ArchException(ErrorCode.USER_NOT_FOUND);
            }
            User user1 = user.get();
            validatePassword(loginRequest,user1);
            // generate jwt
            String JWT = JwtUtils.generateToken(user1.getId(), user1.getUsername());
            return UserMapper.toLoginResponse(user1, JWT);
        }catch (IOException ioException){
            log.error("Unable to login: {}", ioException.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

    }

    @Override
    public UserResponse signUp(UserRequest userRequest){

        try{
            Optional<User> user = userRepository.getByUserName(userRequest.getUsername());
            if(user.isPresent()){
                throw new ArchException(ErrorCode.USER_ALREADY_EXISTS);
            }

            // hash password
            userRequest.setPassword(AuthUtils.hashPassword(userRequest.getPassword()));
            User user1 = createUser(userRequest);

            return UserMapper.toUserResponse(user1);
        }catch (IOException ioException){
            log.error("Unable to signup: {}", ioException.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }


    }

    private void validatePassword(
            LoginRequest request,
            User user) {

        if (!AuthUtils.verifyPassword(
                request.getPassword(),
                user.getPassword())) {

            throw new ArchException(ErrorCode.INVALID_CREDENTIALS);
        }
    }

    private User createUser(UserRequest userRequest){
        try{
            String userId = userRepository.save(userRequest);
            return new User(userId, userRequest.getUsername(), userRequest.getPassword());
        }catch (IOException ioException){
            log.error("Unable to create user: {}", ioException.getMessage());
            throw new ArchException(ErrorCode.INTERNAL_SERVER_ERROR);
        }

    }

}
