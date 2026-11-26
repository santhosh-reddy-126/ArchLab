package com.arc.ArchLab.services.contracts;

import com.arc.ArchLab.dao.request.LoginRequest;
import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.dao.response.LoginResponse;
import com.arc.ArchLab.dao.response.UserResponse;

public interface AuthService {

    LoginResponse login(LoginRequest loginRequest);

    UserResponse signUp(UserRequest userRequest);
}
