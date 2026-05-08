import { createFileRoute, Link } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { playlists } from "@/lib/mock";
import { Plus } from "lucide-react";
import { useState } from "react";

// =====================================================================
// PANTALLA: Mis playlists (HU3)
// Endpoints FastAPI:
//   GET    /playlists?usuario_id={id}             -> listar playlists del usuario
//   POST   /playlists  body:{nombre,usuario_id,es_publica}
//                                                 -> crear (nombre único por usuario)
//   PATCH  /playlists/{id}  body:{nombre?,es_publica?,colaborativa?}
//                                                 -> editar (solo dueño valida con usuario_id)
//   DELETE /playlists/{id}                        -> eliminar (solo dueño)
// =====================================================================

export const Route = createFileRoute("/playlists/")({
  head: () => ({
    meta: [{ title: "Mis playlists — Sonara" }, { name: "description", content: "Tus playlists creadas." }],
  }),
  component: PlaylistsIndex,
});

function PlaylistsIndex() {
  const [nombre, setNombre] = useState("");
  return (
    <AppLayout>
      <PageHeader
        eyebrow="Tu biblioteca"
        title="Mis playlists"
        description="Creá, editá y compartí tus playlists."
      />

      <form
        onSubmit={(e) => { e.preventDefault(); /* POST /playlists */ setNombre(""); }}
        className="flex gap-2 mb-8 max-w-lg"
      >
        <input
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Nombre de la nueva playlist"
          className="flex-1 px-4 py-2 rounded-full bg-elevated border border-border focus:border-primary focus:outline-none"
        />
        <button className="rounded-full bg-primary text-primary-foreground font-semibold px-5 py-2 flex items-center gap-2 hover:scale-[1.02] transition">
          <Plus className="h-4 w-4" /> Crear
        </button>
      </form>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {playlists.map((p) => (
          <Link key={p.id} to="/playlists/$id" params={{ id: String(p.id) }} className="rounded-xl bg-card hover:bg-elevated p-4 transition">
            <img src={p.cover} alt={p.nombre} className="aspect-square w-full rounded-lg object-cover mb-3" />
            <p className="font-semibold truncate">{p.nombre}</p>
            <p className="text-xs text-muted-foreground">
              {p.es_publica ? "Pública" : "Privada"}{p.colaborativa ? " · Colaborativa" : ""}
            </p>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
