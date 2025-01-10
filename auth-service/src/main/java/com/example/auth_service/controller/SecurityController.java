package com.example.auth_service.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class SecurityController {

    @GetMapping("/forgotPassword")
    public String forgotPassword(){
        return "security/forgotPassword";
    }
}
