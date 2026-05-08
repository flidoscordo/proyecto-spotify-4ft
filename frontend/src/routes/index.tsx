import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { artistas, albumes, playlists } from "@/lib/mock";
import { Play } from "lucide-react";

// =====================================================================
// PANTALLA: Inicio / Feed
// Endpoints FastAPI a consumir:
//   GET /usuarios/{id}/recomendaciones    -> HU12 (canciones sugeridas)
//   GET /usuarios/{id}/seguidos           -> HU6  (artistas que sigue)
//   GET /playlists?usuario_id={id}        -> HU3  (mis playlists)
//   GET /buscar?q=...                     -> HU8  (atajo búsqueda)
// =====================================================================

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sonara — Inicio" },
      { name: "description", content: "Tu feed musical: recomendaciones, artistas y playlists." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <AppLayout>
      <section className="rounded-3xl bg-hero p-10 mb-10 shadow-glow">
        <p className="text-xs uppercase tracking-[0.3em] text-primary mb-3">Buenas tardes</p>
        <h1 className="text-5xl md:text-6xl font-extrabold mb-3">Lo que sigue suena así.</h1>
        <p className="text-muted-foreground max-w-xl">Recomendaciones basadas en tu historial reciente y los géneros que más escuchaste.</p>
      </section>

      <h2 className="text-2xl font-bold mb-4">Hecho para vos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
        {playlists.concat(playlists).slice(0, 4).map((p, i) => (
          <Link key={i} to="/playlists/$id" params={{ id: String(p.id) }} className="group rounded-xl bg-card p-4 hover:bg-elevated transition">
            <div className="relative mb-3">
              <img src={p.cover} alt={p.nombre} className="aspect-square w-full rounded-lg object-cover" />
              <button className="absolute bottom-2 right-2 h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center opacity-0 group-hover:opacity-100 transition shadow-glow">
                <Play className="h-5 w-5 ml-0.5 fill-current" />
              </button>
            </div>
            <p className="font-semibold truncate">{p.nombre}</p>
            <p className="text-xs text-muted-foreground">Playlist · Sonara</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Artistas populares</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
        {artistas.map((a) => (
          <Link key={a.id} to="/artistas/$id" params={{ id: String(a.id) }} className="group rounded-xl bg-card p-4 hover:bg-elevated text-center transition">
            <img src={a.cover} alt={a.nombre} className="aspect-square w-full rounded-full object-cover mb-3" />
            <p className="font-semibold truncate">{a.nombre}</p>
            <p className="text-xs text-muted-foreground">{a.genero_musical}</p>
          </Link>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-4">Álbumes nuevos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {albumes.map((al) => (
          <Link key={al.id} to="/albumes/$id" params={{ id: String(al.id) }} className="group rounded-xl bg-card p-4 hover:bg-elevated transition">
            <img src={al.cover} alt={al.titulo} className="aspect-square w-full rounded-lg object-cover mb-3" />
            <p className="font-semibold truncate">{al.titulo}</p>
            <p className="text-xs text-muted-foreground">{al.anio}</p>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
