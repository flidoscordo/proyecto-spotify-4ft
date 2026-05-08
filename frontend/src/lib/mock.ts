// Datos mock para desarrollo. Reemplazar por fetch a FastAPI.
// Base URL ejemplo: const API = "http://localhost:8000"

export type Artista = { id: number; nombre: string; pais: string; genero_musical: string; cover: string };
export type Album = { id: number; titulo: string; anio: number; artista_id: number; cover: string };
export type Cancion = { id: number; titulo: string; duracion_seg: number; album_id: number; artista_id: number };
export type Playlist = { id: number; nombre: string; usuario_id: number; fecha_creacion: string; es_publica: boolean; colaborativa?: boolean; cover?: string };

const covers = [
  "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600",
  "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600",
  "https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=600",
  "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=600",
  "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600",
  "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600",
  "https://images.unsplash.com/photo-1483412033650-1015ddeb83d1?w=600",
  "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600",
];

export const artistas: Artista[] = [
  { id: 1, nombre: "Nova Vega", pais: "Argentina", genero_musical: "Indie Pop", cover: covers[0] },
  { id: 2, nombre: "The Midnight Echo", pais: "USA", genero_musical: "Synthwave", cover: covers[1] },
  { id: 3, nombre: "Lúa", pais: "España", genero_musical: "Flamenco Fusion", cover: covers[2] },
  { id: 4, nombre: "Kairos", pais: "Japón", genero_musical: "Electronic", cover: covers[3] },
  { id: 5, nombre: "Saint Soul", pais: "UK", genero_musical: "Soul", cover: covers[4] },
  { id: 6, nombre: "Atlas Drift", pais: "Brasil", genero_musical: "Bossa Nova", cover: covers[5] },
];

export const albumes: Album[] = [
  { id: 1, titulo: "Horizonte", anio: 2024, artista_id: 1, cover: covers[0] },
  { id: 2, titulo: "Neon Dreams", anio: 2023, artista_id: 2, cover: covers[1] },
  { id: 3, titulo: "Raíces", anio: 2025, artista_id: 3, cover: covers[2] },
  { id: 4, titulo: "Circuit Bloom", anio: 2024, artista_id: 4, cover: covers[3] },
  { id: 5, titulo: "Velvet Hours", anio: 2022, artista_id: 5, cover: covers[4] },
  { id: 6, titulo: "Mar Aberto", anio: 2025, artista_id: 6, cover: covers[5] },
];

export const canciones: Cancion[] = [
  { id: 1, titulo: "Eclipse", duracion_seg: 214, album_id: 1, artista_id: 1 },
  { id: 2, titulo: "Vuelo Bajo", duracion_seg: 198, album_id: 1, artista_id: 1 },
  { id: 3, titulo: "Static Heart", duracion_seg: 232, album_id: 2, artista_id: 2 },
  { id: 4, titulo: "Midnight Drive", duracion_seg: 256, album_id: 2, artista_id: 2 },
  { id: 5, titulo: "Olé", duracion_seg: 187, album_id: 3, artista_id: 3 },
  { id: 6, titulo: "Compás 7/8", duracion_seg: 245, album_id: 3, artista_id: 3 },
  { id: 7, titulo: "Tokyo Rain", duracion_seg: 301, album_id: 4, artista_id: 4 },
  { id: 8, titulo: "Synapse", duracion_seg: 220, album_id: 4, artista_id: 4 },
  { id: 9, titulo: "Slow Burn", duracion_seg: 240, album_id: 5, artista_id: 5 },
  { id: 10, titulo: "Maré", duracion_seg: 210, album_id: 6, artista_id: 6 },
];

export const playlists: Playlist[] = [
  { id: 1, nombre: "Foco profundo", usuario_id: 1, fecha_creacion: "2026-01-12", es_publica: true, cover: covers[6] },
  { id: 2, nombre: "Domingo lento", usuario_id: 1, fecha_creacion: "2026-02-03", es_publica: false, cover: covers[7] },
  { id: 3, nombre: "Gym 2026", usuario_id: 1, fecha_creacion: "2026-03-21", es_publica: true, colaborativa: true, cover: covers[1] },
];

export const formatDur = (s: number) => {
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${r.toString().padStart(2, "0")}`;
};

export const formatTotal = (s: number) => {
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return [h, m, sec].map((n) => n.toString().padStart(2, "0")).join(":");
};
