-- ==========================================
-- PROYECTO 1 - SPOTIFY (Esquema PostgreSQL)
-- ==========================================

-- HU1: El plan solo puede ser free, premium o familiar.
CREATE TYPE tipo_plan AS ENUM ('free', 'premium', 'familiar');

-- ==========================================
-- TABLAS PRINCIPALES
-- ==========================================

-- HU1: Registro de usuario
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL, -- El email es único
    nombre VARCHAR(100) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Automática al registrarse
    plan tipo_plan NOT NULL
);

-- HU2: Alta de artistas
CREATE TABLE artistas (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    pais VARCHAR(50),
    genero_musical VARCHAR(50)
);

-- HU2: Álbumes (No puede existir sin artista)
CREATE TABLE albumes (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    anio INTEGER,
    artista_id INTEGER NOT NULL REFERENCES artistas(id) ON DELETE CASCADE
);

-- HU2: Canciones (No puede existir sin álbum, duración > 0)
CREATE TABLE canciones (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL,
    duracion_seg INTEGER NOT NULL CHECK (duracion_seg > 0),
    album_id INTEGER NOT NULL REFERENCES albumes(id) ON DELETE CASCADE
);

-- HU3 y HU11: Playlists
CREATE TABLE playlists (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    es_publica BOOLEAN DEFAULT TRUE,
    es_colaborativa BOOLEAN DEFAULT FALSE, -- HU11: Playlists colaborativas
    UNIQUE (usuario_id, nombre) -- Un usuario no puede tener 2 playlists con el mismo nombre
);

-- ==========================================
-- TABLAS DE RELACIÓN (N a M)
-- ==========================================

-- HU4: Canciones en Playlist
CREATE TABLE playlist_canciones (
    playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    cancion_id INTEGER NOT NULL REFERENCES canciones(id) ON DELETE CASCADE,
    orden INTEGER NOT NULL,
    fecha_agregada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (playlist_id, cancion_id) -- La misma canción no puede estar 2 veces
);

-- HU5: Favoritos
CREATE TABLE favoritos (
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    cancion_id INTEGER NOT NULL REFERENCES canciones(id) ON DELETE CASCADE,
    fecha_agregada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, cancion_id) -- No se puede marcar 2 veces
);

-- HU6: Seguidores de artistas
CREATE TABLE seguidores (
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    artista_id INTEGER NOT NULL REFERENCES artistas(id) ON DELETE CASCADE,
    fecha_seguimiento TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, artista_id) -- No se puede seguir 2 veces
);

-- HU11: Colaboradores de Playlists
CREATE TABLE playlist_colaboradores (
    playlist_id INTEGER NOT NULL REFERENCES playlists(id) ON DELETE CASCADE,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    fecha_agregado TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (playlist_id, usuario_id) -- Un usuario no puede ser agregado 2 veces a la misma
);

-- ==========================================
-- REPRODUCCIONES Y ESTADÍSTICAS
-- ==========================================

-- HU7: Reproducciones
CREATE TABLE reproducciones (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER NOT NULL REFERENCES usuarios(id) ON DELETE CASCADE,
    cancion_id INTEGER NOT NULL REFERENCES canciones(id) ON DELETE CASCADE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    segundos_escuchados INTEGER NOT NULL CHECK (segundos_escuchados >= 0)
);

-- ==========================================
-- TRIGGERS Y FUNCIONES
-- ==========================================

-- HU7: Validar que segundos_escuchados no supere la duración de la canción
CREATE OR REPLACE FUNCTION validar_segundos_reproduccion()
RETURNS TRIGGER AS $$
DECLARE
    duracion_cancion INTEGER;
BEGIN
    -- Obtenemos la duración real de la canción que se está reproduciendo
    SELECT duracion_seg INTO duracion_cancion 
    FROM canciones 
    WHERE id = NEW.cancion_id;

    -- Comprobamos si los segundos reportados superan la duración máxima
    IF NEW.segundos_escuchados > duracion_cancion THEN
        RAISE EXCEPTION 'Los segundos escuchados (%) superan la duración de la canción (%)', NEW.segundos_escuchados, duracion_cancion;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_validar_reproduccion
BEFORE INSERT OR UPDATE ON reproducciones
FOR EACH ROW EXECUTE FUNCTION validar_segundos_reproduccion();