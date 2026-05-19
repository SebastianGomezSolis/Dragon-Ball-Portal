export const API_BASE = 'http://localhost:8080/api';

const CLAVE = 'dbp.sesion';

export interface SesionUsuario {
    id: number;
    username: string;
    rol: string;
    token: string;
}

export function obtenerSesion(): SesionUsuario | null {
    const raw = sessionStorage.getItem(CLAVE);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as SesionUsuario;
    } catch {
        sessionStorage.removeItem(CLAVE);
        return null;
    }
}

export function guardarSesion(datos: SesionUsuario): void {
    sessionStorage.setItem(CLAVE, JSON.stringify(datos));
}

export function limpiarSesion(): void {
    sessionStorage.removeItem(CLAVE);
}

export function obtenerToken(): string | null {
    return obtenerSesion()?.token ?? null;
}

export function getAuthHeaders(contentType?: string): Record<string, string> {
    const headers: Record<string, string> = {};
    const token = obtenerToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    if (contentType) {
        headers['Content-Type'] = contentType;
    }
    return headers;
}

export async function apiRequest<T = any>(
    path: string,
    options: RequestInit = {}
): Promise<T> {
    const url = `${API_BASE}${path}`;
    const headers: Record<string, string> = {
        ...getAuthHeaders('application/json'),
        ...(options.headers as Record<string, string> || {}),
    };
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
        const errorText = await response.text();
        let errorMsg: string;
        try {
            const errorJson = JSON.parse(errorText);
            errorMsg = errorJson.mensaje || errorJson.error || errorText;
        } catch {
            errorMsg = errorText || `Error ${response.status}`;
        }
        throw new Error(errorMsg);
    }
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
        return response.json();
    }
    return response.text() as unknown as T;
}
