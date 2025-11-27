import { useState } from "react";
import { Link } from "wouter";
import { Cabecalho } from "@/components/Cabecalho";
import { Rodape } from "@/components/Rodape";
import { ProtegeRota } from "@/components/ProtegeRota";
import { CardVeiculo } from "@/components/CardVeiculo";
import { CardAgendamento } from "@/components/CardAgendamento";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/useAuth";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { Car, Calendar, Plus, History } from "lucide-react";
import { CORES_VEICULO, HORARIOS_DISPONIVEIS } from "@shared/schema";
import type { InserirVeiculo, InserirAgendamento } from "@shared/schema";
import { z } from "zod";
import { inserirVeiculoSchema, inserirAgendamentoSchema } from "@shared/schema";

/**
 * DASHBOARD DO CLIENTE
 * 
 * Painel principal do cliente onde ele pode:
 * - Ver e gerenciar seus veículos
 * - Agendar novos serviços
 * - Ver histórico de agendamentos
 */

export default function DashboardCliente() {
  return (
    <ProtegeRota papeisPermitidos={["cliente"]}>
      <DashboardClienteConteudo />
    </ProtegeRota>
  );
}

function DashboardClienteConteudo() {
  const { usuarioLogado } = useAuth();
  const {
    veiculos,
    servicos,
    cadastrarVeiculo,
    excluirVeiculo,
    obterVeiculosPorCliente,
    obterAgendamentosPorCliente,
    criarAgendamento,
  } = useAgendamentos();

  const [dialogVeiculoAberto, setDialogVeiculoAberto] = useState(false);
  const [dialogAgendamentoAberto, setDialogAgendamentoAberto] = useState(false);

  const meusVeiculos = usuarioLogado ? obterVeiculosPorCliente(usuarioLogado.id) : [];
  const meusAgendamentos = usuarioLogado ? obterAgendamentosPorCliente(usuarioLogado.id) : [];

  // Formulário de veículo
  const [formVeiculo, setFormVeiculo] = useState<Partial<InserirVeiculo>>({
    clienteId: usuarioLogado?.id || "",
    placa: "",
    modelo: "",
    marca: "",
    cor: "",
    ano: new Date().getFullYear(),
  });

  // Formulário de agendamento
  const [formAgendamento, setFormAgendamento] = useState<Partial<InserirAgendamento>>({
    clienteId: usuarioLogado?.id || "",
    veiculoId: "",
    servicoId: "",
    data: "",
    horario: "",
    observacoes: "",
  });

  const handleCadastrarVeiculo = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dadosValidados = inserirVeiculoSchema.parse(formVeiculo);
      const sucesso = await cadastrarVeiculo(dadosValidados);
      if (sucesso) {
        setDialogVeiculoAberto(false);
        setFormVeiculo({
          clienteId: usuarioLogado?.id || "",
          placa: "",
          modelo: "",
          marca: "",
          cor: "",
          ano: new Date().getFullYear(),
        });
      }
    } catch (erro) {
      console.error("Erro ao cadastrar veículo:", erro);
    }
  };

  const handleCriarAgendamento = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const dadosValidados = inserirAgendamentoSchema.parse(formAgendamento);
      const sucesso = await criarAgendamento(dadosValidados);
      if (sucesso) {
        setDialogAgendamentoAberto(false);
        setFormAgendamento({
          clienteId: usuarioLogado?.id || "",
          veiculoId: "",
          servicoId: "",
          data: "",
          horario: "",
          observacoes: "",
        });
      }
    } catch (erro) {
      console.error("Erro ao criar agendamento:", erro);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Cabecalho />

      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Cabeçalho */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2" data-testid="text-dashboard-titulo">
              Bem-vindo, {usuarioLogado?.nome}!
            </h1>
            <p className="text-muted-foreground">
              Gerencie seus veículos e agendamentos
            </p>
          </div>

          {/* Cards de Resumo */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Car className="h-5 w-5 mr-2 text-primary" />
                  Meus Veículos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold" data-testid="text-total-veiculos">
                  {meusVeiculos.length}
                </p>
                <p className="text-sm text-muted-foreground">cadastrados</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <Calendar className="h-5 w-5 mr-2 text-primary" />
                  Agendamentos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold" data-testid="text-total-agendamentos">
                  {meusAgendamentos.filter((a) => a.status !== "finalizado").length}
                </p>
                <p className="text-sm text-muted-foreground">ativos</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <History className="h-5 w-5 mr-2 text-primary" />
                  Histórico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">
                  {meusAgendamentos.filter((a) => a.status === "finalizado").length}
                </p>
                <p className="text-sm text-muted-foreground">serviços realizados</p>
              </CardContent>
            </Card>
          </div>

          {/* Meus Veículos */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Meus Veículos</h2>
              <Dialog open={dialogVeiculoAberto} onOpenChange={setDialogVeiculoAberto}>
                <DialogTrigger asChild>
                  <Button data-testid="button-adicionar-veiculo">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Veículo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Cadastrar Novo Veículo</DialogTitle>
                    <DialogDescription>
                      Adicione um veículo para poder agendar serviços
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCadastrarVeiculo} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Placa *</label>
                      <Input
                        value={formVeiculo.placa}
                        onChange={(e) =>
                          setFormVeiculo({ ...formVeiculo, placa: e.target.value })
                        }
                        placeholder="ABC-1234"
                        required
                        data-testid="input-veiculo-placa"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Marca *</label>
                      <Input
                        value={formVeiculo.marca}
                        onChange={(e) =>
                          setFormVeiculo({ ...formVeiculo, marca: e.target.value })
                        }
                        placeholder="Ex: Toyota, Volkswagen"
                        required
                        data-testid="input-veiculo-marca"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Modelo *</label>
                      <Input
                        value={formVeiculo.modelo}
                        onChange={(e) =>
                          setFormVeiculo({ ...formVeiculo, modelo: e.target.value })
                        }
                        placeholder="Ex: Corolla, Gol"
                        required
                        data-testid="input-veiculo-modelo"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Cor *</label>
                      <Select
                        value={formVeiculo.cor}
                        onValueChange={(value) =>
                          setFormVeiculo({ ...formVeiculo, cor: value })
                        }
                      >
                        <SelectTrigger data-testid="select-veiculo-cor">
                          <SelectValue placeholder="Selecione a cor" />
                        </SelectTrigger>
                        <SelectContent>
                          {CORES_VEICULO.map((cor) => (
                            <SelectItem key={cor} value={cor}>
                              {cor}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Ano *</label>
                      <Input
                        type="number"
                        value={formVeiculo.ano}
                        onChange={(e) =>
                          setFormVeiculo({ ...formVeiculo, ano: parseInt(e.target.value) })
                        }
                        min="1950"
                        max={new Date().getFullYear() + 1}
                        required
                        data-testid="input-veiculo-ano"
                      />
                    </div>
                    <Button type="submit" className="w-full" data-testid="button-salvar-veiculo">
                      Cadastrar Veículo
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {meusVeiculos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {meusVeiculos.map((veiculo) => (
                  <CardVeiculo
                    key={veiculo.id}
                    veiculo={veiculo}
                    onExcluir={excluirVeiculo}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Car className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Você ainda não cadastrou nenhum veículo
                  </p>
                  <Button
                    onClick={() => setDialogVeiculoAberto(true)}
                    data-testid="button-cadastrar-primeiro-veiculo"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Cadastrar Primeiro Veículo
                  </Button>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Agendamentos */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Agendamentos</h2>
              <Dialog open={dialogAgendamentoAberto} onOpenChange={setDialogAgendamentoAberto}>
                <DialogTrigger asChild>
                  <Button disabled={meusVeiculos.length === 0} data-testid="button-novo-agendamento">
                    <Plus className="h-4 w-4 mr-2" />
                    Novo Agendamento
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Agendar Serviço</DialogTitle>
                    <DialogDescription>
                      Escolha o veículo, serviço, data e horário
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleCriarAgendamento} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Veículo *</label>
                      <Select
                        value={formAgendamento.veiculoId}
                        onValueChange={(value) =>
                          setFormAgendamento({ ...formAgendamento, veiculoId: value })
                        }
                      >
                        <SelectTrigger data-testid="select-agendamento-veiculo">
                          <SelectValue placeholder="Selecione o veículo" />
                        </SelectTrigger>
                        <SelectContent>
                          {meusVeiculos.map((veiculo) => (
                            <SelectItem key={veiculo.id} value={veiculo.id}>
                              {veiculo.modelo} - {veiculo.placa}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Serviço *</label>
                      <Select
                        value={formAgendamento.servicoId}
                        onValueChange={(value) =>
                          setFormAgendamento({ ...formAgendamento, servicoId: value })
                        }
                      >
                        <SelectTrigger data-testid="select-agendamento-servico">
                          <SelectValue placeholder="Selecione o serviço" />
                        </SelectTrigger>
                        <SelectContent>
                          {servicos.map((servico) => (
                            <SelectItem key={servico.id} value={servico.id}>
                              {servico.nome} - R$ {servico.preco.toFixed(2)}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Data *</label>
                      <Input
                        type="date"
                        value={formAgendamento.data}
                        onChange={(e) =>
                          setFormAgendamento({ ...formAgendamento, data: e.target.value })
                        }
                        min={new Date().toISOString().split("T")[0]}
                        required
                        data-testid="input-agendamento-data"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Horário *</label>
                      <Select
                        value={formAgendamento.horario}
                        onValueChange={(value) =>
                          setFormAgendamento({ ...formAgendamento, horario: value })
                        }
                      >
                        <SelectTrigger data-testid="select-agendamento-horario">
                          <SelectValue placeholder="Selecione o horário" />
                        </SelectTrigger>
                        <SelectContent>
                          {HORARIOS_DISPONIVEIS.map((horario) => (
                            <SelectItem key={horario} value={horario}>
                              {horario}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button type="submit" className="w-full" data-testid="button-confirmar-agendamento">
                      Confirmar Agendamento
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            {meusAgendamentos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {meusAgendamentos.map((agendamento) => (
                  <CardAgendamento key={agendamento.id} agendamento={agendamento} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="py-12 text-center">
                  <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground mb-4">
                    Você ainda não tem nenhum agendamento
                  </p>
                  {meusVeiculos.length > 0 && (
                    <Button onClick={() => setDialogAgendamentoAberto(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Criar Primeiro Agendamento
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </section>
        </div>
      </main>

      <Rodape />
    </div>
  );
}
