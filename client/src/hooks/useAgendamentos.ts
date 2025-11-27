import { useContext } from "react";
import { AgendamentosContext } from "@/contexts/AgendamentosContext";

/**
 * CUSTOM HOOK useAgendamentos
 * 
 * Hook customizado para acessar o contexto de agendamentos.
 * Facilita o acesso a veículos, agendamentos, serviços e promoções.
 * 
 * Uso:
 * const { servicos, criarAgendamento, veiculos } = useAgendamentos();
 */
export function useAgendamentos() {
  const context = useContext(AgendamentosContext);

  if (!context) {
    throw new Error("useAgendamentos deve ser usado dentro de um AgendamentosProvider");
  }

  return context;
}
