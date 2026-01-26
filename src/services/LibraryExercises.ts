export type Exercise = {
  id: string;
  name: string;
  equipment: string;
  level: "Iniciante" | "Intermediário" | "Avançado";
};

export type BodyGroup = { id: BodyGroupId; label: string };

export type BodyGroupId =
  | "peito"
  | "costas"
  | "ombro"
  | "biceps"
  | "triceps"
  | "quadriceps"
  | "posterior"
  | "gluteo"
  | "panturrilha"
  | "abdomen";

export const BODY_GROUPS: BodyGroup[] = [
  { id: "peito", label: "Peito" },
  { id: "costas", label: "Costas" },
  { id: "ombro", label: "Ombro" },
  { id: "biceps", label: "Bíceps" },
  { id: "triceps", label: "Tríceps" },
  { id: "quadriceps", label: "Quadríceps" },
  { id: "posterior", label: "Posterior de Coxa" },
  { id: "gluteo", label: "Glúteo" },
  { id: "panturrilha", label: "Panturrilha" },
  { id: "abdomen", label: "Abdômen" },
];

export const EXERCISES_BY_GROUP: Record<BodyGroupId, Exercise[]> = {
  peito: [
    {
      id: "supino-reto",
      name: "Supino reto",
      equipment: "Barra",
      level: "Intermediário",
    },
    {
      id: "supino-inclinado",
      name: "Supino inclinado",
      equipment: "Halter",
      level: "Intermediário",
    },
    {
      id: "crucifixo",
      name: "Crucifixo",
      equipment: "Halter",
      level: "Iniciante",
    },
    {
      id: "crossover",
      name: "Crossover",
      equipment: "Polia",
      level: "Iniciante",
    },
  ],
  costas: [
    {
      id: "puxada-frente",
      name: "Puxada na frente",
      equipment: "Polia",
      level: "Iniciante",
    },
    {
      id: "remada-curvada",
      name: "Remada curvada",
      equipment: "Barra",
      level: "Intermediário",
    },
    {
      id: "remada-baixa",
      name: "Remada baixa",
      equipment: "Polia",
      level: "Iniciante",
    },
    {
      id: "pullover",
      name: "Pullover",
      equipment: "Halter",
      level: "Intermediário",
    },
  ],
  ombro: [
    {
      id: "desenvolvimento",
      name: "Desenvolvimento militar",
      equipment: "Barra/Halter",
      level: "Intermediário",
    },
    {
      id: "elevacao-lateral",
      name: "Elevação lateral",
      equipment: "Halter",
      level: "Iniciante",
    },
    {
      id: "elevacao-frontal",
      name: "Elevação frontal",
      equipment: "Halter",
      level: "Iniciante",
    },
    {
      id: "crucifixo-invertido",
      name: "Crucifixo invertido",
      equipment: "Halter",
      level: "Intermediário",
    },
  ],
  biceps: [
    {
      id: "rosca-direta",
      name: "Rosca direta",
      equipment: "Barra",
      level: "Iniciante",
    },
    {
      id: "rosca-alternada",
      name: "Rosca alternada",
      equipment: "Halter",
      level: "Iniciante",
    },
    {
      id: "rosca-martelo",
      name: "Rosca martelo",
      equipment: "Halter",
      level: "Intermediário",
    },
    {
      id: "rosca-scott",
      name: "Rosca Scott",
      equipment: "Máquina/Barra",
      level: "Intermediário",
    },
  ],
  triceps: [
    {
      id: "corda",
      name: "Tríceps na corda",
      equipment: "Polia",
      level: "Iniciante",
    },
    {
      id: "testa",
      name: "Tríceps testa",
      equipment: "Barra",
      level: "Intermediário",
    },
    { id: "coice", name: "Coice", equipment: "Halter", level: "Iniciante" },
    {
      id: "mergulho",
      name: "Mergulho banco",
      equipment: "Banco",
      level: "Intermediário",
    },
  ],
  quadriceps: [
    {
      id: "agachamento",
      name: "Agachamento",
      equipment: "Barra",
      level: "Intermediário",
    },
    {
      id: "leg-press",
      name: "Leg press",
      equipment: "Máquina",
      level: "Iniciante",
    },
    {
      id: "extensora",
      name: "Cadeira extensora",
      equipment: "Máquina",
      level: "Iniciante",
    },
    {
      id: "afundo",
      name: "Afundo",
      equipment: "Halter",
      level: "Intermediário",
    },
  ],
  posterior: [
    {
      id: "mesa-flexora",
      name: "Mesa flexora",
      equipment: "Máquina",
      level: "Iniciante",
    },
    {
      id: "stiff",
      name: "Stiff",
      equipment: "Barra/Halter",
      level: "Intermediário",
    },
    {
      id: "levantamento-terra",
      name: "Levantamento terra",
      equipment: "Barra",
      level: "Avançado",
    },
    { id: "bom-dia", name: "Bom dia", equipment: "Barra", level: "Avançado" },
  ],
  gluteo: [
    {
      id: "hip-thrust",
      name: "Hip thrust",
      equipment: "Barra",
      level: "Intermediário",
    },
    {
      id: "coice-cabo",
      name: "Coice no cabo",
      equipment: "Polia",
      level: "Iniciante",
    },
    {
      id: "abducao",
      name: "Abdução",
      equipment: "Máquina",
      level: "Iniciante",
    },
    {
      id: "passada",
      name: "Passada",
      equipment: "Halter",
      level: "Intermediário",
    },
  ],
  panturrilha: [
    {
      id: "panturrilha-em-pe",
      name: "Panturrilha em pé",
      equipment: "Máquina",
      level: "Iniciante",
    },
    {
      id: "panturrilha-sentado",
      name: "Panturrilha sentado",
      equipment: "Máquina",
      level: "Iniciante",
    },
    {
      id: "panturrilha-smith",
      name: "Panturrilha no smith",
      equipment: "Smith",
      level: "Intermediário",
    },
    {
      id: "panturrilha-degrau",
      name: "Panturrilha no degrau",
      equipment: "Peso corporal",
      level: "Iniciante",
    },
  ],
  abdomen: [
    {
      id: "abdominal-supra",
      name: "Abdominal supra",
      equipment: "Peso corporal",
      level: "Iniciante",
    },
    {
      id: "prancha",
      name: "Prancha",
      equipment: "Peso corporal",
      level: "Intermediário",
    },
    {
      id: "elevacao-pernas",
      name: "Elevação de pernas",
      equipment: "Peso corporal",
      level: "Intermediário",
    },
    {
      id: "abdominal-cabo",
      name: "Abdominal no cabo",
      equipment: "Polia",
      level: "Intermediário",
    },
  ],
};
