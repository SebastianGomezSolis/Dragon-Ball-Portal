package com.sistema.dragonballportalbackend.logic.servicios;

import com.sistema.dragonballportalbackend.data.SagaRepository;
import com.sistema.dragonballportalbackend.logic.model.Saga;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SagaService {
    @Autowired
    private SagaRepository sagaRepository;

    public List<Saga> findAll() {
        List<Saga> lista = new ArrayList<>();
        sagaRepository.findAll().forEach(lista::add);
        return lista;
    }

    public List<Saga> findAllPublicadas() {
        return sagaRepository.findByPublicadoTrueOrderByNombreAsc();
    }

    public Saga findById(Integer id) {
        return sagaRepository.findById(id).orElse(null);
    }

    public List<Saga> buscarPorNombre(String nombre) {
        if (nombre == null || nombre.isBlank()) {
            return findAllPublicadas();
        }
        return sagaRepository.findByNombreContainingIgnoreCaseAndPublicadoTrueOrderByNombreAsc(nombre);
    }

    public String guardar(Saga saga) {
        if (saga == null) {
            return "La saga es nula";
        }

        if (saga.getNombre() == null || saga.getNombre().isBlank()) {
            return "El nombre es requerido";
        }

        if (saga.getPublicado() == null) {
            saga.setPublicado(false);
        }
        sagaRepository.save(saga);
        return null;
    }
}
