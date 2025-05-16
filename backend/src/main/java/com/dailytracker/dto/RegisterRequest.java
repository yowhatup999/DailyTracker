package com.dailytracker.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequest {

    @NotBlank(message = "E-Mail darf nicht leer sein")
    @Email(message = "Ungültiges E-Mail Format")
    private String email;

    @NotBlank(message = "Passwort darf nicht leer sein")
    private String password;
}
