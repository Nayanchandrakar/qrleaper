"use client"

import { toast } from "sonner"
import { useMemo } from "react"
import { useAction } from "next-safe-action/hooks"
import { useFormContext } from "react-hook-form"

import { max_logo_upload_size } from "@/constants/qr/file"
import { logoFileFormSchema } from "@/zod/forms/design/logo-form-schema"
import { imageUploadAction } from "@/app/actions/pages/design/image-upload-action"
import { Uploadthing } from "@/components/package/uploadthing"

export const LogoForm = () => {
  const { getValues, setValue } = useFormContext()
  const { style } = getValues()

  const sizeInMegabytes = useMemo(() => max_logo_upload_size / 1024 / 1024, [])

  const { executeAsync, isExecuting } = useAction(imageUploadAction, {
    onSuccess: ({ data }) => {
      setValue("style.image", data?.image, {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      })
      toast.success("Succefully image uploaded!")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()

    const file = e.target.files?.[0]
    if (!file) return

    const { error, data } = logoFileFormSchema.safeParse({
      file,
      ...(style.image && { image: style.image }),
    })

    if (error) {
      error?.errors?.forEach((err) => {
        toast.error(err.message)
      })
      return
    }

    const formData = new FormData()
    formData.append("file", data.file)
    if (style.image) formData.append("image", data.image as string)

    executeAsync(formData as any)
  }

  return (
    <Uploadthing
      accept="image/*"
      fileName={style.image}
      isExecuting={isExecuting}
      onChange={onChange}
      footerText={`A high-quality PNG is recommended. Supports PNG, JPG , SVG up to
        ${sizeInMegabytes} MB.`}
    />
  )
}
