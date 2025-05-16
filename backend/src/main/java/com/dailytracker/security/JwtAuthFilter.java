// backend/security/JwtAuthFilter.java
package com.dailytracker.security;

import com.dailytracker.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.DecodingException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtAuthFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserRepository userRepository;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        final String token = authHeader.substring(7).trim();
        log.debug("Empfangenes Token: {}", token);

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(jwtService.getKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String userEmail = claims.getSubject();
            if (userEmail != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                userRepository.findByEmail(userEmail).ifPresent(user -> {
                    var authToken = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities()
                    );
                    authToken.setDetails(
                            new WebAuthenticationDetailsSource().buildDetails(request)
                    );
                    SecurityContextHolder.getContext().setAuthentication(authToken);
                    log.info("Benutzer {} erfolgreich authentifiziert", userEmail);
                });
            }
        } catch (DecodingException e) {
            log.error("Ungültiger JWT-Token: Decoding fehlgeschlagen (Base64 Problem)", e);
        } catch (Exception e) {
            log.error("JWT-Verarbeitung fehlgeschlagen", e);
        }

        filterChain.doFilter(request, response);
    }
}