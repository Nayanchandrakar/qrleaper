"use server"

import { authUserActionClient } from "@/lib/action/safe-action"
import { updateFile, uploadFile } from "@/app/actions/file/utils"
import { fileUploadFormSchema } from "@/zod/forms/file/file-form-schema"

export const fileUploadAction = authUserActionClient
  .use(async ({ next, clientInput }) => {
    const formData = clientInput as FormData

    const file = formData.get("file")
    const fileName = formData.get("fileName")

    const { data, error } = fileUploadFormSchema.safeParse({
      file,
      fileName,
    })

    if (error) {
      throw new Error("Invalid file provided")
    }

    return next({
      ctx: data,
    })
  })
  .action(async ({ ctx }) => {
    const { file, fileName } = ctx
    let response

    if (fileName) {
      // update operation
      response = await updateFile(fileName, file)
    } else {
      // create operation
      response = await uploadFile(file)
    }

    return { file: response.newFileName }
  })
