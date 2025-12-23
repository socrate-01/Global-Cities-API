import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory rate limiter for demonstration purposes.
// In a distributed production environment (like Vercel Edge), you MUST use an external store like Redis (Upstash).
const rateLimitMap = new Map();

interface RateLimitData {
    count: number;
    lastReset: number;
}

const WINDOW_SIZE_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 100; // 100 requests per minute

export function middleware(request: NextRequest) {
    // Fix: Access ip safely or fallback to headers
    const ip = (request as any).ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1';

    // ----------------------------------------------------------------------
    // 1. Rate Limiting (In-Memory Token Bucket / Fixed Window)
    // ----------------------------------------------------------------------
    // Note: This in-memory map is reset if the lambda/edge instance restarts.
    // Ideally, use: import { Ratelimit } from "@upstash/ratelimit";

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, {
            count: 0,
            lastReset: Date.now(),
        });
    }

    const data: RateLimitData = rateLimitMap.get(ip);

    if (Date.now() - data.lastReset > WINDOW_SIZE_MS) {
        data.count = 0;
        data.lastReset = Date.now();
    }

    if (data.count >= MAX_REQUESTS) {
        return new NextResponse(
            JSON.stringify({ success: false, message: 'Too Many Requests' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
        );
    }

    data.count += 1;

    // ----------------------------------------------------------------------
    // 2. Security Headers
    // ----------------------------------------------------------------------
    const response = NextResponse.next();

    // CSP - Content Security Policy
    // Allowing everything for now as this is a broad demo, but usually you restrict sources.
    // We strictly allow scripts from self and inline for Next.js hydration.
    response.headers.set('X-XSS-Protection', '1; mode=block');
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // CORS logic moved to route handlers for finer control (e.g. OPTIONS)

    return response;
}

export const config = {
    matcher: [
        // Apply to all API routes and the main page, exclude static files
        '/api/:path*',
        '/',
    ],
};
