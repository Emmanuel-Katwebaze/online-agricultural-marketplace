package com.emmakatwebaze.adminbackend.service.user;

import com.emmakatwebaze.adminbackend.entity.User;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;

import java.util.List;

public interface UserService {
    User saveUser(User user);

    List<User> fetchUsersList();

    User fetchUserById(Long userId) throws ResourceNotFoundException;

    User updateUser(Long userId, User user);

    void deleteUserById(Long userId);
}
