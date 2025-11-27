import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Target, Eye, Award, Users, Heart, Leaf } from "lucide-react";

/**
 * PÁGINA SOBRE
 * 
 * Apresenta a história, missão, visão e valores da AutoBrilho.
 * Mostra os diferenciais e compromissos da empresa.
 */

export default function Sobre() {
  const valores = [
    {
      icone: Award,
      titulo: "Excelência",
      descricao: "Buscamos a perfeição em cada serviço realizado, sem exceção.",
    },
    {
      icone: Users,
      titulo: "Respeito ao Cliente",
      descricao: "Cada cliente é único e merece atenção personalizada.",
    },
    {
      icone: Heart,
      titulo: "Paixão",
      descricao: "Amamos o que fazemos e isso se reflete no resultado.",
    },
    {
      icone: Leaf,
      titulo: "Sustentabilidade",
      descricao: "Comprometidos com práticas ecológicas e responsáveis.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-sobre-titulo">
              Sobre a AutoBrilho
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Há mais de 15 anos cuidando do seu veículo com dedicação e profissionalismo.
              Somos referência em estética automotiva em São Paulo.
            </p>
          </div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Nossa História
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
              <p className="text-base leading-relaxed">
                A AutoBrilho nasceu em 2009 do sonho de três amigos apaixonados por automóveis. 
                O que começou como um pequeno lava-rápido em um bairro de São Paulo, hoje é referência 
                em estética automotiva de alta qualidade na cidade.
              </p>
              <p className="text-base leading-relaxed">
                Com investimento constante em tecnologia, produtos premium e capacitação da equipe, 
                crescemos mantendo o compromisso com a excelência. Cada veículo que passa por nossas 
                mãos recebe o mesmo cuidado que daríamos ao nosso próprio carro.
              </p>
              <p className="text-base leading-relaxed">
                Hoje, atendemos milhares de clientes satisfeitos por mês, sempre com a mesma dedicação 
                e paixão do primeiro dia. Nossa equipe é formada por profissionais certificados e 
                especializados em diversas técnicas de estética automotiva.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Missão e Visão */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="hover-elevate transition-all" data-testid="card-missao">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Proporcionar serviços automotivos de excelência, superando as expectativas dos 
                  nossos clientes através de profissionais qualificados, produtos de qualidade superior 
                  e processos sustentáveis, contribuindo para a valorização e conservação dos veículos.
                </p>
              </CardContent>
            </Card>

            <Card className="hover-elevate transition-all" data-testid="card-visao">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Nossa Visão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  Ser reconhecida como a melhor e mais confiável empresa de estética automotiva de 
                  São Paulo, expandindo nossos serviços para todo o Brasil, sempre mantendo nossos 
                  valores de qualidade, sustentabilidade e compromisso com a satisfação do cliente.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Nossos Valores
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {valores.map((valor, index) => {
              const Icone = valor.icone;
              return (
                <Card key={index} className="text-center hover-elevate transition-all" data-testid={`card-valor-${index}`}>
                  <CardHeader>
                    <div className="mx-auto h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <Icone className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{valor.titulo}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-sm">
                      {valor.descricao}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Nossos Diferenciais
            </h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Produtos Premium</h3>
                  <p className="text-muted-foreground">
                    Utilizamos apenas produtos de marcas reconhecidas internacionalmente, 
                    garantindo proteção e brilho duradouros para seu veículo.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Equipe Especializada</h3>
                  <p className="text-muted-foreground">
                    Nossos profissionais passam por treinamentos constantes e são certificados 
                    nas mais modernas técnicas de estética automotiva.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Lavagem Ecológica</h3>
                  <p className="text-muted-foreground">
                    Sistema de reaproveitamento de água e produtos biodegradáveis, 
                    reduzindo nosso impacto ambiental em até 70%.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-lg mb-2">Garantia de Satisfação</h3>
                  <p className="text-muted-foreground">
                    Se não ficar 100% satisfeito, refazemos o serviço sem custo adicional. 
                    Sua satisfação é nossa prioridade.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Rodape />
    </div>
  );
}
