import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Servico } from "@shared/schema";
import { Clock, DollarSign } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Link } from "wouter";

/**
 * COMPONENTE CARD DE SERVIÇO
 * 
 * Exibe as informações de um serviço oferecido pelo lava jato.
 * Inclui nome, descrição, preço, duração e botão de ação.
 */

interface CardServicoProps {
  servico: Servico;
  mostrarBotao?: boolean;
}

export function CardServico({ servico, mostrarBotao = true }: CardServicoProps) {
  // Obtém o ícone dinamicamente do lucide-react
  const IconeComponente = servico.icone && servico.icone in LucideIcons
    ? (LucideIcons as any)[servico.icone]
    : LucideIcons.Sparkles;

  // Formata o preço em reais
  const precoFormatado = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(servico.preco);

  // Formata a duração em horas e minutos
  const formatarDuracao = (minutos: number): string => {
    const horas = Math.floor(minutos / 60);
    const mins = minutos % 60;
    
    if (horas > 0 && mins > 0) {
      return `${horas}h ${mins}min`;
    } else if (horas > 0) {
      return `${horas}h`;
    } else {
      return `${mins}min`;
    }
  };

  return (
    <Card className="h-full flex flex-col hover-elevate transition-all" data-testid={`card-servico-${servico.id}`}>
      <CardHeader>
        <div className="flex items-start justify-between mb-2">
          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
            <IconeComponente className="h-6 w-6 text-primary" />
          </div>
        </div>
        <CardTitle className="text-xl" data-testid={`text-servico-nome-${servico.id}`}>
          {servico.nome}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {servico.descricao}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1">
        <div className="space-y-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 mr-2 text-primary" />
            <span className="font-semibold text-foreground text-lg" data-testid={`text-servico-preco-${servico.id}`}>
              {precoFormatado}
            </span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="h-4 w-4 mr-2 text-primary" />
            <span>Duração: {formatarDuracao(servico.duracao)}</span>
          </div>
        </div>
      </CardContent>

      {mostrarBotao && (
        <CardFooter>
          <Link href="/login">
            <Button className="w-full" data-testid={`button-agendar-${servico.id}`}>
              Agendar Serviço
            </Button>
          </Link>
        </CardFooter>
      )}
    </Card>
  );
}
