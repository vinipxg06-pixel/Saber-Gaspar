// Cliente da API do back-end Saber: Gaspar (Spring Boot).
// Em desenvolvimento o Vite repassa /api para http://localhost:8080 (ver vite.config.ts),
// então não é preciso configurar CORS no back-end.
export const API_URL: string = (import.meta as any).env?.VITE_API_URL ?? "";

export interface Usuario {
  idUsuario: number;
  nome: string;
  email: string;
  senha: string;
}

export interface Evento {
  idEvento: number;
  titulo: string;
  local: string;
  dataHoraEvento: string; // ISO local, ex.: 2026-10-14T10:00:00
  descricao: string;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

async function req<T>(path: string, opts: { method?: string; body?: unknown } = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(API_URL + path, {
      method: opts.method ?? "GET",
      headers: opts.body !== undefined ? { "Content-Type": "application/json" } : undefined,
      body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
    });
  } catch {
    throw new ApiError("Não foi possível conectar ao servidor. Verifique se o back-end está rodando.", 0);
  }

  if (!res.ok) {
    let msg = "O servidor não respondeu como esperado. Verifique se o back-end está rodando.";
    if (res.status === 401 || res.status === 403)
      msg = "O servidor bloqueou a requisição (Spring Security). Remova o starter de segurança do build.gradle.";
    else if (res.status === 404) msg = "Não encontrado.";
    throw new ApiError(msg, res.status);
  }
  if (res.status === 204) return undefined as T;
  const text = await res.text();
  return (text ? JSON.parse(text) : undefined) as T;
}

// O back-end devolve o id do evento como "idevento" (minúsculo); aceitamos as duas grafias.
function norm(e: any): Evento {
  return { ...e, idEvento: e.idEvento ?? e.idevento };
}

export const api = {
  /** Cadastro de usuário comum: POST /api/usuarios */
  cadastrar: async (nome: string, email: string, senha: string) => {
    try {
      return await req<Usuario>("/api/usuarios", { method: "POST", body: { nome, email, senha } });
    } catch (e: any) {
      if (e.status === 500 || e.status === 409)
        throw new ApiError("Não foi possível cadastrar. Esse e-mail pode já estar em uso.", e.status);
      throw e;
    }
  },

  /**
   * Login simples (o back-end ainda não tem endpoint de login):
   * busca os usuários e confere e-mail e senha.
   */
  login: async (email: string, senha: string): Promise<Usuario> => {
    const lista = await req<Usuario[]>("/api/usuarios");
    const u = lista.find((x) => x.email.toLowerCase() === email.trim().toLowerCase() && x.senha === senha);
    if (!u) throw new ApiError("E-mail ou senha inválidos", 401);
    return u;
  },

  atualizarUsuario: (id: number, nome: string, email: string, senha: string) =>
    req<Usuario>(`/api/usuarios/${id}`, { method: "PATCH", body: { nome, email, senha } }),
  excluirUsuario: (id: number) => req<void>(`/api/usuarios/${id}`, { method: "DELETE" }),

  listarEventos: async () => (await req<any[]>("/api/eventos")).map(norm),
  obterEvento: async (id: number) => norm(await req<any>(`/api/eventos/${id}`)),
};
