package com.sistema.dragonballportalbackend.dto;

public class LoginResponse {
    private Integer id;
    private String username;
    private String rol;
    private String token;

    public LoginResponse(Integer id, String username, String rol, String token) {
        this.id = id;
        this.username = username;
        this.rol = rol;
        this.token = token;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
    public String getToken() { return token; }
    public void setToken(String token) { this.token = token; }
}
