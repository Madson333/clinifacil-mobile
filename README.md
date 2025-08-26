# CliniFácil Mobile

Aplicativo mobile para agendamento de consultas médicas, avaliação de profissionais e acompanhamento de histórico, desenvolvido com React Native e integração completa com backend Node.js.

## Funcionalidades

- Listagem de especialidades médicas
- Listagem de médicos por especialidade
- Visualização de perfil do médico
- Agendamento de consultas
- Histórico de consultas do paciente
- Avaliação de médicos após consulta
- Autenticação de paciente e médico
- Cadastro de médicos
- Interface moderna e responsiva
- Integração com backend via React Query

## Tecnologias Utilizadas

- React Native (TypeScript)
- Expo
- React Navigation
- React Query (@tanstack/react-query)
- Axios
- Node.js (backend)
- PostgreSQL
- Express
- JWT para autenticação

## Estrutura do Projeto

```
MeuApp/
├── src/
│   ├── screens/           # Telas do app
│   ├── hooks/             # Hooks customizados (React Query)
│   ├── routes/            # Rotas e navegação
│   ├── services/          # Configuração do Axios
│   ├── types/             # Tipos globais
│   └── assets/            # Imagens e ícones
├── App.tsx                # Entrada principal
├── package.json           # Dependências
├── README.md              # Documentação
└── ...
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   yarn install
   ```
2. Inicie o projeto:
   ```bash
   yarn start
   ```
3. Siga as instruções do Expo para rodar no emulador ou dispositivo físico.

## Integração com Backend

- O app consome endpoints REST do backend Node.js para todas as operações (especialidades, médicos, consultas, avaliações, autenticação).
- Os hooks em `src/hooks` usam React Query para cache, atualização e requisições assíncronas.

## Principais Telas

- **SpecialtiesScreen**: Lista especialidades médicas do backend
- **DoctorsScreen**: Lista médicos filtrados por especialidade
- **ScheduleAppointmentScreen**: Agendamento de consulta
- **ConsultationsScreen**: Histórico de consultas do paciente
- **RateDoctorScreen**: Avaliação do médico após consulta
- **Login/Register**: Autenticação de usuário

## Backend (resumo)

- Node.js + Express
- PostgreSQL
- Endpoints principais:
  - `/api/specialties`
  - `/api/doctors`
  - `/api/appointments`
  - `/api/appointments/:id/ratings`
  - `/api/auth`

## Como contribuir

1. Faça um fork do projeto
2. Crie uma branch (`git checkout -b minha-feature`)
3. Commit e push
4. Abra um Pull Request

## Licença

Este projeto está sob licença MIT.

---

CliniFácil Mobile © 2025 - Madson333
