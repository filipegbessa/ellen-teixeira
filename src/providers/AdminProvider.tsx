'use client';

import { createContext, useContext, ReactNode } from 'react';
import { Role } from '@/types/admin';

interface AdminContextValue {
  role: Role;
  email: string;
  userId: number;
}

const AdminContext = createContext<AdminContextValue | null>(null);

export function AdminProvider({
  role,
  email,
  userId,
  children,
}: AdminContextValue & { children: ReactNode }) {
  return (
    <AdminContext.Provider value={{ role, email, userId }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin(): AdminContextValue {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error('useAdmin must be used within AdminProvider');
  return ctx;
}
