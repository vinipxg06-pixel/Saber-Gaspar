import { Building2, Calendar, Home as HomeIcon, User, Wifi, Battery, Signal } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Toaster } from "sonner";
import { Cadastro, Login, Perfil } from "./screens/Conta";
import Coleta from "./screens/Coleta";
import Cotas from "./screens/Cotas";
import { EventoDetalhe, Eventos } from "./screens/Eventos";
import Home from "./screens/Home";
import Onibus from "./screens/Onibus";
import Servicos from "./screens/Servicos";
import { NavContext, Providers, type Route } from "./store";
import { C } from "./ui";

const TABS: { name: Route["name"]; label: string; icon: any; route: Route }[] = [
  { name: "home", label: "Início", icon: HomeIcon, route: { name: "home" } },
  { name: "eventos", label: "Eventos", icon: Calendar, route: { name: "eventos" } },
  { name: "servicos", label: "Serviços", icon: Building2, route: { name: "servicos" } },
  { name: "perfil", label: "Conta", icon: User, route: { name: "perfil" } },
];
const TAB_NAMES = TABS.map((t) => t.name);

function Screen({ route }: { route: Route }) {
  switch (route.name) {
    case "home": return <Home />;
    case "eventos": return <Eventos />;
    case "evento": return <EventoDetalhe id={route.id} />;
    case "coleta": return <Coleta />;
    case "onibus": return <Onibus />;
    case "cotas": return <Cotas />;
    case "servicos": return <Servicos />;
    case "login": return <Login />;
    case "cadastro": return <Cadastro />;
    case "perfil": return <Perfil />;
  }
}

function Shell() {
  const [stack, setStack] = useState<Route[]>([{ name: "home" }]);
  const route = stack[stack.length - 1];

  const push = useCallback((r: Route) => setStack((s) => [...s, r]), []);
  const back = useCallback(() => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)), []);
  const tab = useCallback((r: Route) => setStack([r]), []);
  const nav = useMemo(() => ({ route, push, back, tab, canBack: stack.length > 1 }), [route, push, back, tab, stack.length]);

  const [hora, setHora] = useState(() => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }));
  useEffect(() => {
    const t = setInterval(() => setHora(new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })), 30_000);
    return () => clearInterval(t);
  }, []);

  // aba ativa: a primeira da pilha que seja uma aba (ex.: Coleta aberta a partir do Início → Início)
  const abaAtiva = TAB_NAMES.includes(route.name) ? route.name : (stack.find((r) => TAB_NAMES.includes(r.name))?.name ?? "home");

  return (
    <NavContext.Provider value={nav}>
      <div className="app-stage" style={{ fontFamily: "'Nunito', sans-serif" }}>
        <div className="app-phone" style={{ background: C.bg }}>
          <div className="app-statusbar items-center justify-between px-7 shrink-0" style={{ background: "#164f2b", paddingTop: 14, paddingBottom: 6 }}>
            <span className="text-white text-xs font-bold">{hora}</span>
            <div className="flex items-center gap-1.5">
              <Signal size={13} color="#fff" /><Wifi size={13} color="#fff" /><Battery size={14} color="#fff" />
            </div>
          </div>

          <main className="flex flex-col flex-1 min-h-0">
            <Screen key={JSON.stringify(route)} route={route} />
          </main>

          <nav className="shrink-0 grid grid-cols-4" style={{ background: "#fff", borderTop: "1px solid rgba(27,107,58,0.12)", paddingBottom: "env(safe-area-inset-bottom)" }} aria-label="Navegação principal">
            {TABS.map((t) => {
              const ativo = abaAtiva === t.name;
              const Icon = t.icon;
              return (
                <button
                  key={t.name}
                  onClick={() => tab(t.route)}
                  aria-current={ativo ? "page" : undefined}
                  className="flex flex-col items-center gap-1 py-2.5 transition-colors"
                  style={{ color: ativo ? C.green : "#8AA395" }}
                >
                  <Icon size={21} strokeWidth={ativo ? 2.6 : 2} />
                  <span className="text-[11px] font-black">{t.label}</span>
                </button>
              );
            })}
          </nav>
          <Toaster position="top-center" richColors />
        </div>
      </div>
    </NavContext.Provider>
  );
}

export default function App() {
  return (
    <Providers>
      <Shell />
    </Providers>
  );
}
