import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ENV } from '../config/env';

// Configuração base da API
const API_BASE_URL = ENV.API_BASE_URL;

// Criar instância do axios
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token em todas as requisições
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Erro ao obter token:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Token expirado ou inválido
      try {
        await AsyncStorage.removeItem('token');
        // Aqui você pode redirecionar para a tela de login
      } catch (storageError) {
        console.error('Erro ao remover token:', storageError);
      }
    }
    return Promise.reject(error);
  }
);

export default api;
