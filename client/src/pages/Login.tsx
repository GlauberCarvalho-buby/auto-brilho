import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { carregarDoLocalStorage } from "@/lib/localStorage";
import { Sparkles, LogIn } from "lucide-react";
import type { Usuario } from "@shared/schema";

/**
 * PÁGINA LOGIN
 * 
 * Permite que usuários (clientes, funcionários ou admins) façam login no sistema.
 * Redireciona para o dashboard apropriado após login bem-sucedido.
 */

export default function Login() {
  const { login, usuarioLogado } = useAuth();
  const [, setLocation] = useLocation();
  const [formulario, setFormulario] = useState({
    email: "",
    senha: "",
  });
  const [carregando, setCarregando] = useState(false);

  // Redireciona se já estiver logado
  useEffect(() => {
    if (usuarioLogado) {
      const dashboard =
        usuarioLogado.papel === "cliente"
          ? "/dashboard/cliente"
          : usuarioLogado.papel === "funcionario"
          ? "/dashboard/funcionario"
          : "/dashboard/administrador";
      setLocation(dashboard);
    }
  }, [usuarioLogado, setLocation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCarregando(true);

    const sucesso = await login(formulario.email, formulario.senha);

    if (sucesso) {
      // Aguarda um breve momento para o estado atualizar e então redireciona
      setTimeout(() => {
        const usuariosAtualizados = carregarDoLocalStorage<Usuario[]>("autobrilho_usuarios") || [];
        const usuarioLogadoAtual = carregarDoLocalStorage<Usuario>("autobrilho_usuario_logado");
        
        if (usuarioLogadoAtual) {
          const dashboard =
            usuarioLogadoAtual.papel === "cliente"
              ? "/dashboard/cliente"
              : usuarioLogadoAtual.papel === "funcionario"
              ? "/dashboard/funcionario"
              : "/dashboard/administrador";
          setLocation(dashboard);
        }
      }, 100);
    }

    setCarregando(false);
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
              <CardTitle className="text-2xl" data-testid="text-login-titulo">
                Entrar no Sistema
              </CardTitle>
              <CardDescription>
                Acesse sua conta para agendar serviços e gerenciar seus veículos
              </CardDescription>
            </CardHeader>

            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    E-mail
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formulario.email}
                    onChange={handleChange}
                    placeholder="seu@email.com"
                    data-testid="input-email"
                  />
                </div>

                <div>
                  <label htmlFor="senha" className="block text-sm font-medium mb-2">
                    Senha
                  </label>
                  <Input
                    id="senha"
                    name="senha"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formulario.senha}
                    onChange={handleChange}
                    placeholder="••••••"
                    data-testid="input-senha"
                  />
                </div>

                {/* Dica de usuários de teste */}
                <div className="bg-accent/50 p-4 rounded-md text-sm">
                  <p className="font-medium mb-2">Usuários de teste:</p>
                  <ul className="space-y-1 text-muted-foreground text-xs">
                    <li>• <strong>Cliente:</strong> pedro@email.com / 123456</li>
                    <li>• <strong>Funcionário:</strong> joao@autobrilho.com.br / 123456</li>
                    <li>• <strong>Admin:</strong> admin@autobrilho.com.br / 123456</li>
                  </ul>
                </div>
              </CardContent>

              <CardFooter className="flex flex-col space-y-4">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={carregando}
                  data-testid="button-entrar"
                >
                  {carregando ? (
                    "Entrando..."
                  ) : (
                    <>
                      <LogIn className="mr-2 h-4 w-4" />
                      Entrar
                    </>
                  )}
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Não tem uma conta?{" "}
                  <Link href="/cadastro">
                    <a className="text-primary hover:underline font-medium" data-testid="link-cadastro">
                      Cadastre-se aqui
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
