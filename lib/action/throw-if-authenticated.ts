import { auth } from "@/lib/auth/auth"

export const throwIfAuthenticated = async ({
  next,
  ctx
}: {
  // oxlint-disable-next-line typescript/no-explicit-any
  next: any
  // oxlint-disable-next-line typescript/no-explicit-any
  ctx: any
}) => {
  const session = await auth()

  if (session) {
    throw new Error("You are already logged in.")
  }

  return next({ ctx })
}
