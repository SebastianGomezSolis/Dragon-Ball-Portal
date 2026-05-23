import { useNavigate, Link } from 'react-router-dom';
import { formatRol } from '../utils/formatters';

function Header() {
    const navigate = useNavigate();
    const raw = localStorage.getItem('dbp.session');
    const sesion: { id: number; username: string; rol: string; token: string } | null = raw ? JSON.parse(raw) : null;
    const esAdmin = sesion?.rol === 'ADMIN';
    const logueado = sesion !== null;

    function handleLogout() {
        localStorage.removeItem('dbp.session');
        navigate('/');
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm sticky-top">
            <div className="container">
                <Link className="navbar-brand fw-bold d-flex align-items-center gap-2" to="/">
                    <img src="/images/branding/icon.jpg"
                         alt="Dragon Ball Portal"
                         className="brand-icon rounded-circle" />
                    <span>Dragon Ball Portal</span>
                </Link>

                <button className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#menuPrincipal">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="menuPrincipal">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Inicio</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/personajes">Personajes</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sagas">Sagas</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/razas">Razas</Link>
                        </li>
                        {logueado && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/contribuir">Contribuir</Link>
                            </li>
                        )}
                        {logueado && (
                            <li className="nav-item">
                                <Link className="nav-link" to="/mis-contribuciones">Mis contribuciones</Link>
                            </li>
                        )}
                        {esAdmin && (
                            <li className="nav-item">
                                <Link className="nav-link fw-semibold text-warning" to="/admin/pendientes">Pendientes</Link>
                            </li>
                        )}
                    </ul>

                    <div className="d-flex align-items-center gap-3 text-white small">
                        {logueado ? (
                            <>
                                <div className="text-end d-none d-md-block">
                                    <div className="fw-semibold">{sesion.username}</div>
                                    <div className="text-secondary">{formatRol(sesion.rol)}</div>
                                </div>
                                <button className="btn btn-outline-light btn-sm"
                                        type="button"
                                        onClick={handleLogout}>
                                    Cerrar sesión
                                </button>
                            </>
                        ) : (
                            <Link className="btn btn-warning btn-sm fw-semibold" to="/login">
                                Iniciar sesión
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
