
  import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    // Get the token from cookies
  const token = request.cookies.get('token')?.value || ''
  return NextResponse.redirect(new URL('/auth/login', request.url))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/cart/:path*',
}