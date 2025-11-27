import { Link } from "wouter";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { Button } from "@/components/ui/button";
import { SearchX, Home } from "lucide-react";

/**
 * PÁGINA 404 - NÃO ENCONTRADA
 * 
 * Exibida quando o usuário acessa uma rota que não existe.
 * Oferece navegação de volta para a home.
 */

export default function NaoEncontrada() {
  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <div className="flex-1 flex items-center justify-center py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <div className="mx-auto h-24 w-24 rounded-full bg-muted flex items-center justify-center mb-6">
              <SearchX className="h-12 w-12 text-muted-foreground" />
            </div>

            <h1 className="text-6xl font-bold mb-4 text-primary" data-testid="text-404">
              404
            </h1>

            <h2 className="text-2xl font-semibold mb-4">
              Página Não Encontrada
            </h2>

            <p className="text-muted-foreground mb-8 leading-relaxed">
              Ops! A página que você está procurando não existe ou foi movida.
              Que tal voltar para a página inicial?
            </p>

            <Link href="/">
              <Button size="lg" data-testid="button-voltar-home">
                <Home className="mr-2 h-5 w-5" />
                Voltar para a Página Inicial
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Rodape />
    </div>
  );
}
