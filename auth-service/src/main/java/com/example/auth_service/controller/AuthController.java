package com.example.auth_service.controller;

import com.example.auth_service.security.UserAuthProvider;
import com.example.auth_service.dto.CredentialsDto;
import com.example.auth_service.dto.SignUpDto;
import com.example.auth_service.dto.UserDto;
import com.example.auth_service.service.impl.UserServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@Tag(name = "AuthController Controller", description = "Контроллер для авторизации и регистрации")
public class AuthController {

    private final UserServiceImpl userService;
    private final UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    @Operation(summary = "Вход", description = "Позволяет войти в приложение")
    public ResponseEntity<UserDto> login(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Данные о пользователе",
                    required = true,
                    content = @Content(schema = @Schema(implementation = CredentialsDto.class))
            )
            @RequestBody CredentialsDto credentialsDto) {

       UserDto user = userService.login(credentialsDto);
       user.setToken(userAuthProvider.createToken(user.getUserName()));

       return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    @Operation(summary = "Вход", description = "Позволяет зарегистрироваться в приложении")
    public ResponseEntity<UserDto> register(
            @io.swagger.v3.oas.annotations.parameters.RequestBody(
                    description = "Данные о пользователе",
                    required = true,
                    content = @Content(schema = @Schema(implementation = SignUpDto.class))
            )
            @RequestBody SignUpDto signUpDto) {

        UserDto user = userService.register(signUpDto);
        user.setToken(userAuthProvider.createToken(user.getUserName()));

        return ResponseEntity.created(URI.create("/users/" + user.getUserName()))
                .body(user);
    }

}
