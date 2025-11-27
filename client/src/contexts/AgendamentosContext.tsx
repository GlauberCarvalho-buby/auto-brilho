import { createContext, useState, useEffect, type ReactNode } from "react";
import type { 
  Agendamento, 
  InserirAgendamento, 
  Veiculo, 
  InserirVeiculo,
  Servico,
  Promocao,
  AgendamentoCompleto,
  Usuario,
  StatusAgendamento
} from "@shared/schema";
import { salvarNoLocalStorage, carregarDoLocalStorage } from "@/lib/localStorage";
import { SERVICOS_DISPONIVEIS, PROMOCOES_INICIAIS } from "@/lib/dadosMock";
import { useToast } from "@/hooks/use-toast";

/**
 * CONTEXTO DE AGENDAMENTOS
 * 
 * Gerencia o estado de agendamentos, veículos, serviços e promoções.
 * Centraliza toda a lógica de negócio relacionada aos serviços do lava jato.
 * 
 * Utiliza LocalStorage para persistir os dados.
 */

// Chaves do LocalStorage
const CHAVE_VEICULOS = "autobrilho_veiculos";
const CHAVE_AGENDAMENTOS = "autobrilho_agendamentos";
const CHAVE_SERVICOS = "autobrilho_servicos";
const CHAVE_PROMOCOES = "autobrilho_promocoes";
const CHAVE_USUARIOS = "autobrilho_usuarios";

// Interface do contexto
interface AgendamentosContextData {
  veiculos: Veiculo[];
  agendamentos: Agendamento[];
  servicos: Servico[];
  promocoes: Promocao[];
  carregando: boolean;
  
  // Funções de Veículos
  cadastrarVeiculo: (veiculo: InserirVeiculo) => Promise<boolean>;
  editarVeiculo: (id: string, veiculo: Partial<Veiculo>) => Promise<boolean>;
  excluirVeiculo: (id: string) => Promise<boolean>;
  obterVeiculosPorCliente: (clienteId: string) => Veiculo[];
  obterVeiculoPorId: (id: string) => Veiculo | undefined;
  
  // Funções de Agendamentos
  criarAgendamento: (agendamento: InserirAgendamento) => Promise<boolean>;
  atualizarStatusAgendamento: (id: string, status: StatusAgendamento, funcionarioId?: string) => Promise<boolean>;
  obterAgendamentosPorCliente: (clienteId: string) => AgendamentoCompleto[];
  obterAgendamentosPorData: (data: string) => AgendamentoCompleto[];
  obterTodosAgendamentos: () => AgendamentoCompleto[];
  obterAgendamentoPorId: (id: string) => AgendamentoCompleto | undefined;
  
  // Funções de Serviços
  obterServicoPorId: (id: string) => Servico | undefined;
  
  // Funções de Promoções
  obterPromocoesAtivas: () => Promocao[];
  alternarStatusPromocao: (id: string) => Promise<boolean>;
}

// Criação do contexto
export const AgendamentosContext = createContext<AgendamentosContextData>({} as AgendamentosContextData);

// Provider do contexto
interface AgendamentosProviderProps {
  children: ReactNode;
}

export function AgendamentosProvider({ children }: AgendamentosProviderProps) {
  const [veiculos, setVeiculos] = useState<Veiculo[]>([]);
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [servicos, setServicos] = useState<Servico[]>([]);
  const [promocoes, setPromocoes] = useState<Promocao[]>([]);
  const [carregando, setCarregando] = useState(true);
  const { toast } = useToast();

  /**
   * Carrega todos os dados do LocalStorage na inicialização.
   */
  useEffect(() => {
    // Carrega ou inicializa serviços
    const servicosSalvos = carregarDoLocalStorage<Servico[]>(CHAVE_SERVICOS);
    if (servicosSalvos) {
      setServicos(servicosSalvos);
    } else {
      setServicos(SERVICOS_DISPONIVEIS);
      salvarNoLocalStorage(CHAVE_SERVICOS, SERVICOS_DISPONIVEIS);
    }

    // Carrega ou inicializa promoções
    const promocoesSalvas = carregarDoLocalStorage<Promocao[]>(CHAVE_PROMOCOES);
    if (promocoesSalvas) {
      setPromocoes(promocoesSalvas);
    } else {
      setPromocoes(PROMOCOES_INICIAIS);
      salvarNoLocalStorage(CHAVE_PROMOCOES, PROMOCOES_INICIAIS);
    }

    // Carrega veículos
    const veiculosSalvos = carregarDoLocalStorage<Veiculo[]>(CHAVE_VEICULOS);
    if (veiculosSalvos) {
      setVeiculos(veiculosSalvos);
    }

    // Carrega agendamentos
    const agendamentosSalvos = carregarDoLocalStorage<Agendamento[]>(CHAVE_AGENDAMENTOS);
    if (agendamentosSalvos) {
      setAgendamentos(agendamentosSalvos);
    }

    setCarregando(false);
  }, []);

  // ==================== FUNÇÕES DE VEÍCULOS ====================

  const cadastrarVeiculo = async (veiculo: InserirVeiculo): Promise<boolean> => {
    try {
      // Verifica se a placa já existe
      const placaExiste = veiculos.some(
        (v) => v.placa.toUpperCase() === veiculo.placa.toUpperCase()
      );

      if (placaExiste) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar veículo",
          description: "Esta placa já está cadastrada.",
        });
        return false;
      }

      const novoVeiculo: Veiculo = {
        ...veiculo,
        id: `veiculo-${Date.now()}`,
        placa: veiculo.placa.toUpperCase(),
        dataCriacao: new Date().toISOString(),
      };

      const veiculosAtualizados = [...veiculos, novoVeiculo];
      setVeiculos(veiculosAtualizados);
      salvarNoLocalStorage(CHAVE_VEICULOS, veiculosAtualizados);

      toast({
        title: "Veículo cadastrado!",
        description: `${novoVeiculo.modelo} cadastrado com sucesso.`,
      });

      return true;
    } catch (erro) {
      console.error("Erro ao cadastrar veículo:", erro);
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar veículo",
        description: "Ocorreu um erro. Tente novamente.",
      });
      return false;
    }
  };

  const editarVeiculo = async (id: string, dadosAtualizados: Partial<Veiculo>): Promise<boolean> => {
    try {
      const veiculosAtualizados = veiculos.map((v) =>
        v.id === id ? { ...v, ...dadosAtualizados } : v
      );

      setVeiculos(veiculosAtualizados);
      salvarNoLocalStorage(CHAVE_VEICULOS, veiculosAtualizados);

      toast({
        title: "Veículo atualizado!",
        description: "As informações foram atualizadas.",
      });

      return true;
    } catch (erro) {
      console.error("Erro ao editar veículo:", erro);
      return false;
    }
  };

  const excluirVeiculo = async (id: string): Promise<boolean> => {
    try {
      const veiculosAtualizados = veiculos.filter((v) => v.id !== id);
      setVeiculos(veiculosAtualizados);
      salvarNoLocalStorage(CHAVE_VEICULOS, veiculosAtualizados);

      toast({
        title: "Veículo excluído",
        description: "O veículo foi removido do sistema.",
      });

      return true;
    } catch (erro) {
      console.error("Erro ao excluir veículo:", erro);
      return false;
    }
  };

  const obterVeiculosPorCliente = (clienteId: string): Veiculo[] => {
    return veiculos.filter((v) => v.clienteId === clienteId);
  };

  const obterVeiculoPorId = (id: string): Veiculo | undefined => {
    return veiculos.find((v) => v.id === id);
  };

  // ==================== FUNÇÕES DE AGENDAMENTOS ====================

  const criarAgendamento = async (agendamento: InserirAgendamento): Promise<boolean> => {
    try {
      const novoAgendamento: Agendamento = {
        ...agendamento,
        id: `agendamento-${Date.now()}`,
        status: agendamento.status || "aguardando",
        dataCriacao: new Date().toISOString(),
        dataAtualizacao: new Date().toISOString(),
      };

      const agendamentosAtualizados = [...agendamentos, novoAgendamento];
      setAgendamentos(agendamentosAtualizados);
      salvarNoLocalStorage(CHAVE_AGENDAMENTOS, agendamentosAtualizados);

      toast({
        title: "Agendamento realizado!",
        description: `Seu serviço foi agendado para ${agendamento.data} às ${agendamento.horario}.`,
      });

      return true;
    } catch (erro) {
      console.error("Erro ao criar agendamento:", erro);
      toast({
        variant: "destructive",
        title: "Erro ao agendar",
        description: "Ocorreu um erro. Tente novamente.",
      });
      return false;
    }
  };

  const atualizarStatusAgendamento = async (
    id: string,
    status: StatusAgendamento,
    funcionarioId?: string
  ): Promise<boolean> => {
    try {
      const agendamentosAtualizados = agendamentos.map((a) =>
        a.id === id
          ? {
              ...a,
              status,
              funcionarioId: funcionarioId || a.funcionarioId,
              dataAtualizacao: new Date().toISOString(),
            }
          : a
      );

      setAgendamentos(agendamentosAtualizados);
      salvarNoLocalStorage(CHAVE_AGENDAMENTOS, agendamentosAtualizados);

      const statusTexto = {
        aguardando: "Aguardando",
        em_andamento: "Em Andamento",
        finalizado: "Finalizado",
        cancelado: "Cancelado",
      };

      toast({
        title: "Status atualizado!",
        description: `Agendamento marcado como: ${statusTexto[status]}`,
      });

      return true;
    } catch (erro) {
      console.error("Erro ao atualizar status:", erro);
      return false;
    }
  };

  /**
   * Monta um agendamento completo com dados relacionados.
   */
  const montarAgendamentoCompleto = (agendamento: Agendamento): AgendamentoCompleto | undefined => {
    const usuarios = carregarDoLocalStorage<Usuario[]>(CHAVE_USUARIOS) || [];
    const cliente = usuarios.find((u) => u.id === agendamento.clienteId);
    const veiculo = veiculos.find((v) => v.id === agendamento.veiculoId);
    const servico = servicos.find((s) => s.id === agendamento.servicoId);
    const funcionario = agendamento.funcionarioId
      ? usuarios.find((u) => u.id === agendamento.funcionarioId)
      : undefined;

    if (!cliente || !veiculo || !servico) {
      return undefined;
    }

    return {
      ...agendamento,
      cliente,
      veiculo,
      servico,
      funcionario,
    };
  };

  const obterAgendamentosPorCliente = (clienteId: string): AgendamentoCompleto[] => {
    return agendamentos
      .filter((a) => a.clienteId === clienteId)
      .map(montarAgendamentoCompleto)
      .filter((a): a is AgendamentoCompleto => a !== undefined)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  };

  const obterAgendamentosPorData = (data: string): AgendamentoCompleto[] => {
    return agendamentos
      .filter((a) => a.data === data)
      .map(montarAgendamentoCompleto)
      .filter((a): a is AgendamentoCompleto => a !== undefined)
      .sort((a, b) => a.horario.localeCompare(b.horario));
  };

  const obterTodosAgendamentos = (): AgendamentoCompleto[] => {
    return agendamentos
      .map(montarAgendamentoCompleto)
      .filter((a): a is AgendamentoCompleto => a !== undefined)
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  };

  const obterAgendamentoPorId = (id: string): AgendamentoCompleto | undefined => {
    const agendamento = agendamentos.find((a) => a.id === id);
    if (!agendamento) return undefined;
    return montarAgendamentoCompleto(agendamento);
  };

  // ==================== FUNÇÕES DE SERVIÇOS ====================

  const obterServicoPorId = (id: string): Servico | undefined => {
    return servicos.find((s) => s.id === id);
  };

  // ==================== FUNÇÕES DE PROMOÇÕES ====================

  const obterPromocoesAtivas = (): Promocao[] => {
    const agora = new Date();
    return promocoes.filter((p) => {
      const dataInicio = new Date(p.dataInicio);
      const dataFim = new Date(p.dataFim);
      return p.ativo && agora >= dataInicio && agora <= dataFim;
    });
  };

  const alternarStatusPromocao = async (id: string): Promise<boolean> => {
    try {
      const promocoesAtualizadas = promocoes.map((p) =>
        p.id === id ? { ...p, ativo: !p.ativo } : p
      );

      setPromocoes(promocoesAtualizadas);
      salvarNoLocalStorage(CHAVE_PROMOCOES, promocoesAtualizadas);

      const promocao = promocoesAtualizadas.find((p) => p.id === id);
      toast({
        title: "Promoção atualizada!",
        description: `${promocao?.titulo} foi ${promocao?.ativo ? "ativada" : "desativada"}.`,
      });

      return true;
    } catch (erro) {
      console.error("Erro ao alterar promoção:", erro);
      return false;
    }
  };

  return (
    <AgendamentosContext.Provider
      value={{
        veiculos,
        agendamentos,
        servicos,
        promocoes,
        carregando,
        cadastrarVeiculo,
        editarVeiculo,
        excluirVeiculo,
        obterVeiculosPorCliente,
        obterVeiculoPorId,
        criarAgendamento,
        atualizarStatusAgendamento,
        obterAgendamentosPorCliente,
        obterAgendamentosPorData,
        obterTodosAgendamentos,
        obterAgendamentoPorId,
        obterServicoPorId,
        obterPromocoesAtivas,
        alternarStatusPromocao,
      }}
    >
      {children}
    </AgendamentosContext.Provider>
  );
}
