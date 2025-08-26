import { useQuery } from '@tanstack/react-query';
import api from '../services/api';

export interface Consultation {
  id: number;
  data: string;
  horario: string;
  status: string;
  medico: { nome: string } | string;
  especialidade: { nome: string } | string;
}

export interface PaginatedConsultations {
  data: Consultation[];
  total: number;
  page: number;
  pageSize: number;
}

export const useConsultations = (params?: Record<string, any>) => {
  return useQuery({
    queryKey: ['consultations', params],
    queryFn: async () => {
      const response = await api.get<PaginatedConsultations>(
        '/api/appointments',
        { params }
      );
      return response.data;
    }
  });
};
