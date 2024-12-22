import { NextResponse } from "next/server"

import {
  authRouteRegex,
  editRouteRegex,
  publicRouteRegex,
  apiAuthPrefixRegex,
  apiStripePrefixRegex,
  linkMiddlewareRouteRegex,
} from "@/routes"
import { auth } from "@/lib/auth/auth"
import { linkMiddleware } from "@/middlewares/link-middleware"
import { getSubscriptionByUserId } from "@/app/actions/utils"
import { isSubscriptionExpiredEdge } from "@/app/actions/helpers/edge-helpers/get-identity-hash"

export default auth(async function middleware(req) {
  const { nextUrl } = req
  const { pathname } = nextUrl

  // Early exits for API routes
  if (
    apiAuthPrefixRegex.test(pathname) ||
    apiStripePrefixRegex.test(pathname)
  ) {
    return
  }

  // Handle link middleware
  if (linkMiddlewareRouteRegex.test(pathname)) {
    return linkMiddleware(req)
  }

  const isLoggedIn = !!req.auth

  // Handle auth routes
  if (authRouteRegex.test(pathname)) {
    return isLoggedIn
      ? NextResponse.redirect(new URL("/dashboard/qr-codes", nextUrl))
      : undefined
  }

  // Handle edit routes (require login and active subscription)
  if (editRouteRegex.test(pathname)) {
    const userId = req.auth?.user?.id

    if (!isLoggedIn || !userId) {
      return NextResponse.redirect(new URL("/login", nextUrl))
    }

    const subscription = await getSubscriptionByUserId(userId)
    if (
      !subscription ||
      isSubscriptionExpiredEdge(subscription.stripeCurrentPeriodEnd)
    ) {
      return NextResponse.redirect(new URL("/expired", nextUrl))
    }

    return
  }

  // Redirect to login for protected routes
  if (!isLoggedIn && !publicRouteRegex.test(pathname)) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  return
})

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|[\\w-]+\\.\\w+).*)",
    "/api/(.*)",
  ],
}
