import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../services/api';
import {
  Appointment,
  AppointmentData,
  AppointmentFilters,
  AppointmentStatus,
  RatingData,
  PaginatedResponse
} from '../types/api';

// Chaves para o React Query
export const appointmentKeys = {
  all: ['appointments'] as const,
  lists: () => [...appointmentKeys.all, 'list'] as const,
  list: (filters: AppointmentFilters = {}) =>
    [...appointmentKeys.lists(), filters] as const,
  details: () => [...appointmentKeys.all, 'detail'] as const,
  detail: (id: number) => [...appointmentKeys.details(), id] as const,
  ratings: (appointmentId: number) =>
    [...appointmentKeys.detail(appointmentId), 'ratings'] as const
};

// Funções da API
const appointmentApi = {
  getAppointments: async (
    filters: AppointmentFilters = {}
  ): Promise<PaginatedResponse<Appointment>> => {
    const params = new URLSearchParams();

    if (filters.page) params.append('page', filters.page.toString());
    if (filters.limit) params.append('limit', filters.limit.toString());
    if (filters.specialtyId)
      params.append('specialtyId', filters.specialtyId.toString());
    if (filters.doctorId)
      params.append('doctorId', filters.doctorId.toString());
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.status) params.append('status', filters.status);
    if (filters.doctorView !== undefined)
      params.append('doctorView', filters.doctorView.toString());

    const response = await api.get(`/appointments?${params.toString()}`);
    return response.data;
  },

  getAppointment: async (id: number): Promise<{ appointment: Appointment }> => {
    const response = await api.get(`/appointments/${id}`);
    return response.data;
  },

  createAppointment: async (
    data: AppointmentData
  ): Promise<{ appointment: Appointment; message: string }> => {
    const response = await api.post('/appointments', data);
    return response.data;
  },

  updateAppointment: async (
    id: number,
    data: {
      status?: AppointmentStatus;
      diagnosis?: string;
      prescription?: string;
    }
  ): Promise<{ appointment: Appointment; message: string }> => {
    const response = await api.put(`/appointments/${id}`, data);
    return response.data;
  },

  deleteAppointment: async (id: number): Promise<{ message: string }> => {
    const response = await api.delete(`/appointments/${id}`);
    return response.data;
  },

  addRating: async (
    appointmentId: number,
    data: RatingData
  ): Promise<{ message: string }> => {
    const response = await api.post(
      `/appointments/${appointmentId}/ratings`,
      data
    );
    return response.data;
  }
};

// Hook para listar consultas
export const useAppointments = (filters: AppointmentFilters = {}) => {
  return useQuery({
    queryKey: appointmentKeys.list(filters),
    queryFn: () => appointmentApi.getAppointments(filters),
    staleTime: 1 * 60 * 1000, // 1 minuto (consultas podem mudar frequentemente)
    gcTime: 5 * 60 * 1000 // 5 minutos
  });
};

// Hook para obter consulta específica
export const useAppointment = (id: number) => {
  return useQuery({
    queryKey: appointmentKeys.detail(id),
    queryFn: () => appointmentApi.getAppointment(id),
    enabled: !!id,
    staleTime: 1 * 60 * 1000, // 1 minuto
    gcTime: 5 * 60 * 1000 // 5 minutos
  });
};

// Hook para criar consulta
export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentApi.createAppointment,
    onSuccess: () => {
      // Invalidar lista de consultas
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    }
  });
};

// Hook para atualizar consulta
export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) =>
      appointmentApi.updateAppointment(id, data),
    onSuccess: (data, variables) => {
      // Atualizar cache da consulta específica
      queryClient.setQueryData(appointmentKeys.detail(variables.id), data);
      // Invalidar lista de consultas
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    }
  });
};

// Hook para deletar consulta
export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: appointmentApi.deleteAppointment,
    onSuccess: (data, variables) => {
      // Remover do cache
      queryClient.removeQueries({
        queryKey: appointmentKeys.detail(variables)
      });
      // Invalidar lista de consultas
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    }
  });
};

// Hook para adicionar avaliação
export const useAddRating = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      appointmentId,
      data
    }: {
      appointmentId: number;
      data: RatingData;
    }) => appointmentApi.addRating(appointmentId, data),
    onSuccess: (data, variables) => {
      // Invalidar dados da consulta
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.detail(variables.appointmentId)
      });
      // Invalidar lista de consultas
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
    }
  });
};

// Hook para consultas do paciente
export const usePatientAppointments = (
  filters: Omit<AppointmentFilters, 'doctorView'> = {}
) => {
  return useAppointments({ ...filters, doctorView: false });
};

// Hook para consultas do médico
export const useDoctorAppointments = (
  filters: Omit<AppointmentFilters, 'doctorView'> = {}
) => {
  return useAppointments({ ...filters, doctorView: true });
};

// Hook para consultas por status
export const useAppointmentsByStatus = (
  status: AppointmentStatus,
  filters: Omit<AppointmentFilters, 'status'> = {}
) => {
  return useAppointments({ ...filters, status });
};

// Hook para consultas por data
export const useAppointmentsByDate = (
  startDate: string,
  endDate: string,
  filters: Omit<AppointmentFilters, 'startDate' | 'endDate'> = {}
) => {
  return useAppointments({ ...filters, startDate, endDate });
};
