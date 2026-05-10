// Página de inicio de sesión y registro de usuarios.
// Permite a los usuarios autenticarse o crear una nueva cuenta.
import React, { useState } from 'react';
import { api } from '../services/api';
import { guardarSesion } from '../services/authService';
import { MensajeGlobal, SesionUsuario } from '../types';

// Props que acepta el componente LoginPage
interface LoginPageProps {
    // Función callback para actualizar el estado de sesión al iniciar sesión
    onSesion: (sesion: SesionUsuario) => void;
    // Función para navegar a otras rutas
    onNavegar: (ruta: string) => void;
    // Función para mostrar mensajes globales al usuario
    onMensaje: (msg: MensajeGlobal) => void;
}

// Tipo que representa el modo actual del formulario (login o register)
type Modo = 'login' | 'register';

// Componente funcional que renderiza el formulario de login/registro.
// Gestiona la alternancia entre modos y el envío de datos al servidor.
function LoginPage(props: LoginPageProps) {
    // Estado para alternar entre login y registro
    const [modo, setModo] = useState<Modo>('login');
    // Estados para los campos del formulario (recuperados de localStorage si "recordar" está activo)
    const [username, setUsername] = useState(localStorage.getItem('dbp.username') ?? '');
    const [password, setPassword] = useState(localStorage.getItem('dbp.password') ?? '');
    // Estado para recordar credenciales entre sesiones
    const [recordar, setRecordar] = useState(localStorage.getItem('dbp.recordar') === 'true');
    // Estado para controlar el indicador de carga durante las peticiones
    const [cargando, setCargando] = useState(false);

    // Función asíncrona para manejar el envío del formulario de login
    async function handleLogin(e: React.FormEvent) {
        // Previene el comportamiento por defecto del formulario (reload)
        e.preventDefault();
        setCargando(true);
        try {
            // Realiza la petición de login al backend
            const sesion = await api.login({ username, password });

            // Si el usuario marcó "recordar", guarda credenciales en localStorage
            if (recordar) {
                localStorage.setItem('dbp.recordar', 'true');
                localStorage.setItem('dbp.username', username);
                localStorage.setItem('dbp.password', password);
            } else {
                // Limpia las credenciales guardadas si no quiere recordar
                localStorage.removeItem('dbp.recordar');
                localStorage.removeItem('dbp.username');
                localStorage.removeItem('dbp.password');
            }

            // Guarda los datos de sesión en sessionStorage y actualiza el estado
            guardarSesion(sesion);
            props.onSesion(sesion);
            // Muestra mensaje de bienvenida y navega al inicio
            props.onMensaje({ tipo: 'success', texto: `Bienvenido, ${sesion.username}.` });
            props.onNavegar('/');
        } catch (e: unknown) {
            // Muestra mensaje de error si el login falla
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error desconocido' });
        } finally {
            // Desactiva el indicador de carga
            setCargando(false);
        }
    }

    // Función asíncrona para manejar el envío del formulario de registro
    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setCargando(true);
        try {
            // Realiza la petición de registro al backend
            const respuesta = await api.register({ username, password });
            // Muestra mensaje de éxito y cambia al modo login
            props.onMensaje({ tipo: 'success', texto: typeof respuesta === 'string' ? respuesta : 'Usuario registrado.' });
            setModo('login');
            // Limpia los campos del formulario
            setUsername('');
            setPassword('');
        } catch (e: unknown) {
            // Muestra mensaje de error si el registro falla
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error desconocido' });
        } finally {
            setCargando(false);
        }
    }

    return (
        // Contenedor principal de la sección de login
        <section className="container py-5">
            {/* Centra el card horizontalmente con columnas responsivas */}
            <div className="row justify-content-center">
                <div className="col-lg-6 col-xl-5">
                    {/* Card que contiene el formulario */}
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4 p-md-5">
                            {/* Título dinámico según el modo */}
                            <h2 className="fw-bold mb-1">
                                {modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                            </h2>
                            {/* Descripción dinámica según el modo */}
                            <p className="text-secondary mb-4">
                                {modo === 'login'
                                    ? 'Ingresá tus credenciales para acceder al portal.'
                                    : 'Completá el formulario para registrarte.'}
                            </p>

                            {/* Formulario que cambia entre login y registro */}
                            <form onSubmit={modo === 'login' ? handleLogin : handleRegister}
                                  className="row g-3">
                                {/* Campo de username */}
                                <div className="col-12">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Campo de contraseña */}
                                <div className="col-12">
                                    <label className="form-label">Contraseña</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>

                                {/* Checkbox para recordar credenciales (solo en modo login) */}
                                {modo === 'login' && (
                                    <div className="col-12 d-flex align-items-center gap-2">
                                        <input
                                            type="checkbox"
                                            id="recordar"
                                            className="form-check-input m-0"
                                            checked={recordar}
                                            onChange={(e) => setRecordar(e.target.checked)}
                                        />
                                        <label htmlFor="recordar" className="form-check-label">
                                            Recordar credenciales
                                        </label>
                                    </div>
                                )}

                                {/* Botón de envío (cambia texto según el modo y estado de carga) */}
                                <div className="col-12 d-grid mt-2">
                                    <button type="submit"
                                            className="btn btn-warning fw-semibold"
                                            disabled={cargando}>
                                        {cargando
                                            ? 'Procesando...'
                                            : modo === 'login' ? 'Iniciar sesión' : 'Registrarme'}
                                    </button>
                                </div>
                            </form>

                            {/* Separador visual */}
                            <hr className="my-4" />

                            {/* Botón para alternar entre login y registro */}
                            <button
                                type="button"
                                className="btn btn-link p-0 text-decoration-none"
                                onClick={() => setModo(modo === 'login' ? 'register' : 'login')}>
                                {modo === 'login'
                                    ? '¿No tenés cuenta? Registrate aquí.'
                                    : '¿Ya tenés cuenta? Iniciá sesión.'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Exporta el componente para ser usado en App.tsx
export default LoginPage;
