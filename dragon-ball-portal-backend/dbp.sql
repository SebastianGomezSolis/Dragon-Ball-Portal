CREATE DATABASE dbp;
USE dbp;

CREATE TABLE usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol VARCHAR(20) NOT NULL,
    activo BOOLEAN NOT NULL DEFAULT TRUE
);

CREATE TABLE contribucion (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo VARCHAR(20) NOT NULL,
    titulo VARCHAR(255) NOT NULL,
    contenido_html TEXT NOT NULL,
    estado VARCHAR(20) NOT NULL,
    fecha_creacion DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    observacion_admin TEXT,
    usuario_id INT NOT NULL,

    CONSTRAINT fk_contribucion_usuario
        FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

CREATE TABLE personaje (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    raza VARCHAR(100),
    saga VARCHAR(100),
    imagen_url VARCHAR(255),
    contenido_html TEXT,
    publicado BOOLEAN NOT NULL DEFAULT FALSE,
    autor_id INT,

    CONSTRAINT fk_personaje_usuario
        FOREIGN KEY (autor_id) REFERENCES usuario(id)
);

CREATE TABLE saga (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contenido_html TEXT,
    publicado BOOLEAN NOT NULL DEFAULT FALSE,
    autor_id INT,

    CONSTRAINT fk_saga_usuario
        FOREIGN KEY (autor_id) REFERENCES usuario(id)
);

CREATE TABLE raza (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    contenido_html TEXT,
    publicado BOOLEAN NOT NULL DEFAULT FALSE,
    autor_id INT,

    CONSTRAINT fk_raza_usuario
        FOREIGN KEY (autor_id) REFERENCES usuario(id)
);