'use client';

import axios from 'axios';

const adminApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ADMIN_API_URL || process.env.ADMIN_API_URL,
});

adminApi.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

adminApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (typeof window !== 'undefined') {
      if (error.response?.status === 401) {
        Cookies.remove('admin_token');
        window.location.href = '/admin/login';
      } else if (error.response?.status === 403) {
        window.location.href = '/admin/acesso-negado';
      }
    }
    return Promise.reject(error);
  },
);

export default adminApi;
