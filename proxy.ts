import { NextRequest, NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
import { LOGIN, PUBLIC_ROUTES, ROOT } from "./lib/publicRoutes";

// Use only one of the two proxy options below
// 1. Use proxy directly
// export const { auth: proxy } = NextAuth(authConfig)

// 2. Wrapped proxy option
const { auth } = NextAuth(authConfig);
export default auth((req) => {
    // Your custom proxy logic goes here
    const { nextUrl } = req;
    const isAuthenticated = !!req.auth;
    const isPublicRoute =
        PUBLIC_ROUTES.some((route) => req.nextUrl.pathname.startsWith(route)) ||
        nextUrl.pathname === ROOT ||
        nextUrl.pathname === LOGIN;

    if (!isAuthenticated && !isPublicRoute) {
        const newUrl = new URL(LOGIN, nextUrl.origin);
        return NextResponse.redirect(newUrl);
    }

    return NextResponse.next();
});

export const config = {
    matcher: [
        "/((?!api/auth|_next|favicon.ico|.*\\..*).*)", // Exclude Next.js internal routes and API routes
        "/", // Include the root route
    ],
};
