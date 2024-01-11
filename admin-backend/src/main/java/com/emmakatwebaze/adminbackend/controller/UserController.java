package com.emmakatwebaze.adminbackend.controller;

import com.emmakatwebaze.adminbackend.api_response.ApiResponse;
import com.emmakatwebaze.adminbackend.entity.User;
import com.emmakatwebaze.adminbackend.error.ResourceNotFoundException;
import com.emmakatwebaze.adminbackend.service.user.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    private UserService userService;

    private final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
    @PostMapping("/api/users")
    public User saveUser(@RequestBody User user){
        LOGGER.info("Inside saveUser of UserController");
        return userService.saveUser(user);
    }

    @GetMapping("/api/users")
    public List<User> fetchUsersList(){
        LOGGER.info("Inside fetchUsersList of UserController");
        return userService.fetchUsersList();
    }

    @GetMapping("/api/users/{id}")
    public User fetchUserById(@PathVariable("id") Long userId) throws ResourceNotFoundException {
        return userService.fetchUserById(userId);
    }

    @PutMapping("/api/users/{id}")
    public User updateUser(@PathVariable("id") Long userId, @RequestBody User user) {
        return userService.updateUser(userId, user);
    }

    @DeleteMapping("/api/users/{id}")
    public ResponseEntity<ApiResponse> deleteUserById(@PathVariable("id") Long userId) {
        userService.deleteUserById(userId);
        return ResponseEntity.ok(new ApiResponse("User deleted Successfully!"));
    }


}
