// Archivo de utilidades para formatear datos de la aplicación.
// Proporciona funciones para formatear roles, estados de contribuciones, fechas y badges.
import { EstadoContribucion, Rol } from '../types';

// Convierte el código de rol a su representación legible en español.
// @param rol Código del rol ('ADMIN', 'USER' o undefined)
// @returns Texto descriptivo del rol ('Administrador', 'Usuario' o 'Invitado')
export function formatRol(rol: Rol | undefined): string {
    if (rol === 'ADMIN') return 'Administrador';
    if (rol === 'USER') return 'Usuario';
    return 'Invitado';
}

// Convierte el código de estado de contribución a su representación legible.
// @param estado Código del estado ('APROBADA', 'RECHAZADA', 'PENDIENTE' o undefined)
// @returns Texto descriptivo del estado
export function formatEstado(estado: EstadoContribucion | undefined): string {
    if (estado === 'APROBADA')  return 'Aprobada';
    if (estado === 'RECHAZADA') return 'Rechazada';
    if (estado === 'PENDIENTE') return 'Pendiente';
    return 'Sin estado';
}

// Retorna el sufijo de clase Bootstrap para el badge según el estado.
// Útil para aplicar colores a los badges que muestran el estado de una contribución.
// @param estado Código del estado de contribución
// @returns Sufijo de clase Bootstrap ('success', 'danger' o 'warning')
export function badgeEstado(estado: EstadoContribucion | undefined): string {
    if (estado === 'APROBADA')  return 'success';
    if (estado === 'RECHAZADA') return 'danger';
    return 'warning';
}

// Formatea una fecha ISO a formato local español (Costa Rica).
// @param fecha Cadena de fecha ISO o undefined
// @returns Fecha formateada en locale 'es-CR' o texto por defecto
export function formatFecha(fecha: string | undefined): string {
    if (!fecha) return 'Sin fecha';
    const d = new Date(fecha);
    // Verifica si la fecha es válida antes de formatear
    return isNaN(d.getTime()) ? fecha : d.toLocaleString('es-CR');
}
