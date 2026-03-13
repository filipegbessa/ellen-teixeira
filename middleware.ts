import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import { isMobileDevice } from '@/utils/device';

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow login page and API routes through
  if (pathname === '/admin/login' || pathname.startsWith('/api/admin/auth')) {
    return NextResponse.next();
  }

  const token = request.cookies.get('admin_token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // Redirect /admin root based on device
    if (pathname === '/admin') {
      const userAgent = request.headers.get('user-agent') || '';
      const mobile = isMobileDevice(userAgent);
      return NextResponse.redirect(
        new URL(mobile ? '/admin/mobile/home' : '/admin/dashboard', request.url),
      );
    }

    // Inject role into request headers so Server Components can read via headers()
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('x-user-role', role);
    requestHeaders.set('x-user-email', String(payload.email ?? ''));
    requestHeaders.set('x-user-id', String(payload.sub ?? ''));

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    const response = NextResponse.redirect(new URL('/admin/login', request.url));
    response.cookies.delete('admin_token');
    return response;
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
