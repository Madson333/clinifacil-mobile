import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert
} from 'react-native';
import {
  useLogin,
  useRegister,
  useProfile,
  useDoctors,
  useSpecialties,
  useAppointments,
  useCreateAppointment,
  useIsAuthenticated
} from '../hooks';
import { formatCurrency, getAppointmentStatusLabel } from '../utils/apiUtils';

// Exemplo de uso dos hooks de autenticação
export const AuthExample: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const login = useLogin();
  const register = useRegister();
  const { isAuthenticated, user } = useIsAuthenticated();

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    login.mutate(
      { email, password },
      {
        onSuccess: () => {
          Alert.alert('Sucesso', 'Login realizado com sucesso!');
        },
        onError: (error) => {
          Alert.alert('Erro', 'Falha no login: ' + error.message);
        }
      }
    );
  };

  const handleRegister = () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Preencha email e senha');
      return;
    }

    register.mutate(
      {
        name: 'Usuário Teste',
        email,
        password,
        userType: 'patient',
        cpf: '123.456.789-00',
        phone: '(11) 99999-9999'
      },
      {
        onSuccess: () => {
          Alert.alert('Sucesso', 'Usuário registrado com sucesso!');
        },
        onError: (error) => {
          Alert.alert('Erro', 'Falha no registro: ' + error.message);
        }
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Exemplo de Autenticação
      </Text>

      {isAuthenticated ? (
        <View>
          <Text style={{ fontSize: 18, marginBottom: 10 }}>
            Usuário logado: {user?.name}
          </Text>
          <Text>Email: {user?.email}</Text>
          <Text>Tipo: {user?.userType}</Text>
        </View>
      ) : (
        <View>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10
            }}
          />
          <TextInput
            placeholder="Senha"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={{
              borderWidth: 1,
              borderColor: '#ccc',
              padding: 10,
              marginBottom: 10
            }}
          />

          <TouchableOpacity
            onPress={handleLogin}
            disabled={login.isPending}
            style={{
              backgroundColor: '#007AFF',
              padding: 15,
              borderRadius: 8,
              marginBottom: 10,
              opacity: login.isPending ? 0.6 : 1
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {login.isPending ? 'Fazendo login...' : 'Fazer Login'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleRegister}
            disabled={register.isPending}
            style={{
              backgroundColor: '#34C759',
              padding: 15,
              borderRadius: 8,
              opacity: register.isPending ? 0.6 : 1
            }}
          >
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold'
              }}
            >
              {register.isPending ? 'Registrando...' : 'Registrar'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

// Exemplo de uso dos hooks de médicos
export const DoctorsExample: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyId, setSpecialtyId] = useState<number | undefined>();

  const {
    data: doctorsData,
    isLoading,
    error
  } = useDoctors({
    search: searchTerm || undefined,
    specialtyId,
    available: true,
    limit: 10
  });

  const doctors = doctorsData?.doctors || [];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Exemplo de Médicos
      </Text>

      <TextInput
        placeholder="Buscar médicos..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10
        }}
      />

      {isLoading ? (
        <Text>Carregando médicos...</Text>
      ) : error ? (
        <Text style={{ color: 'red' }}>Erro: {error.message}</Text>
      ) : (
        <ScrollView>
          {doctors.map((doctor) => (
            <View
              key={doctor.id}
              style={{
                marginBottom: 15,
                padding: 15,
                backgroundColor: '#f5f5f5',
                borderRadius: 8
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {doctor.doctor?.name || 'Nome não disponível'}
              </Text>
              <Text>Especialidade: {doctor.specialty?.name}</Text>
              <Text>Preço: {formatCurrency(doctor.consultationPrice)}</Text>
              <Text>Experiência: {doctor.experienceYears} anos</Text>
              <Text>Disponível: {doctor.isAvailable ? 'Sim' : 'Não'}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// Exemplo de uso dos hooks de especialidades
export const SpecialtiesExample: React.FC = () => {
  const {
    data: specialtiesData,
    isLoading,
    error
  } = useSpecialties({ limit: 50 });

  const specialties = specialtiesData?.specialties || [];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Exemplo de Especialidades
      </Text>

      {isLoading ? (
        <Text>Carregando especialidades...</Text>
      ) : error ? (
        <Text style={{ color: 'red' }}>Erro: {error.message}</Text>
      ) : (
        <ScrollView>
          {specialties.map((specialty) => (
            <View
              key={specialty.id}
              style={{
                marginBottom: 15,
                padding: 15,
                backgroundColor: '#f5f5f5',
                borderRadius: 8
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                {specialty.name}
              </Text>
              <Text>{specialty.description}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// Exemplo de uso dos hooks de consultas
export const AppointmentsExample: React.FC = () => {
  const {
    data: appointmentsData,
    isLoading,
    error
  } = useAppointments({
    limit: 10,
    status: 'scheduled'
  });

  const appointments = appointmentsData?.appointments || [];

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Exemplo de Consultas
      </Text>

      {isLoading ? (
        <Text>Carregando consultas...</Text>
      ) : error ? (
        <Text style={{ color: 'red' }}>Erro: {error.message}</Text>
      ) : (
        <ScrollView>
          {appointments.map((appointment) => (
            <View
              key={appointment.id}
              style={{
                marginBottom: 15,
                padding: 15,
                backgroundColor: '#f5f5f5',
                borderRadius: 8
              }}
            >
              <Text style={{ fontSize: 18, fontWeight: 'bold' }}>
                Consulta #{appointment.id}
              </Text>
              <Text>Médico: {appointment.doctor?.name}</Text>
              <Text>Paciente: {appointment.patient?.name}</Text>
              <Text>Data: {appointment.appointmentDate}</Text>
              <Text>Hora: {appointment.appointmentTime}</Text>
              <Text>
                Status: {getAppointmentStatusLabel(appointment.status)}
              </Text>
              <Text>Especialidade: {appointment.specialty?.name}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// Exemplo de agendamento de consulta
export const CreateAppointmentExample: React.FC = () => {
  const [doctorId, setDoctorId] = useState('');
  const [specialtyId, setSpecialtyId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const createAppointment = useCreateAppointment();

  const handleCreateAppointment = () => {
    if (!doctorId || !specialtyId || !date || !time) {
      Alert.alert('Erro', 'Preencha todos os campos');
      return;
    }

    createAppointment.mutate(
      {
        doctorId: parseInt(doctorId),
        specialtyId: parseInt(specialtyId),
        appointmentDate: date,
        appointmentTime: time,
        notes: 'Consulta agendada via app',
        symptoms: 'Sintomas do paciente'
      },
      {
        onSuccess: () => {
          Alert.alert('Sucesso', 'Consulta agendada com sucesso!');
          // Limpar campos
          setDoctorId('');
          setSpecialtyId('');
          setDate('');
          setTime('');
        },
        onError: (error) => {
          Alert.alert('Erro', 'Falha ao agendar consulta: ' + error.message);
        }
      }
    );
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>
        Exemplo de Agendamento
      </Text>

      <TextInput
        placeholder="ID do médico"
        value={doctorId}
        onChangeText={setDoctorId}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10
        }}
      />

      <TextInput
        placeholder="ID da especialidade"
        value={specialtyId}
        onChangeText={setSpecialtyId}
        keyboardType="numeric"
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10
        }}
      />

      <TextInput
        placeholder="Data (YYYY-MM-DD)"
        value={date}
        onChangeText={setDate}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10
        }}
      />

      <TextInput
        placeholder="Hora (HH:MM)"
        value={time}
        onChangeText={setTime}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          marginBottom: 10
        }}
      />

      <TouchableOpacity
        onPress={handleCreateAppointment}
        disabled={createAppointment.isPending}
        style={{
          backgroundColor: '#007AFF',
          padding: 15,
          borderRadius: 8,
          opacity: createAppointment.isPending ? 0.6 : 1
        }}
      >
        <Text
          style={{ color: 'white', textAlign: 'center', fontWeight: 'bold' }}
        >
          {createAppointment.isPending ? 'Agendando...' : 'Agendar Consulta'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
