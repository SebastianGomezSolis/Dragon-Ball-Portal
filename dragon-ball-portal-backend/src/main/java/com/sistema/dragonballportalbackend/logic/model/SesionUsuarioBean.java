package com.sistema.dragonballportalbackend.logic.model;

import org.springframework.stereotype.Component;
import org.springframework.web.context.annotation.SessionScope;

@Component
@SessionScope
public class SesionUsuarioBean {
    private Integer id;
    private String username;
    private Rol rol;
    private boolean activo;
    private boolean verificado;

    public void login(Integer id, String username, Rol rol, boolean activo) {
        this.id = id;
        this.username = username;
        this.rol = rol;
        this.activo = activo;
        this.verificado = true;
    }

    public void logout() {
        id = null;
        username = null;
        rol = null;
        activo = false;
        verificado = false;
    }

    public boolean isLogueado() {
        return id != null;
    }

    public boolean isVerificado() {
        return verificado;
    }

    public boolean isAdmin() {
        return isLogueado() && rol == Rol.ADMIN;
    }

    public boolean isUser() {
        return isLogueado() && rol == Rol.USER;
    }

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
