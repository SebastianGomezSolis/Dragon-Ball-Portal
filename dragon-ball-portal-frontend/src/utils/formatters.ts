export function formatRol(rol: string | undefined): string {
    if (rol === 'ADMIN') return 'Administrador';
    if (rol === 'USER') return 'Usuario';
    return 'Invitado';
}

export function formatEstado(estado: string | undefined): string {
    if (estado === 'APROBADA')  return 'Aprobada';
    if (estado === 'RECHAZADA') return 'Rechazada';
    if (estado === 'PENDIENTE') return 'Pendiente';
    return 'Sin estado';
}

export function badgeEstado(estado: string | undefined): string {
    if (estado === 'APROBADA')  return 'success';
    if (estado === 'RECHAZADA') return 'danger';
    return 'warning';
}

export function formatFecha(fecha: string | undefined): string {
    if (!fecha) return 'Sin fecha';
    const d = new Date(fecha);
    return isNaN(d.getTime()) ? fecha : d.toLocaleString('es-CR');
}
