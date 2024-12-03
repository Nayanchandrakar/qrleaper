import { auth } from "@/lib/auth/auth"
import { NextResponse } from "next/server"
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes"

export default auth(async function middleware(req) {
  const { nextUrl } = req
  const { pathname } = nextUrl

  const isLoggedIn = !!req.auth
  const isAuthPrefixUrl = pathname.startsWith(apiAuthPrefix)
  const isAuthRoute = authRoutes?.includes(pathname)
  const isPublicRoute = publicRoutes?.includes(pathname)

  if (isAuthPrefixUrl) return

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
