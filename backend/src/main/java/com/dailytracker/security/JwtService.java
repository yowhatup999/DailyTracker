package com.dailytracker.security;

import com.dailytracker.model.RefreshToken;
import com.dailytracker.model.User;
import com.dailytracker.repository.RefreshTokenRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.time.Instant;
import java.util.Date;
import java.util.UUID;

@Service
public class JwtService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final Key key;

    public JwtService(@Value("${jwt.secret}") String secretKeyBase64,
                      RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
        byte[] keyBytes = Decoders.BASE64.decode(secretKeyBase64);
        this.key = Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(User user) {
        return Jwts.builder()
                .setSubject(user.getEmail())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1h
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public RefreshToken generateRefreshToken(User user) {
        RefreshToken token = RefreshToken.builder()
                .user(user)
                .token(UUID.randomUUID().toString())
                .expiryDate(Instant.now().plusSeconds(7 * 24 * 60 * 60)) // 7 Tage Gültigkeit
                .build();
        return refreshTokenRepository.save(token);
    }

    public Key getKey() {
        return key;
    }
}
