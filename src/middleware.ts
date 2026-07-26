import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, getLocaleFromHeader, isValidLocale, locales } from "@/i18n/locales";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip API routes and static files
  if (pathname.startsWith("/api/") || pathname.startsWith("/_next/") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Check for existing locale cookie
  const cookieLocale = request.cookies.get("locale")?.value;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    // Cookie already set - pass through
    return NextResponse.next();
  }

  // Detect browser language from Accept-Language header
  const detectedLocale = getLocaleFromHeader(request.headers.get("accept-language"));

  // Set cookie and continue
  const response = NextResponse.next();
  response.cookies.set("locale", detectedLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365, // 1 year
    sameSite: "lax",
  });
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|uploads).*)"],
};
