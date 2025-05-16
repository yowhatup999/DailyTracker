// backend/controller/AuthController.java
package com.dailytracker.controller;

import com.dailytracker.dto.*;
import com.dailytracker.model.User;
import com.dailytracker.repository.UserRepository;
import com.dailytracker.security.JwtService;
import com.dailytracker.model.RefreshToken;
import com.dailytracker.repository.RefreshTokenRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid RegisterRequest request) {
        try {
            if (userRepository.findByEmail(request.getEmail()).isPresent()) {
                return ResponseEntity.badRequest().body("Email already in use");
            }

            var user = User.builder()
                    .email(request.getEmail())
                    .password(passwordEncoder.encode(request.getPassword()))
                    .enabled(true)
                    .build();

            userRepository.save(user);
            log.info("Neuer Benutzer registriert: {}", request.getEmail());
            return ResponseEntity.ok("Registration successful");
        } catch (Exception e) {
            log.error("Fehler bei der Registrierung", e);
            return ResponseEntity.internalServerError().body("Registrierung fehlgeschlagen");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody @Valid LoginRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
            );
            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found"));

            var accessToken = jwtService.generateToken(user);
            var refreshToken = jwtService.generateRefreshToken(user);

            log.info("Benutzer erfolgreich eingeloggt: {}", request.getEmail());
            return ResponseEntity.ok(new AuthResponse(accessToken, refreshToken.getToken()));
        } catch (Exception e) {
            log.error("Login fehlgeschlagen für {}", request.getEmail(), e);
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<AuthResponse> refreshToken(@RequestBody TokenRefreshRequest request) {
        try {
            var refreshToken = refreshTokenRepository.findByToken(request.getRefreshToken())
                    .orElseThrow(() -> new RuntimeException("Refresh token not found"));

            var newAccessToken = jwtService.generateToken(refreshToken.getUser());

            log.info("Access Token erfolgreich erneuert für Benutzer: {}", refreshToken.getUser().getEmail());
            return ResponseEntity.ok(new AuthResponse(newAccessToken, refreshToken.getToken()));
        } catch (Exception e) {
            log.error("Fehler beim Erneuern des Tokens", e);
            return ResponseEntity.status(401).build();
        }
    }

    @GetMapping("/check")
    public ResponseEntity<?> checkLogin(@AuthenticationPrincipal User user) {
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        return ResponseEntity.ok().build();
    }
}
