import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { Sparkles, UserPlus } from "lucide-react";
import { inserirUsuarioSchema } from "@shared/schema";
import { z } from "zod";

/**
 * PÁGINA CADASTRO
 * 
 * Permite que novos clientes se cadastrem no sistema.
 * Apenas clientes podem se auto-cadastrar. Funcionários e admins são mockados.
 */

export default function Cadastro() {
  const { cadastrarCliente, usuarioLogado } = useAuth();
  const [, setLocation] = useLocation();
  const [formulario, setFormulario] = useState({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmarSenha: "",
  });
  const [carregando, setCarregando] = useState(false);
  const [erros, setErros] = useState<Record<string, string>>({});

  // Redireciona se já estiver logado
  useEffect(() => {
    if (usuarioLogado) {
      setLocation("/dashboard/cliente");
    }
  }, [usuarioLogado, setLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
    // Limpa erro do campo
    if (erros[name]) {
      setErros((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErros({});
    setCarregando(true);

    try {
      // Valida confirmação de senha
      if (formulario.senha !== formulario.confirmarSenha) {
        setErros({ confirmarSenha: "As senhas não coincidem" });
        setCarregando(false);
        return;
      }

      // Valida com schema
      const dadosValidados = inserirUsuarioSchema.parse({
        nome: formulario.nome,
        email: formulario.email,
        senha: formulario.senha,
        telefone: formulario.telefone,
        papel: "cliente", // Força papel de cliente
      });

      const sucesso = await cadastrarCliente(dadosValidados);

      if (sucesso) {
        // Redireciona para login após cadastro bem-sucedido
        setTimeout(() => {
          setLocation("/login");
        }, 1500);
      }
    } catch (erro) {
      if (erro instanceof z.ZodError) {
        const novosErros: Record<string, string> = {};
        erro.errors.forEach((err) => {
          if (err.path[0]) {
            novosErros[err.path[0].toString()] = err.message;
          }
        });
        setErros(novosErros);
      }
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <div className="flex-1 flex items-center justify-center py-16 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto">
            <CardHeader className="text-center">
              <div className="mx-auto h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl" data-testid="text-cadastro-titulo">
                Criar Conta
              </CardTitle>
              <CardDescription>
                Cadastre-se gratuitamente e aproveite nossos serviços
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium mb-2">
                    Nome Completo *
                  </label>
                  <Input
                    id="nome"
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
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
                    autoComplete="email"
                    required
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
                    Telefone
                  </label>
                  <Input
                    id="telefone"
                    name="telefone"
                    type="tel"
                    autoComplete="tel"
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
                  <label htmlFor="senha" className="block text-sm font-medium mb-2">
                    Senha *
                  </label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formulario.senha}
                    onChange={handleChange}
                    placeholder="Mínimo 6 caracteres"
                    className={erros.senha ? "border-destructive" : ""}
                    data-testid="input-senha"
                  />
                  {erros.senha && (
                    <p className="text-sm text-destructive mt-1">{erros.senha}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmarSenha" className="block text-sm font-medium mb-2">
                    Confirmar Senha *
                  </label>
                  <Input
                    id="confirmarSenha"
                    name="confirmarSenha"
                    type="password"
                    autoComplete="new-password"
                    required
                    value={formulario.confirmarSenha}
                    onChange={handleChange}
                    className={erros.confirmarSenha ? "border-destructive" : ""}
                    data-testid="input-confirmar-senha"
                  />
                  {erros.confirmarSenha && (
                    <p className="text-sm text-destructive mt-1">{erros.confirmarSenha}</p>
                  )}
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={carregando}
                  data-testid="button-cadastrar"
                >
                  {carregando ? (
                    "Cadastrando..."
                  ) : (
                    <>
                      <UserPlus className="mr-2 h-4 w-4" />
                      Criar Conta
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Já tem uma conta?{" "}
                  <Link href="/login">
                    <a className="text-primary hover:underline font-medium" data-testid="link-login">
                      Faça login
                    </a>
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>

      <Rodape />
    </div>
  );
}
