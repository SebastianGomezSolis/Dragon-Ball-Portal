// Componente simple que muestra un indicador de carga.
// Muestra un spinner animado junto con un texto que puede personalizarse.
import React from 'react';

// Props opcionales para personalizar el texto del indicador
interface CargandoProps {
    // Texto personalizado a mostrar junto al spinner (opcional, default: 'Cargando...')
    texto?: string;
}

// Componente funcional que renderiza un spinner de carga Bootstrap.
// Muestra un spinner amarillo animado y un texto descriptivo.
function Cargando(props: CargandoProps) {
    return (
        // Contenedor flex para alinear el spinner y el texto horizontalmente
        <div className="d-flex align-items-center gap-3 py-4">
            {/* Spinner de carga Bootstrap con color amarillo */}
            <div className="spinner-border text-warning" role="status"></div>
            {/* Texto que muestra el estado de carga (usa default si no se proporciona) */}
            <span>{props.texto ?? 'Cargando...'}</span>
        </div>
    );
}

// Exporta el componente para ser usado donde sea necesario
export default Cargando;
