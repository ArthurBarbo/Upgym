export type Trainer = {
  id: string;
  name: string;
  specialty: string;
  status: "AVAILABLE" | "SOLD_OUT";
};

export const STAFF_TRAINER_ID = "staff_personal_01";

export const TRAINERS: Trainer[] = [
  {
    id: "staff_personal_01",
    name: "Richard Bertiges",
    specialty: "Hipertrofia e Performance",
    status: "AVAILABLE",
  },
  {
    id: "staff_personal_02",
    name: "Camila Rocha",
    specialty: "Emagrecimento",
    status: "SOLD_OUT",
  },
  {
    id: "staff_personal_03",
    name: "Diego Lima",
    specialty: "Reabilitação",
    status: "SOLD_OUT",
  },
];

export function getTrainerById(trainerId: string) {
  return TRAINERS.find((t) => t.id === trainerId);
}

export function getTrainerName(trainerId: string) {
  return getTrainerById(trainerId)?.name ?? trainerId;
}
