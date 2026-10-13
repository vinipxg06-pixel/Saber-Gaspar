import { ChevronDown, ExternalLink } from "lucide-react";
import { useState } from "react";
import { SERVICOS } from "../data/servicos";
import { Body, C, Header, cardStyle } from "../ui";

export default function Servicos() {
  const [aberto, setAberto] = useState<string | null>(null);
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Serviços públicos" subtitle="Links diretos e passo a passo" />
      <Body>
        <div className="flex flex-col gap-3">
          {SERVICOS.map((s) => {
            const open = aberto === s.id;
            return (
              <div key={s.id} className="rounded-2xl overflow-hidden" style={cardStyle}>
                <button
                  onClick={() => setAberto(open ? null : s.id)}
                  aria-expanded={open}
                  className="w-full text-left p-4 flex items-start gap-3"
                >
                  <div className="flex-1">
                    <p className="text-sm font-black" style={{ color: C.ink }}>{s.titulo}</p>
                    <p className="text-xs font-medium mt-1 leading-snug" style={{ color: C.muted }}>{s.descricao}</p>
                  </div>
                  <ChevronDown size={18} style={{ color: C.green, transform: open ? "rotate(180deg)" : "none", transition: "transform .2s" }} />
                </button>
                {open && (
                  <div className="px-4 pb-4">
                    <ol className="flex flex-col gap-2.5 mb-4">
                      {s.passos.map((p, i) => (
                        <li key={i} className="flex gap-2.5 text-xs font-semibold leading-snug" style={{ color: C.ink }}>
                          <span className="w-5 h-5 shrink-0 rounded-full flex items-center justify-center text-[10px] font-black text-white" style={{ background: C.green }}>
                            {i + 1}
                          </span>
                          <span className="pt-0.5">{p}</span>
                        </li>
                      ))}
                    </ol>
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center justify-center gap-2 px-4 py-3 rounded-2xl text-sm font-black"
                      style={{ background: C.green, color: "#fff" }}
                    >
                      <ExternalLink size={15} /> {s.rotuloLink}
                    </a>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-[11px] font-semibold mt-5 leading-relaxed text-center" style={{ color: C.muted }}>
          Os procedimentos podem mudar. Sempre confirme no site oficial do órgão responsável.
        </p>
      </Body>
    </div>
  );
}
