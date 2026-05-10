package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.dto.AuthRequest;
import com.sistema.dragonballportalbackend.dto.LoginResponse;
import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// Controlador REST para manejar las operaciones de autenticación.
// Proporciona endpoints para login, registro y cierre de sesión.
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    // Servicio de modelo que proporciona acceso a los servicios de negocio.
    // Inyectado automáticamente por Spring.
    @Autowired
    private ModeloDatos modeloDatos;

    // Endpoint para iniciar sesión con credenciales.
    // Parametro request: Objeto con email y password para autenticación
    // Retorna la respuesta con token JWT si es exitoso, error 401 si falla
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest request) {
        LoginResponse respuesta = modeloDatos.getAuthService().login(request);

        if (respuesta == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Credenciales invalidas");
        }

        return ResponseEntity.ok(respuesta);
    }

    // Endpoint para registrar un nuevo usuario.
    // Parametro usuario: Objeto con los datos del usuario a registrar
    // Retorna el mensaje de éxito o error de validación
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        String error = modeloDatos.getUsuarioService().registrar(usuario);
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        return ResponseEntity.ok("Usuario registrado correctamente");
    }

    // Endpoint para cerrar la sesión actual.
    // Invalida el token JWT del usuario.
    // Retorna el mensaje de confirmación
    @PostMapping("/logout")
    public ResponseEntity<?> logout() {
        modeloDatos.getAuthService().logout();
        return ResponseEntity.ok("Sesion cerrada");
    }
}
