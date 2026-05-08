import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { useState, useMemo } from "react";
import { artistas, albumes, canciones, formatDur } from "@/lib/mock";
import { Search } from "lucide-react";

// =====================================================================
// PANTALLA: Buscar (HU8)
// Endpoint FastAPI:
//   GET /buscar?q={texto}
//     -> { canciones: Cancion[], artistas: Artista[], albumes: Album[] }
// Notas: búsqueda por coincidencia parcial, case-insensitive.
// =====================================================================

export const Route = createFileRoute("/buscar")({
  head: () => ({
    meta: [
      { title: "Buscar — Sonara" },
      { name: "description", content: "Buscá canciones, artistas y álbumes." },
    ],
  }),
  component: Buscar,
});

function Buscar() {
  const [q, setQ] = useState("");
  const ql = q.toLowerCase();
  const r = useMemo(() => ({
    canciones: ql ? canciones.filter((c) => c.titulo.toLowerCase().includes(ql)) : [],
    artistas: ql ? artistas.filter((a) => a.nombre.toLowerCase().includes(ql) || a.genero_musical.toLowerCase().includes(ql)) : [],
    albumes: ql ? albumes.filter((a) => a.titulo.toLowerCase().includes(ql)) : [],
  }), [ql]);

  return (
    <AppLayout>
      <PageHeader eyebrow="Explorar" title="Buscar" description="Canciones, artistas o álbumes." />

      <div className="relative mb-8 max-w-xl">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <input
          autoFocus
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="¿Qué querés escuchar?"
          className="w-full pl-11 pr-4 py-3 rounded-full bg-elevated border border-border focus:border-primary focus:outline-none transition"
        />
      </div>

      {!ql && <p className="text-muted-foreground">Empezá a escribir para buscar.</p>}

      {ql && (
        <div className="space-y-10">
          <Section title={`Canciones (${r.canciones.length})`}>
            <ul className="divide-y divide-border rounded-xl overflow-hidden bg-card">
              {r.canciones.map((c) => (
                <li key={c.id} className="flex items-center justify-between px-4 py-3 hover:bg-elevated">
                  <span className="font-medium">{c.titulo}</span>
                  <span className="text-muted-foreground text-sm">{formatDur(c.duracion_seg)}</span>
                </li>
              ))}
              {r.canciones.length === 0 && <li className="px-4 py-3 text-muted-foreground text-sm">Sin resultados</li>}
            </ul>
          </Section>

          <Section title={`Artistas (${r.artistas.length})`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {r.artistas.map((a) => (
                <div key={a.id} className="rounded-xl bg-card p-4 text-center">
                  <img src={a.cover} alt={a.nombre} className="aspect-square w-full rounded-full object-cover mb-3" />
                  <p className="font-semibold">{a.nombre}</p>
                  <p className="text-xs text-muted-foreground">{a.genero_musical}</p>
                </div>
              ))}
            </div>
          </Section>

          <Section title={`Álbumes (${r.albumes.length})`}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {r.albumes.map((a) => (
                <div key={a.id} className="rounded-xl bg-card p-4">
                  <img src={a.cover} alt={a.titulo} className="aspect-square w-full rounded-lg object-cover mb-3" />
                  <p className="font-semibold">{a.titulo}</p>
                  <p className="text-xs text-muted-foreground">{a.anio}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>
      )}
    </AppLayout>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      {children}
    </section>
  );
}
