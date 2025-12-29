import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server'

export { default } from 'next-auth/middleware'
// This function can be marked `async` if using `await` inside

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const publicPaths = ["/login", "/api/auth"]

  if (publicPaths.some(path => pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    // Si no hay sesión, redirigir al login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}