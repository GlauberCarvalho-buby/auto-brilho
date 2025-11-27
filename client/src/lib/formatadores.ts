/**
 * UTILITÁRIOS DE FORMATAÇÃO
 * 
 * Funções auxiliares para formatar dados de exibição.
 */

/**
 * Formata um valor numérico como moeda brasileira (R$).
 */
export function formatarMoeda(valor: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

/**
 * Formata uma data no padrão brasileiro (dd/mm/yyyy).
 */
export function formatarData(data: string | Date): string {
  const dataObj = typeof data === "string" ? new Date(data) : data;
  return dataObj.toLocaleDateString("pt-BR");
}

/**
 * Formata duração em minutos para formato legível (Xh Ymin).
 */
export function formatarDuracao(minutos: number): string {
  const horas = Math.floor(minutos / 60);
  const mins = minutos % 60;
  
  if (horas > 0 && mins > 0) {
    return `${horas}h ${mins}min`;
  } else if (horas > 0) {
    return `${horas}h`;
  } else {
    return `${mins}min`;
  }
}

/**
 * Formata telefone brasileiro.
 */
export function formatarTelefone(telefone: string): string {
  const numeros = telefone.replace(/\D/g, "");
  
  if (numeros.length === 11) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
  } else if (numeros.length === 10) {
    return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
  }
  
  return telefone;
}

/**
 * Formata placa de veículo (padrão brasileiro).
 */
export function formatarPlaca(placa: string): string {
  return placa.toUpperCase().replace(/[^A-Z0-9]/g, "");
}
