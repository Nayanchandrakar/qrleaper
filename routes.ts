export const authRoutes = ["/login", "/register"]

const publicRoutes = [
  "/design",
  "/expired",
  "/pricing",
  "/link",
  "/forgot-password",
  "/api/view",
  "/vcard",
  "/profile",
]

export const editRouteRegex = new RegExp(`^/edit($|/)`)
export const apiAuthPrefixRegex = new RegExp(`^/api/auth`)
export const linkMiddlewareRouteRegex = new RegExp(`^/link`)
export const apiStripePrefixRegex = new RegExp(`^/api/webhooks`)
export const authRouteRegex = new RegExp(`^(${authRoutes.join("|")})$`)
export const vcardRouteRegex = new RegExp(`^/vcard/[^/]+($|/)`)
export const publicRouteRegex = new RegExp(`^(${publicRoutes.join("|")})($|/)`)
