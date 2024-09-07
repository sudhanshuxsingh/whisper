import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isAuthRoute=createRouteMatcher([
  '/sign-in',
  '/sign-up',
])

const isPublicRoute=createRouteMatcher([
  '/home',
  '/whisper',
  '/'
])

const isPublicApiRoutes=createRouteMatcher([
  '/api/whisper'
])

export default clerkMiddleware((auth,req)=>{
  const {userId}=auth();
  const currentUrl=new URL(req.url)
  const isApiReq=currentUrl.pathname.startsWith('/api')
  if(userId && isAuthRoute(req)){
    return NextResponse.redirect(new URL("/",req.url))
  }
  if(!userId){
    if(!isPublicRoute(req) && !isPublicApiRoutes(req) && !isAuthRoute(req)){
      return NextResponse.redirect(new URL('/sign-in',req.url))
    }
    if(isApiReq && !isPublicApiRoutes(req) && !isAuthRoute(req)){
      return NextResponse.redirect(new URL('/sign-in',req.url))
    }
  }
  return NextResponse.next();
})

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
}