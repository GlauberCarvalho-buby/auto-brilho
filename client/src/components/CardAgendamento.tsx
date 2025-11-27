import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeStatus } from "@/components/BadgeStatus";
import type { AgendamentoCompleto, StatusAgendamento } from "@shared/schema";
import { Calendar, Clock, Car, Wrench, User } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * COMPONENTE CARD DE AGENDAMENTO
 * 
 * Exibe as informações completas de um agendamento.
 * Adaptável para diferentes papéis de usuário (cliente, funcionário, admin).
 */

interface CardAgendamentoProps {
  agendamento: AgendamentoCompleto;
  mostrarCliente?: boolean;
  mostrarAcoes?: boolean;
  onAtualizarStatus?: (id: string, status: StatusAgendamento) => void;
}

export function CardAgendamento({
  agendamento,
  mostrarCliente = false,
  mostrarAcoes = false,
  onAtualizarStatus,
}: CardAgendamentoProps) {
  const dataFormatada = format(new Date(agendamento.data), "dd 'de' MMMM 'de' yyyy", {
    locale: ptBR,
  });

  // Formata o preço em reais
  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(agendamento.servico.preco);

  return (
    <Card className="hover-elevate transition-all" data-testid={`card-agendamento-${agendamento.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">
            {agendamento.servico.nome}
          </CardTitle>
          <BadgeStatus status={agendamento.status} />
        </div>
        <CardDescription>
          {agendamento.servico.descricao}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Cliente (visível para funcionário/admin) */}
        {mostrarCliente && (
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">Cliente:</span>
            <span className="ml-2 font-medium" data-testid={`text-agendamento-cliente-${agendamento.id}`}>
              {agendamento.cliente.nome}
            </span>
          </div>
        )}

        {/* Veículo */}
        <div className="flex items-center text-sm">
          <Car className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">Veículo:</span>
          <span className="ml-2 font-medium" data-testid={`text-agendamento-veiculo-${agendamento.id}`}>
            {agendamento.veiculo.modelo} - {agendamento.veiculo.placa}
          </span>
        </div>

        {/* Data */}
        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">Data:</span>
          <span className="ml-2 font-medium">{dataFormatada}</span>
        </div>

        {/* Horário */}
        <div className="flex items-center text-sm">
          <Clock className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">Horário:</span>
          <span className="ml-2 font-medium">{agendamento.horario}</span>
        </div>

        {/* Preço */}
        <div className="flex items-center text-sm">
          <Wrench className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
          <span className="text-muted-foreground">Valor:</span>
          <span className="ml-2 font-semibold text-lg text-primary">{precoFormatado}</span>
        </div>

        {/* Funcionário responsável */}
        {agendamento.funcionario && (
          <div className="flex items-center text-sm">
            <User className="h-4 w-4 mr-2 text-primary flex-shrink-0" />
            <span className="text-muted-foreground">Atendente:</span>
            <span className="ml-2 font-medium">{agendamento.funcionario.nome}</span>
          </div>
        )}

        {/* Observações */}
        {agendamento.observacoes && (
          <div className="pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">Observações:</span> {agendamento.observacoes}
            </p>
          </div>
        )}

        {/* Ações para funcionário/admin */}
        {mostrarAcoes && onAtualizarStatus && (
          <div className="pt-3 border-t space-y-2">
            <p className="text-sm font-medium mb-2">Atualizar Status:</p>
            <div className="flex flex-wrap gap-2">
              {agendamento.status !== "em_andamento" && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAtualizarStatus(agendamento.id, "em_andamento")}
                  data-testid={`button-status-em-andamento-${agendamento.id}`}
                >
                  Iniciar Serviço
                </Button>
              )}
              {agendamento.status !== "finalizado" && (
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => onAtualizarStatus(agendamento.id, "finalizado")}
                  data-testid={`button-status-finalizado-${agendamento.id}`}
                >
                  Finalizar
                </Button>
              )}
              {agendamento.status !== "cancelado" && (
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onAtualizarStatus(agendamento.id, "cancelado")}
                  data-testid={`button-status-cancelado-${agendamento.id}`}
                >
                  Cancelar
                </Button>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
