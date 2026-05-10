// Componente para mostrar un título de sección con formato estructurado.
// Incluye texto eyebrow opcional, título principal y descripción.
import React from 'react';

// Props para configurar el componente SectionTitle
interface Props {
  // Texto pequeño superior en mayúsculas y color amarillo (categoría)
  eyebrow?: string;
  // Título principal de la sección
  title: string;
  // Descripción opcional debajo del título
  description?: string;
}

// Componente funcional que renderiza un título de sección con estructura jerárquica.
// Útil para encabezar secciones de contenido en las páginas.
function SectionTitle({ eyebrow, title, description }: Props) {
  return (
    // Contenedor con margen inferior para separar de contenido siguiente
    <div className="mb-4">
      {/* Texto eyebrow: categoría, color amarillo, uppercase, pequeño */}
      {eyebrow && <div className="text-warning fw-semibold text-uppercase small mb-2">{eyebrow}</div>}
      {/* Título principal en negrita */}
      <h2 className="fw-bold mb-2">{title}</h2>
      {/* Descripción opcional en gris, sin margen inferior */}
      {description && <p className="text-secondary mb-0">{description}</p>}
    </div>
  );
}

// Exporta el componente para ser usado donde sea necesario
export default SectionTitle;
