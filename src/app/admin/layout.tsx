import { cookies } from 'next/headers';
import { jwtVerify } from 'jose';
import { AdminProvider } from '@/providers/AdminProvider';
import { Role, JwtPayload } from '@/types/admin';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin_token')?.value;

  if (!token) {
    return <>{children}</>;
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const { role, email, sub } = payload as unknown as JwtPayload;

    return (
      <AdminProvider role={role as Role} email={email} userId={sub}>
        {children}
      </AdminProvider>
    );
  } catch {
    return <>{children}</>;
  }
}
