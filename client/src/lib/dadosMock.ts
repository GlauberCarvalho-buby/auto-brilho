import type { Usuario, Servico, Promocao } from "@shared/schema";

/**
 * DADOS MOCKADOS INICIAIS DO SISTEMA
 * 
 * Este arquivo contém os dados pré-cadastrados que populam o sistema.
 * Inclui usuários de teste (funcionário e admin) e catálogo de serviços.
 */

// ==================== USUÁRIOS MOCKADOS ====================
/**
 * Usuários pré-cadastrados no sistema para teste.
 * Senha padrão para todos: "123456"
 */
export const USUARIOS_MOCKADOS: Usuario[] = [
  {
    id: "admin-001",
    nome: "Carlos Silva",
    email: "admin@autobrilho.com.br",
    senha: "123456", // Em produção, isso seria hasheado
    papel: "administrador",
    telefone: "(11) 99999-0001",
    dataCriacao: new Date("2024-01-01").toISOString(),
  },
  {
    id: "func-001",
    nome: "João Santos",
    email: "joao@autobrilho.com.br",
    senha: "123456",
    papel: "funcionario",
    telefone: "(11) 99999-0002",
    dataCriacao: new Date("2024-01-15").toISOString(),
  },
  {
    id: "func-002",
    nome: "Maria Oliveira",
    email: "maria@autobrilho.com.br",
    senha: "123456",
    papel: "funcionario",
    telefone: "(11) 99999-0003",
    dataCriacao: new Date("2024-02-01").toISOString(),
  },
  // Cliente de exemplo
  {
    id: "cliente-001",
    nome: "Pedro Souza",
    email: "pedro@email.com",
    senha: "123456",
    papel: "cliente",
    telefone: "(11) 98888-0001",
    dataCriacao: new Date("2024-03-01").toISOString(),
  },
];

// ==================== SERVIÇOS DISPONÍVEIS ====================
/**
 * Catálogo de serviços oferecidos pelo lava jato.
 * Cada serviço tem preço e duração estimada.
 */
export const SERVICOS_DISPONIVEIS: Servico[] = [
  {
    id: "serv-001",
    nome: "Lavagem Simples",
    descricao: "Lavagem externa completa do veículo com shampoo automotivo premium e secagem",
    preco: 45.00,
    duracao: 30,
    ativo: true,
    icone: "Droplets",
  },
  {
    id: "serv-002",
    nome: "Lavagem Completa",
    descricao: "Lavagem externa e interna com aspiração de carpetes, limpeza de painéis e vidros",
    preco: 80.00,
    duracao: 60,
    ativo: true,
    icone: "Sparkles",
  },
  {
    id: "serv-003",
    nome: "Polimento",
    descricao: "Polimento técnico da pintura para remoção de pequenos riscos e restauração do brilho",
    preco: 250.00,
    duracao: 180,
    ativo: true,
    icone: "Gem",
  },
  {
    id: "serv-004",
    nome: "Higienização Interna",
    descricao: "Higienização profunda do interior com limpeza a vapor, eliminação de odores e bactericida",
    preco: 150.00,
    duracao: 120,
    ativo: true,
    icone: "Wind",
  },
  {
    id: "serv-005",
    nome: "Cristalização de Pintura",
    descricao: "Aplicação de cristalizador para proteção duradoura da pintura contra raios UV e intempéries",
    preco: 350.00,
    duracao: 240,
    ativo: true,
    icone: "Shield",
  },
  {
    id: "serv-006",
    nome: "Limpeza de Motor",
    descricao: "Limpeza detalhada do motor com produtos específicos e proteção de componentes",
    preco: 120.00,
    duracao: 90,
    ativo: true,
    icone: "Cog",
  },
  {
    id: "serv-007",
    nome: "Lavagem Ecológica",
    descricao: "Lavagem sustentável com economia de água e produtos biodegradáveis",
    preco: 55.00,
    duracao: 40,
    ativo: true,
    icone: "Leaf",
  },
  {
    id: "serv-008",
    nome: "Revitalização de Faróis",
    descricao: "Restauração e polimento de faróis opacos, melhorando iluminação e aparência",
    preco: 100.00,
    duracao: 60,
    ativo: true,
    icone: "Lightbulb",
  },
];

// ==================== PROMOÇÕES ATIVAS ====================
/**
 * Promoções vigentes do lava jato.
 * Sistema permite ativar/desativar promoções conforme necessidade.
 */
export const PROMOCOES_INICIAIS: Promocao[] = [
  {
    id: "promo-001",
    titulo: "Combo Especial de Fim de Semana",
    descricao: "Lavagem Completa + Higienização Interna com 20% de desconto aos sábados e domingos",
    desconto: 20,
    servicosAplicaveis: ["serv-002", "serv-004"],
    dataInicio: new Date().toISOString(),
    dataFim: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 dias
    ativo: true,
  },
  {
    id: "promo-002",
    titulo: "Lavagem + Polimento Express",
    descricao: "Contrate polimento e ganhe 50% de desconto na lavagem completa",
    desconto: 50,
    servicosAplicaveis: ["serv-002"],
    dataInicio: new Date().toISOString(),
    dataFim: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(), // 60 dias
    ativo: true,
  },
  {
    id: "promo-003",
    titulo: "Primeira Lavagem com Desconto",
    descricao: "Novos clientes ganham 15% de desconto em qualquer serviço de lavagem",
    desconto: 15,
    servicosAplicaveis: ["serv-001", "serv-002", "serv-007"],
    dataInicio: new Date().toISOString(),
    dataFim: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 dias
    ativo: true,
  },
  {
    id: "promo-004",
    titulo: "Pacote Premium de Proteção",
    descricao: "Cristalização + Revitalização de Faróis com 25% de desconto",
    desconto: 25,
    servicosAplicaveis: ["serv-005", "serv-008"],
    dataInicio: new Date().toISOString(),
    dataFim: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(), // 45 dias
    ativo: true,
  },
];
