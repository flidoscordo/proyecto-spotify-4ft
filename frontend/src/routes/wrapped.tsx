import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { canciones, artistas } from "@/lib/mock";

// =====================================================================
// PANTALLA: Resumen anual / Wrapped (HU13)
// Endpoint FastAPI:
//   GET /usuarios/{id}/resumen?anio=2026
//     -> {
//          top_canciones: Cancion[5],
//          top_artistas: Artista[5],
//          top_generos: string[3],
//          total_minutos: number,
//          canciones_distintas: number
//        }
//     Solo cuenta reproducciones válidas (HU7) del año.
//     Si no hay reproducciones en el año → 404.
// =====================================================================

export const Route = createFileRoute("/wrapped")({
  head: () => ({ meta: [{ title: "Tu resumen anual — Sonara" }] }),
  component: Wrapped,
});

function Wrapped() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Wrapped 2026" title="Tu año en música" description="Las canciones, artistas y géneros que marcaron tu año." />

      <div className="grid lg:grid-cols-3 gap-6 mb-10">
        <Stat label="Minutos escuchados" value="14.328" />
        <Stat label="Canciones distintas" value="412" />
        <Stat label="Género top" value="Indie Pop" />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <section className="rounded-2xl bg-card-grad p-6">
          <h2 className="text-xl font-bold mb-4">Top 5 canciones</h2>
          <ol className="space-y-3">
            {canciones.slice(0, 5).map((c, i) => (
              <li key={c.id} className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-primary w-8">{i + 1}</span>
                <span className="font-medium">{c.titulo}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="rounded-2xl bg-card-grad p-6">
          <h2 className="text-xl font-bold mb-4">Top 5 artistas</h2>
          <ol className="space-y-3">
            {artistas.slice(0, 5).map((a, i) => (
              <li key={a.id} className="flex items-center gap-3">
                <span className="text-3xl font-extrabold text-primary w-8">{i + 1}</span>
                <img src={a.cover} className="h-10 w-10 rounded-full object-cover" alt="" />
                <span className="font-medium">{a.nombre}</span>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </AppLayout>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
      <p className="text-4xl font-extrabold">{value}</p>
    </div>
  );
}
