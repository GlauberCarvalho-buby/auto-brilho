import { useState } from "react";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { ProtegeRota } from "@/components/ProtegeRota";
import { CardAgendamento } from "@/components/CardAgendamento";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { Calendar, Clock, CheckCircle2, Search } from "lucide-react";
import type { StatusAgendamento } from "@shared/schema";

/**
 * DASHBOARD DO FUNCIONÁRIO
 * 
 * Painel do funcionário onde ele pode:
 * - Ver agendamentos do dia
 * - Atualizar status dos serviços
 * - Buscar agendamentos por placa ou cliente
 */

export default function DashboardFuncionario() {
  return (
    <ProtegeRota papeisPermitidos={["funcionario"]}>
      <DashboardFuncionarioConteudo />
    </ProtegeRota>
  );
}

function DashboardFuncionarioConteudo() {
  const { usuarioLogado } = useAuth();
  const { obterTodosAgendamentos, atualizarStatusAgendamento } = useAgendamentos();
  const [busca, setBusca] = useState("");

  const todosAgendamentos = obterTodosAgendamentos();
  const hoje = new Date().toISOString().split("T")[0];

  // Filtra agendamentos do dia
  const agendamentosHoje = todosAgendamentos.filter((a) => a.data === hoje);

  // Filtra por busca (placa ou nome do cliente)
  const agendamentosFiltrados = busca
    ? todosAgendamentos.filter(
        (a) =>
          a.veiculo.placa.toLowerCase().includes(busca.toLowerCase()) ||
          a.cliente.nome.toLowerCase().includes(busca.toLowerCase())
      )
    : agendamentosHoje;

  const handleAtualizarStatus = async (id: string, status: StatusAgendamento) => {
    await atualizarStatusAgendamento(id, status, usuarioLogado?.id);
  };

  // Estatísticas
  const agendamentosAguardando = agendamentosHoje.filter((a) => a.status === "aguardando").length;
  const agendamentosEmAndamento = agendamentosHoje.filter((a) => a.status === "em_andamento").length;
  const agendamentosFinalizados = agendamentosHoje.filter((a) => a.status === "finalizado").length;

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-dashboard-funcionario-titulo">
              Painel do Funcionário
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo, {usuarioLogado?.nome}
            </p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Hoje
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold" data-testid="text-total-hoje">
                  {agendamentosHoje.length}
                </p>
                <p className="text-sm text-muted-foreground">agendamentos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                  Aguardando
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-600">
                  {agendamentosAguardando}
                </p>
                <p className="text-sm text-muted-foreground">serviços</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Clock className="h-5 w-5 mr-2 text-blue-600" />
                  Em Andamento
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">
                  {agendamentosEmAndamento}
                </p>
                <p className="text-sm text-muted-foreground">serviços</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                  Finalizados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-green-600">
                  {agendamentosFinalizados}
                </p>
                <p className="text-sm text-muted-foreground">hoje</p>
              </CardContent>
            </Card>
          </div>

          {/* Busca */}
          <div className="mb-6">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Buscar por placa ou nome do cliente..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10"
                data-testid="input-busca"
              />
            </div>
          </div>

          {/* Lista de Agendamentos */}
          <section>
            <h2 className="text-2xl font-bold mb-6">
              {busca ? "Resultados da Busca" : "Agendamentos de Hoje"}
            </h2>

            {agendamentosFiltrados.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {agendamentosFiltrados.map((agendamento) => (
                  <CardAgendamento
                    key={agendamento.id}
                    agendamento={agendamento}
                    mostrarCliente={true}
                    mostrarAcoes={true}
                    onAtualizarStatus={handleAtualizarStatus}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    {busca
                      ? "Nenhum agendamento encontrado com esses critérios"
                      : "Não há agendamentos para hoje"}
                  </p>
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>

      <Rodape />
    </div>
  );
}
