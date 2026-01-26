export type BookingRequestStatus = "PENDING" | "APPROVED" | "REJECTED";

export type BookingRequest = {
  id: string;
  studentName: string;
  trainerId: string;
  date: string;
  hour: string;
  status: BookingRequestStatus;
  createdAt: number;
};

const requests: BookingRequest[] = [];

function uid() {
  return `req_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function createBookingRequest(
  data: Omit<BookingRequest, "id" | "status" | "createdAt">
) {
  const req: BookingRequest = {
    id: uid(),
    status: "PENDING",
    createdAt: Date.now(),
    ...data,
  };
  requests.unshift(req);
  return req;
}

export function listRequestsByTrainer(trainerId: string) {
  return requests.filter((r) => r.trainerId === trainerId);
}

export function listAllRequests() {
  return requests;
}

export function updateRequestStatus(id: string, status: BookingRequestStatus) {
  const idx = requests.findIndex((r) => r.id === id);
  if (idx >= 0) requests[idx] = { ...requests[idx], status };
  return requests[idx];
}

export function listRequestsByStudent(studentName: string) {
  return requests.filter((r) => r.studentName === studentName);
}
