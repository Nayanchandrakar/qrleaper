import type { User } from "next-auth"
import { isUserNameAvailable } from "@/app/actions/utils"

export const throwUserNameError = async ({
  next,
  ctx,
  isEditAction = false,
}: {
  ctx: {
    user: User
    /* eslint-disable  @typescript-eslint/no-explicit-any */
    parsedInput: any
  }
  next: () => any
  isEditAction?: boolean
}) => {
  const userName = ctx.parsedInput.userName
  // check is there any user name exist with this input
  const inUse = await isUserNameAvailable(userName)

  // Only return the next function if the input user name matches with the existing one and having edit action boolean true
  if (inUse && inUse === userName && isEditAction) return next()

  // If true thent throw an error
  if (inUse) {
    throw new Error("User Already In Use.")
  }

  // else return next function
  return next()
}
