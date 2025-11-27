import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { AgendamentosProvider } from "@/contexts/AgendamentosContext";

// Importação de todas as páginas
import Home from "@/pages/Home";
import Sobre from "@/pages/Sobre";
import Servicos from "@/pages/Servicos";
import Promocoes from "@/pages/Promocoes";
import Contato from "@/pages/Contato";
import Login from "@/pages/Login";
import Cadastro from "@/pages/Cadastro";
import DashboardCliente from "@/pages/DashboardCliente";
import DashboardFuncionario from "@/pages/DashboardFuncionario";
import DashboardAdministrador from "@/pages/DashboardAdministrador";
import Agendamentos from "@/pages/Agendamentos";
import NaoEncontrada from "@/pages/NaoEncontrada";

/**
 * COMPONENTE PRINCIPAL DA APLICAÇÃO
 * 
 * Define a estrutura de rotas e providers do sistema.
 * Todos os componentes são envolvidos pelos contextos necessários.
 */

function Router() {
  return (
    <Switch>
      {/* Páginas Públicas */}
      <Route path="/" component={Home} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/servicos" component={Servicos} />
      <Route path="/promocoes" component={Promocoes} />
      <Route path="/contato" component={Contato} />
      
      {/* Autenticação */}
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      
      {/* Dashboards (protegidos) */}
      <Route path="/dashboard/cliente" component={DashboardCliente} />
      <Route path="/dashboard/funcionario" component={DashboardFuncionario} />
      <Route path="/dashboard/administrador" component={DashboardAdministrador} />
      
      {/* Agendamentos (protegido) */}
      <Route path="/agendamentos" component={Agendamentos} />
      
      {/* Página 404 - deve ser a última rota */}
      <Route component={NaoEncontrada} />
    </Switch>
  );
}

/**
 * Componente App principal.
 * Envolve toda a aplicação com os providers necessários:
 * - QueryClientProvider: Para React Query
 * - TooltipProvider: Para tooltips do shadcn
 * - AuthProvider: Para autenticação e gestão de usuários
 * - AgendamentosProvider: Para gestão de agendamentos, veículos e serviços
 */
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AgendamentosProvider>
            <Router />
            <Toaster />
          </AgendamentosProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
