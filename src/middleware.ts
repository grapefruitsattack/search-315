import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  if (request.nextUrl.pathname.startsWith('/idol')) {
    return NextResponse.redirect(new URL('/unit/'+request.nextUrl.pathname.replace(/\/idol\//, "").replace(/[0-9]{2}\//, "")+'00', request.url))
  }
  return NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
}