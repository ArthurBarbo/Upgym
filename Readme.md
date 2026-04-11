# UPGYM

Aplicativo mobile em **React Native + Expo + TypeScript** para rotina de academia, com fluxos de **Aluno**, **Professor (Staff)** e **Acesso Restrito**.

---

## Stack

- React Native + Expo
- TypeScript
- React Navigation (Native Stack)
- lucide-react-native
- react-native-calendars
- Context API (UserContext, ProgressContext)

---

## Estrutura do projeto

├── src/
├── theme/
│ ├── radius.ts
│ ├── spacing.ts
│ ├── index.ts
│ ├── colors.ts
│ └── typography.ts
├── types/
│ └── assets.d.ts
├── components/
│ ├── Dumbbell/
│ │ └── index.tsx
│ ├── Button/
│ │ └── index.tsx
│ ├── Modal/
│ │ ├── Modal.tsx
│ │ └── QrModal/
│ │ │ └── QrModal.tsx
│ ├── SequencyCalendar/
│ │ └── SequencyCalendar.tsx
│ └── SideMenu/
│ │ └── index.tsx
├── config/
│ └── calendarLocale.ts
├── services/
│ ├── Trainers.ts
│ ├── bookingRequests.ts
│ └── LibraryExercises.ts
├── context/
│ ├── ProgressContext.tsx
│ └── UserContext.tsx
├── screens/
│ ├── student/
│ │ ├── Blockedpayment.tsx
│ │ ├── LibraryScreen.tsx
│ │ ├── LibraryGroupScreen.tsx
│ │ ├── ProfileScreen.tsx
│ │ ├── StudentScreen.tsx
│ │ ├── TrainingScreen.tsx
│ │ └── MarkingsScreen.tsx
│ ├── auth/
│ │ └── LoginScreen.tsx
│ └── staff/ (2100 tokens)
│ │ └── ClientScreen.tsx
└── navigation/
│ └── index.tsx
├── assets/
├── icon.png
├── QRcode.jpeg
├── favicon.png
├── splash-icon.png
├── adaptive-icon.png
├── Library/
│ └── background.jpg
└── dumbells.svg
├── babel.config.js
├── eslint.config.js
├── tsconfig.json
├── metro.config.js
├── .gitignore
├── app.json
├── package.json
├── App.tsx
└── Readme.md

---

## Funcionalidades

### Autenticação (mock)

- Login com usuários mockados para:
  - Aluno (`student`)
  - Professor (`staff`)
  - Acesso restrito (`restricted`)

### Aluno

- Home do aluno com atalhos:
  - Treinos
  - Biblioteca
  - Sequência (calendário)
  - Marcações
- Progresso semanal com barra
- Check-in via QR (modal)
- SideMenu com navegação e logout

### Treinos

- Lista de treinos (mock)
- Exercícios referenciados pela Library (por `exerciseId`)
- Checkbox por série (sets)
- Barra de progresso semanal baseada nas séries marcadas
- Progresso compartilhado com a Home via `ProgressContext`

### Biblioteca

- Exercícios por grupo muscular
- Grupo “mobilidade” com campo opcional `howTo`

### Marcações

- Seleção de personal
- Calendário para data
- Seleção de horários
- Criação e listagem de solicitações (mock service)

### Professor (Staff)

- Painel do professor com:
  - Check-ins do dia (modal lista completa com check-in e check-out)
  - Usuários bloqueados (mock)
  - Solicitações de marcação com Aprovar/Rejeitar (mock)

### Acesso restrito

- Tela dedicada para usuário com acesso bloqueado

---

## Como rodar

```bash
npm install
npx expo start
Autor

Arthur Oliveira
```
