import { Calendar, Clock, ExternalLink, MapPin } from "lucide-react";
import { useState } from "react";
import { useEventos } from "../store";
import { Body, C, Empty, ErrorBox, Header, Loading, cardStyle, dataLonga, horaCurta } from "../ui";
import { EventoCard } from "./EventoCard";

export function Eventos() {
  const { eventos, carregando, erro, recarregar } = useEventos();
  const [aba, setAba] = useState<"proximos" | "passados">("proximos");
  const agora = Date.now() - 3600_000;
  const lista = eventos
    .filter((e) => (aba === "proximos" ? new Date(e.dataHoraEvento).getTime() >= agora : new Date(e.dataHoraEvento).getTime() < agora))
    .sort((a, b) =>
      aba === "proximos"
        ? a.dataHoraEvento.localeCompare(b.dataHoraEvento)
        : b.dataHoraEvento.localeCompare(a.dataHoraEvento),
    );

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Eventos da cidade" subtitle="Programação em Gaspar" />
      <Body>
        <div className="flex gap-2 mb-4 p-1 rounded-2xl" style={{ background: "#E3F2E8" }}>
          {(["proximos", "passados"] as const).map((k) => (
            <button
              key={k}
              onClick={() => setAba(k)}
              className="flex-1 py-2 rounded-xl text-xs font-black transition-all"
              style={aba === k ? { background: C.green, color: "#fff" } : { color: C.green }}
            >
              {k === "proximos" ? "Próximos" : "Já aconteceram"}
            </button>
          ))}
        </div>
        {carregando ? (
          <Loading />
        ) : erro ? (
          <ErrorBox message={erro} onRetry={recarregar} />
        ) : lista.length === 0 ? (
          <Empty icon={<Calendar size={22} />} title={aba === "proximos" ? "Sem eventos programados" : "Nenhum evento anterior"} />
        ) : (
          <div className="flex flex-col gap-3">
            {lista.map((e) => <EventoCard key={e.idEvento} evento={e} />)}
          </div>
        )}
      </Body>
    </div>
  );
}

export function EventoDetalhe({ id }: { id: number }) {
  const { eventos, carregando } = useEventos();
  const e = eventos.find((x) => x.idEvento === id);
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Detalhes do evento" />
      <Body>
        {carregando ? (
          <Loading />
        ) : !e ? (
          <Empty icon={<Calendar size={22} />} title="Evento não encontrado" text="Ele pode ter sido removido pela prefeitura." />
        ) : (
          <div className="rounded-2xl p-5" style={cardStyle}>
            <h2 className="text-xl font-black leading-snug" style={{ color: C.ink }}>{e.titulo}</h2>
            <div className="flex flex-col gap-2.5 mt-4" style={{ color: C.muted }}>
              <div className="flex items-start gap-2.5">
                <Calendar size={16} className="mt-0.5 shrink-0" style={{ color: C.green }} />
                <span className="text-sm font-bold capitalize">{dataLonga(e.dataHoraEvento)}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="shrink-0" style={{ color: C.green }} />
                <span className="text-sm font-bold">{horaCurta(e.dataHoraEvento)}</span>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0" style={{ color: C.green }} />
                <span className="text-sm font-bold">{e.local}</span>
              </div>
            </div>
            <div className="h-px my-4" style={{ background: "rgba(27,107,58,0.12)" }} />
            <p className="text-sm font-medium leading-relaxed whitespace-pre-line" style={{ color: C.ink }}>{e.descricao}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(e.local + ", Gaspar, SC")}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-black"
              style={{ background: "#E3F2E8", color: C.green }}
            >
              <ExternalLink size={15} /> Ver no mapa
            </a>
          </div>
        )}
      </Body>
    </div>
  );
}
