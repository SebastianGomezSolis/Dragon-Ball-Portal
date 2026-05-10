package com.sistema.dragonballportalbackend.config;

import com.sistema.dragonballportalbackend.security.JwtAuthFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

// Configuración de seguridad de Spring Security para la aplicación.
// Define las reglas de autorización, filtros y configuración CORS.
@Configuration
@EnableWebSecurity
public class SecurityConfig {
    // Filtro de autenticación JWT para validar tokens en las peticiones.
    // Inyectado automáticamente por Spring.
    @Autowired
    private JwtAuthFilter jwtAuthFilter;

    // Define la cadena de filtros de seguridad para la aplicación.
    // Configura CORS, deshabilita CSRF, establece política stateless y agrega el filtro JWT.
    // @param http Objeto HttpSecurity para configurar la seguridad
    // @return Cadena de filtros de seguridad configurada
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // Configura CORS con la fuente de configuración personalizada
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                // Deshabilita protección CSRF (no necesaria para APIs stateless)
                .csrf(AbstractHttpConfigurer::disable)
                // Configura manejo de sesiones para ser stateless (no se guarda estado)
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                // Permite todas las requests sin autenticación (para desarrollo)
                // En producción debería restringirse según roles y endpoints
                .authorizeHttpRequests(auth ->
                        auth.anyRequest().permitAll())
                // Agrega el filtro JWT antes del filtro de autenticación de username/password
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // Configura la fuente de configuración CORS para la aplicación.
    // Define qué origins, methods y headers están permitidos para las peticiones CORS.
    // @return Fuente de configuración CORS
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        // Origins permitidos para hacer peticiones CORS (frontend en desarrollo)
        config.setAllowedOrigins(List.of(
                "http://localhost:3000",
                "http://localhost:5173"
        ));
        // Métodos HTTP permitidos para peticiones CORS
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Headers permitidos en peticiones CORS (* significa todos)
        config.setAllowedHeaders(List.of("*"));
        // Indica si se permiten credenciales (cookies, auth headers) en peticiones CORS
        config.setAllowCredentials(false);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Registra la configuración CORS para todas las rutas bajo /api/**
        source.registerCorsConfiguration("/api/**", config);
        return source;
    }
}
