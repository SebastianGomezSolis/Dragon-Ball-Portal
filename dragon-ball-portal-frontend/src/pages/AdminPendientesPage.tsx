import React, { useEffect, useState } from 'react';
import Cargando from '../components/Cargando';
import { API_BASE, getAuthHeaders } from '../services/authService';
import { formatFecha } from '../utils/formatters';

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

interface AdminPendientesPageProps {
    sesion: { id: number; username: string; rol: string; token: string } | null;
    onNavegar: (ruta: string) => void;
    onMensaje: (msg: { tipo: 'success' | 'danger'; texto: string }) => void;
}

function AdminPendientesPage(props: AdminPendientesPageProps) {
    const [items, setItems] = useState<Contribucion[]>([]);
    const [seleccionado, setSeleccionado] = useState<Contribucion | null>(null);
    const [observacion, setObservacion] = useState('');
    const [cargando, setCargando] = useState(true);
    const [procesando, setProcesando] = useState(false);

    async function fetchPendientes() {
        try {
            setCargando(true);
            const response = await fetch(`${API_BASE}/admin/pendientes`, { headers: getAuthHeaders() });
            if (response.ok) {
                const datos = await response.json();
                setItems(datos);
                setSeleccionado(datos[0] ?? null);
            } else {
                const error = await response.text();
                throw new Error(error || 'Error al cargar');
            }
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error al cargar' });
        } finally {
            setCargando(false);
        }
    }

    useEffect(() => {
        if (props.sesion?.rol === 'ADMIN') {
            fetchPendientes();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.sesion]);

    if (!props.sesion) {
        return (
            <section className="container py-5">
                <div className="alert alert-warning">Debés iniciar sesión.</div>
            </section>
        );
    }

    if (props.sesion.rol !== 'ADMIN') {
        return (
            <section className="container py-5">
                <div className="alert alert-danger">Solo los administradores pueden acceder a esta sección.</div>
                <button type="button" className="btn btn-outline-secondary mt-2"
                        onClick={() => props.onNavegar('/')}>
                    Volver al inicio
                </button>
            </section>
        );
    }

    async function procesar(accion: 'aprobar' | 'rechazar') {
        if (!seleccionado) return;
        setProcesando(true);
        try {
            const url = `${API_BASE}/admin/contribuciones/${seleccionado.id}/${accion === 'aprobar' ? 'aprobar' : 'rechazar'}`;
            const response = await fetch(url, {
                method: 'POST',
                headers: { ...getAuthHeaders('application/json') },
                body: JSON.stringify({ observacionAdmin: observacion }),
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || `Error al ${accion}`);
            }

            props.onMensaje({
                tipo: 'success',
                texto: accion === 'aprobar' ? 'Contribución aprobada correctamente.' : 'Contribución rechazada.',
            });
            setObservacion('');
            await fetchPendientes();
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error al procesar' });
        } finally {
            setProcesando(false);
        }
    }

    return (
        <section className="container py-5">
            <h2 className="fw-bold mb-1">Contribuciones pendientes</h2>
            <p className="text-secondary mb-4">
                Revisá y moderá los aportes de los usuarios antes de publicarlos.
            </p>

            {cargando ? (
                <Cargando />
            ) : (
                <div className="row g-4">
                    <div className="col-lg-5">
                        <div className="list-group shadow-sm">
                            {items.length === 0 && (
                                <div className="list-group-item text-secondary">
                                    No hay contribuciones pendientes por revisar.
                                </div>
                            )}
                            {items.map((item) => (
                                <button
                                    key={item.id}
                                    type="button"
                                    className={`list-group-item list-group-item-action ${seleccionado?.id === item.id ? 'active' : ''}`}
                                    onClick={() => { setSeleccionado(item); setObservacion(''); }}
                                >
                                    <div className="fw-semibold">{item.titulo}</div>
                                    <div className="small">{item.tipo} · {formatFecha(item.fechaCreacion)}</div>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="col-lg-7">
                        <div className="card shadow-sm border-0 h-100">
                            <div className="card-body">
                                {!seleccionado ? (
                                    <div className="text-secondary">
                                        Seleccioná una contribución para revisarla.
                                    </div>
                                ) : (
                                    <>
                                        <div className="d-flex flex-wrap justify-content-between gap-3 mb-3">
                                            <div>
                                                <h4 className="mb-1">{seleccionado.titulo}</h4>
                                                <div className="text-secondary small">
                                                    {seleccionado.tipo} · Usuario #{seleccionado.usuario?.id}
                                                </div>
                                            </div>
                                            <span className="badge text-bg-warning align-self-start">Pendiente</span>
                                        </div>

                                        <div className="detail-html border rounded p-3 bg-light mb-3"
                                             dangerouslySetInnerHTML={{ __html: seleccionado.contenidoHtml ?? '' }} />

                                        <div className="mb-3">
                                            <label className="form-label">Observación del administrador</label>
                                            <textarea
                                                className="form-control"
                                                rows={3}
                                                value={observacion}
                                                onChange={(e) => setObservacion(e.target.value)}
                                                placeholder="Opcional — se mostrará al usuario."
                                            />
                                        </div>

                                        <div className="d-flex gap-2">
                                            <button type="button"
                                                    className="btn btn-success"
                                                    disabled={procesando}
                                                    onClick={() => procesar('aprobar')}>
                                                Aprobar
                                            </button>
                                            <button type="button"
                                                    className="btn btn-danger"
                                                    disabled={procesando}
                                                    onClick={() => procesar('rechazar')}>
                                                Rechazar
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}

export default AdminPendientesPage;
