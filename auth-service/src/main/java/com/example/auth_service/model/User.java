package com.example.auth_service.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "_user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private String userName;
    private String firstName;
    private String lastName;
    private String email;
    private String phone;
    private String password;
    private String authProvider;
    @Transient
    private boolean enable;
    @Transient
    private boolean tokenExpired;
}
