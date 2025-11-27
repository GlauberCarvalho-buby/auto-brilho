import { Badge } from "@/components/ui/badge";
import type { StatusAgendamento } from "@shared/schema";
import { Clock, Loader2, CheckCircle2, XCircle } from "lucide-react";

/**
 * COMPONENTE BADGE DE STATUS
 * 
 * Exibe o status do agendamento com cores e ícones apropriados.
 * Melhora a visualização e compreensão do estado atual do serviço.
 */

interface BadgeStatusProps {
  status: StatusAgendamento;
}

export function BadgeStatus({ status }: BadgeStatusProps) {
  const configs = {
    aguardando: {
      texto: "Aguardando",
      className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      Icone: Clock,
    },
    em_andamento: {
      texto: "Em Andamento",
      className: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      Icone: Loader2,
    },
    finalizado: {
      texto: "Finalizado",
      className: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      Icone: CheckCircle2,
    },
    cancelado: {
      texto: "Cancelado",
      className: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      Icone: XCircle,
    },
  };

  const config = configs[status];
  const Icone = config.Icone;

  return (
    <Badge className={config.className} data-testid={`badge-status-${status}`}>
      <Icone className="w-3 h-3 mr-1" />
      {config.texto}
    </Badge>
  );
}
