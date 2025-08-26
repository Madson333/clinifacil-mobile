// Tipos de usuário
export type UserType = 'patient' | 'doctor' | 'admin';

export interface User {
  id: number;
  name: string;
  email: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
  userType: UserType;
  createdAt: string;
  updatedAt: string;
}

// Especialidades médicas
export interface Specialty {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// Médicos
export interface Doctor {
  id: number;
  userId: number;
  crm: string;
  specialtyId: number;
  bio: string;
  experienceYears: number;
  education: string;
  consultationPrice: number;
  isAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  doctor?: User;
  specialty?: Specialty;
  schedules?: DoctorSchedule[];
  ratings?: DoctorRatings;
}

// Horários dos médicos
export interface DoctorSchedule {
  id: number;
  doctorId: number;
  dayOfWeek: number; // 0=Domingo, 1=Segunda, etc.
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

// Avaliações dos médicos
export interface DoctorRatings {
  average: number;
  total: number;
  recent: DoctorRating[];
}

export interface DoctorRating {
  id: number;
  rating: number;
  comment: string;
  createdAt: string;
  patientName: string;
}

// Consultas
export type AppointmentStatus =
  | 'scheduled'
  | 'completed'
  | 'cancelled'
  | 'no_show';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  specialtyId: number;
  appointmentDate: string;
  appointmentTime: string;
  status: AppointmentStatus;
  notes?: string;
  symptoms?: string;
  diagnosis?: string;
  prescription?: string;
  createdAt: string;
  updatedAt: string;
  patient?: User;
  doctor?: User;
  specialty?: Specialty;
}

// Dados de paginação
export interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

// Respostas da API
export interface ApiResponse<T> {
  message?: string;
  data?: T;
  error?: string;
  details?: any[];
}

export interface PaginatedResponse<T> {
  [key: string]: T[];
  pagination: Pagination;
}

// Dados de login
export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  user: User;
  token: string;
}

// Dados de registro
export interface RegisterData {
  name: string;
  email: string;
  password: string;
  userType: UserType;
  crm?: string;
  cpf?: string;
  phone?: string;
  birthDate?: string;
  gender?: string;
  address?: string;
}

// Dados para agendamento
export interface AppointmentData {
  doctorId: number;
  specialtyId: number;
  appointmentDate: string;
  appointmentTime: string;
  notes?: string;
  symptoms?: string;
}

// Dados para avaliação
export interface RatingData {
  rating: number;
  comment: string;
}

// Filtros para busca de médicos
export interface DoctorFilters {
  page?: number;
  limit?: number;
  specialtyId?: number;
  search?: string;
  available?: boolean;
  minPrice?: number;
  maxPrice?: number;
}

// Filtros para busca de consultas
export interface AppointmentFilters {
  page?: number;
  limit?: number;
  specialtyId?: number;
  doctorId?: number;
  startDate?: string;
  endDate?: string;
  status?: AppointmentStatus;
  doctorView?: boolean;
}
