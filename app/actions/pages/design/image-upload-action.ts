"use server"

import { authUserActionClient } from "@/lib/action/safe-action"
import { logoFileFormSchema } from "@/zod/forms/design/logo-form-schema"
import { updateFile, uploadFile } from "@/app/actions/file/utils"

export const imageUploadAction = authUserActionClient
  .use(async ({ next, clientInput }) => {
    const formData = clientInput as FormData

    const file = formData.get("file")
    const image = formData.get("image")

    const { data, error } = logoFileFormSchema.safeParse({ file, image })

    if (error) {
      throw new Error("Invalid file provided")
    }

    return next({
      ctx: data,
    })
  })
  .action(async ({ ctx }) => {
    const { file, image } = ctx
    let response

    if (image) {
      // update operation
      response = await updateFile(image, file)
    } else {
      // create operation
      response = await uploadFile(file)
    }

    return { image: response.newFileName }
  })
