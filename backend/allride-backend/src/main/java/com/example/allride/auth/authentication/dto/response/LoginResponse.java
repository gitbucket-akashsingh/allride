package com.example.allride.auth.authentication.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class LoginResponse {
    private boolean success;

    private String message;

    private UserData user;

    private TokenData tokens;

    @Data
    @Builder
    public static class UserData {

        private Long id;

        private String fullName;

        private String email;

        private String role;
        
        private boolean emailVerified;
    }

    @Data
    @Builder
    public static class TokenData {

        private String accessToken;

        private String refreshToken;

        private long expiresIn;
    }

}
