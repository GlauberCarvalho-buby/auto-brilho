import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useState } from "react";

/**
 * COMPONENTE CABEÇALHO
 * 
 * Navegação principal do sistema.
 * Adapta-se conforme o usuário está logado ou não.
 * Responsivo com menu hamburger em dispositivos móveis.
 */

export function Cabecalho() {
  const { usuarioLogado, logout } = useAuth();
  const [location] = useLocation();
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  // Links de navegação para usuários não logados
  const linksPublicos = [
    { href: "/", texto: "Início" },
    { href: "/sobre", texto: "Sobre" },
    { href: "/servicos", texto: "Serviços" },
    { href: "/promocoes", texto: "Promoções" },
    { href: "/contato", texto: "Contato" },
  ];

  // Função para obter o dashboard correto baseado no papel do usuário
  const obterDashboard = () => {
    if (!usuarioLogado) return "/";
    
    switch (usuarioLogado.papel) {
      case "cliente":
        return "/dashboard/cliente";
      case "funcionario":
        return "/dashboard/funcionario";
      case "administrador":
        return "/dashboard/administrador";
      default:
        return "/";
    }
  };

  // Obtém as iniciais do nome do usuário
  const obterIniciais = (nome: string): string => {
    const partes = nome.split(" ");
    if (partes.length >= 2) {
      return `${partes[0][0]}${partes[1][0]}`.toUpperCase();
    }
    return nome.substring(0, 2).toUpperCase();
  };

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 hover-elevate rounded-md px-2 py-1" data-testid="link-home">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">AutoBrilho</span>
          </Link>

          {/* Navegação Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {!usuarioLogado ? (
              <>
                {linksPublicos.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate ${
                      location === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    data-testid={`link-${link.texto.toLowerCase()}`}
                  >
                    {link.texto}
                  </Link>
                ))}
              </>
            ) : (
              <>
                <Link 
                  href={obterDashboard()}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate ${
                    location.includes("/dashboard")
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  data-testid="link-dashboard"
                >
                  Dashboard
                </Link>
                <Link 
                  href="/agendamentos"
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate ${
                    location === "/agendamentos"
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                  data-testid="link-agendamentos"
                >
                  Agendamentos
                </Link>
              </>
            )}
          </nav>

          {/* Botões de Ação Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {!usuarioLogado ? (
              <>
                <Link href="/login">
                  <Button variant="ghost" data-testid="button-login">
                    Entrar
                  </Button>
                </Link>
                <Link href="/cadastro">
                  <Button data-testid="button-cadastro">
                    Cadastrar
                  </Button>
                </Link>
              </>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full"
                    data-testid="button-user-menu"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {obterIniciais(usuarioLogado.nome)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{usuarioLogado.nome}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {usuarioLogado.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={obterDashboard()} className="flex w-full items-center" data-testid="menu-dashboard">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} data-testid="menu-logout">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Sair</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Menu Hamburger Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMenuMobileAberto(!menuMobileAberto)}
            data-testid="button-menu-mobile"
          >
            {menuMobileAberto ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Menu Mobile */}
        {menuMobileAberto && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-2">
              {!usuarioLogado ? (
                <>
                  {linksPublicos.map((link) => (
                    <Link 
                      key={link.href} 
                      href={link.href}
                      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors hover-elevate ${
                        location === link.href
                          ? "bg-accent text-accent-foreground"
                          : "text-muted-foreground"
                      }`}
                      onClick={() => setMenuMobileAberto(false)}
                      data-testid={`mobile-link-${link.texto.toLowerCase()}`}
                    >
                      {link.texto}
                    </Link>
                  ))}
                  <div className="pt-4 flex flex-col space-y-2">
                    <Link href="/login">
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setMenuMobileAberto(false)}
                        data-testid="mobile-button-login"
                      >
                        Entrar
                      </Button>
                    </Link>
                    <Link href="/cadastro">
                      <Button
                        className="w-full"
                        onClick={() => setMenuMobileAberto(false)}
                        data-testid="mobile-button-cadastro"
                      >
                        Cadastrar
                      </Button>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <div className="px-4 py-2 border-b">
                    <p className="text-sm font-medium">{usuarioLogado.nome}</p>
                    <p className="text-xs text-muted-foreground">{usuarioLogado.email}</p>
                  </div>
                  <Link 
                    href={obterDashboard()}
                    className="flex items-center px-4 py-2 rounded-md text-sm font-medium hover-elevate"
                    onClick={() => setMenuMobileAberto(false)}
                    data-testid="mobile-link-dashboard"
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                  <Link 
                    href="/agendamentos"
                    className="flex items-center px-4 py-2 rounded-md text-sm font-medium hover-elevate"
                    onClick={() => setMenuMobileAberto(false)}
                    data-testid="mobile-link-agendamentos"
                  >
                    <User className="mr-2 h-4 w-4" />
                    Agendamentos
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setMenuMobileAberto(false);
                    }}
                    className="flex items-center px-4 py-2 rounded-md text-sm font-medium hover-elevate text-left w-full"
                    data-testid="mobile-button-logout"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sair
                  </button>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
