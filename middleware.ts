import { NextRequest, NextResponse } from "next/server";

// List of routes that require authentication
const protectedRoutes = ["/profile"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get("auth_token")?.value;

  // If user is not logged in and tries to access a protected route, redirect to home
  if (
    protectedRoutes.some((route) => pathname.startsWith(route)) &&
    !authToken
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // If user is logged in and tries to access the home page, redirect to dashboard
  if (pathname === "/" && authToken) {
    return NextResponse.redirect(new URL("/profile", request.url));
  }

  // Allow the request to proceed
  return NextResponse.next();
}

// Enable middleware for all routes
export const config = {
  matcher: ["/", "/profile/:path*"],
};
