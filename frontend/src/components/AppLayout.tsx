import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  Home, Search, Library, Heart, Users, BarChart3, Sparkles,
  Calendar, Settings, UserPlus, Music2,
} from "lucide-react";
import { ReactNode } from "react";

const nav = [
  { to: "/", label: "Inicio", icon: Home },
  { to: "/buscar", label: "Buscar", icon: Search },
  { to: "/playlists", label: "Tus playlists", icon: Library },
  { to: "/favoritos", label: "Favoritos", icon: Heart },
  { to: "/seguidos", label: "Artistas seguidos", icon: Users },
  { to: "/top", label: "Top y estadísticas", icon: BarChart3 },
  { to: "/recomendaciones", label: "Para ti", icon: Sparkles },
  { to: "/wrapped", label: "Resumen anual", icon: Calendar },
  { to: "/admin", label: "Admin", icon: Settings },
  { to: "/registro", label: "Crear cuenta", icon: UserPlus },
];

function NavItem({ to, label, icon: Icon }: { to: string; label: string; icon: typeof Home }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const active = path === to || (to !== "/" && path.startsWith(to));
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-accent text-foreground"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
      }`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </Link>
  );
}

export function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <aside className="hidden lg:flex w-64 flex-col border-r border-border bg-sidebar p-4 gap-1 sticky top-0 h-screen">
        <Link to="/" className="flex items-center gap-2 px-2 py-3 mb-2">
          <div className="h-9 w-9 rounded-full bg-primary grid place-items-center shadow-glow">
            <Music2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-extrabold tracking-tight">Sonara</span>
        </Link>
        <nav className="flex flex-col gap-0.5">
          {nav.map((n) => <NavItem key={n.to} {...n} />)}
        </nav>
        <div className="mt-auto rounded-xl bg-card-grad p-4 text-sm">
          <p className="font-semibold mb-1">Plan Free</p>
          <p className="text-muted-foreground text-xs mb-3">Subí a Premium para sin anuncios y descargas.</p>
          <button className="w-full rounded-full bg-primary text-primary-foreground font-semibold py-2 text-xs hover:scale-[1.02] transition">Mejorar plan</button>
        </div>
      </aside>

      <main className="flex-1 min-w-0">
        <div className="lg:hidden flex items-center justify-between p-4 border-b border-border bg-sidebar">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-full bg-primary grid place-items-center"><Music2 className="h-4 w-4 text-primary-foreground" /></div>
            <span className="font-extrabold">Sonara</span>
          </Link>
          <Link to="/buscar" className="text-muted-foreground"><Search className="h-5 w-5" /></Link>
        </div>
        <div className="p-6 lg:p-10 max-w-7xl mx-auto">
          {children ?? <Outlet />}
        </div>
      </main>
    </div>
  );
}
