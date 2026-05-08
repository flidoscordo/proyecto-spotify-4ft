import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { artistas, albumes, canciones, formatDur } from "@/lib/mock";
import { Play, UserPlus } from "lucide-react";

// =====================================================================
// PANTALLA: Detalle de artista (HU2, HU6)
// Endpoints FastAPI:
//   GET    /artistas/{id}                         -> datos del artista
//   GET    /artistas/{id}/albumes                 -> álbumes del artista (HU2)
//   GET    /artistas/{id}/seguidores              -> conteo + lista de seguidores (HU6)
//   POST   /usuarios/{uid}/seguidos body:{artista_id}    -> seguir
//   DELETE /usuarios/{uid}/seguidos/{artista_id}         -> dejar de seguir
// =====================================================================

export const Route = createFileRoute("/artistas/$id")({
  head: ({ params }) => ({ meta: [{ title: `Artista #${params.id} — Sonara` }] }),
  component: ArtistaDetalle,
});

function ArtistaDetalle() {
  const { id } = Route.useParams();
  const a = artistas.find((x) => x.id === Number(id)) ?? artistas[0];
  const sus = albumes.filter((al) => al.artista_id === a.id);
  const top = canciones.filter((c) => c.artista_id === a.id);

  return (
    <AppLayout>
      <header className="flex flex-col md:flex-row gap-6 items-end mb-10 rounded-3xl bg-hero p-8">
        <img src={a.cover} alt={a.nombre} className="h-48 w-48 rounded-full object-cover shadow-glow" />
        <div>
          <p className="text-xs uppercase tracking-widest text-primary">Artista verificado</p>
          <h1 className="text-6xl font-extrabold my-2">{a.nombre}</h1>
          <p className="text-muted-foreground">{a.genero_musical} · {a.pais}</p>
          <div className="mt-5 flex gap-3">
            <button className="rounded-full bg-primary text-primary-foreground font-semibold px-6 py-2.5 flex items-center gap-2 hover:scale-[1.03] transition shadow-glow">
              <Play className="h-4 w-4 fill-current" /> Reproducir
            </button>
            <button className="rounded-full border border-border px-5 py-2.5 flex items-center gap-2 hover:bg-elevated transition">
              <UserPlus className="h-4 w-4" /> Seguir
            </button>
          </div>
        </div>
      </header>

      <h2 className="text-2xl font-bold mb-4">Populares</h2>
      <ul className="rounded-xl bg-card divide-y divide-border overflow-hidden mb-10">
        {top.map((c, i) => (
          <li key={c.id} className="flex items-center gap-4 px-4 py-3 hover:bg-elevated">
            <span className="text-muted-foreground w-6 text-right">{i + 1}</span>
            <span className="flex-1 font-medium">{c.titulo}</span>
            <span className="text-muted-foreground text-sm">{formatDur(c.duracion_seg)}</span>
          </li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mb-4">Discografía</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {sus.map((al) => (
          <Link key={al.id} to="/albumes/$id" params={{ id: String(al.id) }} className="rounded-xl bg-card hover:bg-elevated p-4 transition">
            <img src={al.cover} alt={al.titulo} className="aspect-square w-full rounded-lg object-cover mb-3" />
            <p className="font-semibold truncate">{al.titulo}</p>
            <p className="text-xs text-muted-foreground">{al.anio}</p>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
