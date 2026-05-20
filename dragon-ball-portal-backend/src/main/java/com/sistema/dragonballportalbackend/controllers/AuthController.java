package com.sistema.dragonballportalbackend.controllers;

import com.sistema.dragonballportalbackend.dto.AuthRequest;
import com.sistema.dragonballportalbackend.dto.LoginResponse;
import com.sistema.dragonballportalbackend.dto.RegisterRequest;
import com.sistema.dragonballportalbackend.dto.SesionResponse;
import com.sistema.dragonballportalbackend.logic.ModeloDatos;
import com.sistema.dragonballportalbackend.logic.model.Usuario;
import com.sistema.dragonballportalbackend.security.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private ModeloDatos modeloDatos;

    @Autowired
    private JwtService jwtService;

    @PostMapping("/login")
    public LoginResponse login(@RequestBody AuthRequest request) {
        LoginResponse respuesta = modeloDatos.getAuthService().login(request);
        if (respuesta == null) {
            throw new RuntimeException("Credenciales inválidas");
        }
        return respuesta;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        Usuario usuario = new Usuario();
        usuario.setUsername(request.getUsername());
        usuario.setPassword(request.getPassword());
        String error = modeloDatos.getUsuarioService().registrar(usuario);
        if (error != null) {
            return ResponseEntity.badRequest().body(error);
        }
        return ResponseEntity.ok("Usuario registrado correctamente");
    }

    @PostMapping("/logout")
    public void logout() {
    }

    @GetMapping("/sesion")
    public SesionResponse sesion(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("No hay sesión activa");
        }
        String token = authHeader.substring(7);
        return new SesionResponse(
                jwtService.obtenerUserId(token),
                jwtService.obtenerUsername(token),
                jwtService.obtenerRol(token).name()
        );
    }

    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public Map<String, String> handleRuntimeException(RuntimeException ex) {
        return Map.of("error", ex.getMessage());
    }
}
