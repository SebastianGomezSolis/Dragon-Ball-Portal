package com.sistema.dragonballportalbackend.logic.model;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.RequestScope;

// Bean de request que mantiene el estado del usuario autenticado durante una petición HTTP.
// Anotado con @RequestScope porque la API usa STATELESS sessions (JWT), no sesiones HTTP.
// El filtro JWT limpia y repuebla este bean en cada request.
@Component
@RequestScope
public class SesionUsuarioBean {
    private Integer id;
    private String username;
    private Rol rol;
    private boolean activo;
    private boolean verificado;

    // Establece los datos de sesión cuando el usuario inicia sesión correctamente.
    public void login(Integer id, String username, Rol rol, boolean activo) {
        this.id = id;
        this.username = username;
        this.rol = rol;
        this.activo = activo;
        this.verificado = true;
    }

    // Limpia todos los datos de sesión cuando el usuario cierra sesión.
    // Restablece todos los campos a sus valores por defecto.
    public void logout() {
        id = null;
        username = null;
        rol = null;
        activo = false;
        verificado = false;
    }

    // Verifica si existe una sesión activa con usuario autenticado.
    public boolean isLogueado() {
        return id != null;
    }

    // Verifica si la sesión actual fue verificada exitosamente.
    public boolean isVerificado() {
        return verificado;
    }

    // Verifica si el usuario actual tiene rol de administrador.
    public boolean isAdmin() {
        return isLogueado() && rol == Rol.ADMIN;
    }

    // Verifica si el usuario actual tiene rol de usuario regular.
    public boolean isUser() {
        return isLogueado() && rol == Rol.USER;
    }

    // Getters para acceder a los datos de la sesión.
    // Permiten leer la información del usuario actual desde otros componentes.
    public Integer getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public Rol getRol() {
        return rol;
    }

    public boolean isActivo() {
        return activo;
    }
}
