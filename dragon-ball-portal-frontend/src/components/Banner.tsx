// Componente que muestra un banner hero en cada página de la aplicación.
// Configura automáticamente el contenido (título, descripción, imagen) según la ruta actual.
import React from 'react';

// Configuración individual del banner para cada ruta de la aplicación
interface BannerConfig {
    // Texto pequeño encima del título que indica la categoría (ej: "Catálogo", "Mi cuenta")
    eyebrow: string;
    // Título principal del banner
    titulo: string;
    // Descripción breve de la página
    descripcion: string;
    // Ruta de la imagen a mostrar en el banner
    imagen: string;
    // Texto alternativo para la imagen (mejora accesibilidad)
    altImagen: string;
}

// Objeto que mapea cada ruta de la aplicación con su configuración de banner.
// Cada entrada define el contenido específico para esa página.
const configs: Record<string, BannerConfig> = {
    // Banner para la página de inicio
    '/': {
        eyebrow: 'Bienvenido',
        titulo: 'Dragon Ball Portal',
        descripcion: 'Tu enciclopedia del universo Dragon Ball. Explorá personajes, sagas y razas.',
        imagen: '/images/pages/inicio.jpg',
        altImagen: 'Inicio',
    },
    // Banner para la página de personajes
    '/personajes': {
        eyebrow: 'Catálogo',
        titulo: 'Personajes',
        descripcion: 'Héroes, villanos y guerreros legendarios del universo Dragon Ball.',
        imagen: '/images/pages/personajes.png',
        altImagen: 'Personajes',
    },
    // Banner para la página de sagas
    '/sagas': {
        eyebrow: 'Catálogo',
        titulo: 'Sagas',
        descripcion: 'Las historias más importantes de la franquicia Dragon Ball.',
        imagen: '/images/pages/sagas.jpg',
        altImagen: 'Sagas',
    },
    // Banner para la página de razas
    '/razas': {
        eyebrow: 'Catálogo',
        titulo: 'Razas',
        descripcion: 'Descubrí el origen de cada guerrero y su raza en el universo Dragon Ball.',
        imagen: '/images/pages/goku.jpg',
        altImagen: 'Razas',
    },
    // Banner para la página de comparación
    '/comparar': {
        eyebrow: 'Herramienta',
        titulo: 'Comparar',
        descripcion: 'Seleccioná dos elementos y comparalos lado a lado.',
        imagen: '/images/pages/personajes.png',
        altImagen: 'Comparar',
    },
    // Banner para la página de contribuir
    '/contribuir': {
        eyebrow: 'Mi cuenta',
        titulo: 'Enviar contribución',
        descripcion: 'Aportá contenido nuevo al portal para que el administrador lo revise.',
        imagen: '/images/pages/contribuir.jpg',
        altImagen: 'Contribuir',
    },
    // Banner para la página de mis contribuciones
    '/mis-contribuciones': {
        eyebrow: 'Mi cuenta',
        titulo: 'Mis contribuciones',
        descripcion: 'Revisá el estado de todo el contenido que enviaste al portal.',
        imagen: '/images/pages/mis-contribuciones.jpg',
        altImagen: 'Mis contribuciones',
    },
    // Banner para la página de administración de pendientes
    '/admin/pendientes': {
        eyebrow: 'Administración',
        titulo: 'Contribuciones pendientes',
        descripcion: 'Revisá y moderá los aportes de los usuarios antes de publicarlos.',
        imagen: '/images/pages/pendientes.jpg',
        altImagen: 'Pendientes',
    },
    // Banner para la página de inicio de sesión
    '/login': {
        eyebrow: 'Acceso',
        titulo: 'Iniciar sesión',
        descripcion: 'Ingresá al portal para contribuir o administrar contenido.',
        imagen: '/images/pages/login.jpg',
        altImagen: 'Login',
    },
};

// Props que acepta el componente Banner
interface BannerProps {
    // Ruta actual de la aplicación para determinar qué configuración de banner usar
    ruta: string;
}

// Componente funcional que renderiza un banner hero con dos columnas.
// Busca la configuración correspondiente a la ruta actual.
// Si no encuentra configuración para la ruta, usa la configuración de inicio como fallback.
function Banner(props: BannerProps) {
    // Obtiene la configuración para la ruta actual, o usa la de inicio por defecto
    const config = configs[props.ruta] ?? configs['/'];

    return (
        // Sección principal del banner con padding vertical y clase global
        <section className="global-banner py-5">
            <div className="container">
                {/* Layout de dos columnas: texto a la izquierda, imagen a la derecha */}
                <div className="row align-items-center g-4">
                    {/* Columna de texto (título y descripción) */}
                    <div className="col-lg-7">
                        {/* Texto eyebrow que indica la categoría (en mayúsculas y color amarillo) */}
                        <div className="text-warning fw-semibold text-uppercase mb-2 small">
                            {config.eyebrow}
                        </div>
                        {/* Título principal del banner */}
                        <h1 className="display-5 fw-bold mb-3">{config.titulo}</h1>
                        {/* Descripción de la página con opacidad reducida */}
                        <p className="lead mb-0" style={{opacity: 0.9}}>{config.descripcion}</p>
                    </div>
                    {/* Columna derecha con la imagen del banner */}
                    <div className="col-lg-5">
                        {/* Tarjeta con sombra para la imagen decorativa */}
                        <div className="banner-image-card shadow-lg">
                            <img src={config.imagen} alt={config.altImagen} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Exporta el componente para ser usado en App.tsx
export default Banner;
