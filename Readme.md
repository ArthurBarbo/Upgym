# UPGYM

App mobile em **React Native + Expo + TypeScript** para rotina de academia, com fluxos de **Aluno**, **Professor (Staff)** e **Bloqueio por pagamento**.  
O projeto prioriza UI clean, tema consistente e estado global via **Context API**.

---

## Stack

- **React Native** + **Expo**
- **TypeScript**
- **React Navigation (Native Stack)**
- **lucide-react-native** (ícones)
- **react-native-calendars** (calendário)
- **Context API**
  - `UserContext` (usuário + logout + update)
  - `ProgressContext` (progresso de séries marcadas)
- Config:
  - Locale do calendário (`src/config/calendarLocale.ts`)
- Tooling:
  - ESLint (`eslint.config.js`)
  - Metro config (`metro.config.js`)
  - Babel (`babel.config.js`)

---

## Estrutura real do projeto

├── Readme.md
├── assets/
│ ├── icon.png
│ ├── QRcode.jpeg
│ ├── favicon.png
│ ├── splash-icon.png
│ ├── adaptive-icon.png
│ ├── Library/
│ │ ├── background.jpg
│ │ └── shoulders.jpg
│ └── dumbells.svg
├── src/
│ ├── theme/
│ │ ├── colors.ts
│ │ ├── spacing.ts
│ │ ├── radius.ts
│ │ ├── typography.ts
│ │ └── index.ts
│ ├── types/
│ │ └── assets.d.ts
│ ├── components/
│ │ ├── Dumbbell/
│ │ │ └── index.tsx
│ │ ├── Button/
│ │ │ └── index.tsx
│ │ ├── Modal/
│ │ │ ├── Modal.tsx
│ │ │ └── QrModal/
│ │ │ └── QrModal.tsx
│ │ ├── SequencyCalendar/
│ │ │ └── SequencyCalendar.tsx
│ │ └── SideMenu/
│ │ └── index.tsx
│ ├── config/
│ │ └── calendarLocale.ts
│ ├── services/
│ │ ├── Trainers.ts
│ │ ├── bookingRequests.ts
│ │ └── LibraryExercises.ts
│ ├── context/
│ │ ├── UserContext.tsx
│ │ └── ProgressContext.tsx
│ ├── navigation/
│ │ └── index.tsx
│ └── screens/
│ ├── auth/
│ │ └── LoginScreen.tsx
│ ├── student/
│ │ ├── StudentScreen.tsx
│ │ ├── TrainingScreen.tsx
│ │ ├── ProfileScreen.tsx
│ │ ├── MarkingsScreen.tsx
│ │ ├── LibraryScreen.tsx
│ │ ├── LibraryGroupScreen.tsx
│ │ └── Blockedpayment.tsx
│ └── staff/
│ └── ClientScreen.tsx
├── App.tsx
├── app.json
├── package.json
├── tsconfig.json
├── eslint.config.js
├── metro.config.js
├── babel.config.js
└── .gitignore

---

## Fluxos do app

### 1) Login (Mock)

Arquivo: `src/screens/auth/LoginScreen.tsx`

- Usuários mockados com roles:
  - `student`
  - `staff`
  - `restricted` (bloqueado/pagamento)
- Direcionamento via `navigation.replace(...)`:
  - `StudentScreen` para aluno
  - `ClientScreen` para staff
  - `Blockedpayment` (tela de restrição) para bloqueados

> Observação: quando a tela “Restricted/Blockedpayment” não existe no navigator, aparece o erro:
> “Do you have a screen named 'Restricted'?”

---

### 2) Home do Aluno

Arquivo: `src/screens/student/StudentScreen.tsx`

- Saudação com nome do usuário (via `UserContext`)
- Cards:
  - Treinos
  - Biblioteca
  - Sequência (calendário)
  - Marcações
- Card “Progresso da semana” com barra
- Botão “Treinar” com visual destacado (pattern de ícones)
- SideMenu (menu superior) com ações e Logout

Componentes usados:

- `src/components/SideMenu/index.tsx`
- `src/components/SequencyCalendar/SequencyCalendar.tsx`
- `src/components/Modal/QrModal/QrModal.tsx`

---

### 3) Treinos + Progresso

Arquivo: `src/screens/student/TrainingScreen.tsx`

- Lista de treinos mockados (`MOCK_TRAININGS`)
- Cada treino referencia exercícios pela `LibraryExercises` via `exerciseId`
- Checkbox por série (sets) para marcar progresso
- Barra de progresso semanal baseada em séries marcadas
- Progresso compartilhado com a home via `ProgressContext`

---

### 4) Biblioteca de Exercícios

Arquivos:

- `src/screens/student/LibraryScreen.tsx`
- `src/screens/student/LibraryGroupScreen.tsx`
- `src/services/LibraryExercises.ts`

- Exercícios organizados por grupos musculares
- Inclui grupo **mobilidade**
- Campo opcional: `howTo?: string` (como fazer)

Assets de apoio:

- `assets/Library/background.jpg`
- `assets/Library/shoulders.jpg`

---

### 5) Marcações (Agendamento)

Arquivo: `src/screens/student/MarkingsScreen.tsx`

- Seleciona personal (TRAINERS)
- Calendário para escolher data
- Lista de horários disponíveis (com mock de bloqueados por data)
- Cria request via `createBookingRequest(...)`
- Lista “Minhas marcações” via `listRequestsByStudent(...)`

Services usados:

- `src/services/Trainers.ts`
- `src/services/bookingRequests.ts`

---

### 6) Painel do Professor (Staff)

Arquivo: `src/screens/staff/ClientScreen.tsx`

- Check-ins do dia (com modal “lista completa” incluindo check-in e check-out)
- Usuários bloqueados (mock)
- Solicitações de marcação (mock com Aprovar/Rejeitar alterando status)
- Botão “Sair” com `logout()` + `navigation.reset(...)`

---

### 7) Tela de Bloqueio

Arquivo: `src/screens/student/Blockedpayment.tsx`

- Saudação com nome do usuário (via `UserContext`)
- Mensagem orientando procurar a recepção
- Botão “Voltar” (ideal: fazer logout + reset para Login)

---

## Context API

### `UserContext`

Arquivo: `src/context/UserContext.tsx`

Responsável por:

- `user`
- `setUser`
- `updateUser`
- `logout`

Usado para:

- exibir nome dinamicamente (StudentScreen, Blockedpayment, etc.)
- aplicar logout e limpar sessão

### `ProgressContext`

Arquivo: `src/context/ProgressContext.tsx`

Responsável por:

- armazenar estado do progresso de séries (checkbox)
- expor `completedSets` (e demais dados que você definiu)
- permitir que StudentScreen e TrainingScreen mostrem o mesmo progresso

---

## Como rodar

```bash
npm install
npx expo start
```
