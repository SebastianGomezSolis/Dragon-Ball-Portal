// Componente para mostrar mensajes de alerta temporales en la interfaz.
// Renderiza una notificación que desaparece al hacer click en el botón de cerrar.
import React from 'react';
import { MensajeGlobal } from '../types';

// Props que acepta el componente para configurarse dinámicamente
interface AlertaMensajeProps {
    // Mensaje a mostrar (null para no renderizar nada)
    mensaje: MensajeGlobal | null;
    // Función callback que se ejecuta al cerrar la alerta
    onCerrar: () => void;
}

// Componente funcional que renderiza una alerta Bootstrap.
// Si mensaje es null, retorna null (no renderiza nada).
function AlertaMensaje(props: AlertaMensajeProps) {
    // Si no hay mensaje, no renderiza nada
    if (!props.mensaje) return null;

    return (
        // Contenedor con padding superior para separar de otros elementos
        <div className="container pt-3">
            {/* Alerta Bootstrap con estilo dinámico según el tipo */}
            <div className={`alert alert-${props.mensaje.tipo} alert-dismissible fade show`} role="alert">
                {/* Texto del mensaje a mostrar */}
                {props.mensaje.texto}
                {/* Botón para cerrar la alerta, invoca el callback onCerrar */}
                <button type="button" className="btn-close" onClick={props.onCerrar}></button>
            </div>
        </div>
    );
}

// Exporta el componente para ser usado donde sea necesario
export default AlertaMensaje;
