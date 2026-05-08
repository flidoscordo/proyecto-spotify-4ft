import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { canciones, artistas, albumes, formatDur } from "@/lib/mock";
import { Heart } from "lucide-react";

// =====================================================================
// PANTALLA: Favoritos (HU5)
// Endpoints FastAPI:
//   GET    /usuarios/{id}/favoritos                  -> listar canciones favoritas
//   POST   /usuarios/{id}/favoritos  body:{cancion_id}
//                                                    -> agregar (sin duplicar)
//   DELETE /usuarios/{id}/favoritos/{cancion_id}     -> quitar
// =====================================================================

export const Route = createFileRoute("/favoritos")({
  head: () => ({ meta: [{ title: "Favoritos — Sonara" }] }),
  component: Favoritos,
});

function Favoritos() {
  const favs = canciones.slice(0, 5);
  return (
    <AppLayout>
      <PageHeader eyebrow="Tu biblioteca" title="Canciones que te gustan" description={`${favs.length} canciones marcadas como favoritas.`} />
      <ul className="rounded-xl bg-card divide-y divide-border overflow-hidden">
        {favs.map((c, i) => {
          const ar = artistas.find((a) => a.id === c.artista_id);
          const al = albumes.find((a) => a.id === c.album_id);
          return (
            <li key={c.id} className="flex items-center gap-4 px-4 py-3 hover:bg-elevated">
              <span className="text-muted-foreground w-6 text-right">{i + 1}</span>
              <img src={al?.cover} className="h-10 w-10 rounded object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{c.titulo}</p>
                <Link to="/artistas/$id" params={{ id: String(ar?.id) }} className="text-xs text-muted-foreground hover:text-foreground">{ar?.nombre}</Link>
              </div>
              <span className="text-muted-foreground text-sm">{formatDur(c.duracion_seg)}</span>
              <button className="text-primary"><Heart className="h-5 w-5 fill-current" /></button>
            </li>
          );
        })}
      </ul>
    </AppLayout>
  );
}
