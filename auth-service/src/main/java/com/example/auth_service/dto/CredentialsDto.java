package com.example.auth_service.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Data
@Schema(description = "Реквизиты для входа")
public class CredentialsDto {

    @NotBlank
    @Size(min = 1, max = 50)
    @Schema(description = "Никнейм пользователя", example = "Daniel342")
    private String userName;

    @NotBlank
    @Size(min = 10, max = 250)
    @Schema(description = "Пароль пользователя", example = "r4hoiahiugy3ya8o7gak")
    private char[] password;

}
