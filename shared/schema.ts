import { z } from "zod";

/**
 * SCHEMAS DO SISTEMA DE LAVA JATO
 * 
 * Este arquivo contém todos os tipos e schemas de validação do sistema.
 * Utilizamos Zod para validação de dados e TypeScript para tipagem forte.
 */

// ==================== TIPOS DE PAPEL DE USUÁRIO ====================
export type PapelUsuario = "cliente" | "funcionario" | "administrador";

// ==================== SCHEMA DE USUÁRIO ====================
/**
 * Schema de usuário para autenticação no sistema.
 * Suporta três papéis: cliente, funcionário e administrador.
 */
export const usuarioSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  papel: z.enum(["cliente", "funcionario", "administrador"]),
  telefone: z.string().optional(),
  dataCriacao: z.string(),
});

export const inserirUsuarioSchema = usuarioSchema.omit({ id: true, dataCriacao: true });

export type Usuario = z.infer<typeof usuarioSchema>;
export type InserirUsuario = z.infer<typeof inserirUsuarioSchema>;

// ==================== SCHEMA DE VEÍCULO ====================
/**
 * Schema de veículo do cliente.
 * Cada cliente pode ter múltiplos veículos cadastrados.
 */
export const veiculoSchema = z.object({
  id: z.string(),
  clienteId: z.string(),
  placa: z.string()
    .min(7, "Placa inválida")
    .max(8, "Placa inválida")
    .transform(val => val.toUpperCase()),
  modelo: z.string().min(2, "Modelo deve ter no mínimo 2 caracteres"),
  marca: z.string().min(2, "Marca deve ter no mínimo 2 caracteres"),
  cor: z.string().min(3, "Cor deve ter no mínimo 3 caracteres"),
  ano: z.number()
    .min(1950, "Ano inválido")
    .max(new Date().getFullYear() + 1, "Ano inválido"),
  dataCriacao: z.string(),
});

export const inserirVeiculoSchema = veiculoSchema.omit({ id: true, dataCriacao: true });

export type Veiculo = z.infer<typeof veiculoSchema>;
export type InserirVeiculo = z.infer<typeof inserirVeiculoSchema>;

// ==================== SCHEMA DE SERVIÇO ====================
/**
 * Schema de serviço oferecido pelo lava jato.
 * Define os tipos de serviços disponíveis e seus preços.
 */
export const servicoSchema = z.object({
  id: z.string(),
  nome: z.string(),
  descricao: z.string(),
  preco: z.number().positive("Preço deve ser positivo"),
  duracao: z.number().positive("Duração deve ser positiva"), // em minutos
  ativo: z.boolean().default(true),
  icone: z.string().optional(), // nome do ícone lucide-react
});

export type Servico = z.infer<typeof servicoSchema>;

// ==================== SCHEMA DE STATUS DE AGENDAMENTO ====================
export type StatusAgendamento = "aguardando" | "em_andamento" | "finalizado" | "cancelado";

// ==================== SCHEMA DE AGENDAMENTO ====================
/**
 * Schema de agendamento de serviço.
 * Relaciona cliente, veículo e serviço com data/hora.
 */
export const agendamentoSchema = z.object({
  id: z.string(),
  clienteId: z.string(),
  veiculoId: z.string(),
  servicoId: z.string(),
  data: z.string(), // ISO date string
  horario: z.string(), // formato HH:mm
  status: z.enum(["aguardando", "em_andamento", "finalizado", "cancelado"]),
  observacoes: z.string().optional(),
  funcionarioId: z.string().optional(), // quem está atendendo
  dataCriacao: z.string(),
  dataAtualizacao: z.string(),
});

export const inserirAgendamentoSchema = agendamentoSchema.omit({ 
  id: true, 
  dataCriacao: true, 
  dataAtualizacao: true,
  status: true,
}).extend({
  status: z.enum(["aguardando", "em_andamento", "finalizado", "cancelado"]).default("aguardando"),
});

export type Agendamento = z.infer<typeof agendamentoSchema>;
export type InserirAgendamento = z.infer<typeof inserirAgendamentoSchema>;

// ==================== SCHEMA DE PROMOÇÃO ====================
/**
 * Schema de promoção do lava jato.
 * Define ofertas especiais com período de validade.
 */
export const promocaoSchema = z.object({
  id: z.string(),
  titulo: z.string(),
  descricao: z.string(),
  desconto: z.number().min(0).max(100), // percentual de desconto
  servicosAplicaveis: z.array(z.string()), // IDs dos serviços
  dataInicio: z.string(),
  dataFim: z.string(),
  ativo: z.boolean().default(true),
  imagemUrl: z.string().optional(),
});

export type Promocao = z.infer<typeof promocaoSchema>;

// ==================== SCHEMA DE CONTATO ====================
/**
 * Schema para formulário de contato.
 */
export const contatoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(10, "Telefone inválido"),
  mensagem: z.string().min(10, "Mensagem deve ter no mínimo 10 caracteres"),
});

export type Contato = z.infer<typeof contatoSchema>;

// ==================== TIPOS ESTENDIDOS PARA VIEWS ====================
/**
 * Tipos estendidos que juntam informações de múltiplas entidades
 * para facilitar a exibição nas interfaces.
 */
export type AgendamentoCompleto = Agendamento & {
  cliente: Usuario;
  veiculo: Veiculo;
  servico: Servico;
  funcionario?: Usuario;
};

export type VeiculoComCliente = Veiculo & {
  cliente: Usuario;
};

// ==================== DADOS MOCKADOS INICIAIS ====================
/**
 * Constantes para popular o sistema com dados iniciais.
 * Facilita testes e demonstração do sistema.
 */
export const HORARIOS_DISPONIVEIS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "11:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
];

export const CORES_VEICULO = [
  "Branco", "Preto", "Prata", "Cinza", "Vermelho", 
  "Azul", "Verde", "Amarelo", "Bege", "Marrom", "Outro"
];
