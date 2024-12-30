"use server"

import { flattenValidationErrors } from "next-safe-action"

import { isUserNameAvailable } from "@/app/actions/utils"
import { authUserActionClient } from "@/lib/action/safe-action"
import { virtualCardFormSchema } from "@/zod/forms/vcard/virtual-card-form-schema"

export const checkVCardUserNameAction = authUserActionClient
  .schema(virtualCardFormSchema.pick({ userName: true }), {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(async ({ parsedInput }) => {
    const { userName } = parsedInput
    const response = await isUserNameAvailable(userName)
    return { result: response ?? "", currentUserName: userName }
  })
