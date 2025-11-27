import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { CardPromocao } from "@/components/CardPromocao";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { Skeleton } from "@/components/ui/skeleton";
import { Percent } from "lucide-react";

/**
 * PÁGINA PROMOÇÕES
 * 
 * Exibe todas as promoções ativas do lava jato.
 * Mostra ofertas especiais com descontos e períodos de validade.
 */

export default function Promocoes() {
  const { obterPromocoesAtivas, carregando } = useAgendamentos();
  const promocoesAtivas = obterPromocoesAtivas();

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-green-100 dark:bg-green-900 rounded-full mb-6">
              <Percent className="h-8 w-8 text-green-700 dark:text-green-200" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-promocoes-titulo">
              Promoções Especiais
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Aproveite nossas ofertas exclusivas e economize nos melhores serviços automotivos!
            </p>
          </div>
        </div>
      </section>

      {/* Lista de Promoções */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {carregando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {promocoesAtivas.map((promocao) => (
                <CardPromocao key={promocao.id} promocao={promocao} />
              ))}
            </div>
          )}

          {!carregando && promocoesAtivas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                Não há promoções ativas no momento.
              </p>
              <p className="text-muted-foreground">
                Fique de olho! Novas promoções são lançadas regularmente.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Como Aproveitar */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Como Aproveitar as Promoções
            </h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Cadastre-se no Sistema</h3>
                  <p className="text-muted-foreground">
                    Crie sua conta gratuitamente e tenha acesso a todas as promoções exclusivas.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Escolha seu Serviço</h3>
                  <p className="text-muted-foreground">
                    Selecione o serviço que deseja e verifique se há promoção ativa aplicável.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Agende Online</h3>
                  <p className="text-muted-foreground">
                    Faça seu agendamento online e o desconto será aplicado automaticamente.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">Aproveite!</h3>
                  <p className="text-muted-foreground">
                    Compareça no dia e horário agendados e aproveite seu desconto especial.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Rodape />
    </div>
  );
}
