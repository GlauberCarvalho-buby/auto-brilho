import { useState } from "react";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { contatoSchema } from "@shared/schema";
import { z } from "zod";

/**
 * PÁGINA CONTATO
 * 
 * Formulário de contato e informações da empresa.
 * Permite que visitantes entrem em contato sem necessidade de cadastro.
 */

export default function Contato() {
  const { toast } = useToast();
  const [enviando, setEnviando] = useState(false);
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: "",
  });
  const [erros, setErros] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    // Limpa o erro do campo quando o usuário começa a digitar
    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErros({});
    setEnviando(true);

    try {
      // Valida o formulário
      contatoSchema.parse(formulario);

      // Simula envio (em produção, aqui seria feita uma chamada à API)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve. Obrigado!",
      });

      // Limpa o formulário
      setFormulario({
        nome: "",
        email: "",
        telefone: "",
        mensagem: "",
      });
    } catch (erro) {
      if (erro instanceof z.ZodError) {
        const novosErros: Record<string, string> = {};
        erro.errors.forEach((err) => {
          if (err.path[0]) {
            novosErros[err.path[0].toString()] = err.message;
          }
        });
        setErros(novosErros);
        
        toast({
          variant: "destructive",
          title: "Erro no formulário",
          description: "Por favor, corrija os erros e tente novamente.",
        });
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6" data-testid="text-contato-titulo">
              Entre em Contato
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Estamos aqui para ajudar! Entre em contato conosco e tire suas dúvidas.
            </p>
          </div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Formulário */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Envie uma Mensagem</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    value={formulario.nome}
                    onChange={handleChange}
                    className={erros.nome ? "border-destructive" : ""}
                    data-testid="input-nome"
                  />
                  {erros.nome && (
                    <p className="text-sm text-destructive mt-1">{erros.nome}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail *
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formulario.email}
                    onChange={handleChange}
                    className={erros.email ? "border-destructive" : ""}
                    data-testid="input-email"
                  />
                  {erros.email && (
                    <p className="text-sm text-destructive mt-1">{erros.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium mb-2">
                    Telefone *
                  </label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    placeholder="(11) 99999-9999"
                    value={formulario.telefone}
                    onChange={handleChange}
                    className={erros.telefone ? "border-destructive" : ""}
                    data-testid="input-telefone"
                  />
                  {erros.telefone && (
                    <p className="text-sm text-destructive mt-1">{erros.telefone}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="mensagem" className="block text-sm font-medium mb-2">
                    Mensagem *
                  </label>
                  <Textarea
                    id="mensagem"
                    name="mensagem"
                    rows={6}
                    value={formulario.mensagem}
                    onChange={handleChange}
                    className={erros.mensagem ? "border-destructive" : ""}
                    data-testid="textarea-mensagem"
                  />
                  {erros.mensagem && (
                    <p className="text-sm text-destructive mt-1">{erros.mensagem}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={enviando}
                  data-testid="button-enviar"
                >
                  {enviando ? (
                    "Enviando..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Mensagem
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Informações de Contato */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-6">Informações de Contato</h2>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <MapPin className="h-5 w-5 mr-2 text-primary" />
                    Endereço
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Av. Paulista, 1000<br />
                    Bela Vista, São Paulo - SP<br />
                    CEP: 01310-100
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Phone className="h-5 w-5 mr-2 text-primary" />
                    Telefone
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    (11) 3333-4444<br />
                    (11) 99999-8888 (WhatsApp)
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Mail className="h-5 w-5 mr-2 text-primary" />
                    E-mail
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    contato@autobrilho.com.br<br />
                    comercial@autobrilho.com.br
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Horário de Atendimento
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    <strong>Segunda a Sexta:</strong> 08:00 às 18:00<br />
                    <strong>Sábados:</strong> 08:00 às 13:00<br />
                    <strong>Domingos e Feriados:</strong> Fechado
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
