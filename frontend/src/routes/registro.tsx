import { createFileRoute } from "@tanstack/react-router";
import { AppLayout } from "@/components/AppLayout";
import { PageHeader } from "@/components/PageHeader";
import { useState } from "react";

// =====================================================================
// PANTALLA: Registro de usuario (HU1)
// Endpoint FastAPI:
//   POST /usuarios  body:{ email, nombre, plan }
//     -> 201 { id, email, nombre, plan, fecha_registro }
//     Validar email único, plan ∈ {free, premium, familiar}.
//     fecha_registro la setea el backend automáticamente.
// =====================================================================

export const Route = createFileRoute("/registro")({
  head: () => ({ meta: [{ title: "Crear cuenta — Sonara" }] }),
  component: Registro,
});

function Registro() {
  const [form, setForm] = useState({ email: "", nombre: "", plan: "free" });
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm({ ...form, [k]: e.target.value });

  return (
    <AppLayout>
      <PageHeader eyebrow="Empezá gratis" title="Crear tu cuenta" description="Es gratis y solo lleva 30 segundos." />
      <form
        onSubmit={(e) => { e.preventDefault(); /* POST /usuarios */ }}
        className="max-w-md space-y-4 rounded-2xl bg-card p-6"
      >
        <Field label="Email">
          <input type="email" required value={form.email} onChange={set("email")} className="input" />
        </Field>
        <Field label="Nombre">
          <input required value={form.nombre} onChange={set("nombre")} className="input" />
        </Field>
        <Field label="Plan">
          <select value={form.plan} onChange={set("plan")} className="input">
            <option value="free">Free</option>
            <option value="premium">Premium</option>
            <option value="familiar">Familiar</option>
          </select>
        </Field>
        <button className="w-full rounded-full bg-primary text-primary-foreground font-semibold py-3 hover:scale-[1.02] transition shadow-glow">
          Crear cuenta
        </button>
      </form>

      <style>{`.input{width:100%;padding:0.6rem 0.9rem;border-radius:0.6rem;background:var(--elevated);border:1px solid var(--border);color:var(--foreground);outline:none}
      .input:focus{border-color:var(--primary)}`}</style>
    </AppLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground mb-1.5 block">{label}</span>
      {children}
    </label>
  );
}
