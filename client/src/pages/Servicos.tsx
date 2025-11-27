import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { CardServico } from "@/components/CardServico";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * PÁGINA SERVIÇOS
 * 
 * Lista todos os serviços oferecidos pelo lava jato.
 * Exibe informações detalhadas de cada serviço com opção de agendamento.
 */

export default function Servicos() {
  const { servicos, carregando } = useAgendamentos();

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-servicos-titulo">
              Nossos Serviços
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Oferecemos uma gama completa de serviços automotivos com tecnologia de ponta 
              e profissionais altamente qualificados.
            </p>
          </div>
        </div>
      </section>

      {/* Lista de Serviços */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {carregando ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="h-48 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {servicos.map((servico) => (
                <CardServico key={servico.id} servico={servico} />
              ))}
            </div>
          )}

          {!carregando && servicos.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">
                Nenhum serviço disponível no momento.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Informações Adicionais */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Serviços Personalizados
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Não encontrou o serviço que procura? Entre em contato conosco! 
              Oferecemos pacotes personalizados e combos especiais para atender suas necessidades específicas.
            </p>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                <strong className="text-foreground">Todos os serviços incluem:</strong>
              </p>
              <ul className="space-y-2 text-muted-foreground max-w-2xl mx-auto">
                <li>✓ Produtos premium de qualidade internacional</li>
                <li>✓ Profissionais certificados e experientes</li>
                <li>✓ Garantia de satisfação</li>
                <li>✓ Agendamento online prático e rápido</li>
                <li>✓ Área de espera confortável com Wi-Fi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <Rodape />
    </div>
  );
}
