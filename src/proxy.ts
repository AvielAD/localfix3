import { NextRequest, NextResponse } from 'next/server'

export {default} from 'next-auth/middleware'
// This function can be marked `async` if using `await` inside

export function proxy() {
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/dashboard/:path*',
}