// Componente para mostrar el detalle de una entidad específica.
// Versión alternativa de DetailCard con estructura más simple y fija.
import React from 'react';

interface Item {
    id: number;
    nombre: string;
    contenidoHtml?: string;
    [key: string]: unknown;
}

interface DetalleEntidadProps {
    item: Item | null;
    badge?: string;
}

function DetalleEntidad(props: DetalleEntidadProps) {
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

    const html = (item.contenidoHtml ?? '<p>Sin contenido.</p>')
        .replace(/^\s*<h[1-6][^>]*>.*?<\/h[1-6]>\s*/i, '');

    return (
        <div className="card shadow-sm h-100">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                    <h4 className="card-title mb-0">{item.nombre}</h4>
                    {props.badge && (
                        <span className="badge text-bg-warning">{props.badge}</span>
                    )}
                </div>

                <div className="detail-html"
                     dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}

// Exporta el componente para ser usado donde sea necesario
export default DetalleEntidad;
