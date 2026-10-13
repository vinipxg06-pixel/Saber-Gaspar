import { AlertTriangle, Building2, Bus, ChevronRight, MapPin, Search, Trash2, Truck, Waves, X, Calendar } from "lucide-react";
import { useMemo, useState } from "react";
import { LOCAIS, diasAteProxima, nomeCompleto, rotuloProxima } from "../data/coleta";
import { useAuth, useBairro, useEventos, useNav, type Route } from "../store";
import { C, Empty, ErrorBox, Loading, SectionTitle, cardStyle, horaCurta } from "../ui";
import { EventoCard } from "./EventoCard";

const ACOES: { id: string; label: string; desc: string; icon: any; color: string; bg: string; route: Route }[] = [
  { id: "servicos", label: "Serviços Públicos", desc: "Documentos e atendimento", icon: Building2, color: "#1B6B3A", bg: "#E3F2E8", route: { name: "servicos" } },
  { id: "coleta", label: "Coleta de Lixo", desc: "Horários por região", icon: Truck, color: "#C8860A", bg: "#FEF3C7", route: { name: "coleta" } },
  { id: "onibus", label: "Pontos de Ônibus", desc: "Linhas e trajetos", icon: Bus, color: "#1A5FA8", bg: "#DBEAFE", route: { name: "onibus" } },
  { id: "cotas", label: "Cotas de Alagamento", desc: "Mapa de cotas de enchente", icon: Waves, color: "#0E7490", bg: "#CFFAFE", route: { name: "cotas" } },
];

function saudacao() {
  const h = new Date().getHours();
  if (h >= 5 && h < 12) return "Bom dia";
  if (h >= 12 && h < 18) return "Boa tarde";
  return "Boa noite";
}

export default function Home() {
  const { push, tab } = useNav();
  const { user } = useAuth();
  const { eventos, carregando, erro, recarregar } = useEventos();
  const { bairroId } = useBairro();
  const [busca, setBusca] = useState("");

  const agora = new Date();
  const proximos = useMemo(
    () => eventos.filter((e) => new Date(e.dataHoraEvento).getTime() >= agora.getTime() - 3600_000).slice(0, 3),
    [eventos], // eslint-disable-line react-hooks/exhaustive-deps
  );

  // aviso: evento hoje ou amanhã
  const aviso = useMemo(() => {
    const hoje = new Date();
    for (const e of eventos) {
      const d = new Date(e.dataHoraEvento);
      const diff = Math.round(
        (new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime() -
          new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate()).getTime()) / 86400000,
      );
      if (diff === 0 || diff === 1) return { e, quando: diff === 0 ? "Hoje" : "Amanhã" };
    }
    return null;
  }, [eventos]);

  const termo = busca.trim().toLowerCase();
  const resAcoes = termo ? ACOES.filter((a) => (a.label + " " + a.desc).toLowerCase().includes(termo)) : [];
  const resEventos = termo ? eventos.filter((e) => (e.titulo + " " + e.local + " " + e.descricao).toLowerCase().includes(termo)) : [];
  const resBairros = termo ? LOCAIS.filter((l) => nomeCompleto(l).toLowerCase().includes(termo)).slice(0, 4) : [];

  const meuBairro = LOCAIS.find((l) => l.id === bairroId);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* App bar */}
      <div className="px-5 pt-3 pb-5 shrink-0" style={{ background: "linear-gradient(175deg, #1B6B3A 0%, #155c30 100%)" }}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <p className="text-sm font-semibold" style={{ color: "rgba(255,255,255,0.65)" }}>
              {saudacao()}{user ? `, ${user.nome.split(" ")[0]}` : ","}
            </p>
            <h1 className="text-2xl font-black text-white leading-tight">Gaspar</h1>
            <div className="flex items-center gap-1.5 mt-1">
              <MapPin size={11} style={{ color: "rgba(255,255,255,0.55)" }} />
              <span className="text-xs font-medium" style={{ color: "rgba(255,255,255,0.55)" }}>
                Gaspar, SC — Vale do Itajaí
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: "rgba(255,255,255,0.12)", border: "1.5px solid rgba(255,255,255,0.2)" }}>
            <span className="text-xl leading-none">🏙️</span>
          </div>
        </div>
        <div className="flex gap-1 mb-4 rounded-full overflow-hidden h-1">
          <div className="flex-1" style={{ background: "#D4A017" }} />
          <div className="flex-1" style={{ background: "#ffffff" }} />
          <div className="flex-1" style={{ background: "#D4A017" }} />
        </div>
        <div className="flex items-center gap-3 px-4 py-3 rounded-2xl" style={{ background: "rgba(255,255,255,0.14)", border: "1px solid rgba(255,255,255,0.2)" }}>
          <Search size={15} style={{ color: "rgba(255,255,255,0.6)" }} />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="flex-1 bg-transparent text-white text-sm font-medium placeholder:text-white/50 outline-none min-w-0"
            placeholder="Buscar serviços, eventos, bairros..."
            aria-label="Buscar"
          />
          {busca && (
            <button onClick={() => setBusca("")} aria-label="Limpar busca">
              <X size={15} color="#fff" />
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto no-scrollbar">
        <div className="px-4 pt-5 pb-8">
          {termo ? (
            <div className="flex flex-col gap-5">
              {!resAcoes.length && !resEventos.length && !resBairros.length && (
                <Empty icon={<Search size={22} />} title="Nada encontrado" text={`Não encontramos resultados para "${busca}".`} />
              )}
              {resAcoes.length > 0 && (
                <div>
                  <SectionTitle>Atalhos</SectionTitle>
                  <div className="flex flex-col gap-2">
                    {resAcoes.map((a) => (
                      <button key={a.id} onClick={() => push(a.route)} className="rounded-2xl p-3.5 text-left flex items-center gap-3" style={cardStyle}>
                        <a.icon size={18} style={{ color: a.color }} />
                        <span className="text-sm font-black" style={{ color: C.ink }}>{a.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {resBairros.length > 0 && (
                <div>
                  <SectionTitle>Coleta por bairro</SectionTitle>
                  <div className="flex flex-col gap-2">
                    {resBairros.map((l) => (
                      <button key={l.id} onClick={() => push({ name: "coleta" })} className="rounded-2xl p-3.5 text-left flex items-center gap-3" style={cardStyle}>
                        <Truck size={18} style={{ color: C.amber }} />
                        <span className="text-sm font-black" style={{ color: C.ink }}>{nomeCompleto(l)}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {resEventos.length > 0 && (
                <div>
                  <SectionTitle>Eventos</SectionTitle>
                  <div className="flex flex-col gap-3">
                    {resEventos.map((e) => <EventoCard key={e.idEvento} evento={e} />)}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Acesso rápido */}
              <div className="mb-6">
                <SectionTitle>Acesso Rápido</SectionTitle>
                <div className="grid grid-cols-2 gap-3">
                  {ACOES.map((a) => {
                    const Icon = a.icon;
                    return (
                      <button key={a.id} onClick={() => push(a.route)} className="flex flex-col items-start gap-2.5 p-4 rounded-2xl text-left transition-all active:scale-95" style={cardStyle}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: a.bg }}>
                          <Icon size={20} style={{ color: a.color }} />
                        </div>
                        <div>
                          <p className="text-sm font-black leading-tight" style={{ color: C.ink }}>{a.label}</p>
                          <p className="text-xs font-medium mt-0.5" style={{ color: C.muted }}>{a.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Aviso: evento hoje/amanhã */}
              {aviso && (
                <div className="rounded-2xl p-4 mb-6" style={{ background: "linear-gradient(135deg, #FEF3C7, #FDE68A)", border: "1px solid rgba(200,134,10,0.25)" }}>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: C.amber }}>
                      <AlertTriangle size={14} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black uppercase tracking-wide" style={{ color: "#78450a" }}>{aviso.quando} na cidade</p>
                      <p className="text-sm font-semibold leading-snug mt-0.5" style={{ color: "#78450a" }}>
                        {aviso.e.titulo} — {horaCurta(aviso.e.dataHoraEvento)}, {aviso.e.local}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => push({ name: "evento", id: aviso.e.idEvento })}
                      className="flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl active:scale-95"
                      style={{ background: "rgba(200,134,10,0.15)", color: "#78450a", border: "1px solid rgba(200,134,10,0.3)" }}
                    >
                      Ver mais <ChevronRight size={12} />
                    </button>
                  </div>
                </div>
              )}

              {/* Coleta no meu bairro */}
              <div className="mb-6">
                <SectionTitle>Coleta no seu bairro</SectionTitle>
                {meuBairro ? (
                  <button onClick={() => push({ name: "coleta" })} className="w-full text-left rounded-2xl p-4" style={cardStyle}>
                    <p className="text-sm font-black" style={{ color: C.ink }}>{nomeCompleto(meuBairro)}</p>
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="rounded-xl p-3" style={{ background: "#FEF3C7" }}>
                        <p className="text-[11px] font-bold" style={{ color: "#78450a" }}>Convencional</p>
                        <p className="text-sm font-black" style={{ color: "#78450a" }}>
                          {rotuloProxima(diasAteProxima(meuBairro.convencional.dias))}
                        </p>
                        <p className="text-[11px] font-semibold" style={{ color: "#78450a" }}>à {meuBairro.convencional.turno === "Manhã" ? "manhã" : "tarde"}</p>
                      </div>
                      <div className="rounded-xl p-3" style={{ background: "#E3F2E8" }}>
                        <p className="text-[11px] font-bold" style={{ color: C.green }}>Seletiva</p>
                        <p className="text-sm font-black" style={{ color: C.green }}>
                          {rotuloProxima(diasAteProxima([meuBairro.seletiva.dia]))}
                        </p>
                        <p className="text-[11px] font-semibold" style={{ color: C.green }}>a partir das {meuBairro.seletiva.inicio}</p>
                      </div>
                    </div>
                  </button>
                ) : (
                  <button onClick={() => push({ name: "coleta" })} className="w-full text-left rounded-2xl p-4 flex items-center gap-3" style={cardStyle}>
                    <Trash2 size={20} style={{ color: C.amber }} />
                    <span className="text-sm font-bold flex-1" style={{ color: C.muted }}>Escolha seu bairro para ver quando o caminhão passa.</span>
                    <ChevronRight size={16} style={{ color: C.muted }} />
                  </button>
                )}
              </div>

              {/* Eventos */}
              <div>
                <SectionTitle
                  action={
                    <button onClick={() => tab({ name: "eventos" })} className="flex items-center gap-0.5 text-xs font-bold" style={{ color: C.green }}>
                      Ver agenda <ChevronRight size={13} />
                    </button>
                  }
                >
                  Próximos Eventos
                </SectionTitle>
                {carregando ? (
                  <Loading />
                ) : erro ? (
                  <ErrorBox message={erro} onRetry={recarregar} />
                ) : proximos.length === 0 ? (
                  <Empty icon={<Calendar size={22} />} title="Nenhum evento por enquanto" text="Assim que a prefeitura cadastrar novos eventos, eles aparecem aqui." />
                ) : (
                  <div className="flex flex-col gap-3">
                    {proximos.map((e) => <EventoCard key={e.idEvento} evento={e} />)}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
