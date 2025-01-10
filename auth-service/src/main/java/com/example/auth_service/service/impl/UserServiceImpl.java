package com.example.auth_service.service.impl;

import com.example.auth_service.dto.CredentialsDto;
import com.example.auth_service.dto.SignUpDto;
import com.example.auth_service.dto.UserDto;
import com.example.auth_service.exception.UserException;
import com.example.auth_service.mapper.UserMapper;
import com.example.auth_service.model.User;
import com.example.auth_service.repository.UserRepository;
import com.example.auth_service.request.EmailRequest;
import com.example.auth_service.service.UserService;
import com.example.auth_service.util.ActivationTokenGenerator;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    private RestTemplate restTemplate;

    public void saveUser(User user){
        userRepository.save(user);
    }

    public UserDto findByUserName(String login) {

        User user =  userRepository.findByUserName(login).orElseThrow(()-> new UserException("Unknown user", HttpStatus.NOT_FOUND));
        return userMapper.toUserDto(user);
    }

    public User findByEmail(String email){
        User user = userRepository.findByEmail(email).orElseThrow(()->new UserException("Unknow user with this email", HttpStatus.NOT_FOUND));
        return user;
    }

    public User findByVerificationToken(String token){

        User user = userRepository.findByVerificationToken(token).orElseThrow(()->new UserException("Unknown user with token", HttpStatus.NOT_FOUND));
        return user;
    }

    public UserDto login(CredentialsDto credentialsDto) {

        User user = userRepository.findByUserName(credentialsDto.getUserName()).orElseThrow(()->new UserException("Unknown user", HttpStatus.NOT_FOUND));

        if(passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())){
            return userMapper.toUserDto(user);
        }

        throw new UserException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {

        Optional<User> optionalUser = userRepository.findByUserName(userDto.getUserName());

        if(optionalUser.isPresent()){
            throw new UserException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        User user = userMapper.signUpToUser(userDto);
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        userRepository.save(user);

        String token = ActivationTokenGenerator.generateToken();
        user.setVerificationToken(token);
        userRepository.save(user);

        String confirmationUrl = "http://localhost:8081/verify-email?token=" + token;
        EmailRequest emailRequest = new EmailRequest(user.getEmail(), "Email Verification", "Click the link to verify your email: " + confirmationUrl);
        restTemplate.postForObject("http://localhost:8083/api/email/send-email", emailRequest, Void.class);

        return userMapper.toUserDto(user);
    }

}
