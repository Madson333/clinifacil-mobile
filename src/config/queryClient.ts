import { QueryClient } from '@tanstack/react-query';

// Configuração do React Query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Tempo que os dados são considerados "frescos"
      staleTime: 5 * 60 * 1000, // 5 minutos

      // Tempo que os dados ficam em cache
      gcTime: 10 * 60 * 1000, // 10 minutos

      // Tentativas de retry em caso de erro
      retry: 3,

      // Delay entre tentativas
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),

      // Refetch quando a janela ganha foco
      refetchOnWindowFocus: false,

      // Refetch quando reconecta à internet
      refetchOnReconnect: true,

      // Refetch quando o componente monta
      refetchOnMount: true
    },
    mutations: {
      // Tentativas de retry para mutations
      retry: 1,

      // Delay entre tentativas
      retryDelay: 1000
    }
  }
});
