import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {  
  // Only run this middleware for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    // Clone the response headers
    const headers = new Headers();
    
    // Add CORS headers
    headers.set('Access-Control-Allow-Origin', '*'); // For development - replace with specific origins in production
    headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    headers.set('Access-Control-Max-Age', '86400'); // 24 hours
    
    // Handle preflight OPTIONS request
    if (request.method === 'OPTIONS') {
      return NextResponse.json({}, { headers, status: 200 });
    }
    
    // For other requests, just add the headers to the response
    const response = NextResponse.next();
    
    // Add the CORS headers to the response
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    
    return response;
  }
  
  return NextResponse.next();
}

// Configure the middleware to match only API routes
export const config = {
  matcher: '/api/:path*',
};