import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Veiculo } from "@shared/schema";
import { Car, Palette, Calendar, Hash, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

/**
 * COMPONENTE CARD DE VEÍCULO
 * 
 * Exibe as informações de um veículo do cliente.
 * Permite exclusão com confirmação.
 */

interface CardVeiculoProps {
  veiculo: Veiculo;
  onExcluir?: (id: string) => void;
}

export function CardVeiculo({ veiculo, onExcluir }: CardVeiculoProps) {
  return (
    <Card className="hover-elevate transition-all" data-testid={`card-veiculo-${veiculo.id}`}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Car className="h-5 w-5 mr-2 text-primary" />
          {veiculo.modelo}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-2">
        <div className="flex items-center text-sm">
          <Hash className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Placa:</span>
          <span className="ml-2 font-mono font-semibold" data-testid={`text-veiculo-placa-${veiculo.id}`}>
            {veiculo.placa}
          </span>
        </div>

        <div className="flex items-center text-sm">
          <Car className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Marca:</span>
          <span className="ml-2">{veiculo.marca}</span>
        </div>

        <div className="flex items-center text-sm">
          <Palette className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Cor:</span>
          <span className="ml-2">{veiculo.cor}</span>
        </div>

        <div className="flex items-center text-sm">
          <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
          <span className="text-muted-foreground">Ano:</span>
          <span className="ml-2">{veiculo.ano}</span>
        </div>
      </CardContent>

      {onExcluir && (
        <CardFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                data-testid={`button-excluir-veiculo-${veiculo.id}`}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Excluir Veículo
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
                <AlertDialogDescription>
                  Tem certeza que deseja excluir o veículo <strong>{veiculo.modelo} - {veiculo.placa}</strong>?
                  Esta ação não pode ser desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel data-testid="button-cancelar-exclusao">Cancelar</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => onExcluir(veiculo.id)}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                  data-testid="button-confirmar-exclusao"
                >
                  Excluir
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardFooter>
      )}
    </Card>
  );
}
