package com.example.auth_service.service.impl;

import com.example.auth_service.model.User;
import com.example.auth_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.OidcIdToken;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2UserAuthority;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends OidcUserService {

    private final UserRepository userRepository;

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {

        OidcIdToken idToken = userRequest.getIdToken();
        OidcUser oidcUser = super.loadUser(userRequest);

        Map<String, Object> attributes = oidcUser.getAttributes();

        String clientName = userRequest.getClientRegistration().getClientName();

        String email = null, firstname = null, lastname = null, username = null, authProvider = null, phone = null;

        switch (clientName){
            case "google":
                break;
            case "github":
                break;
        }

        Optional<User> existingUser = userRepository.findByUserName(username);

        if(!existingUser.isPresent()){
            User newUser = User.builder()
                    .userName(username)
                    .email(email)
                    .firstName(firstname)
                    .lastName(lastname)
                    .authProvider(authProvider)
                    .enable(true)
                    .phone(phone)
                    .build();

            userRepository.save(newUser);
        }

        Set<GrantedAuthority> authorities = Collections.singleton(new OAuth2UserAuthority(attributes));
        String userNameAttributesKey = userRequest.getClientRegistration()
                .getProviderDetails()
                .getUserInfoEndpoint()
                .getUserNameAttributeName();

        OidcUser updateUser = new DefaultOidcUser(authorities, idToken, userNameAttributesKey);

        return updateUser;
    }
}
