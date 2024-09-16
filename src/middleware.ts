import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  const isPublicPath = path === '/login' || path === '/signup' || path === '/verifyemail'
  const isAdmin = path === '/admin'
  const loginuser = path === '/auth/login' || path === '/auth/register' 
  const token = request.cookies.get('token')?.value || ''

  if(isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.nextUrl))
  } 
   if(isAdmin && !token) {
    return NextResponse.redirect(new URL('/not-admin', request.nextUrl))
  }
  if(loginuser && token) {
    return NextResponse.redirect(new URL('/auth/profile', request.nextUrl))
  }

  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
  }
    
}

 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/checkout',
    '/admin',
    
    '/auth/profile',
    '/verifyemail'
  ]
}