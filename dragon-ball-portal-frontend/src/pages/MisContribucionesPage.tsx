import React, { useEffect, useState } from 'react';
import Cargando from '../components/Cargando';
import { API_BASE, getAuthHeaders } from '../services/authService';
import { badgeEstado, formatEstado, formatFecha } from '../utils/formatters';

interface Contribucion {
    id: number;
    tipo: string;
    titulo: string;
    contenidoHtml: string;
    estado: string;
    observacionAdmin?: string;
    fechaCreacion: string;
    usuario?: { id: number; username?: string };
}

interface MisContribucionesPageProps {
    sesion: { id: number; username: string; rol: string; token: string } | null;
    onNavegar: (ruta: string) => void;
    onMensaje: (msg: { tipo: 'success' | 'danger'; texto: string }) => void;
}

function MisContribucionesPage(props: MisContribucionesPageProps) {
    const [items, setItems] = useState<Contribucion[]>([]);
    const [cargando, setCargando] = useState(true);

    useEffect(() => {
        if (!props.sesion) return;
        const cargar = async () => {
            try {
                const response = await fetch(`${API_BASE}/contribuciones/mias`, { headers: getAuthHeaders() });
                if (response.ok) {
                    setItems(await response.json());
                } else {
                    const error = await response.text();
                    throw new Error(error || 'Error al cargar');
                }
            } catch (e: unknown) {
                props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error al cargar' });
            } finally {
                setCargando(false);
            }
        };
        cargar();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sesion]);

    if (!props.sesion) {
        return (
            <section className="container py-5">
                <div className="alert alert-warning">
                    Debés iniciar sesión para ver tus contribuciones.
                </div>
                <button type="button" className="btn btn-warning mt-2"
                        onClick={() => props.onNavegar('/login')}>
                    Ir al login
                </button>
            </section>
        );
    }

    return (
        <section className="container py-5">
            <h2 className="fw-bold mb-1">Mis contribuciones</h2>
            <p className="text-secondary mb-4">
                Seguimiento de todos los aportes que enviaste al portal.
            </p>

            {cargando ? (
                <Cargando />
            ) : items.length === 0 ? (
                <div className="alert alert-secondary">
                    No has enviado contribuciones todavía.{' '}
                    <button type="button" className="btn btn-link p-0"
                            onClick={() => props.onNavegar('/contribuir')}>
                        Enviá tu primer aporte.
                    </button>
                </div>
            ) : (
                <div className="row g-3">
                    {items.map((item) => (
                        <div className="col-12" key={item.id}>
                            <div className="card shadow-sm border-0">
                                <div className="card-body">
                                    <div className="d-flex flex-wrap justify-content-between gap-3 mb-2">
                                        <div>
                                            <h5 className="mb-1">{item.titulo}</h5>
                                            <div className="text-secondary small">
                                                {item.tipo} · {formatFecha(item.fechaCreacion)}
                                            </div>
                                        </div>
                                        <span className={`badge text-bg-${badgeEstado(item.estado)} align-self-start`}>
                                            {formatEstado(item.estado)}
                                        </span>
                                    </div>
                                    <div className="small text-secondary mb-3">
                                        <strong>Observación del admin:</strong>{' '}
                                        {item.observacionAdmin ?? 'Sin observaciones.'}
                                    </div>
                                    <div className="detail-html border-top pt-3"
                                         dangerouslySetInnerHTML={{ __html: item.contenidoHtml ?? '' }} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

export default MisContribucionesPage;
