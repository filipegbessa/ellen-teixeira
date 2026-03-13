export type Role = 'ADMIN' | 'MANAGER' | 'VIEWER';
export type TransactionType = 'CREDIT' | 'DEBIT';
export type PaymentType = 'CREDIT_CARD' | 'DEBIT_CARD' | 'CASH' | 'PIX';

export interface LoginResponse {
  access_token: string;
}

export interface JwtPayload {
  sub: number;
  email: string;
  role: Role;
  iat: number;
  exp: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: Role;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: number;
  name: string;
  cpf: string;
  createdAt: string;
  updatedAt: string;
}

export interface Media {
  id: number;
  patientId: number;
  code: string;
  title: string;
  description: string | null;
  filename: string;
  mimeType: string;
  size: number;
  driveFileId: string;
  driveUrl: string;
  createdAt: string;
}

export interface Transaction {
  id: number;
  type: TransactionType;
  date: string;
  amount: number;
  paymentType: PaymentType;
  invoiceIssued: boolean;
  notes: string | null;
  patientId: number | null;
  patient: Pick<Patient, 'id' | 'name'> | null;
  procedure: string | null;
  paidTo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiPaginated<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  message: string | string[];
  statusCode: number;
  error?: string;
}
