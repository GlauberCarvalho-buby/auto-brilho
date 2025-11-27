/**
 * UTILITÁRIOS DE LOCALSTORAGE
 * 
 * Funções auxiliares para salvar e carregar dados do LocalStorage.
 * Centraliza a lógica de persistência para facilitar manutenção.
 */

/**
 * Salva dados no LocalStorage com tratamento de erro.
 */
export function salvarNoLocalStorage<T>(chave: string, dados: T): void {
  try {
    const dadosString = JSON.stringify(dados);
    localStorage.setItem(chave, dadosString);
  } catch (erro) {
    console.error(`Erro ao salvar ${chave} no LocalStorage:`, erro);
  }
}

/**
 * Carrega dados do LocalStorage com tratamento de erro.
 * Retorna null se não encontrar ou houver erro.
 */
export function carregarDoLocalStorage<T>(chave: string): T | null {
  try {
    const dadosString = localStorage.getItem(chave);
    if (!dadosString) return null;
    return JSON.parse(dadosString) as T;
  } catch (erro) {
    console.error(`Erro ao carregar ${chave} do LocalStorage:`, erro);
    return null;
  }
}

/**
 * Remove dados do LocalStorage.
 */
export function removerDoLocalStorage(chave: string): void {
  try {
    localStorage.removeItem(chave);
  } catch (erro) {
    console.error(`Erro ao remover ${chave} do LocalStorage:`, erro);
  }
}

/**
 * Limpa todos os dados do LocalStorage.
 */
export function limparLocalStorage(): void {
  try {
    localStorage.clear();
  } catch (erro) {
    console.error("Erro ao limpar LocalStorage:", erro);
  }
}
