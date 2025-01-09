package com.example.auth_service.controller;

import com.example.auth_service.mapper.UserMapper;
import com.example.auth_service.model.User;
import com.example.auth_service.security.UserAuthProvider;
import com.example.auth_service.dto.CredentialsDto;
import com.example.auth_service.dto.SignUpDto;
import com.example.auth_service.dto.UserDto;
import com.example.auth_service.service.impl.UserServiceImpl;
import com.example.auth_service.service.impl.VerificationServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "AuthController Controller", description = "Контроллер для авторизации и регистрации")
public class AuthController {

    private final UserServiceImpl userService;
    private final UserAuthProvider userAuthProvider;
    private final VerificationServiceImpl verificationService;

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

        return ResponseEntity.ok(user);

    }

    @PostMapping("/verify-email")
    public String verifyEmail(@RequestParam("token") String token, Model model) {
        String result = verificationService.validateVerificationToken(token);
        User user = userService.findByVerificationToken(token);
        user.setEnabledVerification(true);
        userService.saveUser(user);
        if (result.equals("valid")) {
            model.addAttribute("message", "Your account has been verified successfully.");
            return "verified";
        } else {
            model.addAttribute("message", "Invalid verification token.");
            return "verify-email";
        }
    }
}
