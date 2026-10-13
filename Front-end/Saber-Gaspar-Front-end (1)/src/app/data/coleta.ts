// Dados transcritos dos PDFs "coleta_convencional_2025.pdf" e "coleta_seletiva2025.pdf".
// Dias: 0 = domingo, 1 = segunda ... 6 = sábado.

export type Turno = "Manhã" | "Tarde";

export interface LocalColeta {
  id: string;
  nome: string;
  detalhe?: string; // complemento do nome (ex.: ruas incluídas)
  convencional: { dias: number[]; turno: Turno };
  seletiva: { dia: number; inicio: string };
  obs?: string;
}

export const DIAS_LONGO = [
  "Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado",
];
export const DIAS_CURTO = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

const S = "05:00"; // a coleta seletiva começa às 05:00h em todos os locais

export const LOCAIS: LocalColeta[] = [
  { id: "alto-gasparinho", nome: "Alto Gasparinho", convencional: { dias: [3], turno: "Manhã" }, seletiva: { dia: 2, inicio: S } },
  { id: "arraial-douro", nome: "Arraial d'Ouro", convencional: { dias: [4], turno: "Manhã" }, seletiva: { dia: 3, inicio: S } },
  { id: "barracao", nome: "Barracão", convencional: { dias: [3, 6], turno: "Manhã" }, seletiva: { dia: 5, inicio: S } },
  { id: "barracao-oleo-grande", nome: "Barracão", detalhe: "Comunidade Óleo Grande", convencional: { dias: [4], turno: "Manhã" }, seletiva: { dia: 5, inicio: S } },
  { id: "bateias", nome: "Bateias", convencional: { dias: [3, 6], turno: "Manhã" }, seletiva: { dia: 5, inicio: S } },
  { id: "bela-vista", nome: "Bela Vista", convencional: { dias: [1, 3, 5], turno: "Tarde" }, seletiva: { dia: 4, inicio: S } },
  { id: "belchior-alto", nome: "Belchior Alto", convencional: { dias: [1, 5], turno: "Manhã" }, seletiva: { dia: 3, inicio: S } },
  { id: "belchior-baixo", nome: "Belchior Baixo", convencional: { dias: [1, 5], turno: "Manhã" }, seletiva: { dia: 3, inicio: S } },
  { id: "belchior-central", nome: "Belchior Central", convencional: { dias: [1, 5], turno: "Manhã" }, seletiva: { dia: 3, inicio: S } },
  { id: "centro", nome: "Centro", convencional: { dias: [1, 2, 3, 4, 5, 6], turno: "Tarde" }, seletiva: { dia: 5, inicio: S } },
  { id: "coloninha", nome: "Coloninha", convencional: { dias: [1, 3, 5], turno: "Tarde" }, seletiva: { dia: 4, inicio: S } },
  { id: "figueira", nome: "Figueira", convencional: { dias: [1, 3, 5], turno: "Tarde" }, seletiva: { dia: 4, inicio: S } },
  { id: "gaspar-grande", nome: "Gaspar Grande", convencional: { dias: [1, 3, 5], turno: "Manhã" }, seletiva: { dia: 2, inicio: S } },
  { id: "gaspar-grande-garuba", nome: "Gaspar Grande", detalhe: "Localidade Garuba", convencional: { dias: [1, 5], turno: "Manhã" }, seletiva: { dia: 4, inicio: S } },
  { id: "gaspar-alto", nome: "Gaspar Alto", convencional: { dias: [3], turno: "Manhã" }, seletiva: { dia: 2, inicio: S } },
  { id: "gaspar-mirim", nome: "Gaspar Mirim", detalhe: "Exceto a COHAB (inclui as ruas São Bento e Fausto Dagnoni)", convencional: { dias: [1, 3, 5], turno: "Manhã" }, seletiva: { dia: 2, inicio: S } },
  { id: "gaspar-mirim-cohab", nome: "Gaspar Mirim", detalhe: "COHAB", convencional: { dias: [2, 4, 6], turno: "Tarde" }, seletiva: { dia: 2, inicio: S } },
  { id: "gasparinho", nome: "Gasparinho", convencional: { dias: [1, 3, 5], turno: "Manhã" }, seletiva: { dia: 2, inicio: S } },
  { id: "lagoa", nome: "Lagoa", convencional: { dias: [2, 6], turno: "Manhã" }, seletiva: { dia: 3, inicio: S } },
  { id: "macuco", nome: "Macuco", convencional: { dias: [2], turno: "Manhã" }, seletiva: { dia: 5, inicio: S } },
  { id: "margem-esquerda", nome: "Margem Esquerda e Sertão Verde", convencional: { dias: [2, 4, 6], turno: "Manhã" }, seletiva: { dia: 1, inicio: S } },
  { id: "morro-grande", nome: "Morro Grande", detalhe: "Localidade", convencional: { dias: [2], turno: "Manhã" }, seletiva: { dia: 3, inicio: S } },
  {
    id: "poco-grande", nome: "Poço Grande", detalhe: "Inclui a Rua Itajaí (convencional)",
    convencional: { dias: [2, 4, 6], turno: "Manhã" }, seletiva: { dia: 3, inicio: S },
    obs: "Aos sábados, a coleta convencional em Poço Grande é feita somente até a rotatória do Posto Testoni.",
  },
  { id: "santa-terezinha", nome: "Santa Terezinha", convencional: { dias: [2, 4, 6], turno: "Tarde" }, seletiva: { dia: 5, inicio: S } },
  { id: "santa-teresinha-bom-jesus", nome: "Santa Teresinha", detalhe: "Comunidade Bom Jesus", convencional: { dias: [2, 4, 6], turno: "Manhã" }, seletiva: { dia: 5, inicio: S } },
  { id: "sao-pedro", nome: "São Pedro", convencional: { dias: [2, 4, 6], turno: "Tarde" }, seletiva: { dia: 3, inicio: S } },
  { id: "sete-de-setembro", nome: "Sete de Setembro", detalhe: "Seletiva inclui a Rua Itajaí até o ginásio", convencional: { dias: [2, 4, 6], turno: "Tarde" }, seletiva: { dia: 1, inicio: S } },
];

export function nomeCompleto(l: LocalColeta): string {
  return l.detalhe && l.id !== "poco-grande" && l.id !== "sete-de-setembro" && l.id !== "gaspar-mirim"
    ? `${l.nome} — ${l.detalhe}`
    : l.nome;
}

/** Quantos dias faltam (0 = hoje) para a próxima coleta dentre os dias informados. */
export function diasAteProxima(dias: number[], hoje = new Date()): number {
  const d = hoje.getDay();
  let melhor = 7;
  for (const dia of dias) {
    const diff = (dia - d + 7) % 7;
    if (diff < melhor) melhor = diff;
  }
  return melhor;
}

export function rotuloProxima(offset: number, hoje = new Date()): string {
  if (offset === 0) return "Hoje";
  if (offset === 1) return "Amanhã";
  return DIAS_LONGO[(hoje.getDay() + offset) % 7];
}

export function formatarDias(dias: number[]): string {
  if (dias.length === 6 && dias[0] === 1 && dias[5] === 6) return "Segunda a sábado";
  const nomes = dias.map((d) => DIAS_LONGO[d].replace("-feira", ""));
  if (nomes.length === 1) return nomes[0];
  return nomes.slice(0, -1).join(", ") + " e " + nomes[nomes.length - 1];
}
