import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import {
  Doctor,
  DoctorFilters,
  DoctorSchedule,
  PaginatedResponse
} from '../types/api';

// Chaves para o React Query
export const doctorKeys = {
  all: ['doctors'] as const,
  lists: () => [...doctorKeys.all, 'list'] as const,
  list: (filters: DoctorFilters) => [...doctorKeys.lists(), filters] as const,
  details: () => [...doctorKeys.all, 'detail'] as const,
  detail: (id: number) => [...doctorKeys.details(), id] as const,
  schedules: (doctorId: number) =>
    [...doctorKeys.detail(doctorId), 'schedules'] as const
};

// Funções da API
const doctorApi = {
  getDoctors: async (
    filters: DoctorFilters = {}
  ): Promise<PaginatedResponse<Doctor>> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.specialtyId)
      params.append('specialtyId', filters.specialtyId.toString());
    if (filters.search) params.append('search', filters.search);
    if (filters.available !== undefined)
      params.append('available', filters.available.toString());
    if (filters.minPrice)
      params.append('minPrice', filters.minPrice.toString());
    if (filters.maxPrice)
      params.append('maxPrice', filters.maxPrice.toString());

    const response = await api.get(`/doctors?${params.toString()}`);
    return response.data;
  },

  getDoctor: async (id: number): Promise<{ doctor: Doctor }> => {
    const response = await api.get(`/doctors/${id}`);
    return response.data;
  },

  createDoctor: async (data: {
    userId: number;
    crm: string;
    specialtyId: number;
    bio: string;
    experienceYears: number;
    education: string;
    consultationPrice: number;
  }): Promise<{ doctor: Doctor; message: string }> => {
    const response = await api.post('/doctors', data);
    return response.data;
  },

  updateDoctor: async (
    id: number,
    data: Partial<Doctor>
  ): Promise<{ doctor: Doctor; message: string }> => {
    const response = await api.put(`/doctors/${id}`, data);
    return response.data;
  },

  addSchedule: async (
    doctorId: number,
    data: {
      dayOfWeek: number;
      startTime: string;
      endTime: string;
    }
  ): Promise<{ schedule: DoctorSchedule; message: string }> => {
    const response = await api.post(`/doctors/${doctorId}/schedules`, data);
    return response.data;
  },

  updateSchedule: async (
    doctorId: number,
    scheduleId: number,
    data: Partial<DoctorSchedule>
  ): Promise<{ schedule: DoctorSchedule; message: string }> => {
    const response = await api.put(
      `/doctors/${doctorId}/schedules/${scheduleId}`,
      data
    );
    return response.data;
  },

  deleteSchedule: async (
    doctorId: number,
    scheduleId: number
  ): Promise<{ message: string }> => {
    const response = await api.delete(
      `/doctors/${doctorId}/schedules/${scheduleId}`
    );
    return response.data;
  }
};

// Hook para listar médicos
export const useDoctors = (filters: DoctorFilters = {}) => {
  return useQuery({
    queryKey: doctorKeys.list(filters),
    queryFn: () => doctorApi.getDoctors(filters),
    staleTime: 2 * 60 * 1000, // 2 minutos
    gcTime: 5 * 60 * 1000 // 5 minutos
  });
};

// Hook para obter médico específico
export const useDoctor = (id: number) => {
  return useQuery({
    queryKey: doctorKeys.detail(id),
    queryFn: () => doctorApi.getDoctor(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000 // 10 minutos
  });
};

// Hook para criar médico
export const useCreateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: doctorApi.createDoctor,
    onSuccess: () => {
      // Invalidar lista de médicos
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
    }
  });
};

// Hook para atualizar médico
export const useUpdateDoctor = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Doctor> }) =>
      doctorApi.updateDoctor(id, data),
    onSuccess: (data, variables) => {
      // Atualizar cache do médico específico
      queryClient.setQueryData(doctorKeys.detail(variables.id), data);
      // Invalidar lista de médicos
      queryClient.invalidateQueries({ queryKey: doctorKeys.lists() });
    }
  });
};

// Hook para adicionar horário
export const useAddSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ doctorId, data }: { doctorId: number; data: any }) =>
      doctorApi.addSchedule(doctorId, data),
    onSuccess: (data, variables) => {
      // Invalidar dados do médico
      queryClient.invalidateQueries({
        queryKey: doctorKeys.detail(variables.doctorId)
      });
      // Invalidar horários
      queryClient.invalidateQueries({
        queryKey: doctorKeys.schedules(variables.doctorId)
      });
    }
  });
};

// Hook para atualizar horário
export const useUpdateSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      scheduleId,
      data
    }: {
      doctorId: number;
      scheduleId: number;
      data: any;
    }) => doctorApi.updateSchedule(doctorId, scheduleId, data),
    onSuccess: (data, variables) => {
      // Invalidar dados do médico
      queryClient.invalidateQueries({
        queryKey: doctorKeys.detail(variables.doctorId)
      });
      // Invalidar horários
      queryClient.invalidateQueries({
        queryKey: doctorKeys.schedules(variables.doctorId)
      });
    }
  });
};

// Hook para deletar horário
export const useDeleteSchedule = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      doctorId,
      scheduleId
    }: {
      doctorId: number;
      scheduleId: number;
    }) => doctorApi.deleteSchedule(doctorId, scheduleId),
    onSuccess: (data, variables) => {
      // Invalidar dados do médico
      queryClient.invalidateQueries({
        queryKey: doctorKeys.detail(variables.doctorId)
      });
      // Invalidar horários
      queryClient.invalidateQueries({
        queryKey: doctorKeys.schedules(variables.doctorId)
      });
    }
  });
};
