package com.sistema.dragonballportalbackend.dto;

public class SesionResponse {
    private Integer id;
    private String username;
    private String rol;

    public SesionResponse(Integer id, String username, String rol) {
        this.id = id;
        this.username = username;
        this.rol = rol;
    }

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}
