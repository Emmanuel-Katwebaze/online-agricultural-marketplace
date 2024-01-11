package com.emmakatwebaze.adminbackend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*")
@RestController
public class HelloController {

    @GetMapping("/api")
    public String helloWorld(){
        return "Hello";
    }
}
