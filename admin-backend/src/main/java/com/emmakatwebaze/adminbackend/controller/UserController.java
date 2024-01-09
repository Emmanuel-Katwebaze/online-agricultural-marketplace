package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.entity.User;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    @PostMapping("/users")
    public User saveUser(@RequestBody User user){
        LOGGER.info("Inside saveUser of UserController");
        return userService.saveUser(user);
    }

    @GetMapping("/users")
    public List<User> fetchUsersList(){
        LOGGER.info("Inside fetchUsersList of UserController");
        return userService.fetchUsersList();
    }

    @GetMapping("/users/{id}")
    public User fetchUserById(@PathVariable("id") Long userId) throws ResourceNotFoundException {
        return userService.fetchUserById(userId);
    }

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable("id") Long userId, @RequestBody User user) {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/users/{id}")
    public String deleteUserById(@PathVariable("id") Long userId){
        userService.deleteUserById(userId);
        return "User deleted Successfully!";
    }


}
