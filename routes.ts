export const authRoutes = ["/login", "/register", "/reset-password"]

const publicRoutes = [
  "/design",
  "/expired",
  "/pricing",
  "/link",
  "/forgot-password",
  "/api/view",
  "/vcard",
  "/profile"
]

export const editRouteRegex = /^\/edit($|\/)/
export const apiAuthPrefixRegex = /^\/api\/auth/
export const linkMiddlewareRouteRegex = /^\/link/
export const apiStripePrefixRegex = /^\/api\/webhooks/
export const vcardRouteRegex = /^\/vcard\/[^\/]+($|\/)/
export const publicRouteRegex = new RegExp(`^(${publicRoutes.join("|")})($|/)`)
export const authRouteRegex = new RegExp(
  `^(${authRoutes.join("|").replace("\\/", "/")}(/[^/]+)?)$`
)
