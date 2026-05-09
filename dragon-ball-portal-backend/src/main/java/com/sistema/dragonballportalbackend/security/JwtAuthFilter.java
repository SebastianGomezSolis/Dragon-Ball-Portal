package com.sistema.dragonballportalbackend.security;

import com.sistema.dragonballportalbackend.logic.model.Rol;
import com.sistema.dragonballportalbackend.logic.model.SesionUsuarioBean;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthFilter extends OncePerRequestFilter {
    @Autowired
    private JwtService jwtService;

    @Autowired
    private SesionUsuarioBean sesionUsuarioBean;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        sesionUsuarioBean.logout();

        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            String token = authHeader.substring(7);
            if (jwtService.esValido(token)) {
                Integer id = jwtService.obtenerUserId(token);
                String username = jwtService.obtenerUsername(token);
                Rol rol = jwtService.obtenerRol(token);

                sesionUsuarioBean.login(id, username, rol, true);
            }
        }

        filterChain.doFilter(request, response);
    }
}
