package com.sistema.dragonballportalbackend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class LoginResponse {
    private Integer id;
    private String username;
    private String rol;
    private String token;
}
