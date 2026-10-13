import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { api, type Evento, type Usuario } from "./api";

/* ---------- Autenticação (usuário comum, sem permissões) ---------- */
const LS_USER = "saber.user";

interface AuthCtx {
  user: Usuario | null;
  login: (email: string, senha: string) => Promise<Usuario>;
  entrar: (u: Usuario) => void;
  logout: () => void;
}
const Auth = createContext<AuthCtx>(null as unknown as AuthCtx);
export const useAuth = () => useContext(Auth);

/* ---------- Eventos ---------- */
interface EventosCtx {
  eventos: Evento[];
  carregando: boolean;
  erro: string | null;
  recarregar: () => Promise<void>;
}
const Eventos = createContext<EventosCtx>(null as unknown as EventosCtx);
export const useEventos = () => useContext(Eventos);

/* ---------- Meu bairro (coleta) ---------- */
const LS_BAIRRO = "saber.bairro";
interface BairroCtx {
  bairroId: string | null;
  definir: (id: string | null) => void;
}
const Bairro = createContext<BairroCtx>(null as unknown as BairroCtx);
export const useBairro = () => useContext(Bairro);

export function Providers({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Usuario | null>(() => {
    try {
      const salvo = localStorage.getItem(LS_USER);
      return salvo ? (JSON.parse(salvo) as Usuario) : null;
    } catch {
      return null;
    }
  });

  const entrar = useCallback((u: Usuario) => {
    localStorage.setItem(LS_USER, JSON.stringify(u));
    setUser(u);
  }, []);

  const login = useCallback(
    async (email: string, senha: string) => {
      const u = await api.login(email, senha);
      entrar(u);
      return u;
    },
    [entrar],
  );

  const logout = useCallback(() => {
    localStorage.removeItem(LS_USER);
    setUser(null);
  }, []);

  const [eventos, setEventos] = useState<Evento[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  const [bairroId, setBairroId] = useState<string | null>(() => localStorage.getItem(LS_BAIRRO));

  const recarregar = useCallback(async () => {
    setCarregando(true);
    setErro(null);
    try {
      setEventos(await api.listarEventos());
    } catch (e: any) {
      setErro(e.message ?? "Erro ao carregar eventos");
    } finally {
      setCarregando(false);
    }
  }, []);
  useEffect(() => {
    recarregar();
  }, [recarregar]);

  const definirBairro = useCallback((id: string | null) => {
    setBairroId(id);
    if (id) localStorage.setItem(LS_BAIRRO, id);
    else localStorage.removeItem(LS_BAIRRO);
  }, []);

  const authValue = useMemo(() => ({ user, login, entrar, logout }), [user, login, entrar, logout]);
  const evValue = useMemo(() => ({ eventos, carregando, erro, recarregar }), [eventos, carregando, erro, recarregar]);
  const bValue = useMemo(() => ({ bairroId, definir: definirBairro }), [bairroId, definirBairro]);

  return (
    <Auth.Provider value={authValue}>
      <Eventos.Provider value={evValue}>
        <Bairro.Provider value={bValue}>{children}</Bairro.Provider>
      </Eventos.Provider>
    </Auth.Provider>
  );
}

/* ---------- Navegação simples (pilha) ---------- */
export type Route =
  | { name: "home" }
  | { name: "eventos" }
  | { name: "evento"; id: number }
  | { name: "coleta" }
  | { name: "onibus" }
  | { name: "cotas" }
  | { name: "servicos" }
  | { name: "login" }
  | { name: "cadastro" }
  | { name: "perfil" };

interface NavCtx {
  route: Route;
  push: (r: Route) => void;
  back: () => void;
  tab: (r: Route) => void;
  canBack: boolean;
}
export const NavContext = createContext<NavCtx>(null as unknown as NavCtx);
export const useNav = () => useContext(NavContext);
