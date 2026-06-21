import { NextResponse } from "next/server"

import { isSubscriptionExpiredEdge } from "@/app/actions/helpers/edge-helpers/get-identity-hash"
import { getSubscriptionByUserId } from "@/app/actions/utils"
import { auth } from "@/lib/auth/auth"
import { linkMiddleware } from "@/middlewares/link-middleware"
import { vCardLinkMiddleware } from "@/middlewares/vcard-link-redirect"
import {
  apiAuthPrefixRegex,
  apiStripePrefixRegex,
  authRouteRegex,
  editRouteRegex,
  linkMiddlewareRouteRegex,
  publicRouteRegex,
  vcardRouteRegex
} from "@/routes"

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

  // Handle vcard profile middleware
  if (vcardRouteRegex.test(pathname)) {
    return vCardLinkMiddleware(req)
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
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
}
