import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';


const isPublicRoute = createRouteMatcher([
    "/sign-in",
    "/sign-up",
    "/",
    "/home"
])

const isPublicApiRoute = createRouteMatcher([
    "/api/videos"
])

export default clerkMiddleware(async (auth, req) => {
    const { userId } = await auth();
    const currentUrl = new URL(req.url);
    const isAccessingDashboard = currentUrl.pathname === "/home"
    const isApiRequest = currentUrl.pathname.startsWith("/api")
    // If user is logged in and accessing a public route but not the dashboard
    if (userId && isPublicRoute(req) && !isAccessingDashboard) {
        return NextResponse.redirect(new URL("/home", req.url))
    }
    // Not logged in
    if (!userId) {
        // if user is not logged in and trying to access a protected route
        if (!isPublicRoute(req) && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
        // if the requiest is for a protected api and the user is not logged in
        if (isApiRequest && !isPublicApiRoute(req)) {
            return NextResponse.redirect(new URL("/sign-in", req.url))
        }
    }
    return NextResponse.next();
});

export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
};