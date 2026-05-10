// Página para comparar dos entidades (personajes, sagas o razas) lado a lado.
// Permite seleccionar el tipo de entidad y elegir dos elementos para ver sus detalles en paralelo.
import React, { useEffect, useState } from 'react';
import Cargando from '../components/Cargando';
import { api } from '../services/api';

// Define la estructura base de un item para comparar
interface Item {
    // Identificador único del item
    id: number;
    // Nombre del item
    nombre: string;
    // Contenido HTML con la descripción del item (opcional)
    contenidoHtml?: string;
    // Permite propiedades adicionales para flexibilidad
    [key: string]: unknown;
}

// Tipo que representa los tipos de catálogo disponibles para comparar
type TipoCatalogo = 'personajes' | 'sagas' | 'razas';

// Array de opciones de tipos de catálogo con su label y valor
const TIPOS: { label: string; valor: TipoCatalogo }[] = [
    { label: 'Personajes', valor: 'personajes' },
    { label: 'Sagas',      valor: 'sagas' },
    { label: 'Razas',      valor: 'razas' },
];

// Función que carga items según el tipo de catálogo seleccionado
function cargarPorTipo(tipo: TipoCatalogo): Promise<Item[]> {
    if (tipo === 'personajes') return api.getPersonajes() as unknown as Promise<Item[]>;
    if (tipo === 'sagas')      return api.getSagas() as unknown as Promise<Item[]>;
    return api.getRazas() as unknown as Promise<Item[]>;
}

// Props para el componente PanelDetalle
interface PanelDetalleProps {
    // Item seleccionado a mostrar (null si no hay selección)
    item: Item | null;
    // Nombre del lado (para el encabezado de la card)
    lado: string;
}

// Componente auxiliar que renderiza el panel de detalle de un item.
// Muestra el nombre y contenido HTML formateado del item seleccionado.
function PanelDetalle(props: PanelDetalleProps) {
    // Mensaje cuando no hay item seleccionado
    if (!props.item) {
        return (
            <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-dark text-white fw-semibold">{props.lado}</div>
                <div className="card-body text-secondary">Seleccioná un elemento.</div>
            </div>
        );
    }
    // Procesa el contenido HTML eliminando el primer encabezado (evita duplicación)
    const html = (props.item.contenidoHtml ?? '')
        .replace(/^\s*<h[1-6][^>]*>.*?<\/h[1-6]>\s*/i, '');
    return (
        <div className="card shadow-sm border-0 h-100">
            <div className="card-header bg-dark text-white fw-semibold">{props.lado}</div>
            <div className="card-body">
                <h5 className="fw-bold mb-3">{props.item.nombre}</h5>
                <div className="detail-html" style={{ fontSize: '0.9rem' }}
                     dangerouslySetInnerHTML={{ __html: html }} />
            </div>
        </div>
    );
}

// Componente principal que renderiza la página de comparación
function CompararPage() {
    // Estados para gestionar el tipo de catálogo, items cargados, errores y selecciones
    const [tipo, setTipo] = useState<TipoCatalogo>('personajes');
    const [items, setItems] = useState<Item[]>([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    // Estados para los items seleccionados (izquierda y derecha)
    const [izq, setIzq] = useState<Item | null>(null);
    const [der, setDer] = useState<Item | null>(null);

    // Función asíncrona que carga los items según el tipo de catálogo
    const cargar = async (t: TipoCatalogo) => {
        try {
            setCargando(true);
            setError('');
            // Limpia las selecciones al cambiar de tipo
            setIzq(null);
            setDer(null);
            const datos = await cargarPorTipo(t);
            setItems(datos);
        } catch (e: unknown) {
            setError(e instanceof Error ? e.message : 'Error desconocido');
        } finally {
            setCargando(false);
        }
    };

    // Efecto que recarga los items cuando cambia el tipo de catálogo
    useEffect(() => { cargar(tipo); }, [tipo]);

    return (
        // Contenedor principal de la sección
        <section className="container py-5">
            {/* Encabezado de la página */}
            <h2 className="fw-bold mb-1">Comparar</h2>
            <p className="text-secondary mb-4">
                Elegí el tipo, seleccioná un elemento en cada columna y comparalos lado a lado.
            </p>

            {/* Botones para cambiar el tipo de catálogo */}
            <div className="d-flex gap-2 mb-4">
                {TIPOS.map((t) => (
                    <button
                        key={t.valor}
                        type="button"
                        className={`btn btn-sm ${tipo === t.valor ? 'btn-dark' : 'btn-outline-dark'}`}
                        onClick={() => setTipo(t.valor)}>
                        {t.label}
                    </button>
                ))}
                {/* Botón para limpiar selecciones (solo visible si hay alguna selección) */}
                {(izq || der) && (
                    <button type="button"
                            className="btn btn-sm btn-outline-secondary ms-auto"
                            onClick={() => { setIzq(null); setDer(null); }}>
                        Limpiar selección
                    </button>
                )}
            </div>

            {/* Renderiza según el estado: carga, error, o contenido */}
            {cargando ? (
                <Cargando />
            ) : error ? (
                <div className="alert alert-danger">{error}</div>
            ) : (
                <>
                    {/* Sección de selección de items (listas izquierda y derecha) */}
                    <div className="row g-3 mb-4">
                        <div className="col-md-6">
                            {/* Card de selección izquierda */}
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-dark text-white fw-semibold">Izquierda</div>
                                <div className="card-body p-0" style={{ maxHeight: 300, overflowY: 'auto' }}>
                                    <ul className="list-group list-group-flush">
                                        {items.length === 0 && (
                                            <li className="list-group-item text-secondary">Sin resultados.</li>
                                        )}
                                        {items.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className={`list-group-item list-group-item-action ${izq?.id === item.id ? 'active' : ''}`}
                                                onClick={() => { if (der?.id === item.id) setDer(null); setIzq(item); }}>
                                                {item.nombre}
                                            </button>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            {/* Card de selección derecha */}
                            <div className="card shadow-sm border-0">
                                <div className="card-header bg-dark text-white fw-semibold">Derecha</div>
                                <div className="card-body p-0" style={{ maxHeight: 300, overflowY: 'auto' }}>
                                    <ul className="list-group list-group-flush">
                                        {items.length === 0 && (
                                            <li className="list-group-item text-secondary">Sin resultados.</li>
                                        )}
                                        {items.map((item) => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className={`list-group-item list-group-item-action ${der?.id === item.id ? 'active' : ''}`}
                                                onClick={() => { if (izq?.id === item.id) setIzq(null); setDer(item); }}>
                                                {item.nombre}
                                            </button>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sección de detalles comparativos (solo visible si hay alguna selección) */}
                    {(izq || der) && (
                        <div className="row g-3">
                            <div className="col-md-6">
                                <PanelDetalle item={izq} lado={izq?.nombre ?? 'Sin selección'} />
                            </div>
                            <div className="col-md-6">
                                <PanelDetalle item={der} lado={der?.nombre ?? 'Sin selección'} />
                            </div>
                        </div>
                    )}
                </>
            )}
        </section>
    );
}

// Exporta el componente para ser usado en App.tsx
export default CompararPage;
