import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface LoginPageProps {
    onMensaje: (msg: { tipo: 'success' | 'danger'; texto: string }) => void;
}

type Modo = 'login' | 'register';

function LoginPage(props: LoginPageProps) {
    const navigate = useNavigate();
    const [modo, setModo] = useState<Modo>('login');
    const [username, setUsername] = useState(localStorage.getItem('dbp.username') ?? '');
    const [password, setPassword] = useState(localStorage.getItem('dbp.password') ?? '');
    const [recordar, setRecordar] = useState(localStorage.getItem('dbp.recordar') === 'true');
    const [cargando, setCargando] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setCargando(true);
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const errorText = await response.text();
                let errorMsg: string;
                try {
                    const errorJson = JSON.parse(errorText);
                    errorMsg = errorJson.error || errorJson.mensaje || errorText;
                } catch {
                    errorMsg = errorText || 'Error al iniciar sesión';
                }
                throw new Error(errorMsg);
            }
            const sesion = await response.json();

            if (recordar) {
                localStorage.setItem('dbp.recordar', 'true');
                localStorage.setItem('dbp.username', username);
                localStorage.setItem('dbp.password', password);
            } else {
                localStorage.removeItem('dbp.recordar');
                localStorage.removeItem('dbp.username');
                localStorage.removeItem('dbp.password');
            }

            localStorage.setItem('dbp.session', JSON.stringify(sesion));
            props.onMensaje({ tipo: 'success', texto: `Bienvenido, ${sesion.username}.` });
            navigate('/');
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error desconocido' });
        } finally {
            setCargando(false);
        }
    }

    async function handleRegister(e: React.FormEvent) {
        e.preventDefault();
        setCargando(true);
        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });
            if (!response.ok) {
                const error = await response.text();
                throw new Error(error || 'Error al registrarse');
            }
            const respuesta = await response.text();
            props.onMensaje({ tipo: 'success', texto: respuesta || 'Usuario registrado.' });
            setModo('login');
            setUsername('');
            setPassword('');
        } catch (e: unknown) {
            props.onMensaje({ tipo: 'danger', texto: e instanceof Error ? e.message : 'Error desconocido' });
        } finally {
            setCargando(false);
        }
    }

    return (
        <section className="container py-5">
            <div className="row justify-content-center">
                <div className="col-lg-6 col-xl-5">
                    <div className="card shadow-lg border-0">
                        <div className="card-body p-4 p-md-5">
                            <h2 className="fw-bold mb-1">
                                {modo === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
                            </h2>
                            <p className="text-secondary mb-4">
                                {modo === 'login'
                                    ? 'Ingresá tus credenciales para acceder al portal.'
                                    : 'Completá el formulario para registrarte.'}
                            </p>

                            <form onSubmit={modo === 'login' ? handleLogin : handleRegister}
                                  className="row g-3">
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

                            <hr className="my-4" />

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

export default LoginPage;
