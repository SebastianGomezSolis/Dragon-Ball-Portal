import React from 'react';
import { useNavigate } from 'react-router-dom';

interface AccesoRestringidoProps {
    rol: string;
}

function AccesoRestringido({ rol }: AccesoRestringidoProps) {
    const navigate = useNavigate();
    return (
        <section className="container py-5">
            <div className="alert alert-danger">
                Solo los usuarios con rol <strong>{rol}</strong> pueden acceder a esta sección.
            </div>
            <button type="button" className="btn btn-outline-secondary mt-2"
                    onClick={() => navigate('/')}>
                Volver al inicio
            </button>
        </section>
    );
}

export default AccesoRestringido;
