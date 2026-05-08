import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { canciones, artistas, albumes, formatDur } from "@/lib/mock";
import { Sparkles } from "lucide-react";

// =====================================================================
// PANTALLA: Recomendaciones (HU12)
// Endpoint FastAPI:
//   GET /usuarios/{id}/recomendaciones
//     -> 10 canciones de los géneros más escuchados,
//        excluyendo las reproducidas en los últimos 30 días.
//        Si el usuario tiene <5 reproducciones válidas → top global.
// =====================================================================

export const Route = createFileRoute("/recomendaciones")({
  head: () => ({ meta: [{ title: "Para ti — Sonara" }] }),
  component: Reco,
});

function Reco() {
  return (
    <AppLayout>
      <PageHeader
        eyebrow={<span className="inline-flex items-center gap-1"><Sparkles className="h-3 w-3" /> Personalizado</span>}
        title="Recomendado para vos"
        description="Basado en tus géneros más escuchados, sin repetir lo que oíste en los últimos 30 días."
      />
      <ul className="rounded-xl bg-card divide-y divide-border overflow-hidden">
        {canciones.map((c, i) => {
          const ar = artistas.find((a) => a.id === c.artista_id);
          const al = albumes.find((a) => a.id === c.album_id);
          return (
            <li key={c.id} className="flex items-center gap-4 px-4 py-3 hover:bg-elevated">
              <span className="text-muted-foreground w-6 text-right">{i + 1}</span>
              <img src={al?.cover} className="h-10 w-10 rounded object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">{c.titulo}</p>
                <p className="text-xs text-muted-foreground">{ar?.nombre} · {ar?.genero_musical}</p>
              </div>
              <span className="text-muted-foreground text-sm">{formatDur(c.duracion_seg)}</span>
            </li>
          );
        })}
      </ul>
    </AppLayout>
  );
}
