import { Recycle, Search, Star, Trash2, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import {
  DIAS_CURTO, LOCAIS, diasAteProxima, formatarDias, nomeCompleto, rotuloProxima, type LocalColeta,
} from "../data/coleta";
import { useBairro } from "../store";
import { Body, C, Empty, Header, cardStyle } from "../ui";

type Tipo = "convencional" | "seletiva";

function Semana({ dias, cor }: { dias: number[]; cor: string }) {
  const hoje = new Date().getDay();
  return (
    <div className="flex gap-1.5" aria-label={"Dias: " + formatarDias(dias)}>
      {[1, 2, 3, 4, 5, 6].map((d) => {
        const ativo = dias.includes(d);
        return (
          <div
            key={d}
            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-black"
            style={{
              background: ativo ? cor : "#EEF3F0",
              color: ativo ? "#fff" : "#9BB0A3",
              outline: d === hoje ? `2px solid ${C.ink}` : "none",
              outlineOffset: 1,
            }}
          >
            {DIAS_CURTO[d].slice(0, 3)}
          </div>
        );
      })}
    </div>
  );
}

function Item({ l, tipo, favorito, onFav }: { l: LocalColeta; tipo: Tipo; favorito: boolean; onFav: () => void }) {
  const dias = tipo === "convencional" ? l.convencional.dias : [l.seletiva.dia];
  const prox = rotuloProxima(diasAteProxima(dias));
  const cor = tipo === "convencional" ? C.amber : C.green;
  return (
    <div className="rounded-2xl p-4" style={cardStyle}>
      <div className="flex items-start gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-black leading-snug" style={{ color: C.ink }}>{l.nome}</p>
          {l.detalhe && <p className="text-xs font-semibold mt-0.5" style={{ color: C.muted }}>{l.detalhe}</p>}
        </div>
        <button
          onClick={onFav}
          aria-label={favorito ? "Remover dos meus bairros" : "Definir como meu bairro"}
          className="p-1.5 -m-1.5 active:scale-90"
        >
          <Star size={20} fill={favorito ? C.amber : "none"} style={{ color: favorito ? C.amber : "#9BB0A3" }} />
        </button>
      </div>
      <div className="mt-3">
        <Semana dias={dias} cor={cor} />
      </div>
      <div className="flex items-center justify-between mt-3 text-xs font-bold" style={{ color: C.muted }}>
        <span>
          {tipo === "convencional"
            ? `${formatarDias(l.convencional.dias)} · ${l.convencional.turno === "Manhã" ? "de manhã" : "à tarde"}`
            : `${formatarDias([l.seletiva.dia])} · a partir das ${l.seletiva.inicio}`}
        </span>
        <span className="px-2 py-1 rounded-lg" style={{ background: tipo === "convencional" ? "#FEF3C7" : "#E3F2E8", color: tipo === "convencional" ? "#78450a" : C.green }}>
          {prox}
        </span>
      </div>
      {tipo === "convencional" && l.obs && (
        <p className="text-[11px] font-semibold mt-2 leading-snug" style={{ color: "#78450a" }}>* {l.obs}</p>
      )}
    </div>
  );
}

export default function Coleta() {
  const { bairroId, definir } = useBairro();
  const [tipo, setTipo] = useState<Tipo>("convencional");
  const [busca, setBusca] = useState("");
  const [soHoje, setSoHoje] = useState(false);
  const hoje = new Date().getDay();

  const lista = useMemo(() => {
    const t = busca.trim().toLowerCase();
    return LOCAIS.filter((l) => !t || nomeCompleto(l).toLowerCase().includes(t))
      .filter((l) => !soHoje || (tipo === "convencional" ? l.convencional.dias.includes(hoje) : l.seletiva.dia === hoje))
      .sort((a, b) => (a.id === bairroId ? -1 : b.id === bairroId ? 1 : 0));
  }, [busca, soHoje, tipo, bairroId, hoje]);

  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Coleta de lixo" subtitle="Horários por bairro e localidade" />
      <Body>
        <div className="flex gap-2 mb-3 p-1 rounded-2xl" style={{ background: "#E3F2E8" }}>
          {([
            ["convencional", "Convencional", Trash2],
            ["seletiva", "Seletiva (recicláveis)", Recycle],
          ] as const).map(([k, rot, Icon]) => (
            <button
              key={k}
              onClick={() => setTipo(k)}
              className="flex-1 py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 transition-all"
              style={tipo === k ? { background: C.green, color: "#fff" } : { color: C.green }}
            >
              <Icon size={13} /> {rot}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl mb-3" style={{ background: "#fff", border: "1.5px solid rgba(27,107,58,0.18)" }}>
          <Search size={15} style={{ color: C.muted }} />
          <input
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Procurar bairro ou localidade"
            className="flex-1 bg-transparent text-sm font-semibold outline-none min-w-0"
            style={{ color: C.ink }}
            aria-label="Procurar bairro"
          />
        </div>

        <button
          onClick={() => setSoHoje((v) => !v)}
          className="px-3.5 py-2 rounded-full text-xs font-black mb-4 flex items-center gap-1.5"
          style={soHoje ? { background: C.green, color: "#fff" } : { background: "#fff", color: C.green, border: "1.5px solid rgba(27,107,58,0.25)" }}
        >
          <Truck size={13} /> Passa hoje
        </button>

        {lista.length === 0 ? (
          <Empty icon={<Truck size={22} />} title="Nenhum resultado" text={soHoje ? "Hoje não há coleta nesse tipo para os bairros filtrados." : "Tente outro nome de bairro."} />
        ) : (
          <div className="flex flex-col gap-3">
            {lista.map((l) => (
              <Item key={l.id} l={l} tipo={tipo} favorito={l.id === bairroId} onFav={() => definir(l.id === bairroId ? null : l.id)} />
            ))}
          </div>
        )}
        <p className="text-[11px] font-semibold mt-5 leading-relaxed text-center" style={{ color: C.muted }}>
          Toque na estrela para fixar seu bairro na tela inicial. Fonte: calendário de coleta 2025 da Prefeitura de Gaspar.
        </p>
      </Body>
    </div>
  );
}
