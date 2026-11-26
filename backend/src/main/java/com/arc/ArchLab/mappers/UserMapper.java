package com.arc.ArchLab.mappers;

import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.dao.response.LoginResponse;
import com.arc.ArchLab.dao.response.UserResponse;
import com.arc.ArchLab.model.User;

public class UserMapper {

    public static LoginResponse toLoginResponse(User user, String jwt){
        return new LoginResponse(user.getUsername(), jwt);
    }

    public static UserResponse toUserResponse(User user){
        return new UserResponse(user.getId(), user.getUsername(), user.getPassword());
    }
}
