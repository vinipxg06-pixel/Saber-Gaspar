import { LogOut, MapPin, Trash2, User } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { api } from "../api";
import { LOCAIS, nomeCompleto } from "../data/coleta";
import { useAuth, useBairro, useNav } from "../store";
import { Body, Btn, C, Field, Header, cardStyle } from "../ui";

export function Login() {
  const { login } = useAuth();
  const { push, tab } = useNav();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const u = await login(email, senha);
      toast.success(`Bem-vindo(a), ${u.nome.split(" ")[0]}!`);
      tab({ name: "perfil" });
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Entrar" subtitle="Acesse sua conta" />
      <Body>
        <form onSubmit={enviar}>
          <Field label="E-mail" type="email" value={email} onChange={setEmail} autoComplete="email" placeholder="voce@email.com" />
          <Field label="Senha" type="password" value={senha} onChange={setSenha} autoComplete="current-password" placeholder="Sua senha" />
          {erro && <p role="alert" className="text-xs font-bold mb-3" style={{ color: C.red }}>{erro}</p>}
          <Btn type="submit" loading={carregando}>Entrar</Btn>
        </form>
        <div className="flex flex-col items-center gap-3 mt-5 text-sm font-bold">
          <button onClick={() => push({ name: "cadastro" })} style={{ color: C.green }}>Ainda não tenho conta — cadastrar</button>
        </div>
      </Body>
    </div>
  );
}

export function Cadastro() {
  const { entrar } = useAuth();
  const { tab } = useNav();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function enviar(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      const u = await api.cadastrar(nome.trim(), email.trim().toLowerCase(), senha);
      entrar(u);
      toast.success("Conta criada com sucesso!");
      tab({ name: "perfil" });
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Criar conta" subtitle="Leva menos de um minuto" />
      <Body>
        <form onSubmit={enviar}>
          <Field label="Nome" value={nome} onChange={setNome} autoComplete="name" />
          <Field label="E-mail" type="email" value={email} onChange={setEmail} autoComplete="email" />
          <Field label="Senha" type="password" value={senha} onChange={setSenha} autoComplete="new-password" />
          {erro && <p role="alert" className="text-xs font-bold mb-3" style={{ color: C.red }}>{erro}</p>}
          <Btn type="submit" loading={carregando}>Cadastrar</Btn>
        </form>
      </Body>
    </div>
  );
}

export function Perfil() {
  const { user, logout, entrar } = useAuth();
  const { push, tab } = useNav();
  const { bairroId, definir } = useBairro();
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(user?.nome ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [carregando, setCarregando] = useState(false);

  if (!user) {
    return (
      <div className="flex flex-col flex-1 min-h-0">
        <Header title="Conta" subtitle="Entre para ter acesso completo" />
        <Body>
          <div className="rounded-2xl p-6 text-center" style={cardStyle}>
            <div className="w-14 h-14 rounded-full mx-auto flex items-center justify-center" style={{ background: "#E3F2E8", color: C.green }}>
              <User size={26} />
            </div>
            <p className="text-sm font-black mt-3" style={{ color: C.ink }}>Você não está conectado</p>
            <p className="text-xs font-semibold mt-1.5 mb-5 leading-relaxed" style={{ color: C.muted }}>
              As informações da cidade estão abertas a todos. Entre para gerenciar seus dados.
            </p>
            <div className="flex flex-col gap-2.5">
              <Btn onClick={() => push({ name: "login" })}>Entrar</Btn>
              <Btn variant="ghost" onClick={() => push({ name: "cadastro" })}>Criar conta</Btn>
            </div>
          </div>
        </Body>
      </div>
    );
  }

  async function salvar(e: FormEvent) {
    e.preventDefault();
    setErro("");
    setCarregando(true);
    try {
      // o back-end sempre regrava a senha: se o campo ficar vazio, reenviamos a atual
      const atualizado = await api.atualizarUsuario(user!.idUsuario, nome.trim(), email.trim().toLowerCase(), senha || user!.senha);
      entrar(atualizado);
      setSenha("");
      setEditando(false);
      toast.success("Dados atualizados");
    } catch (err: any) {
      setErro(err.message);
    } finally {
      setCarregando(false);
    }
  }

  async function excluir() {
    if (!window.confirm("Excluir sua conta definitivamente? Essa ação não pode ser desfeita.")) return;
    try {
      await api.excluirUsuario(user!.idUsuario);
      logout();
      toast.success("Conta excluída");
      tab({ name: "home" });
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Conta" />
      <Body>
        <div className="rounded-2xl p-5 flex items-center gap-4" style={cardStyle}>
          <div className="w-14 h-14 rounded-full flex items-center justify-center text-xl font-black text-white shrink-0" style={{ background: C.green }}>
            {user.nome.trim().charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-base font-black truncate" style={{ color: C.ink }}>{user.nome}</p>
            <p className="text-xs font-semibold truncate" style={{ color: C.muted }}>{user.email}</p>
          </div>
        </div>

        <div className="rounded-2xl p-4 mt-4" style={cardStyle}>
          <label className="flex items-center gap-2 text-xs font-black mb-2" style={{ color: C.muted }}>
            <MapPin size={13} /> Meu bairro (coleta de lixo)
          </label>
          <select
            value={bairroId ?? ""}
            onChange={(e) => definir(e.target.value || null)}
            className="w-full px-3 py-2.5 rounded-xl text-sm font-bold outline-none"
            style={{ background: "#F2F7F4", color: C.ink, border: "1.5px solid rgba(27,107,58,0.18)" }}
          >
            <option value="">Selecione…</option>
            {LOCAIS.map((l) => <option key={l.id} value={l.id}>{nomeCompleto(l)}</option>)}
          </select>
        </div>

        {editando ? (
          <form onSubmit={salvar} className="mt-4">
            <Field label="Nome" value={nome} onChange={setNome} />
            <Field label="E-mail" type="email" value={email} onChange={setEmail} />
            <Field label="Nova senha (deixe em branco para manter)" type="password" value={senha} onChange={setSenha} required={false} autoComplete="new-password" />
            {erro && <p role="alert" className="text-xs font-bold mb-3" style={{ color: C.red }}>{erro}</p>}
            <div className="grid grid-cols-2 gap-2.5">
              <Btn variant="ghost" onClick={() => { setEditando(false); setErro(""); }}>Cancelar</Btn>
              <Btn type="submit" loading={carregando}>Salvar</Btn>
            </div>
          </form>
        ) : (
          <div className="flex flex-col gap-2.5 mt-4">
            <Btn variant="soft" onClick={() => { setNome(user.nome); setEmail(user.email); setEditando(true); }}>Editar dados</Btn>
            <Btn variant="ghost" onClick={() => { logout(); toast("Você saiu da conta"); }}><LogOut size={15} /> Sair</Btn>
            <Btn variant="danger" onClick={excluir}><Trash2 size={15} /> Excluir minha conta</Btn>
          </div>
        )}
      </Body>
    </div>
  );
}
