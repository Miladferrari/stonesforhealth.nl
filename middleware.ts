import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Allow all static assets to pass through
  if (
    request.nextUrl.pathname.startsWith('/images/') ||
    request.nextUrl.pathname.startsWith('/_next/') ||
    request.nextUrl.pathname.includes('.') // This catches all files with extensions
  ) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}