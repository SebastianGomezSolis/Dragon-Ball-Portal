import React, { useEffect, useRef, useState } from 'react';
import { obtenerToken } from '../services/authService';

const BASE = 'http://localhost:8080/api';

declare global {
    interface Window { Quill: any; }
}

interface ContribuirPageProps {
    sesion: { id: number; username: string; rol: string; token: string } | null;
    onNavegar: (ruta: string) => void;
    onMensaje: (msg: { tipo: 'success' | 'danger'; texto: string }) => void;
}

function ContribuirPage(props: ContribuirPageProps) {
    const [tipo, setTipo] = useState('PERSONAJE');
    const [titulo, setTitulo] = useState('');
    const [contenidoHtml, setContenidoHtml] = useState('');
    const [cargando, setCargando] = useState(false);
    const [quillListo, setQuillListo] = useState(false);

    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);

    useEffect(() => {
        const check = setInterval(() => {
            if (typeof window.Quill !== 'undefined') {
                setQuillListo(true);
                clearInterval(check);
            }
        }, 100);
        return () => clearInterval(check);
    }, []);

    useEffect(() => {
        if (!quillListo || !editorRef.current || quillRef.current) return;

        const quill = new window.Quill(editorRef.current, {
            theme: 'snow',
            placeholder: 'Describí el personaje, saga o raza...',
            modules: {
                toolbar: [
                    [{ header: [2, 3, false] }],
                    ['bold', 'italic', 'underline'],
                    [{ list: 'ordered' }, { list: 'bullet' }],
                    ['blockquote', 'clean'],
                ],
            },
        });

        const qlEditor = editorRef.current.querySelector('.ql-editor') as HTMLElement | null;
        if (qlEditor) {
            qlEditor.style.minHeight = '200px';
        }

        quill.on('text-change', () => {
            setContenidoHtml(quill.root.innerHTML);
        });

        quillRef.current = quill;
    }, [quillListo]);

    if (!props.sesion) {
        return (
            <section className="container py-5">
                <div className="alert alert-warning">
                    Debés iniciar sesión para enviar contribuciones.
                </div>
                <button type="button" className="btn btn-warning mt-2"
                        onClick={() => props.onNavegar('/login')}>
                    Ir al login
                </button>
            </section>
        );
    }

    const esVacio = (html: string) =>
        html.replace(/<[^>]*>/g, '').replace(/\s/g, '').length === 0;

    async function handleEnviar(e: React.FormEvent) {
        e.preventDefault();
        if (!titulo.trim()) {
            props.onMensaje({ tipo: 'danger', texto: 'El título es requerido.' });
            return;
        }
        if (esVacio(contenidoHtml)) {
            props.onMensaje({ tipo: 'danger', texto: 'El contenido no puede estar vacío.' });
            return;
        }
        setCargando(true);
        try {
            const token = obtenerToken();
            const headers: Record<string, string> = { 'Content-Type': 'application/json' };
            if (token) headers['Authorization'] = `Bearer ${token}`;

            const response = await fetch(`${BASE}/contribuciones`, {
                method: 'POST',
                headers,
                body: JSON.stringify({ tipo, titulo, contenidoHtml }),
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Error al enviar contribución');
            }
            props.onMensaje({ tipo: 'success', texto: 'Contribución enviada para revisión.' });
            props.onNavegar('/mis-contribuciones');
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error desconocido' });
        } finally {
            setCargando(false);
        }
    }

    return (
        <section className="container py-5">
            <div className="row g-4 align-items-start">
                <div className="col-xl-7">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-lg-5">
                            <h2 className="fw-bold mb-1">Enviar contribución</h2>
                            <p className="text-secondary mb-4">
                                Completá el formulario. El administrador revisará el contenido antes de publicarlo.
                            </p>

                            <form onSubmit={handleEnviar}>
                                <div className="mb-3">
                                    <label className="form-label">Tipo</label>
                                    <select className="form-select"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}>
                                        <option value="PERSONAJE">Personaje</option>
                                        <option value="SAGA">Saga</option>
                                        <option value="RAZA">Raza</option>
                                    </select>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Título</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={titulo}
                                        onChange={(e) => setTitulo(e.target.value)}
                                        placeholder="Ej: Broly, Saga del Torneo del Poder..."
                                        required
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contenido</label>
                                    {quillListo ? (
                                        <div ref={editorRef}
                                             style={{ border: '1px solid #dee2e6', borderRadius: 6, background: '#fff' }} />
                                    ) : (
                                        <div className="border rounded p-3 text-secondary">
                                            Cargando editor...
                                        </div>
                                    )}
                                </div>

                                <button type="submit"
                                        className="btn btn-warning fw-semibold w-100"
                                        disabled={cargando}>
                                    {cargando ? 'Enviando...' : 'Guardar contribución'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                <div className="col-xl-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h5 className="fw-bold mb-3">Recomendaciones</h5>
                            <ul className="text-secondary mb-0">
                                <li className="mb-2">Usá un título claro y específico.</li>
                                <li className="mb-2">Podés usar <strong>negrita</strong>, <em>cursiva</em> y listas.</li>
                                <li className="mb-2">Describí el contenido con el mayor detalle posible.</li>
                                <li className="mb-2">El administrador revisará tu aporte antes de publicarlo.</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ContribuirPage;
