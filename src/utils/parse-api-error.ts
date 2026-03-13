import axios from 'axios';

export function parseApiError(error: unknown): string[] {
  if (axios.isAxiosError(error)) {
    const message = error.response?.data?.message;
    if (Array.isArray(message)) return message;
    if (typeof message === 'string') return [message];
    if (error.message) return [error.message];
  }
  return ['Erro inesperado'];
}
