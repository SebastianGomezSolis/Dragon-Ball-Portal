// Componente simple que muestra un indicador de carga.
// Versión alternativa de Cargando con nombres de props en inglés.
import React from 'react';

// Props opcionales para personalizar el mensaje de carga
interface Props {
  // Texto a mostrar junto al spinner (default: 'Cargando información...')
  text?: string;
}

// Componente funcional que renderiza un indicador de carga.
// Muestra un spinner amarillo animado y un texto descriptivo.
function LoadingBlock({ text = 'Cargando información...' }: Props) {
  return (
    // Contenedor flex para alinear spinner y texto horizontalmente
    <div className="d-flex align-items-center gap-3 py-4">
      {/* Spinner de carga Bootstrap con color amarillo */}
      <div className="spinner-border text-warning" role="status"></div>
      {/* Texto descriptivo del estado de carga */}
      <span>{text}</span>
    </div>
  );
}

// Exporta el componente para ser usado donde sea necesario
export default LoadingBlock;
