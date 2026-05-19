import React from 'react';
import CatalogoPage from './CatalogoPage';
import { API_BASE } from '../services/authService';

interface Item {
    id: number;
    nombre: string;
    contenidoHtml?: string;
    [key: string]: unknown;
}

async function cargarSagas(nombre?: string): Promise<Item[]> {
    const url = `${API_BASE}/sagas${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`;
    const response = await fetch(url);
    if (response.ok) {
        return response.json();
    }
    throw new Error('Error al cargar sagas');
}

function SagasPage() {
    return (
        <CatalogoPage
            titulo="Sagas"
            placeholder="Buscar saga por nombre..."
            badge="Saga"
            textoVacio="No hay sagas publicadas todavía."
            cargarItems={cargarSagas}
        />
    );
}

export default SagasPage;
