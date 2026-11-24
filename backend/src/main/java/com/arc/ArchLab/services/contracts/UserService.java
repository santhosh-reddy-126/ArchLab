package com.arc.ArchLab.services.contracts;

import com.arc.ArchLab.dao.request.UserRequest;
import com.arc.ArchLab.model.User;

public interface UserService {


    String createUser(UserRequest userRequest);
    User getUserById(String userId);
}
