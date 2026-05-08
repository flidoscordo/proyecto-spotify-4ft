import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { canciones, artistas, albumes, formatDur } from "@/lib/mock";
import { useState } from "react";

// =====================================================================
// PANTALLA: Admin — alta y estadísticas (HU2, HU14)
// Endpoints FastAPI:
//   POST /artistas  body:{ nombre, pais, genero_musical }                 (HU2)
//   POST /albumes   body:{ titulo, anio, artista_id }                     (HU2: artista obligatorio)
//   POST /canciones body:{ titulo, duracion_seg, album_id }               (HU2: album obligatorio, duracion>0)
//   GET  /canciones/{id}/estadisticas?desde=YYYY-MM-DD&hasta=YYYY-MM-DD   (HU14)
//     -> { reproducciones, reproducciones_validas, porcentaje_promedio_escuchado }
//        Si no hay datos, todos los campos en 0.
// =====================================================================

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Sonara" }] }),
  component: Admin,
});

function Admin() {
  const [tab, setTab] = useState<"artista" | "album" | "cancion" | "stats">("artista");
  return (
    <AppLayout>
      <PageHeader eyebrow="Panel" title="Administración" description="Gestioná el catálogo y revisá estadísticas." />

      <div className="flex gap-2 mb-6 border-b border-border">
        {([
          ["artista", "Nuevo artista"],
          ["album", "Nuevo álbum"],
          ["cancion", "Nueva canción"],
          ["stats", "Estadísticas de canción"],
        ] as const).map(([k, label]) => (
          <button key={k} onClick={() => setTab(k)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition ${
              tab === k ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
            }`}>{label}</button>
        ))}
      </div>

      {tab === "artista" && <FormCard title="Crear artista" endpoint="POST /artistas">
        <Input label="Nombre" /><Input label="País" /><Input label="Género musical" />
      </FormCard>}

      {tab === "album" && <FormCard title="Crear álbum" endpoint="POST /albumes">
        <Input label="Título" /><Input label="Año" type="number" />
        <Select label="Artista" options={artistas.map(a => [String(a.id), a.nombre])} />
      </FormCard>}

      {tab === "cancion" && <FormCard title="Crear canción" endpoint="POST /canciones">
        <Input label="Título" /><Input label="Duración (segundos)" type="number" />
        <Select label="Álbum" options={albumes.map(a => [String(a.id), a.titulo])} />
      </FormCard>}

      {tab === "stats" && <StatsView />}
    </AppLayout>
  );
}

function StatsView() {
  const [id, setId] = useState("1");
  const c = canciones.find((x) => x.id === Number(id));
  return (
    <div className="space-y-6">
      <div className="rounded-2xl bg-card p-6 max-w-md">
        <Select label="Canción" options={canciones.map(c => [String(c.id), c.titulo])} value={id} onChange={setId} />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <Input label="Desde" type="date" /><Input label="Hasta" type="date" />
        </div>
        <p className="text-xs text-muted-foreground mt-3">GET /canciones/{id}/estadisticas?desde=&hasta=</p>
      </div>

      {c && (
        <div className="grid md:grid-cols-3 gap-4">
          <Metric label="Reproducciones totales" value="1.284" />
          <Metric label="Reproducciones válidas" value="987" hint="≥30% de la duración" />
          <Metric label="% promedio escuchado" value="64%" hint={`Duración: ${formatDur(c.duracion_seg)}`} />
        </div>
      )}
    </div>
  );
}

function FormCard({ title, endpoint, children }: { title: string; endpoint: string; children: React.ReactNode }) {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="rounded-2xl bg-card p-6 max-w-lg space-y-4">
      <div>
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-xs text-muted-foreground font-mono">{endpoint}</p>
      </div>
      {children}
      <button className="rounded-full bg-primary text-primary-foreground font-semibold px-6 py-2.5 hover:scale-[1.02] transition">Guardar</button>
    </form>
  );
}

function Input({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">{label}</span>
      <input type={type} className="w-full px-3.5 py-2 rounded-lg bg-elevated border border-border focus:border-primary outline-none" />
    </label>
  );
}

function Select({
  label, options, value, onChange,
}: { label: string; options: [string, string][]; value?: string; onChange?: (v: string) => void }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">{label}</span>
      <select
        value={value} onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3.5 py-2 rounded-lg bg-elevated border border-border focus:border-primary outline-none"
      >
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

function Metric({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-2xl bg-card p-6">
      <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">{label}</p>
      <p className="text-4xl font-extrabold">{value}</p>
      {hint && <p className="text-xs text-muted-foreground mt-2">{hint}</p>}
    </div>
  );
}
