"use client"

import { toast } from "sonner"
import { useEffect } from "react"
import { useFormContext } from "react-hook-form"
import { useAction } from "next-safe-action/hooks"

import { Uploadthing } from "@/components/package/uploadthing"
import { fileUploadAction } from "@/app/actions/pages/design/file/file-upload-action"
import { max_file_upload_size } from "@/constants/qr/file"
import { fileUploadFormSchema } from "@/zod/forms/file/file-form-schema"

interface FileUploadFormProps {
  onSuccess?: (fileName: string) => void
}

export const FileUploadForm = ({ onSuccess }: FileUploadFormProps) => {
  const { getValues, setValue, formState } = useFormContext()
  const isThereAnyFileRelatedError = formState?.errors.fileId
  const fileName = getValues("fileName")

  // Show a toast message to user if there is any error in fileName field
  useEffect(() => {
    if (isThereAnyFileRelatedError) {
      toast.error(isThereAnyFileRelatedError.message as string)
    }
  }, [isThereAnyFileRelatedError])

  // Server action for file upload handling it through aws S3
  const { executeAsync, isExecuting } = useAction(fileUploadAction, {
    onSuccess: ({ data }) => {
      setValue("fileName", data?.file!, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
      onSuccess?.(data?.file!)
      toast.success("Succefully file uploaded!")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e?.target?.files?.[0]

    if (!file) return

    const { error, data } = fileUploadFormSchema.safeParse({
      file,
      ...(fileName && { fileName }),
    })

    if (error) {
      error?.errors?.forEach((err) => {
        toast.error(err.message)
      })
      return
    }

    const formData = new FormData()
    formData.append("file", data.file)

    if (fileName) {
      formData.append("fileName", data.fileName as string)
    }

    /* eslint-disable  @typescript-eslint/no-explicit-any */
    executeAsync(formData as any)
  }

  return (
    <Uploadthing
      htmlFor="file-upload"
      fileName={fileName}
      onChange={onChange}
      isExecuting={isExecuting}
      accept="audio/*,video/*,image/*,pdf/*"
      footerText={`Upload a PDF, image, video, or audio file from your device. Max size:
        ${max_file_upload_size / 1024 / 1024} MB.`}
    />
  )
}
