import { useState } from "react";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { ProtegeRota } from "@/components/ProtegeRota";
import { CardAgendamento } from "@/components/CardAgendamento";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { Calendar, Search } from "lucide-react";
import type { StatusAgendamento } from "@shared/schema";

/**
 * PÁGINA DE AGENDAMENTOS
 * 
 * Visualização e gestão de agendamentos.
 * Adaptável para diferentes papéis de usuário.
 */

export default function Agendamentos() {
  return (
    <ProtegeRota>
      <AgendamentosConteudo />
    </ProtegeRota>
  );
}

function AgendamentosConteudo() {
  const { usuarioLogado } = useAuth();
  const {
    obterAgendamentosPorCliente,
    obterTodosAgendamentos,
    atualizarStatusAgendamento,
  } = useAgendamentos();

  const [busca, setBusca] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<StatusAgendamento | "todos">("todos");
  const [filtroData, setFiltroData] = useState("");

  // Obtém agendamentos baseado no papel do usuário
  const agendamentos =
    usuarioLogado?.papel === "cliente"
      ? obterAgendamentosPorCliente(usuarioLogado.id)
      : obterTodosAgendamentos();

  // Aplica filtros
  const agendamentosFiltrados = agendamentos.filter((agendamento) => {
    // Filtro de busca (placa ou nome do cliente)
    if (busca) {
      const buscaLower = busca.toLowerCase();
      const matchPlaca = agendamento.veiculo.placa.toLowerCase().includes(buscaLower);
      const matchCliente = agendamento.cliente.nome.toLowerCase().includes(buscaLower);
      if (!matchPlaca && !matchCliente) return false;
    }

    // Filtro de status
    if (filtroStatus !== "todos" && agendamento.status !== filtroStatus) {
      return false;
    }

    // Filtro de data
    if (filtroData && agendamento.data !== filtroData) {
      return false;
    }

    return true;
  });

  const handleAtualizarStatus = async (id: string, status: StatusAgendamento) => {
    await atualizarStatusAgendamento(id, status, usuarioLogado?.id);
  };

  const podeAtualizarStatus =
    usuarioLogado?.papel === "funcionario" || usuarioLogado?.papel === "administrador";

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-agendamentos-titulo">
              Agendamentos
            </h1>
            <p className="text-muted-foreground">
              {usuarioLogado?.papel === "cliente"
                ? "Seus agendamentos e histórico de serviços"
                : "Todos os agendamentos do sistema"}
            </p>
          </div>

          {/* Filtros */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por placa ou cliente..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
                data-testid="input-busca-agendamentos"
              />
            </div>

            <Select value={filtroStatus} onValueChange={(value: any) => setFiltroStatus(value)}>
              <SelectTrigger data-testid="select-filtro-status">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="aguardando">Aguardando</SelectItem>
                <SelectItem value="em_andamento">Em Andamento</SelectItem>
                <SelectItem value="finalizado">Finalizado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>

            <Input
              type="date"
              value={filtroData}
              onChange={(e) => setFiltroData(e.target.value)}
              placeholder="Filtrar por data"
              data-testid="input-filtro-data"
            />
          </div>

          {/* Lista de Agendamentos */}
          {agendamentosFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {agendamentosFiltrados.map((agendamento) => (
                <CardAgendamento
                  key={agendamento.id}
                  agendamento={agendamento}
                  mostrarCliente={usuarioLogado?.papel !== "cliente"}
                  mostrarAcoes={podeAtualizarStatus}
                  onAtualizarStatus={podeAtualizarStatus ? handleAtualizarStatus : undefined}
                />
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  {busca || filtroStatus !== "todos" || filtroData
                    ? "Nenhum agendamento encontrado com esses filtros"
                    : "Nenhum agendamento encontrado"}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>

      <Rodape />
    </div>
  );
}
