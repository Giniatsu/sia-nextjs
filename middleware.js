import { NextResponse } from "next/server";

export const middleware = (request) => {
  const currentTokens = request.cookies.get('tokens')?.value

  if (request.nextUrl.pathname !== '/login' && !currentTokens) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (request.nextUrl.pathname === '/login' && currentTokens !== undefined) {
    return NextResponse.redirect(new URL('/sales_order', request.url))
  }
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