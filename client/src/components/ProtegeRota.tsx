import { useEffect } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import type { PapelUsuario } from "@shared/schema";

/**
 * COMPONENTE DE PROTEÇÃO DE ROTAS
 * 
 * Este componente protege rotas que requerem autenticação.
 * Pode também restringir acesso baseado no papel do usuário.
 * 
 * Se o usuário não estiver autenticado, redireciona para o login.
 * Se o papel não for permitido, redireciona para a home.
 */

interface ProtegeRotaProps {
  children: React.ReactNode;
  papeisPermitidos?: PapelUsuario[]; // Se não especificado, permite qualquer usuário logado
}

export function ProtegeRota({ children, papeisPermitidos }: ProtegeRotaProps) {
  const { usuarioLogado, carregando } = useAuth();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Aguarda o carregamento inicial
    if (carregando) return;

    // Se não houver usuário logado, redireciona para login
    if (!usuarioLogado) {
      setLocation("/login");
      return;
    }

    // Se houver restrição de papel e o usuário não tiver permissão
    if (papeisPermitidos && !papeisPermitidos.includes(usuarioLogado.papel)) {
      setLocation("/");
    }
  }, [usuarioLogado, carregando, papeisPermitidos, setLocation]);

  // Mostra loading enquanto verifica autenticação
  if (carregando) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado ou não tiver permissão, não renderiza nada
  // (o useEffect já fez o redirecionamento)
  if (!usuarioLogado) {
    return null;
  }

  if (papeisPermitidos && !papeisPermitidos.includes(usuarioLogado.papel)) {
    return null;
  }

  // Usuário autenticado e com permissão, renderiza os filhos
  return <>{children}</>;
}
