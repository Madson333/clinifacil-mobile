import {
  AppointmentStatus,
  DoctorFilters,
  AppointmentFilters
} from '../types/api';

// Utilitários para construção de URLs
export const buildQueryString = (params: Record<string, any>): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, String(value));
    }
  });

  return searchParams.toString();
};

// Utilitários para filtros de médicos
export const buildDoctorFilters = (filters: Partial<DoctorFilters>): string => {
  return buildQueryString(filters);
};

// Utilitários para filtros de consultas
export const buildAppointmentFilters = (
  filters: Partial<AppointmentFilters>
): string => {
  return buildQueryString(filters);
};

// Utilitários para datas
export const formatDateForAPI = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

export const formatTimeForAPI = (date: Date): string => {
  return date.toTimeString().split(' ')[0].substring(0, 5);
};

// Utilitários para status de consultas
export const getAppointmentStatusLabel = (
  status: AppointmentStatus
): string => {
  const labels: Record<AppointmentStatus, string> = {
    scheduled: 'Agendada',
    completed: 'Concluída',
    cancelled: 'Cancelada',
    no_show: 'Não compareceu'
  };

  return labels[status] || status;
};

export const getAppointmentStatusColor = (
  status: AppointmentStatus
): string => {
  const colors: Record<AppointmentStatus, string> = {
    scheduled: '#3B82F6', // blue
    completed: '#10B981', // green
    cancelled: '#EF4444', // red
    no_show: '#F59E0B' // yellow
  };

  return colors[status] || '#6B7280'; // gray
};

// Utilitários para dias da semana
export const getDayOfWeekLabel = (day: number): string => {
  const days = [
    'Domingo',
    'Segunda',
    'Terça',
    'Quarta',
    'Quinta',
    'Sexta',
    'Sábado'
  ];
  return days[day] || `Dia ${day}`;
};

// Utilitários para validação
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  if (cleanCPF.length !== 11) return false;

  // Verificar se todos os dígitos são iguais
  if (/^(\d)\1{10}$/.test(cleanCPF)) return false;

  // Validar CPF
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(9))) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cleanCPF.charAt(i)) * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== parseInt(cleanCPF.charAt(10))) return false;

  return true;
};

export const validatePhone = (phone: string): boolean => {
  const cleanPhone = phone.replace(/\D/g, '');
  return cleanPhone.length >= 10 && cleanPhone.length <= 11;
};

// Utilitários para formatação
export const formatCPF = (cpf: string): string => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (phone: string): string => {
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length === 11) {
    return cleanPhone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
  if (cleanPhone.length === 10) {
    return cleanPhone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
  }
  return phone;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
};

// Utilitários para paginação
export const getPaginationInfo = (
  page: number,
  limit: number,
  total: number
) => {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return {
    currentPage: page,
    totalPages,
    hasNextPage,
    hasPrevPage,
    startItem,
    endItem,
    totalItems: total,
    itemsPerPage: limit
  };
};
