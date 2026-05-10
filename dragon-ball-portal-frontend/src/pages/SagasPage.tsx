// Página específica para listar y buscar sagas.
// Reutiliza el componente genérico CatalogoPage configurado para sagas.
import React from 'react';
import CatalogoPage from './CatalogoPage';
import { api } from '../services/api';

// Componente funcional que renderiza la página de sagas.
// Simplemente configura y renderiza el catálogo genérico con parámetros específicos.
function SagasPage() {
    return (
        // Componente genérico de catálogo configurado para sagas
        <CatalogoPage
            // Título de la página
            titulo="Sagas"
            // Placeholder del campo de búsqueda
            placeholder="Buscar saga por nombre..."
            // Texto del badge que aparece junto al título en los detalles
            badge="Saga"
            // Mensaje cuando no hay sagas publicadas
            textoVacio="No hay sagas publicadas todavía."
            // Función de la API para cargar la lista de sagas
            cargarItems={api.getSagas}
        />
    );
}

// Exporta el componente para ser usado en App.tsx
export default SagasPage;
