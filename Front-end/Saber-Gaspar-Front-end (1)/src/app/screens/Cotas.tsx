import { Phone } from "lucide-react";
import { Body, C, Header, cardStyle } from "../ui";

export default function Cotas() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Cotas de alagamento" subtitle="Mapa de cotas de enchente" />
      <Body>
        <div className="rounded-2xl overflow-hidden" style={cardStyle}>
          <iframe
            title="Mapa de cotas de enchente"
            src="https://www.google.com/maps/d/embed?mid=1463v9XA3DvxFkM_uKGggOva2e3pD2IQ&ehbc=2E312F"
            width="640"
            height="480"
            style={{ width: "100%", height: 420, border: 0, display: "block" }}
            loading="lazy"
            allowFullScreen
          />
        </div>
        <p className="text-xs font-semibold mt-3 leading-relaxed" style={{ color: C.muted }}>
          Use o mapa para ver as cotas de enchente de cada ponto. Arraste para navegar e toque nos marcadores para mais detalhes.
        </p>
        <div className="rounded-2xl p-4 mt-4" style={{ background: "#CFFAFE" }}>
          <p className="text-sm font-black" style={{ color: "#0E7490" }}>Emergência</p>
          <div className="grid grid-cols-2 gap-2 mt-2.5">
            <a href="tel:199" className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black" style={{ background: "#fff", color: "#0E7490" }}>
              <Phone size={14} /> 199 Defesa Civil
            </a>
            <a href="tel:193" className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-black" style={{ background: "#fff", color: "#0E7490" }}>
              <Phone size={14} /> 193 Bombeiros
            </a>
          </div>
        </div>
      </Body>
    </div>
  );
}
