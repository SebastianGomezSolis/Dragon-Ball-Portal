package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.dto.AuthRequest;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordHash passwordHash;

    public Usuario login(AuthRequest request) {
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

        return usuario;
    }

    public void logout() {
    }
}
