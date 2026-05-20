package com.sistema.dragonballportalbackend.dto;

public class DecisionRequest {
    private String observacionAdmin;

    public DecisionRequest() {}

    public DecisionRequest(String observacionAdmin) {
        this.observacionAdmin = observacionAdmin;
    }

    public String getObservacionAdmin() { return observacionAdmin; }
    public void setObservacionAdmin(String observacionAdmin) { this.observacionAdmin = observacionAdmin; }
}
