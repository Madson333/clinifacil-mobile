import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../services/api';
import { LoginData, LoginResponse, RegisterData, User } from '../types/api';

// Chaves para o React Query
export const authKeys = {
  all: ['auth'] as const,
  profile: () => [...authKeys.all, 'profile'] as const
};

// Funções da API
const authApi = {
  login: async (data: LoginData): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', data);
    return response.data;
  },

  register: async (data: RegisterData): Promise<LoginResponse> => {
    const response = await api.post('/auth/register', data);
    return response.data;
  },

  getProfile: async (): Promise<{ user: User }> => {
    const response = await api.get('/users/profile');
    return response.data;
  },

  updateProfile: async (data: Partial<User>): Promise<{ user: User }> => {
    const response = await api.put('/users/profile', data);
    return response.data;
  },

  changePassword: async (data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<{ message: string }> => {
    const response = await api.put('/users/password', data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await AsyncStorage.removeItem('token');
    // Limpar cache do React Query
    return Promise.resolve();
  }
};

// Hook para login
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      // Salvar token
      await AsyncStorage.setItem('token', data.token);

      // Invalidar queries relacionadas ao usuário
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      // Definir dados do usuário no cache
      queryClient.setQueryData(authKeys.profile(), { user: data.user });
    }
  });
};

// Hook para registro
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.register,
    onSuccess: async (data) => {
      // Salvar token
      await AsyncStorage.removeItem('token', data.token);

      // Invalidar queries relacionadas ao usuário
      queryClient.invalidateQueries({ queryKey: authKeys.profile() });

      // Definir dados do usuário no cache
      queryClient.setQueryData(authKeys.profile(), { user: data.user });
    }
  });
};

// Hook para obter perfil do usuário
export const useProfile = () => {
  return useQuery({
    queryKey: authKeys.profile(),
    queryFn: authApi.getProfile,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000 // 10 minutos
  });
};

// Hook para atualizar perfil
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.updateProfile,
    onSuccess: (data) => {
      // Atualizar cache do perfil
      queryClient.setQueryData(authKeys.profile(), data);
    }
  });
};

// Hook para alterar senha
export const useChangePassword = () => {
  return useMutation({
    mutationFn: authApi.changePassword
  });
};

// Hook para logout
export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      // Limpar todo o cache
      queryClient.clear();
    }
  });
};

// Hook para verificar se o usuário está autenticado
export const useIsAuthenticated = () => {
  const { data: profile, isLoading, error } = useProfile();

  return {
    isAuthenticated: !!profile?.user,
    user: profile?.user,
    isLoading,
    error
  };
};
