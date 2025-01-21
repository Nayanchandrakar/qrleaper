"use client"

import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"

import { createVcardQrCodeAction } from "@/app/actions/pages/design/vcard/create-vcard-qr-code-action"
import { virtualCardFormSchemaType } from "@/zod/forms/vcard/virtual-card-form-schema"

interface useVcardCreateHandlerProps {
  reset: () => void
}

export const useVcardCreateHandler = ({
  reset,
}: useVcardCreateHandlerProps) => {
  const actions = useAction(createVcardQrCodeAction, {
    onSuccess: () => {
      reset()
      toast.success("Successfully created a QR Code")
    },
    onError: ({ error }) => toast.error(error.serverError),
  })

  const onSubmit = (data: virtualCardFormSchemaType) => {
    const formData = new FormData()
    const { profileImage, images, ...remaining } = data

    formData.append("profileImage", profileImage)

    if (images?.length) {
      images.forEach((image) => formData.append("images", image))
    }

    // @ts-ignore
    actions.executeAsync({ formData, ...remaining })
  }

  return {
    ...actions,
    onSubmit,
  }
}
