package com.sistema.dragonballportalbackend.dto;

public class ContribucionRequest {
    private String tipo;
    private String titulo;
    private String contenidoHtml;

    public ContribucionRequest() {}

    public ContribucionRequest(String tipo, String titulo, String contenidoHtml) {
        this.tipo = tipo;
        this.titulo = titulo;
        this.contenidoHtml = contenidoHtml;
    }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public String getTitulo() { return titulo; }
    public void setTitulo(String titulo) { this.titulo = titulo; }
    public String getContenidoHtml() { return contenidoHtml; }
    public void setContenidoHtml(String contenidoHtml) { this.contenidoHtml = contenidoHtml; }
}
