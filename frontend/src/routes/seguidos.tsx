import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { artistas } from "@/lib/mock";

// =====================================================================
// PANTALLA: Artistas seguidos (HU6)
// Endpoints FastAPI:
//   GET    /usuarios/{id}/seguidos               -> artistas que sigue
//   POST   /usuarios/{id}/seguidos  body:{artista_id}
//                                                -> seguir (sin duplicar)
//   DELETE /usuarios/{id}/seguidos/{artista_id}  -> dejar de seguir
// =====================================================================

export const Route = createFileRoute("/seguidos")({
  head: () => ({ meta: [{ title: "Artistas seguidos — Sonara" }] }),
  component: Seguidos,
});

function Seguidos() {
  return (
    <AppLayout>
      <PageHeader eyebrow="Tu biblioteca" title="Artistas que seguís" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {artistas.map((a) => (
          <Link key={a.id} to="/artistas/$id" params={{ id: String(a.id) }} className="rounded-xl bg-card hover:bg-elevated p-4 text-center transition">
            <img src={a.cover} alt={a.nombre} className="aspect-square w-full rounded-full object-cover mb-3" />
            <p className="font-semibold">{a.nombre}</p>
            <p className="text-xs text-muted-foreground">{a.genero_musical} · {a.pais}</p>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
