import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: React.ReactNode;
    rol?: string;
}

function ProtectedRoute({ children, rol }: ProtectedRouteProps) {
    const raw = localStorage.getItem('dbp.session');
    const sesion: { id: number; username: string; rol: string; token: string } | null = raw ? JSON.parse(raw) : null;

    if (!sesion) {
        return <Navigate to="/login" replace />;
    }
    if (rol && sesion.rol !== rol) {
        return <Navigate to="/" replace />;
    }
    return <>{children}</>;
}

export default ProtectedRoute;