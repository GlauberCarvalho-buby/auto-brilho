import { createContext, useState, useEffect, type ReactNode } from "react";
import type { Usuario, InserirUsuario } from "@shared/schema";
import { salvarNoLocalStorage, carregarDoLocalStorage, removerDoLocalStorage } from "@/lib/localStorage";
import { USUARIOS_MOCKADOS } from "@/lib/dadosMock";
import { useToast } from "@/hooks/use-toast";

/**
 * CONTEXTO DE AUTENTICAÇÃO
 * 
 * Gerencia o estado de autenticação do usuário no sistema.
 * Fornece funções para login, logout, cadastro e verificação de papel.
 * 
 * Utiliza LocalStorage para persistir a sessão do usuário.
 */

// Chaves do LocalStorage
const CHAVE_USUARIO_LOGADO = "autobrilho_usuario_logado";
const CHAVE_USUARIOS = "autobrilho_usuarios";

// Interface do contexto
interface AuthContextData {
  usuarioLogado: Usuario | null;
  carregando: boolean;
  login: (email: string, senha: string) => Promise<boolean>;
  logout: () => void;
  cadastrarCliente: (dados: InserirUsuario) => Promise<boolean>;
  eCliente: () => boolean;
  eFuncionario: () => boolean;
  eAdministrador: () => boolean;
}

// Criação do contexto
export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Provider do contexto
interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuarioLogado, setUsuarioLogado] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);
  const { toast } = useToast();

  /**
   * Carrega o usuário logado e inicializa os usuários mockados no LocalStorage.
   * Executado apenas uma vez quando o componente é montado.
   */
  useEffect(() => {
    // Inicializa usuários mockados se não existirem
    const usuariosExistentes = carregarDoLocalStorage<Usuario[]>(CHAVE_USUARIOS);
    if (!usuariosExistentes) {
      salvarNoLocalStorage(CHAVE_USUARIOS, USUARIOS_MOCKADOS);
    }

    // Carrega usuário logado da sessão anterior
    const usuarioSalvo = carregarDoLocalStorage<Usuario>(CHAVE_USUARIO_LOGADO);
    if (usuarioSalvo) {
      setUsuarioLogado(usuarioSalvo);
    }
    
    setCarregando(false);
  }, []);

  /**
   * Realiza o login do usuário.
   * Verifica email e senha contra os usuários cadastrados no LocalStorage.
   * 
   * @param email - Email do usuário
   * @param senha - Senha do usuário
   * @returns true se o login foi bem-sucedido, false caso contrário
   */
  const login = async (email: string, senha: string): Promise<boolean> => {
    try {
      const usuarios = carregarDoLocalStorage<Usuario[]>(CHAVE_USUARIOS) || USUARIOS_MOCKADOS;
      
      // Busca usuário por email e senha
      const usuario = usuarios.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.senha === senha
      );

      if (usuario) {
        setUsuarioLogado(usuario);
        salvarNoLocalStorage(CHAVE_USUARIO_LOGADO, usuario);
        
        toast({
          title: "Login realizado com sucesso!",
          description: `Bem-vindo(a), ${usuario.nome}!`,
        });
        
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Erro ao fazer login",
          description: "E-mail ou senha incorretos.",
        });
        return false;
      }
    } catch (erro) {
      console.error("Erro ao fazer login:", erro);
      toast({
        variant: "destructive",
        title: "Erro ao fazer login",
        description: "Ocorreu um erro. Tente novamente.",
      });
      return false;
    }
  };

  /**
   * Realiza o logout do usuário.
   * Remove os dados da sessão do LocalStorage.
   */
  const logout = () => {
    setUsuarioLogado(null);
    removerDoLocalStorage(CHAVE_USUARIO_LOGADO);
    
    toast({
      title: "Logout realizado",
      description: "Até logo!",
    });
  };

  /**
   * Cadastra um novo cliente no sistema.
   * Apenas clientes podem se auto-cadastrar. Funcionários e admins são mockados.
   * 
   * @param dados - Dados do novo cliente
   * @returns true se o cadastro foi bem-sucedido, false caso contrário
   */
  const cadastrarCliente = async (dados: InserirUsuario): Promise<boolean> => {
    try {
      const usuarios = carregarDoLocalStorage<Usuario[]>(CHAVE_USUARIOS) || USUARIOS_MOCKADOS;
      
      // Verifica se o email já está cadastrado
      const emailExiste = usuarios.some(
        (u) => u.email.toLowerCase() === dados.email.toLowerCase()
      );

      if (emailExiste) {
        toast({
          variant: "destructive",
          title: "Erro ao cadastrar",
          description: "Este e-mail já está cadastrado.",
        });
        return false;
      }

      // Cria novo usuário
      const novoUsuario: Usuario = {
        ...dados,
        id: `cliente-${Date.now()}`,
        papel: "cliente", // Força papel de cliente
        dataCriacao: new Date().toISOString(),
      };

      // Salva no LocalStorage
      const usuariosAtualizados = [...usuarios, novoUsuario];
      salvarNoLocalStorage(CHAVE_USUARIOS, usuariosAtualizados);

      toast({
        title: "Cadastro realizado com sucesso!",
        description: "Você já pode fazer login no sistema.",
      });

      return true;
    } catch (erro) {
      console.error("Erro ao cadastrar cliente:", erro);
      toast({
        variant: "destructive",
        title: "Erro ao cadastrar",
        description: "Ocorreu um erro. Tente novamente.",
      });
      return false;
    }
  };

  /**
   * Verifica se o usuário logado é um cliente.
   */
  const eCliente = (): boolean => {
    return usuarioLogado?.papel === "cliente";
  };

  /**
   * Verifica se o usuário logado é um funcionário.
   */
  const eFuncionario = (): boolean => {
    return usuarioLogado?.papel === "funcionario";
  };

  /**
   * Verifica se o usuário logado é um administrador.
   */
  const eAdministrador = (): boolean => {
    return usuarioLogado?.papel === "administrador";
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioLogado,
        carregando,
        login,
        logout,
        cadastrarCliente,
        eCliente,
        eFuncionario,
        eAdministrador,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
