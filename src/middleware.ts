import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAuthRoute = createRouteMatcher(['/sign-in', '/sign-up', '/sso']);
const isPublicRoute = createRouteMatcher([
  '/whisper/:path',
  '/',
  '/changelog/:path*',
]);
const isPublicApiRoutes = createRouteMatcher(['/api/:path*']);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();
  const currentUrl = new URL(req.url);
  const isApiReq = currentUrl.pathname.startsWith('/api');
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (!userId) {
    const redirectUrlParam = new URLSearchParams({ _r: req.url });
    if (!isPublicRoute(req) && !isPublicApiRoutes(req) && !isAuthRoute(req)) {
      return NextResponse.redirect(
        new URL(`/sign-in?${redirectUrlParam}`, req.url)
      );
    }
    if (isApiReq && !isPublicApiRoutes(req) && !isAuthRoute(req)) {
      return NextResponse.redirect(
        new URL(`/sign-in?${redirectUrlParam}`, req.url)
      );
    }
  }
  return NextResponse.next();
});
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|PNG|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
