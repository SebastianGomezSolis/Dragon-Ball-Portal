// Componente para mostrar el detalle de una entidad específica.
// Versión alternativa de DetailCard con estructura más simple y fija.
import React from 'react';

// Define la estructura de un item con campos específicos
interface Item {
    // Identificador único del item
    id: number;
    // Nombre del item (se muestra como título)
    nombre: string;
    // Contenido HTML con la descripción del item (opcional)
    contenidoHtml?: string;
    // URL de la imagen del item (opcional)
    imagenUrl?: string;
    // Permite propiedades adicionales para flexibilidad
    [key: string]: unknown;
}

// Props que acepta el componente DetalleEntidad
interface DetalleEntidadProps {
    // Item a mostrar (null si no hay selección)
    item: Item | null;
    // Texto opcional de badge/etiqueta junto al título
    badge?: string;
}

// Componente funcional que renderiza una tarjeta con los detalles del item.
// Maneja fallback de imágenes para personajes conocidos.
function DetalleEntidad(props: DetalleEntidadProps) {
    // Si no hay item seleccionado, muestra mensaje de selección
    if (!props.item) {
        return (
            <div className="card shadow-sm h-100">
                <div className="card-body text-secondary">
                    Seleccioná un elemento de la lista para ver el detalle.
                </div>
            </div>
        );
    }

    const item = props.item;
    
    // Procesa el contenido HTML eliminando el título del inicio
    const html = (item.contenidoHtml ?? '<p>Sin contenido.</p>')
        .replace(/^\s*<h[1-6][^>]*>.*?<\/h[1-6]>\s*/i, '');

    // Normaliza el nombre del item para buscar imagen fallback
    const nombreNorm = item.nombre
        .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Mapa de imágenes fallback para personajes conocidos
    const fallbacks: Record<string, string> = {
        'goku':    '/images/personajes/goku.jpg',
        'vegeta':  '/images/personajes/vegeta.jpg',
        'gohan':   '/images/personajes/gohan.jpg',
        'piccolo': '/images/personajes/piccolo.jpg',
        'freezer': '/images/personajes/freezer.jpg',
        'frieza':  '/images/personajes/freezer.jpg',
    };

    // Usa imagenUrl del item o fallback según nombre normalizado
    const imagenSrc = item.imagenUrl || fallbacks[nombreNorm] || '';

    return (
        // Tarjeta Bootstrap con sombra
        <div className="card shadow-sm h-100">
            <div className="card-body">
                {/* Encabezado con título y badge opcional */}
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                    <h4 className="card-title mb-0">{item.nombre}</h4>
                    {/* Muestra badge si se proporciona */}
                    {props.badge && (
                        <span className="badge text-bg-warning">{props.badge}</span>
                    )}
                </div>

                {/* Muestra imagen si está disponible */}
                {imagenSrc && (
                    <div className="detail-image-shell mb-4">
                        <div className="detail-image-frame">
                            <img
                                src={imagenSrc}
                                alt={item.nombre}
                                className="detail-main-image"
                                // Oculta el contenedor si la imagen falla al cargar
                                onError={(e) => {
                                    const shell = (e.currentTarget as HTMLElement)
                                        .closest('.detail-image-shell') as HTMLElement | null;
                                    if (shell) shell.style.display = 'none';
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* Contenido HTML renderizado de forma segura */}
                <div className="detail-html"
                     dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}

// Exporta el componente para ser usado donde sea necesario
export default DetalleEntidad;
