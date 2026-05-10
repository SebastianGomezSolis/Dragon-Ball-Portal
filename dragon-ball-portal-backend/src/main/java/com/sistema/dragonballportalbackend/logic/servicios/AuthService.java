package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.dto.AuthRequest;
import com.sistema.dragonballportalbackend.dto.LoginResponse;
import com.sistema.dragonballportalbackend.logic.model.SesionUsuarioBean;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.security.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

// Servicio de autenticación que maneja las operaciones de login y logout de usuarios.
// Coordina la verificación de credenciales, generación de tokens JWT y gestión de sesiones.
@Service
public class AuthService {
    // Servicio de usuario utilizado para buscar y validar credenciales de usuarios.
    // Inyección automática por Spring para acceder a datos de usuarios.
    @Autowired
    private UsuarioService usuarioService;

    // Utilidad para verificar contraseñas hasheadas usando el algoritmo BCrypt.
    // Permite comparar contraseñas en texto plano con hashes almacenados.
    @Autowired
    private PasswordHash passwordHash;

    // Bean de sesión que mantiene el estado de la sesión del usuario actual en memoria.
    // Permite verificar rápidamente si hay un usuario autenticado.
    @Autowired
    private SesionUsuarioBean sesionUsuarioBean;

    // Servicio para generación y validación de tokens JWT (JSON Web Tokens).
    // Utilizado para crear tokens de acceso después de un login exitoso.
    @Autowired
    private JwtService jwtService;

    // Procesa una solicitud de inicio de sesión verificando credenciales del usuario.
    // Si las credenciales son válidas, genera un token JWT y actualiza el estado de sesión.
    public LoginResponse login(AuthRequest request) {
        // Validación básica de campos requeridos en la solicitud
        if (request.getUsername() == null || request.getPassword() == null) {
            return null;
        }

        // Busca el usuario por nombre de usuario en la base de datos
        Usuario usuario = usuarioService.findByUsername(request.getUsername());
        if (usuario == null) {
            return null;
        }

        // Verifica que la cuenta de usuario esté activa
        if (!Boolean.TRUE.equals(usuario.getActivo())) {
            return null;
        }

        // Compara la contraseña proporcionada con el hash almacenado
        if (!passwordHash.verify(request.getPassword(), usuario.getPassword())) {
            return null;
        }

        // Actualiza el bean de sesión con los datos del usuario autenticado
        sesionUsuarioBean.login(usuario.getId(), usuario.getUsername(), usuario.getRol(), true);

        // Genera un token JWT con la información del usuario para autenticación posterior
        String token = jwtService.generarToken(usuario.getId(), usuario.getUsername(), usuario.getRol());

        // Retorna la respuesta de login con todos los datos necesarios para el cliente
        return new LoginResponse(usuario.getId(), usuario.getUsername(), usuario.getRol().name(), token);
    }

    // Cierra la sesión del usuario actual invalidando su estado en el sistema.
    // Limpia los datos de sesión almacenados en el bean de sesión.
    public void logout() {
        sesionUsuarioBean.logout();
    }
}
