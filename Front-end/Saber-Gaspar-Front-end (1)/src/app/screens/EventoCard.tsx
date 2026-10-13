import { Clock, MapPin } from "lucide-react";
import type { Evento } from "../api";
import { C, cardStyle, horaCurta, partesData } from "../ui";
import { useNav } from "../store";

export function EventoCard({ evento }: { evento: Evento }) {
  const { push } = useNav();
  const { dia, mes } = partesData(evento.dataHoraEvento);
  return (
    <button
      onClick={() => push({ name: "evento", id: evento.idEvento })}
      className="w-full text-left rounded-2xl p-3.5 flex gap-3.5 transition-all active:scale-[0.98]"
      style={cardStyle}
    >
      <div
        className="w-14 shrink-0 rounded-xl flex flex-col items-center justify-center py-2"
        style={{ background: C.green, color: "#fff" }}
      >
        <span className="text-xl font-black leading-none">{dia}</span>
        <span className="text-[10px] font-bold mt-1 tracking-wide">{mes}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-black leading-snug" style={{ color: C.ink }}>
          {evento.titulo}
        </h3>
        <div className="flex items-center gap-1 mt-1.5" style={{ color: C.muted }}>
          <Clock size={11} />
          <span className="text-xs font-semibold">{horaCurta(evento.dataHoraEvento)}</span>
        </div>
        <div className="flex items-center gap-1 mt-1" style={{ color: C.muted }}>
          <MapPin size={11} className="shrink-0" />
          <span className="text-xs font-medium truncate">{evento.local}</span>
        </div>
      </div>
    </button>
  );
}
