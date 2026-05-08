import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { playlists, canciones, artistas, albumes, formatDur, formatTotal } from "@/lib/mock";
import { Play, Trash2, GripVertical, UserPlus } from "lucide-react";

// =====================================================================
// PANTALLA: Detalle de playlist (HU4, HU10, HU11)
// Endpoints FastAPI:
//   GET    /playlists/{id}                         -> incluye dueño + colaboradores + canciones ordenadas
//   GET    /playlists/{id}/resumen                 -> { cantidad, duracion_total: "hh:mm:ss" }  (HU10)
//   POST   /playlists/{id}/canciones  body:{cancion_id, orden?}
//                                                  -> agregar (no duplicar) (HU4)
//   DELETE /playlists/{id}/canciones/{cancion_id}  -> quitar y reordenar    (HU4)
//   PATCH  /playlists/{id}/canciones/orden  body:[{cancion_id, orden}]
//                                                  -> reordenar manualmente (HU4)
//   POST   /playlists/{id}/colaboradores  body:{usuario_id}
//                                                  -> agregar colaborador   (HU11, solo dueño)
//   DELETE /playlists/{id}/colaboradores/{usuario_id}
//                                                  -> quitar colaborador    (HU11)
// =====================================================================

export const Route = createFileRoute("/playlists/$id")({
  head: ({ params }) => ({
    meta: [{ title: `Playlist #${params.id} — Sonara` }],
  }),
  component: PlaylistDetalle,
});

function PlaylistDetalle() {
  const { id } = Route.useParams();
  const playlist = playlists.find((p) => p.id === Number(id)) ?? playlists[0];
  const items = canciones.slice(0, 6);
  const total = items.reduce((acc, c) => acc + c.duracion_seg, 0);

  return (
    <AppLayout>
      <header className="flex flex-col md:flex-row gap-6 items-end mb-10 rounded-3xl bg-hero p-8">
        <img src={playlist.cover} alt={playlist.nombre} className="h-48 w-48 rounded-xl object-cover shadow-glow" />
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">{playlist.es_publica ? "Pública" : "Privada"}{playlist.colaborativa ? " · Colaborativa" : ""}</p>
          <h1 className="text-5xl md:text-6xl font-extrabold my-2">{playlist.nombre}</h1>
          <p className="text-muted-foreground">{items.length} canciones · {formatTotal(total)}</p>
          <div className="mt-5 flex gap-3">
            <button className="rounded-full bg-primary text-primary-foreground font-semibold px-6 py-2.5 flex items-center gap-2 hover:scale-[1.03] transition shadow-glow">
              <Play className="h-4 w-4 fill-current" /> Reproducir
            </button>
            {playlist.colaborativa && (
              <button className="rounded-full border border-border px-5 py-2.5 flex items-center gap-2 hover:bg-elevated transition">
                <UserPlus className="h-4 w-4" /> Invitar
              </button>
            )}
          </div>
        </div>
      </header>

      <table className="w-full text-left">
        <thead className="text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
          <tr>
            <th className="px-3 py-3 w-10">#</th>
            <th className="py-3">Título</th>
            <th className="py-3 hidden md:table-cell">Álbum</th>
            <th className="py-3 hidden md:table-cell">Artista</th>
            <th className="py-3 text-right pr-4">Duración</th>
            <th className="w-10"></th>
          </tr>
        </thead>
        <tbody>
          {items.map((c, i) => {
            const al = albumes.find((a) => a.id === c.album_id);
            const ar = artistas.find((a) => a.id === c.artista_id);
            return (
              <tr key={c.id} className="group hover:bg-elevated transition">
                <td className="px-3 py-3 text-muted-foreground"><GripVertical className="h-4 w-4 inline opacity-0 group-hover:opacity-100" /> {i + 1}</td>
                <td className="py-3 font-medium">{c.titulo}</td>
                <td className="py-3 text-muted-foreground hidden md:table-cell">{al?.titulo}</td>
                <td className="py-3 text-muted-foreground hidden md:table-cell">{ar?.nombre}</td>
                <td className="py-3 text-right pr-4 text-muted-foreground">{formatDur(c.duracion_seg)}</td>
                <td className="py-3 pr-3"><button className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </AppLayout>
  );
}
