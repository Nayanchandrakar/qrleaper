import { z } from "zod"

export const createFileSchema = (
  acceptedTypes: string[],
  maxFileSize: number
) => {
  return z
    .custom<File>((value) => value instanceof File, {
      message: "Please upload a profile image before proceeding."
    })
    .refine((file) => acceptedTypes?.includes(file.type), {
      message: `File must be one of the following types: ${acceptedTypes.join(
        ", "
      )}`
    })
    .refine(
      (file) => file.size <= maxFileSize,
      (file) => {
        return {
          message: `${file.name} size must not exceed ${
            maxFileSize / (1024 * 1024)
          }MB`
        }
      }
    )
}
