import { NextResponse } from "next/server"

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
  linkMiddlewareRoute,
  apiStripePrefix,
} from "@/routes"
import { auth } from "@/lib/auth/auth"
import { linkMiddleware } from "@/middlewares/link-middleware"

export default auth(async function middleware(req) {
  const { nextUrl } = req
  const { pathname } = nextUrl

  const isLinkMiddlewareRoute = pathname
    .split("?")?.[0]
    ?.startsWith(linkMiddlewareRoute)

  const isLoggedIn = !!req.auth
  const isAuthPrefixUrl = pathname.startsWith(apiAuthPrefix)
  const isStripePrefixUrl = pathname.startsWith(apiStripePrefix)
  const isAuthRoute = authRoutes?.includes(pathname)
  const isPublicRoute = publicRoutes?.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  )

  if (isAuthPrefixUrl || isStripePrefixUrl) return

  if (isLinkMiddlewareRoute) {
    return linkMiddleware(req)
  }

  if (isAuthRoute) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }
    return
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  return
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
