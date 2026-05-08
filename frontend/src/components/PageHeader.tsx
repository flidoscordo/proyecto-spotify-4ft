import { ReactNode } from "react";

export function PageHeader({
  eyebrow, title, description, action,
}: { eyebrow?: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow && <p className="text-xs uppercase tracking-[0.2em] text-primary mb-2">{eyebrow}</p>}
        <h1 className="text-4xl md:text-5xl font-extrabold">{title}</h1>
        {description && <p className="mt-2 text-muted-foreground max-w-2xl">{description}</p>}
      </div>
      {action}
    </header>
  );
}
