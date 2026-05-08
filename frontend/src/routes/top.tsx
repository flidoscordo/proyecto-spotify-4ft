import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { canciones, artistas, albumes, formatDur } from "@/lib/mock";

// =====================================================================
// PANTALLA: Top y estadísticas del usuario (HU9)
// Endpoints FastAPI:
//   GET /usuarios/{id}/top-canciones   -> top 10 canciones (solo reproducciones válidas, HU7)
//   GET /usuarios/{id}/top-artistas    -> top 10 artistas
// =====================================================================

export const Route = createFileRoute("/top")({
  head: () => ({ meta: [{ title: "Top y estadísticas — Sonara" }] }),
  component: Top,
});

function Top() {
  const topC = canciones.slice(0, 10);
  const topA = artistas.slice(0, 6);
  return (
    <AppLayout>
      <PageHeader eyebrow="Tus números" title="Top y estadísticas" description="Solo cuentan reproducciones válidas (≥30% de la duración)." />

      <div className="grid lg:grid-cols-2 gap-8">
        <section>
          <h2 className="text-xl font-bold mb-4">Top canciones</h2>
          <ol className="rounded-xl bg-card divide-y divide-border overflow-hidden">
            {topC.map((c, i) => {
              const al = albumes.find((a) => a.id === c.album_id);
              return (
                <li key={c.id} className="flex items-center gap-3 px-4 py-3 hover:bg-elevated">
                  <span className="w-6 text-2xl font-extrabold text-muted-foreground">{i + 1}</span>
                  <img src={al?.cover} className="h-10 w-10 rounded object-cover" alt="" />
                  <span className="flex-1 font-medium">{c.titulo}</span>
                  <span className="text-muted-foreground text-sm">{formatDur(c.duracion_seg)}</span>
                </li>
              );
            })}
          </ol>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-4">Top artistas</h2>
          <ol className="rounded-xl bg-card divide-y divide-border overflow-hidden">
            {topA.map((a, i) => (
              <li key={a.id} className="flex items-center gap-3 px-4 py-3 hover:bg-elevated">
                <span className="w-6 text-2xl font-extrabold text-muted-foreground">{i + 1}</span>
                <img src={a.cover} className="h-10 w-10 rounded-full object-cover" alt="" />
                <div className="flex-1">
                  <p className="font-medium">{a.nombre}</p>
                  <p className="text-xs text-muted-foreground">{a.genero_musical}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </AppLayout>
  );
}
