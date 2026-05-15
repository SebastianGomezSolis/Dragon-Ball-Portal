package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.UsuarioRepository;
import com.sistema.dragonballportalbackend.logic.model.Rol;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

// Servicio de negocio para gestionar operaciones relacionadas con usuarios.
// Maneja el registro, autenticación, búsqueda y actualización de cuentas de usuario.
@Service
public class UsuarioService {
    // Repositorio de datos para operaciones CRUD sobre la entidad Usuario.
    // Permite acceder a la base de datos para persistir y consultar usuarios.
    @Autowired
    private UsuarioRepository usuarioRepository;

    // Utilidad para cifrar contraseñas usando el algoritmo BCrypt.
    // Garantiza que las contraseñas se almacenen de forma segura.
    @Autowired
    private PasswordHash passwordHash;

    // Recupera todos los usuarios registrados en el sistema.
    public List<Usuario> findAll() {
        return new ArrayList<>((List<Usuario>) usuarioRepository.findAll());
    }

    // Busca un usuario por su identificador único.
    public Usuario findById(Integer id) {
        return usuarioRepository.findById(id).orElse(null);
    }

    // Busca un usuario por su nombre de usuario (username).
    public Usuario findByUsername(String username) {
        if (username == null || username.isBlank()) {
            return null;
        }
        return usuarioRepository.findByUsername(username).orElse(null);
    }

    // Registra un nuevo usuario en el sistema con validaciones de negocio.
    // Por defecto asigna el rol USER y activa la cuenta.
    // La contraseña se cifra automáticamente antes de almacenarse.
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

    // Guarda un usuario con la contraseña cifrada.
    // Usado principalmente para crear usuarios desde el inicializador de datos.
    public void guardar(Usuario usuario) {
        usuario.setPassword(passwordHash.hash(usuario.getPassword()));
        usuarioRepository.save(usuario);
    }
}
