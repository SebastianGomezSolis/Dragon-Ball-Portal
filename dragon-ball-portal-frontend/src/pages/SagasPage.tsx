import React from 'react';
import CatalogoPage from './CatalogoPage';

interface Item {
    id: number;
    nombre: string;
    contenidoHtml?: string;
    [key: string]: unknown;
}

async function cargarSagas(nombre?: string): Promise<Item[]> {
    const url = `http://localhost:8080/api/sagas${nombre ? `?nombre=${encodeURIComponent(nombre)}` : ''}`;
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
