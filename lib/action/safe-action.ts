import { createSafeActionClient } from "next-safe-action"

import { auth } from "@/lib/auth/auth"

export const actionClient = createSafeActionClient({
  handleServerError: (e) => {
    console.error("Server action error:", e)

    if (e instanceof Error) {
      return e.message
    }

    return "An unknown error occurred."
  }
})

export const authUserActionClient = actionClient.use(async ({ next }) => {
  const session = await auth()

  if (!session?.user?.id) {
    throw new Error("Unauthorized: Login required.")
  }

  return next({
    ctx: {
      user: session.user
    }
  })
})
