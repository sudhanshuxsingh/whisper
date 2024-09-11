import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isAuthRoute = createRouteMatcher(['/sign-in', '/sign-up', '/sso']);

const isPublicRoute = createRouteMatcher(['/whisper', '/']);

const isPublicApiRoutes = createRouteMatcher(['/api/whisper']);

export default clerkMiddleware((auth, req) => {
  const { userId } = auth();
  const currentUrl = new URL(req.url);
  const isApiReq = currentUrl.pathname.startsWith('/api');
  if (userId && isAuthRoute(req)) {
    return NextResponse.redirect(new URL('/', req.url));
  }
  if (!userId) {
    const redirectUrlParam = new URLSearchParams({ _r: req.url });
    console.log({ redirectUrlParam });
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
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
