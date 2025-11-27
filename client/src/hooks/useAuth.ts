import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";

/**
 * CUSTOM HOOK useAuth
 * 
 * Hook customizado para acessar o contexto de autenticação.
 * Facilita o uso do AuthContext em componentes funcionais.
 * 
 * Uso:
 * const { usuarioLogado, login, logout } = useAuth();
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
}
