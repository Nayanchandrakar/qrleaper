import { auth } from "@/lib/auth/auth"

export const throwIfAuthenticated = async ({
  next,
  ctx,
}: {
  // eslint-disable-next-line
  next: any
  // eslint-disable-next-line
  ctx: any
}) => {
  const session = await auth()

  if (session) {
    throw new Error("You are already logged in.")
  }

  return next({ ctx })
}
