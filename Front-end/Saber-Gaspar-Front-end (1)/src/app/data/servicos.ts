// Serviços públicos (RF11). Edite esta lista para incluir novos links e tutoriais.
export interface Servico {
  id: string;
  titulo: string;
  descricao: string;
  link: string;
  rotuloLink: string;
  passos: string[];
}

export const SERVICOS: Servico[] = [
  {
    id: "rg",
    titulo: "Carteira de Identidade (RG)",
    descricao: "Como solicitar a primeira via ou a segunda via da sua identidade.",
    link: "https://www.gov.br",
    rotuloLink: "Abrir portal gov.br",
    passos: [
      "Acesse o portal oficial e escolha o serviço de emissão da Carteira de Identidade.",
      "Agende o atendimento em um posto de identificação do estado de Santa Catarina.",
      "Separe os documentos: certidão de nascimento ou casamento, CPF e comprovante de residência.",
      "Compareça no dia e horário agendados com os documentos originais.",
      "Aguarde o aviso de que a carteira está pronta e retire no posto indicado.",
    ],
  },
  {
    id: "cpf",
    titulo: "CPF — consulta e regularização",
    descricao: "Consulte a situação do seu CPF ou corrija dados cadastrais.",
    link: "https://www.gov.br/receitafederal",
    rotuloLink: "Receita Federal",
    passos: [
      "Entre no site da Receita Federal e procure o serviço de CPF.",
      "Faça login com sua conta gov.br.",
      "Escolha entre consultar a situação, alterar dados ou regularizar pendências.",
      "Siga as instruções da tela e guarde o comprovante.",
    ],
  },
  {
    id: "cnh",
    titulo: "CNH e veículos (Detran-SC)",
    descricao: "Serviços de habilitação, licenciamento e multas.",
    link: "https://www.detran.sc.gov.br",
    rotuloLink: "Detran-SC",
    passos: [
      "Acesse o portal do Detran-SC.",
      "Identifique-se com CPF e senha (ou conta gov.br).",
      "Escolha o serviço: renovação de CNH, licenciamento, consulta de multas, etc.",
      "Emita a guia, pague e acompanhe o andamento pelo mesmo portal.",
    ],
  },
  {
    id: "inss",
    titulo: "Meu INSS",
    descricao: "Aposentadoria, benefícios, extratos e agendamento de perícia.",
    link: "https://meu.inss.gov.br",
    rotuloLink: "Meu INSS",
    passos: [
      "Acesse o Meu INSS e entre com sua conta gov.br.",
      "Use a busca para localizar o serviço desejado.",
      "Preencha o pedido e anexe os documentos solicitados.",
      "Acompanhe o andamento do requerimento na própria plataforma.",
    ],
  },
  {
    id: "prefeitura",
    titulo: "Portal da Prefeitura de Gaspar",
    descricao: "Notícias, serviços ao cidadão e canais de atendimento do município.",
    link: "https://www.gaspar.sc.gov.br",
    rotuloLink: "Portal da Prefeitura",
    passos: [
      "Acesse o portal da Prefeitura de Gaspar.",
      "Navegue pelas áreas de serviços (Saúde, Educação, Obras, Procon, Turismo…).",
      "Para atendimento rápido, use também o PrefeituraZAP, o canal oficial pelo WhatsApp.",
    ],
  },
  {
    id: "defesa-civil",
    titulo: "Defesa Civil",
    descricao: "Alertas, orientações e telefone de emergência (199).",
    link: "https://defesacivil.sc.gov.br",
    rotuloLink: "Defesa Civil SC",
    passos: [
      "Em emergência (alagamento, deslizamento), ligue 199 (Defesa Civil) ou 193 (Bombeiros).",
      "Acompanhe os alertas oficiais no site da Defesa Civil de Santa Catarina.",
      "Consulte a tela de Cotas de Alagamento deste aplicativo para ver o mapa.",
    ],
  },
];
