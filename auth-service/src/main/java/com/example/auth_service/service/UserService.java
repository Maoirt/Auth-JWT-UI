package com.example.auth_service.service;

import com.example.auth_service.dto.CredentialsDto;
import com.example.auth_service.dto.SignUpDto;
import com.example.auth_service.dto.UserDto;

/**
 * Сервис управления пользователями
 */
public interface UserService {

    /**
     * Поиск пользователя по имени
     *
     * @param login имя пользователя
     * @return пользователь
     */
    UserDto findByUserName(String login);

    /**
     * Авторизация пользователя
     *
     * @param credentialsDto данные пользователя
     * @return пользователь
     */
    UserDto login(CredentialsDto credentialsDto);

    /**
     * Регистрация пользователя
     *
     * @param userDto данные пользователя
     * @return пользователь
     */
    UserDto register(SignUpDto userDto);
}
