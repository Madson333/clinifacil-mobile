// Configurações de ambiente
export const ENV = {
  // URL base da API
  API_BASE_URL:
    process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:3000/api',

  // Timeout das requisições
  API_TIMEOUT: 10000,

  // Configurações de cache
  CACHE_STALE_TIME: 5 * 60 * 1000, // 5 minutos
  CACHE_GC_TIME: 10 * 60 * 1000, // 10 minutos

  // Configurações de retry
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000
};

// Configurações específicas para desenvolvimento
export const DEV_CONFIG = {
  // Log de requisições
  LOG_REQUESTS: __DEV__,

  // Log de cache
  LOG_CACHE: __DEV__,

  // Simular delay de rede (para testar loading states)
  SIMULATE_NETWORK_DELAY: false,
  NETWORK_DELAY: 1000
};
