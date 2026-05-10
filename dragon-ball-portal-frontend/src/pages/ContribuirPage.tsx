// Página para que los usuarios autenticados envíen nuevas contribuciones.
// Permite crear personajes, sagas o razas que serán revisadas por un administrador.
import React, { useEffect, useRef, useState } from 'react';
import { api } from '../services/api';
import { MensajeGlobal, SesionUsuario } from '../types';

// Quill es cargado vía CDN en public/index.html, se declara el tipo globalmente
declare global {
    interface Window { Quill: any; }
}

// Props que acepta el componente ContribuirPage
interface ContribuirPageProps {
    // Datos de sesión del usuario actual (null si no está logueado)
    sesion: SesionUsuario | null;
    // Función para navegar a otras rutas
    onNavegar: (ruta: string) => void;
    // Función para mostrar mensajes globales al usuario
    onMensaje: (msg: MensajeGlobal) => void;
}

// Componente funcional que renderiza el formulario de contribución.
// Incluye editor de texto enriquecido (Quill) y validación de campos.
function ContribuirPage(props: ContribuirPageProps) {
    // Estados para los campos del formulario
    const [tipo, setTipo] = useState('PERSONAJE');
    const [titulo, setTitulo] = useState('');
    const [contenidoHtml, setContenidoHtml] = useState('');
    // Estado para controlar el indicador de carga durante el envío
    const [cargando, setCargando] = useState(false);
    // Estado para verificar si Quill (editor) está listo
    const [quillListo, setQuillListo] = useState(false);

    // Refs para acceder al elemento DOM del editor y a la instancia de Quill
    const editorRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);

    // Efecto que espera a que Quill esté disponible en window (cargado desde CDN)
    useEffect(() => {
        // Polling cada 100ms para verificar si Quill está disponible
        const check = setInterval(() => {
            if (typeof window.Quill !== 'undefined') {
                setQuillListo(true);
                clearInterval(check);
            }
        }, 100);
        return () => clearInterval(check);
    }, []);

    // Efecto que inicializa Quill cuando el div del editor ya está en el DOM
    useEffect(() => {
        // Sale early si Quill no está listo, el div no existe, o Quill ya está inicializado
        if (!quillListo || !editorRef.current || quillRef.current) return;

        // Crea una nueva instancia de Quill con configuración
        const quill = new window.Quill(editorRef.current, {
            theme: 'snow', // Tema visual de Quill
            placeholder: 'Describí el personaje, saga o raza...',
            modules: {
                toolbar: [
                    // Configuración de la barra de herramientas del editor
                    [{ header: [2, 3, false] }], // Encabezados H2, H3
                    ['bold', 'italic', 'underline'], // Formato de texto
                    [{ list: 'ordered' }, { list: 'bullet' }], // Listas
                    ['blockquote', 'clean'], // Bloque de cita y limpiar formato
                ],
            },
        });

        // Ajusta la altura mínima del área de edición
        const qlEditor = editorRef.current.querySelector('.ql-editor') as HTMLElement | null;
        if (qlEditor) {
            qlEditor.style.minHeight = '200px';
        }

        // Listener para capturar cambios en el contenido del editor
        quill.on('text-change', () => {
            setContenidoHtml(quill.root.innerHTML);
        });

        quillRef.current = quill;
    }, [quillListo]);

    // Si el usuario no está logueado, muestra mensaje y botón para ir al login
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

    // Función auxiliar para verificar si el HTML está vacío (sin texto visible)
    const esVacio = (html: string) =>
        html.replace(/<[^>]*>/g, '').replace(/\s/g, '').length === 0;

    // Función asíncrona para manejar el envío del formulario
    async function handleEnviar(e: React.FormEvent) {
        e.preventDefault();
        // Validaciones de campos requeridos
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
            // Envía la contribución a la API
            await api.crearContribucion({ tipo, titulo, contenidoHtml });
            props.onMensaje({ tipo: 'success', texto: 'Contribución enviada para revisión.' });
            // Navega a la página de mis contribuciones
            props.onNavegar('/mis-contribuciones');
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error desconocido' });
        } finally {
            setCargando(false);
        }
    }

    return (
        // Contenedor principal de la sección
        <section className="container py-5">
            {/* Layout de dos columnas: formulario (7) y recomendaciones (5) */}
            <div className="row g-4 align-items-start">
                <div className="col-xl-7">
                    {/* Card con el formulario de envío */}
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4 p-lg-5">
                            <h2 className="fw-bold mb-1">Enviar contribución</h2>
                            <p className="text-secondary mb-4">
                                Completá el formulario. El administrador revisará el contenido antes de publicarlo.
                            </p>

                            {/* Formulario con campos de tipo, título y contenido */}
                            <form className="row g-3" onSubmit={handleEnviar}>
                                {/* Selector de tipo de contribución */}
                                <div className="col-md-4">
                                    <label className="form-label">Tipo</label>
                                    <select className="form-select"
                                            value={tipo}
                                            onChange={(e) => setTipo(e.target.value)}>
                                        <option value="PERSONAJE">Personaje</option>
                                        <option value="SAGA">Saga</option>
                                        <option value="RAZA">Raza</option>
                                    </select>
                                </div>

                                {/* Campo de título */}
                                <div className="col-md-8">
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

                                {/* Campo del editor de contenido enriquecido */}
                                <div className="col-12">
                                    <label className="form-label">Contenido</label>
                                    {/* Muestra el editor Quill si está listo, o mensaje de carga */}
                                    {quillListo ? (
                                        <div ref={editorRef}
                                             style={{ border: '1px solid #dee2e6', borderRadius: 6, background: '#fff' }} />
                                    ) : (
                                        <div className="border rounded p-3 text-secondary">
                                            Cargando editor...
                                        </div>
                                    )}
                                </div>

                                {/* Botón de envío con indicador de carga */}
                                <div className="col-12 d-grid mt-2">
                                    <button type="submit"
                                            className="btn btn-warning fw-semibold"
                                            disabled={cargando}>
                                        {cargando ? 'Enviando...' : 'Guardar contribución'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Columna derecha: panel de recomendaciones */}
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

// Exporta el componente para ser usado en App.tsx
export default ContribuirPage;
