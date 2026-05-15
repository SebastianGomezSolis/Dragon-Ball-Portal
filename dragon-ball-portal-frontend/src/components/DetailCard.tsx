// Componente para mostrar el detalle completo de una entidad seleccionada.
// Renderiza título, imagen, badge de estado y contenido HTML en una tarjeta Bootstrap.
import React from 'react';

// Interface que define una estructura flexible de item (permite cualquier propiedad)
interface Item {
    // Permite acceder a cualquier campo de la entidad dinámicamente
    [key: string]: unknown;
}

// Props que acepta el componente DetailCard
interface Props {
    // Item seleccionado a mostrar (null cuando no hay selección activa)
    item: Item | null;
    // Campo del item que se usará como título principal (default: 'nombre')
    titleField?: string;
    // Texto opcional para mostrar como badge junto al título (ej: estado de contribución)
    badge?: string;
    // Texto a mostrar cuando no hay item seleccionado
    emptyText?: string;
}

// Componente funcional que renderiza una tarjeta con los detalles de la entidad.
// Incluye manejo de imágenes con fallback por nombre y limpieza de HTML.
function DetailCard({ item, titleField = 'nombre', badge, emptyText = 'Seleccioná un elemento para ver el detalle.' }: Props) {
    // Extrae el título del item usando el campo especificado, o cadena vacía si es null
    const titulo = item ? String(item[titleField] ?? '') : '';

    // Busca la URL de la imagen en varias propiedades posibles (diferentes命名 del backend)
    const imagenSrc = item
        ? String(item.imagenUrl ?? item.imagen_url ?? item.imageUrl ?? item.image_url ?? '')
        : '';

    // Normaliza el título para usarlo como clave en el mapa de imágenes fallback:
    // elimina acentos, pasa a minúsculas y reemplaza espacios con guiones
    const tituloNormalizado = titulo
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    // Mapa de imágenes fallback para personajes conocidos cuando no hay imagen en el item
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

    // Procesa el contenido HTML eliminando el primer encabezado del contenido
    // (suele repetir el título que ya se muestra en la tarjeta)
    const html = (() => {
        const crudo = item ? String(item.contenidoHtml ?? '<p>Sin contenido.</p>') : '<p>Sin contenido.</p>';
        return crudo.replace(/^\s*<h[1-6][^>]*>.*?<\/h[1-6]>\s*/i, '');
    })();

    return (
        // Tarjeta Bootstrap con sombra para el detalle
        <div className="card shadow-sm h-100">
            <div className="card-body">
                {/* Si no hay item seleccionado, muestra un texto informativo */}
                {!item ? (
                    <div className="text-secondary">{emptyText}</div>
                ) : (
                    <>
                        {/* Encabezado con título y badge opcional alineados horizontalmente */}
                        <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                            <h4 className="card-title mb-0">{titulo}</h4>
                            {/* Badge que muestra información adicional (ej: estado de contribución) */}
                            {badge && <span className="badge text-bg-warning">{badge}</span>}
                        </div>

                        {/* Imagen de la entidad con manejo de error en carga */}
                        {imagenFinal && (
                            <div className="detail-image-shell mb-4">
                                <div className="detail-image-frame">
                                    <img
                                        src={imagenFinal}
                                        alt={titulo}
                                        className="detail-main-image"
                                        // Si la imagen falla al cargar, oculta el contenedor completo
                                        onError={(e) => {
                                            const contenedor = (e.currentTarget as HTMLElement).closest('.detail-image-shell') as HTMLElement | null;
                                            if (contenedor) contenedor.style.display = 'none';
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Contenido HTML renderizado con dangerouslySetInnerHTML */}
                        <div className="detail-html" dangerouslySetInnerHTML={{ __html: html }} />
                    </>
                )}
            </div>
        </div>
    );
}

// Exporta el componente para ser usado en las páginas de detalle
export default DetailCard;
