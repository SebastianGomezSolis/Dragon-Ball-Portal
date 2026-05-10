// Componente para mostrar el detalle de una entidad seleccionada.
// Renderiza título, imagen y contenido HTML en una tarjeta Bootstrap.
import React from 'react';

// Define la estructura flexible de un item (cualquier propiedad permitida)
interface Item {
  // Permite cualquier propiedad con valor desconocido para flexibilidad
  [key: string]: unknown;
}

// Props para configurar el componente DetailCard
interface Props {
  // Item seleccionado a mostrar (null si no hay selección)
  item: Item | null;
  // Campo del item que se usará como título (default: 'nombre')
  titleField?: string;
  // Texto opcional de una etiqueta/badge junto al título
  badge?: string;
  // Texto a mostrar cuando no hay item seleccionado (default predefinido)
  emptyText?: string;
}

// Componente funcional que renderiza una tarjeta con detalles de la entidad.
// Maneja fallback de imágenes basadas en el nombre normalizado del item.
function DetailCard({ item, titleField = 'nombre', badge, emptyText = 'Seleccioná un elemento para ver el detalle.' }: Props) {
  // Extrae el título del item usando el campo especificado
  const titulo = item ? String(item[titleField] ?? '') : '';
  
  // Busca la URL de imagen en diferentes propiedades posibles del item
  const imagenSrc = item
    ? String(item.imagenUrl ?? item.imagen_url ?? item.imageUrl ?? item.image_url ?? '')
    : '';

  // Normaliza el título para usarlo como clave en el fallback de imágenes
  // Convierte a minúsculas, elimina acentos y espacios, reemplaza con guiones
  const tituloNormalizado = titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  // Mapa de imágenes fallback para personajes conocidos
  const fallbackPorNombre: Record<string, string> = {
    'goku':    '/images/personajes/goku.jpg',
    'vegeta':  '/images/personajes/vegeta.jpg',
    'gohan':   '/images/personajes/gohan.jpg',
    'piccolo': '/images/personajes/piccolo.jpg',
    'freezer': '/images/personajes/freezer.jpg',
    'frieza':  '/images/personajes/freezer.jpg',
  };

  // Usa la imagen del item o el fallback según el nombre normalizado
  const imagenFinal = imagenSrc || fallbackPorNombre[tituloNormalizado] || '';

  // Procesa el contenido HTML eliminando el título del principio (evita duplicación)
  const html = (() => {
    const crudo = item ? String(item.contenidoHtml ?? '<p>Sin contenido.</p>') : '<p>Sin contenido.</p>';
    // Elimina el primer encabezado h1-h6 que suele ser el título del contenido
    return crudo.replace(/^\s*<h[1-6][^>]*>.*?<\/h[1-6]>\s*/i, '');
  })();

  return (
    // Tarjeta Bootstrap con sombra
    <div className="card shadow-sm h-100">
      <div className="card-body">
        {/* Si no hay item seleccionado, muestra el texto vacío */}
        {!item ? (
          <div className="text-secondary">{emptyText}</div>
        ) : (
          <>
            {/* Encabezado: título y badge opcional */}
            <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
              <h4 className="card-title mb-0">{titulo}</h4>
              {/* Muestra badge si se proporciona (ej: estado de contribución) */}
              {badge && <span className="badge text-bg-warning">{badge}</span>}
            </div>

            {/* Sección de imagen con manejo de errores */}
            {imagenFinal && (
              <div className="detail-image-shell mb-4">
                <div className="detail-image-frame">
                  <img
                    src={imagenFinal}
                    alt={titulo}
                    className="detail-main-image"
                    // Oculta el contenedor de imagen si falla la carga
                    onError={(e) => {
                      const contenedor = (e.currentTarget as HTMLElement).closest('.detail-image-shell') as HTMLElement | null;
                      if (contenedor) contenedor.style.display = 'none';
                    }}
                  />
                </div>
              </div>
            )}

            {/* Contenido HTML renderizado de forma segura */}
            <div className="detail-html" dangerouslySetInnerHTML={{ __html: html }} />
          </>
        )}
      </div>
    </div>
  );
}

// Exporta el componente para ser usado donde sea necesario
export default DetailCard;
