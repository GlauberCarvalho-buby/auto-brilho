import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { Sparkles, Shield, Clock, ThumbsUp, ArrowRight, Star } from "lucide-react";

/**
 * PÁGINA HOME
 * 
 * Página inicial do site com hero section e apresentação dos serviços.
 * Primeira impressão do visitante, deve ser impactante e convidativa.
 */

export default function Home() {
  const diferenciais = [
    {
      icone: Shield,
      titulo: "Qualidade Garantida",
      descricao: "Produtos premium e profissionais certificados para cuidar do seu veículo.",
    },
    {
      icone: Clock,
      titulo: "Agilidade",
      descricao: "Atendimento rápido sem comprometer a qualidade do serviço.",
    },
    {
      icone: ThumbsUp,
      titulo: "Satisfação",
      descricao: "Mais de 10 mil clientes satisfeitos em São Paulo e região.",
    },
    {
      icone: Star,
      titulo: "Excelência",
      descricao: "Reconhecidos como referência em estética automotiva premium.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-background to-accent/10 py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-6">
              <Sparkles className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent" data-testid="text-hero-titulo">
              Seu Carro Merece o Melhor Cuidado
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
              Serviços automotivos de qualidade premium com profissionais especializados.
              Transforme a aparência do seu veículo com a AutoBrilho.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/cadastro">
                <Button size="lg" className="text-lg px-8" data-testid="button-hero-agendar">
                  Agendar Lavagem
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/servicos">
                <Button size="lg" variant="outline" className="text-lg px-8" data-testid="button-hero-servicos">
                  Conheça os Serviços
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Por Que Escolher a AutoBrilho?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprometimento com a excelência em cada detalhe do seu veículo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {diferenciais.map((item, index) => {
              const Icone = item.icone;
              return (
                <Card key={index} className="text-center hover-elevate transition-all" data-testid={`card-diferencial-${index}`}>
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icone className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{item.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {item.descricao}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground border-0">
            <CardContent className="py-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Pronto para Dar um Upgrade no Seu Carro?
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Cadastre-se agora e agende seu primeiro serviço com desconto especial para novos clientes!
              </p>
              <Link href="/cadastro">
                <Button size="lg" variant="secondary" className="text-lg px-8" data-testid="button-cta-cadastrar">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      <Rodape />
    </div>
  );
}
