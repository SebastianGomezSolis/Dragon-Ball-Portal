package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.UsuarioRepository;
import com.sistema.dragonballportalbackend.logic.model.Rol;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordHash passwordHash;

    public List<Usuario> findAll() {
        List<Usuario> lista = new ArrayList<>();
        usuarioRepository.findAll().forEach(lista::add);
        return lista;
    }

    public Usuario findById(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    public Usuario findByUsername(String username) {
        if (username == null || username.isBlank()) {
            return null;
        }
        return usuarioRepository.findByUsername(username).orElse(null);
    }

    public String registrar(Usuario usuario) {
        if (usuario == null) {
            return "El usuario es nulo";
        }

        if (usuario.getUsername() == null || usuario.getUsername().isBlank()) {
            return "El username es requerido";
        }

        if (usuario.getPassword() == null || usuario.getPassword().isBlank()) {
            return "La contraseña es requerida";
        }

        if (usuarioRepository.existsByUsername(usuario.getUsername())) {
            return "El username ya existe";
        }

        usuario.setRol(Rol.USER);
        usuario.setPassword(passwordHash.hash(usuario.getPassword()));
        usuario.setActivo(true);

        usuarioRepository.save(usuario);
        return null;
    }

    public void guardar(Usuario usuario) {
        usuario.setPassword(passwordHash.hash(usuario.getPassword()));
        usuarioRepository.save(usuario);
    }

    public String actualizar(Usuario usuario) {
        if (usuario == null) {
            return "El usuario es nulo";
        }

        if (usuario.getId() == null) {
            return "El id es requerido";
        }

        Usuario existente = findById(usuario.getId());
        if (existente == null) {
            return "El usuario no existe";
        }

        if (usuario.getPassword() != null && !usuario.getPassword().isBlank()) {
            usuario.setPassword(passwordHash.hash(usuario.getPassword()));
        } else {
            usuario.setPassword(existente.getPassword());
        }

        usuarioRepository.save(usuario);
        return null;
    }
}
