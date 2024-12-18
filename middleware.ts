import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('appSession'); 

  if (!token) {
    return NextResponse.redirect(new URL('/api/auth/login', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*'], 
};