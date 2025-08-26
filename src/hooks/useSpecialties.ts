import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import { Specialty, PaginatedResponse } from '../types/api';

// Chaves para o React Query
export const specialtyKeys = {
  all: ['specialties'] as const,
  lists: () => [...specialtyKeys.all, 'list'] as const,
  list: (filters: { page?: number; limit?: number; search?: string } = {}) =>
    [...specialtyKeys.lists(), filters] as const,
  details: () => [...specialtyKeys.all, 'detail'] as const,
  detail: (id: number) => [...specialtyKeys.details(), id] as const,
  doctors: (specialtyId: number) =>
    [...specialtyKeys.detail(specialtyId), 'doctors'] as const
};

// Funções da API
const specialtyApi = {
  getSpecialties: async (
    filters: { page?: number; limit?: number; search?: string } = {}
  ): Promise<PaginatedResponse<Specialty>> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.search) params.append('search', filters.search);

    const response = await api.get(`/specialties?${params.toString()}`);
    return response.data;
  },

  getSpecialty: async (id: number): Promise<{ specialty: Specialty }> => {
    const response = await api.get(`/specialties/${id}`);
    return response.data;
  },

  createSpecialty: async (data: {
    name: string;
    description: string;
  }): Promise<{ specialty: Specialty; message: string }> => {
    const response = await api.post('/specialties', data);
    return response.data;
  },

  updateSpecialty: async (
    id: number,
    data: Partial<Specialty>
  ): Promise<{ specialty: Specialty; message: string }> => {
    const response = await api.put(`/specialties/${id}`, data);
    return response.data;
  },

  deleteSpecialty: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/specialties/${id}`);
    return response.data;
  },

  getDoctorsBySpecialty: async (
    specialtyId: number,
    filters: { page?: number; limit?: number; available?: boolean } = {}
  ): Promise<PaginatedResponse<any>> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.available !== undefined)
      params.append('available', filters.available.toString());

    const response = await api.get(
      `/specialties/${specialtyId}/doctors?${params.toString()}`
    );
    return response.data;
  }
};

// Hook para listar especialidades
export const useSpecialties = (
  filters: { page?: number; limit?: number; search?: string } = {}
) => {
  return useQuery({
    queryKey: specialtyKeys.list(filters),
    queryFn: () => specialtyApi.getSpecialties(filters),
    staleTime: 10 * 60 * 1000, // 10 minutos (especialidades mudam pouco)
    gcTime: 30 * 60 * 1000 // 30 minutos
  });
};

// Hook para obter especialidade específica
export const useSpecialty = (id: number) => {
  return useQuery({
    queryKey: specialtyKeys.detail(id),
    queryFn: () => specialtyApi.getSpecialty(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutos
    gcTime: 30 * 60 * 1000 // 30 minutos
  });
};

// Hook para criar especialidade
export const useCreateSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: specialtyApi.createSpecialty,
    onSuccess: () => {
      // Invalidar lista de especialidades
      queryClient.invalidateQueries({ queryKey: specialtyKeys.lists() });
    }
  });
};

// Hook para atualizar especialidade
export const useUpdateSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Specialty> }) =>
      specialtyApi.updateSpecialty(id, data),
    onSuccess: (data, variables) => {
      // Atualizar cache da especialidade específica
      queryClient.setQueryData(specialtyKeys.detail(variables.id), data);
      // Invalidar lista de especialidades
      queryClient.invalidateQueries({ queryKey: specialtyKeys.lists() });
    }
  });
};

// Hook para deletar especialidade
export const useDeleteSpecialty = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: specialtyApi.deleteSpecialty,
    onSuccess: (data, variables) => {
      // Remover do cache
      queryClient.removeQueries({ queryKey: specialtyKeys.detail(variables) });
      // Invalidar lista de especialidades
      queryClient.invalidateQueries({ queryKey: specialtyKeys.lists() });
    }
  });
};

// Hook para obter médicos de uma especialidade
export const useDoctorsBySpecialty = (
  specialtyId: number,
  filters: { page?: number; limit?: number; available?: boolean } = {}
) => {
  return useQuery({
    queryKey: specialtyKeys.doctors(specialtyId),
    queryFn: () => specialtyApi.getDoctorsBySpecialty(specialtyId, filters),
    enabled: !!specialtyId,
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000 // 5 minutos
  });
};
