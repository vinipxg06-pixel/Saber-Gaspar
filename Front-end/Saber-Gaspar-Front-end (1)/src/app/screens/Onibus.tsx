import { Bus } from "lucide-react";
import { Body, Empty, Header } from "../ui";

// RF09 — o back-end ainda não possui entidades de linhas/pontos/horários.
// Quando existirem (ex.: GET /api/linhas), esta tela passa a listar os dados.
export default function Onibus() {
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <Header title="Pontos de ônibus" subtitle="Linhas, trajetos e horários" />
      <Body>
        <Empty
          icon={<Bus size={22} />}
          title="Em breve"
          text="As linhas, pontos e horários do transporte público de Gaspar estarão disponíveis aqui assim que forem cadastrados pelo administrador."
        />
      </Body>
    </div>
  );
}
