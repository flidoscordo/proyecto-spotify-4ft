import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { albumes, artistas, canciones, formatDur } from "@/lib/mock";
import { Play, Heart } from "lucide-react";

// =====================================================================
// PANTALLA: Detalle de álbum (HU2, HU5, HU7)
// Endpoints FastAPI:
//   GET  /albumes/{id}                       -> datos del álbum + artista
//   GET  /albumes/{id}/canciones             -> canciones del álbum (HU2)
//   POST /usuarios/{uid}/favoritos body:{cancion_id}     -> marcar favorita (HU5)
//   POST /reproducciones body:{usuario_id, cancion_id, segundos_escuchados, fecha}
//                                            -> registrar reproducción (HU7)
// =====================================================================

export const Route = createFileRoute("/albumes/$id")({
  head: ({ params }) => ({ meta: [{ title: `Álbum #${params.id} — Sonara` }] }),
  component: AlbumDetalle,
});

function AlbumDetalle() {
  const { id } = Route.useParams();
  const al = albumes.find((x) => x.id === Number(id)) ?? albumes[0];
  const ar = artistas.find((x) => x.id === al.artista_id);
  const tracks = canciones.filter((c) => c.album_id === al.id);

  return (
    <AppLayout>
      <header className="flex flex-col md:flex-row gap-6 items-end mb-10 rounded-3xl bg-hero p-8">
        <img src={al.cover} alt={al.titulo} className="h-48 w-48 rounded-xl object-cover shadow-glow" />
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Álbum</p>
          <h1 className="text-5xl md:text-6xl font-extrabold my-2">{al.titulo}</h1>
          <p className="text-muted-foreground">{ar?.nombre} · {al.anio} · {tracks.length} canciones</p>
          <button className="mt-5 rounded-full bg-primary text-primary-foreground font-semibold px-6 py-2.5 flex items-center gap-2 hover:scale-[1.03] transition shadow-glow">
            <Play className="h-4 w-4 fill-current" /> Reproducir
          </button>
        </div>
      </header>

      <ul className="rounded-xl bg-card divide-y divide-border overflow-hidden">
        {tracks.map((c, i) => (
          <li key={c.id} className="group flex items-center gap-4 px-4 py-3 hover:bg-elevated">
            <span className="text-muted-foreground w-6 text-right">{i + 1}</span>
            <span className="flex-1 font-medium">{c.titulo}</span>
            <button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary"><Heart className="h-4 w-4" /></button>
            <span className="text-muted-foreground text-sm">{formatDur(c.duracion_seg)}</span>
          </li>
        ))}
      </ul>
    </AppLayout>
  );
}
