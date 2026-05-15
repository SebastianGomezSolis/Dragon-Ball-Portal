// Componente de banner global con diseño elaborado que incluye overlay, imagen y botón de acción.
// Muestra contenido diferente según la ruta actual de la aplicación.
import React from 'react';

// Configuración completa para cada banner de la aplicación
interface BannerConfig {
    // Texto pequeño superior que indica la categoría o sección
    eyebrow: string;
    // Título principal del banner
    title: string;
    // Descripción más larga de la página
    description: string;
    // Texto del botón de acción (call-to-action)
    buttonLabel: string;
    // Ruta a la que navega el botón al hacer clic
    buttonRoute: string;
    // Ruta de la imagen de fondo del banner
    image: string;
    // Texto alternativo para la imagen (accesibilidad)
    imageAlt: string;
}

// Mapeo de configuraciones de banner por ruta de la aplicación.
// Cada ruta tiene su propia configuración con contenido personalizado.
const bannerConfig: Record<string, BannerConfig> = {
    // Banner para la página de inicio
    '/': {
        eyebrow: 'Dragon Ball Portal',
        title: 'Tu enciclopedia del universo Dragon Ball.',
        description: 'Consultá personajes, sagas y razas; iniciá sesión para enviar contenido y administrá revisiones desde el panel correspondiente.',
        buttonLabel: 'Explorar personajes',
        buttonRoute: '/personajes',
        image: '/images/pages/inicio.jpg',
        imageAlt: 'Goku Ultra Instinto',
    },
    // Banner para la página de personajes
    '/personajes': {
        eyebrow: 'Personajes',
        title: 'Héroes, villanos y guerreros legendarios.',
        description: 'Revisá fichas publicadas, buscá por nombre y consultá el contenido completo de cada personaje.',
        buttonLabel: 'Ver catálogo',
        buttonRoute: '/personajes',
        image: '/images/pages/personajes.png',
        imageAlt: 'Equipo de personajes de Dragon Ball',
    },
    // Banner para la página de sagas
    '/sagas': {
        eyebrow: 'Sagas',
        title: 'Las historias más importantes de la franquicia.',
        description: 'Recorré las distintas sagas y su contenido publicado dentro del portal.',
        buttonLabel: 'Ver sagas',
        buttonRoute: '/sagas',
        image: '/images/pages/sagas.jpg',
        imageAlt: 'Escena grupal de Dragon Ball',
    },
    // Banner para la página de razas
    '/razas': {
        eyebrow: 'Razas',
        title: 'Descubrí el origen de cada guerrero.',
        description: 'Explorá las razas del universo Dragon Ball y sus características más representativas.',
        buttonLabel: 'Ver razas',
        buttonRoute: '/razas',
        image: '/images/pages/goku.jpg',
        imageAlt: 'Retrato de Goku',
    },
    // Banner para la página de contribuir
    '/contribuir': {
        eyebrow: 'Contribuciones',
        title: 'Agregá nuevo contenido al portal.',
        description: 'Enviá aportes para que los administradores los revise y publique.',
        buttonLabel: 'Mis contribuciones',
        buttonRoute: '/mis-contribuciones',
        image: '/images/pages/contribuir.jpg',
        imageAlt: 'Personajes de Dragon Ball',
    },
    // Banner para la página de mis contribuciones
    '/mis-contribuciones': {
        eyebrow: 'Mi actividad',
        title: 'Seguimiento de tus aportes.',
        description: 'Consultá el estado de cada envío y las observaciones del administrador.',
        buttonLabel: 'Enviar aporte',
        buttonRoute: '/contribuir',
        image: '/images/pages/mis-contribuciones.jpg',
        imageAlt: 'Goku Ultra Instinto',
    },
    // Banner para la página de administración de pendientes
    '/admin/pendientes': {
        eyebrow: 'Panel administrativo',
        title: 'Revisión y moderación de contribuciones.',
        description: 'Aprobá o rechazá los contenidos pendientes para mantener actualizado el portal.',
        buttonLabel: 'Ver inicio',
        buttonRoute: '/',
        image: '/images/pages/pendientes.jpg',
        imageAlt: 'Saga Dragon Ball',
    },
    // Banner para la página de inicio de sesión
    '/login': {
        eyebrow: 'Acceso',
        title: 'Ingresá al portal.',
        description: 'Autenticáte para enviar contribuciones, revisar tu panel personal o administrar contenido.',
        buttonLabel: 'Volver al inicio',
        buttonRoute: '/',
        image: '/images/pages/login.jpg',
        imageAlt: 'Goku',
    },
};

// Función auxiliar que obtiene la configuración del banner según la ruta.
// Si no existe configuración para la ruta solicitada, usa la de inicio como fallback.
// @param ruta - Ruta actual de la aplicación
// @returns Configuración del banner correspondiente
function resolverConfig(ruta: string): BannerConfig {
    return bannerConfig[ruta] ?? bannerConfig['/'];
}

// Props que acepta el componente GlobalBanner
interface Props {
    // Ruta actual para determinar qué banner mostrar
    route: string;
    // Función para navegar a diferentes rutas desde el botón del banner
    navigate: (ruta: string) => void;
}

// Componente funcional que renderiza un banner completo con overlay oscuro,
// imagen de fondo, texto informativo y botón de acción.
function GlobalBanner({ route, navigate }: Props) {
    // Obtiene la configuración según la ruta actual
    const config = resolverConfig(route);

    return (
        // Sección principal del banner con imagen de fondo
        <section className="global-banner text-white">
            {/* Capa de overlay semitransparente para mejorar la legibilidad del texto */}
            <div className="banner-overlay">
                <div className="container py-5">
                    {/* Layout de dos columnas: texto a la izquierda, imagen a la derecha */}
                    <div className="row align-items-center g-4">
                        {/* Columna de texto y botón */}
                        <div className="col-lg-7">
                            {/* Texto de categoría en mayúsculas */}
                            <div className="text-warning fw-semibold text-uppercase mb-2">{config.eyebrow}</div>
                            {/* Título principal del banner */}
                            <h1 className="display-5 fw-bold mb-3">{config.title}</h1>
                            {/* Descripción de la página */}
                            <p className="lead mb-4 banner-copy">{config.description}</p>
                            {/* Botón de acción que navega a la ruta configurada */}
                            <button className="btn btn-warning btn-lg fw-semibold" onClick={() => navigate(config.buttonRoute)}>
                                {config.buttonLabel}
                            </button>
                        </div>
                        {/* Columna de imagen decorativa */}
                        <div className="col-lg-5">
                            {/* Tarjeta con sombra que contiene la imagen */}
                            <div className="banner-image-card shadow-lg">
                                <img src={config.image} alt={config.imageAlt} className="img-fluid w-100" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

// Exporta el componente para ser usado en las páginas que requieran banner completo
export default GlobalBanner;
