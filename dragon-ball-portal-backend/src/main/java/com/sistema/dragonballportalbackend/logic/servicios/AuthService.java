package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.dto.AuthRequest;
import com.sistema.dragonballportalbackend.dto.LoginResponse;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordHash passwordHash;

    @Autowired
    private JwtService jwtService;

    public LoginResponse login(AuthRequest request) {
        if (request.getUsername() == null || request.getPassword() == null) {
            return null;
        }

        Usuario usuario = usuarioService.findByUsername(request.getUsername());
        if (usuario == null) {
            return null;
        }

        if (!Boolean.TRUE.equals(usuario.getActivo())) {
            return null;
        }

        if (!passwordHash.verify(request.getPassword(), usuario.getPassword())) {
            return null;
        }

        String token = jwtService.generarToken(usuario.getId(), usuario.getUsername(), usuario.getRol());

        return new LoginResponse(usuario.getId(), usuario.getUsername(), usuario.getRol().name(), token);
    }

    public void logout() {
    }
}
