# 🏥 Integração com Backend - MeuApp

Este documento explica como usar a integração completa com o backend de agendamento médico usando React Query e Axios.

## 📋 Pré-requisitos

1. **Backend rodando**: Certifique-se de que o backend está rodando em `http://localhost:3000`
2. **Dependências instaladas**: Todas as dependências necessárias já estão instaladas

## 🚀 Estrutura da Integração

### 1. **Configuração Base**

- `src/config/queryClient.ts` - Configuração do React Query
- `src/config/env.ts` - Variáveis de ambiente
- `src/services/api.ts` - Cliente Axios configurado

### 2. **Tipos TypeScript**

- `src/types/api.ts` - Todas as interfaces e tipos da API

### 3. **Hooks React Query**

- `src/hooks/useAuth.ts` - Autenticação e usuários
- `src/hooks/useDoctors.ts` - Gerenciamento de médicos
- `src/hooks/useSpecialties.ts` - Especialidades médicas
- `src/hooks/useAppointments.ts` - Consultas e agendamentos

### 4. **Utilitários**

- `src/utils/apiUtils.ts` - Funções auxiliares para API

## 🔐 Autenticação

### Login

```typescript
import { useLogin } from '../hooks/useAuth';

const LoginScreen = () => {
  const login = useLogin();

  const handleLogin = () => {
    login.mutate(
      { email: 'user@email.com', password: '123456' },
      {
        onSuccess: () => {
          console.log('Login realizado com sucesso!');
        },
        onError: (error) => {
          console.error('Erro no login:', error);
        }
      }
    );
  };

  return (
    <TouchableOpacity onPress={handleLogin} disabled={login.isPending}>
      <Text>{login.isPending ? 'Fazendo login...' : 'Fazer Login'}</Text>
    </TouchableOpacity>
  );
};
```

### Registro

```typescript
import { useRegister } from '../hooks/useAuth';

const RegisterScreen = () => {
  const register = useRegister();

  const handleRegister = () => {
    register.mutate({
      name: 'João Silva',
      email: 'joao@email.com',
      password: '123456',
      userType: 'patient',
      cpf: '123.456.789-00',
      phone: '(11) 99999-9999'
    });
  };

  return (
    <TouchableOpacity onPress={handleRegister} disabled={register.isPending}>
      <Text>{register.isPending ? 'Registrando...' : 'Registrar'}</Text>
    </TouchableOpacity>
  );
};
```

### Verificar Autenticação

```typescript
import { useIsAuthenticated } from '../hooks/useAuth';

const App = () => {
  const { isAuthenticated, user, isLoading } = useIsAuthenticated();

  if (isLoading) return <LoadingSpinner />;

  if (!isAuthenticated) return <LoginScreen />;

  return <MainApp user={user} />;
};
```

## 👨‍⚕️ Médicos

### Listar Médicos

```typescript
import { useDoctors } from '../hooks/useDoctors';

const DoctorsScreen = () => {
  const { data, isLoading, error } = useDoctors({
    specialtyId: 1,
    available: true,
    limit: 10
  });

  if (isLoading) return <Text>Carregando...</Text>;
  if (error) return <Text>Erro: {error.message}</Text>;

  return (
    <FlatList
      data={data?.doctors || []}
      renderItem={({ item }) => <DoctorCard doctor={item} />}
    />
  );
};
```

### Buscar Médico Específico

```typescript
import { useDoctor } from '../hooks/useDoctors';

const DoctorProfileScreen = ({ route }) => {
  const { doctorId } = route.params;
  const { data, isLoading } = useDoctor(doctorId);

  if (isLoading) return <Text>Carregando...</Text>;

  const doctor = data?.doctor;

  return (
    <View>
      <Text>{doctor?.doctor?.name}</Text>
      <Text>{doctor?.specialty?.name}</Text>
      <Text>{doctor?.bio}</Text>
    </View>
  );
};
```

### Adicionar Horário

```typescript
import { useAddSchedule } from '../hooks/useDoctors';

const AddScheduleScreen = () => {
  const addSchedule = useAddSchedule();

  const handleAddSchedule = () => {
    addSchedule.mutate({
      doctorId: 1,
      data: {
        dayOfWeek: 1, // Segunda-feira
        startTime: '08:00',
        endTime: '12:00'
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={handleAddSchedule}
      disabled={addSchedule.isPending}
    >
      <Text>
        {addSchedule.isPending ? 'Adicionando...' : 'Adicionar Horário'}
      </Text>
    </TouchableOpacity>
  );
};
```

## 🏥 Especialidades

### Listar Especialidades

```typescript
import { useSpecialties } from '../hooks/useSpecialties';

const SpecialtiesScreen = () => {
  const { data, isLoading } = useSpecialties({ limit: 50 });

  return (
    <FlatList
      data={data?.specialties || []}
      renderItem={({ item }) => <SpecialtyCard specialty={item} />}
    />
  );
};
```

### Médicos por Especialidade

```typescript
import { useDoctorsBySpecialty } from '../hooks/useSpecialties';

const DoctorsBySpecialtyScreen = ({ route }) => {
  const { specialtyId } = route.params;
  const { data, isLoading } = useDoctorsBySpecialty(specialtyId, {
    available: true
  });

  return (
    <FlatList
      data={data?.doctors || []}
      renderItem={({ item }) => <DoctorCard doctor={item} />}
    />
  );
};
```

## 📅 Consultas

### Listar Consultas

```typescript
import {
  useAppointments,
  usePatientAppointments,
  useDoctorAppointments
} from '../hooks/useAppointments';

// Consultas do paciente
const PatientAppointmentsScreen = () => {
  const { data, isLoading } = usePatientAppointments({ status: 'scheduled' });

  return (
    <FlatList
      data={data?.appointments || []}
      renderItem={({ item }) => <AppointmentCard appointment={item} />}
    />
  );
};

// Consultas do médico
const DoctorAppointmentsScreen = () => {
  const { data, isLoading } = useDoctorAppointments({ status: 'scheduled' });

  return (
    <FlatList
      data={data?.appointments || []}
      renderItem={({ item }) => <AppointmentCard appointment={item} />}
    />
  );
};
```

### Agendar Consulta

```typescript
import { useCreateAppointment } from '../hooks/useAppointments';

const ScheduleAppointmentScreen = () => {
  const createAppointment = useCreateAppointment();

  const handleSchedule = () => {
    createAppointment.mutate({
      doctorId: 1,
      specialtyId: 1,
      appointmentDate: '2024-02-15',
      appointmentTime: '09:00',
      notes: 'Primeira consulta',
      symptoms: 'Dor no peito'
    });
  };

  return (
    <TouchableOpacity
      onPress={handleSchedule}
      disabled={createAppointment.isPending}
    >
      <Text>{createAppointment.isPending ? 'Agendando...' : 'Agendar'}</Text>
    </TouchableOpacity>
  );
};
```

### Atualizar Consulta

```typescript
import { useUpdateAppointment } from '../hooks/useAppointments';

const UpdateAppointmentScreen = () => {
  const updateAppointment = useUpdateAppointment();

  const handleUpdate = () => {
    updateAppointment.mutate({
      id: 1,
      data: {
        status: 'completed',
        diagnosis: 'Ansiedade',
        prescription: 'Exercícios de respiração'
      }
    });
  };

  return (
    <TouchableOpacity
      onPress={handleUpdate}
      disabled={updateAppointment.isPending}
    >
      <Text>
        {updateAppointment.isPending ? 'Atualizando...' : 'Atualizar'}
      </Text>
    </TouchableOpacity>
  );
};
```

### Avaliar Médico

```typescript
import { useAddRating } from '../hooks/useAppointments';

const RatingScreen = () => {
  const addRating = useAddRating();

  const handleRating = () => {
    addRating.mutate({
      appointmentId: 1,
      data: {
        rating: 5,
        comment: 'Excelente atendimento!'
      }
    });
  };

  return (
    <TouchableOpacity onPress={handleRating} disabled={addRating.isPending}>
      <Text>{addRating.isPending ? 'Enviando...' : 'Enviar Avaliação'}</Text>
    </TouchableOpacity>
  );
};
```

## 🔧 Configuração de Ambiente

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000/api
```

### Configuração do React Query

O React Query já está configurado no `App.tsx` com as seguintes opções:

- **Stale Time**: 5 minutos (dados considerados "frescos")
- **GC Time**: 10 minutos (tempo no cache)
- **Retry**: 3 tentativas em caso de erro
- **Refetch**: Automático ao reconectar e ao montar componentes

## 📱 Exemplos Completos

Veja o arquivo `src/examples/useHooksExample.tsx` para exemplos completos de uso de todos os hooks.

## 🚨 Tratamento de Erros

### Erros de Rede

```typescript
const { data, error, isLoading } = useDoctors();

if (error) {
  return (
    <View>
      <Text style={{ color: 'red' }}>Erro: {error.message}</Text>
      <TouchableOpacity onPress={() => refetch()}>
        <Text>Tentar novamente</Text>
      </TouchableOpacity>
    </View>
  );
}
```

### Estados de Loading

```typescript
const login = useLogin();

if (login.isPending) {
  return <LoadingSpinner />;
}

if (login.isError) {
  return <ErrorMessage error={login.error} />;
}
```

## 🔄 Cache e Sincronização

### Invalidar Cache

```typescript
const queryClient = useQueryClient();

// Invalidar todas as consultas
queryClient.invalidateQueries({ queryKey: ['appointments'] });

// Invalidar consulta específica
queryClient.invalidateQueries({ queryKey: ['appointments', 'detail', 1] });
```

### Atualizar Cache Manualmente

```typescript
const queryClient = useQueryClient();

// Atualizar dados no cache
queryClient.setQueryData(['doctors', 'detail', 1], updatedDoctor);
```

## 📊 Paginação

### Paginação Simples

```typescript
const [page, setPage] = useState(1);
const { data, isLoading } = useDoctors({ page, limit: 10 });

const pagination = data?.pagination;
const doctors = data?.doctors || [];

return (
  <View>
    <FlatList data={doctors} renderItem={renderDoctor} />

    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <TouchableOpacity
        onPress={() => setPage(page - 1)}
        disabled={!pagination?.hasPrevPage}
      >
        <Text>Anterior</Text>
      </TouchableOpacity>

      <Text>
        Página {page} de {pagination?.totalPages}
      </Text>

      <TouchableOpacity
        onPress={() => setPage(page + 1)}
        disabled={!pagination?.hasNextPage}
      >
        <Text>Próxima</Text>
      </TouchableOpacity>
    </View>
  </View>
);
```

## 🎯 Boas Práticas

1. **Sempre use os hooks**: Não faça chamadas diretas para a API
2. **Trate estados de loading**: Mostre indicadores visuais durante carregamento
3. **Trate erros**: Sempre capture e exiba erros de forma amigável
4. **Use cache**: Aproveite o cache automático do React Query
5. **Invalidar cache**: Sempre invalide o cache após mutações
6. **Otimize queries**: Use `enabled` para queries condicionais
7. **Debounce**: Use debounce para buscas em tempo real

## 🚀 Próximos Passos

1. **Implementar as telas**: Use os hooks nas suas telas existentes
2. **Adicionar validação**: Use os utilitários de validação
3. **Implementar offline**: Configure persistência de cache
4. **Adicionar testes**: Teste os hooks com React Testing Library
5. **Otimizar performance**: Use `useMemo` e `useCallback` quando necessário

## 📚 Recursos Adicionais

- [Documentação do React Query](https://tanstack.com/query/latest)
- [Documentação do Axios](https://axios-http.com/)
- [Exemplos de uso](src/examples/useHooksExample.tsx)
- [Tipos TypeScript](src/types/api.ts)

---

**Nota**: Esta integração está configurada para o backend rodando em `localhost:3000`. Para produção, altere a URL base no arquivo de configuração.
