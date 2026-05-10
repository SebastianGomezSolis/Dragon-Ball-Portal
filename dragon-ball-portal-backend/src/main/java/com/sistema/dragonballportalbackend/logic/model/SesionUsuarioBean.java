package com.sistema.dragonballportalbackend.logic.model;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

// Bean de sesión que mantiene el estado del usuario autenticado durante toda la sesión HTTP.
// Anotado con @SessionScope para que persista mientras dure la sesión del usuario.
// Almacena información del usuario actual para verificar autenticación y permisos en cualquier momento.
@Component
@SessionScope
public class SesionUsuarioBean {
    // Identificador único del usuario en la base de datos.
    private Integer id;
    // Nombre de usuario para mostrar en la interfaz.
    private String username;
    // Rol del usuario (ADMIN o USER) para controlar permisos.
    private Rol rol;
    // Indica si la cuenta del usuario está activa.
    private boolean activo;
    // Indica si la sesión actual ha sido verificada exitosamente.
    private boolean verificado;

    // Establece los datos de sesión cuando el usuario inicia sesión correctamente.
    // @param id Identificador del usuario.
    // @param username Nombre de usuario.
    // @param rol Rol del usuario (ADMIN o USER).
    // @param activo Estado de la cuenta del usuario.
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
    // @return true si hay un usuario logueado, false en caso contrario.
    public boolean isLogueado() {
        return id != null;
    }

    // Verifica si la sesión actual fue verificada exitosamente.
    // @return true si la sesión está verificada, false en caso contrario.
    public boolean isVerificado() {
        return verificado;
    }

    // Verifica si el usuario actual tiene rol de administrador.
    // @return true si el usuario es administrador, false en caso contrario.
    public boolean isAdmin() {
        return isLogueado() && rol == Rol.ADMIN;
    }

    // Verifica si el usuario actual tiene rol de usuario regular.
    // @return true si el usuario es usuario regular, false en caso contrario.
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
