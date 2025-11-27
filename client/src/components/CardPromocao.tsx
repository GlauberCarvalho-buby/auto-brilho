import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Promocao } from "@shared/schema";
import { Calendar, Percent } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

/**
 * COMPONENTE CARD DE PROMOÇÃO
 * 
 * Exibe as informações de uma promoção ativa.
 * Inclui título, descrição, desconto e período de validade.
 */

interface CardPromocaoProps {
  promocao: Promocao;
}

export function CardPromocao({ promocao }: CardPromocaoProps) {
  // Formata as datas de início e fim
  const dataInicio = format(new Date(promocao.dataInicio), "dd/MM/yyyy", { locale: ptBR });
  const dataFim = format(new Date(promocao.dataFim), "dd/MM/yyyy", { locale: ptBR });

  return (
    <Card className="hover-elevate transition-all" data-testid={`card-promocao-${promocao.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
            <Percent className="w-3 h-3 mr-1" />
            {promocao.desconto}% OFF
          </Badge>
          {!promocao.ativo && (
            <Badge variant="secondary">Inativa</Badge>
          )}
        </div>
        <CardTitle className="text-xl" data-testid={`text-promocao-titulo-${promocao.id}`}>
          {promocao.titulo}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {promocao.descricao}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2 text-primary" />
          <span>
            Válido de {dataInicio} até {dataFim}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
