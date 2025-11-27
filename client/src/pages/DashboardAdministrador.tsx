import { useState } from "react";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { ProtegeRota } from "@/components/ProtegeRota";
import { CardPromocao } from "@/components/CardPromocao";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { Users, Calendar, CheckCircle2, DollarSign, TrendingUp } from "lucide-react";
import { carregarDoLocalStorage } from "@/lib/localStorage";
import type { Usuario } from "@shared/schema";

/**
 * DASHBOARD DO ADMINISTRADOR
 * 
 * Painel administrativo com visão geral do negócio:
 * - Estatísticas gerais
 * - Total de clientes
 * - Serviços realizados
 * - Gestão de promoções
 */

export default function DashboardAdministrador() {
  return (
    <ProtegeRota papeisPermitidos={["administrador"]}>
      <DashboardAdministradorConteudo />
    </ProtegeRota>
  );
}

function DashboardAdministradorConteudo() {
  const { usuarioLogado } = useAuth();
  const { obterTodosAgendamentos, promocoes, alternarStatusPromocao } = useAgendamentos();

  const todosAgendamentos = obterTodosAgendamentos();
  const usuarios = carregarDoLocalStorage<Usuario[]>("autobrilho_usuarios") || [];

  // Estatísticas
  const totalClientes = usuarios.filter((u) => u.papel === "cliente").length;
  const totalAgendamentos = todosAgendamentos.length;
  const servicosFinalizados = todosAgendamentos.filter((a) => a.status === "finalizado").length;
  const receitaTotal = todosAgendamentos
    .filter((a) => a.status === "finalizado")
    .reduce((acc, a) => acc + a.servico.preco, 0);

  // Agendamentos por mês (últimos 30 dias)
  const trintaDiasAtras = new Date();
  trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
  const agendamentosUltimoMes = todosAgendamentos.filter(
    (a) => new Date(a.data) >= trintaDiasAtras
  ).length;

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-dashboard-admin-titulo">
              Painel Administrativo
            </h1>
            <p className="text-muted-foreground">
              Bem-vindo, {usuarioLogado?.nome}
            </p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Users className="h-5 w-5 mr-2 text-primary" />
                  Total de Clientes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold" data-testid="text-total-clientes">
                  {totalClientes}
                </p>
                <p className="text-sm text-muted-foreground">cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-blue-600">
                  {totalAgendamentos}
                </p>
                <p className="text-sm text-muted-foreground">no total</p>
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
                  {servicosFinalizados}
                </p>
                <p className="text-sm text-muted-foreground">serviços</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <DollarSign className="h-5 w-5 mr-2 text-emerald-600" />
                  Receita Total
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-emerald-600">
                  R$ {receitaTotal.toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">serviços finalizados</p>
              </CardContent>
            </Card>
          </div>

          {/* Estatísticas Adicionais */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                  Últimos 30 Dias
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Agendamentos:</span>
                    <span className="font-semibold text-lg">{agendamentosUltimoMes}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Taxa de Conclusão:</span>
                    <span className="font-semibold text-lg text-green-600">
                      {totalAgendamentos > 0
                        ? ((servicosFinalizados / totalAgendamentos) * 100).toFixed(1)
                        : 0}
                      %
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Ticket Médio:</span>
                    <span className="font-semibold text-lg text-primary">
                      R${" "}
                      {servicosFinalizados > 0
                        ? (receitaTotal / servicosFinalizados).toFixed(2)
                        : "0.00"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Distribuição de Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Aguardando:</span>
                    <span className="font-semibold text-lg text-yellow-600">
                      {todosAgendamentos.filter((a) => a.status === "aguardando").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Em Andamento:</span>
                    <span className="font-semibold text-lg text-blue-600">
                      {todosAgendamentos.filter((a) => a.status === "em_andamento").length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Finalizados:</span>
                    <span className="font-semibold text-lg text-green-600">
                      {servicosFinalizados}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Cancelados:</span>
                    <span className="font-semibold text-lg text-red-600">
                      {todosAgendamentos.filter((a) => a.status === "cancelado").length}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Gestão de Promoções */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Gestão de Promoções</h2>
            </div>

            {promocoes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promocoes.map((promocao) => (
                  <div key={promocao.id} className="space-y-2">
                    <CardPromocao promocao={promocao} />
                    <Button
                      variant={promocao.ativo ? "destructive" : "default"}
                      className="w-full"
                      onClick={() => alternarStatusPromocao(promocao.id)}
                      data-testid={`button-toggle-promocao-${promocao.id}`}
                    >
                      {promocao.ativo ? "Desativar Promoção" : "Ativar Promoção"}
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">
                    Nenhuma promoção cadastrada
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
