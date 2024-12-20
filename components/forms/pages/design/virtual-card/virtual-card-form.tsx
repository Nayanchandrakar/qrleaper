"use client"

import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import { colorsList } from "@/constants/qr/colors"
import {
  virtualCardFormSchema,
  type virtualCardFormSchemaType,
} from "@/zod/forms/vcard/virtual-card-form-schema"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrControls } from "@/components/forms/pages/design/qr-style/qr-controls"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import { createVcardQrCodeAction } from "@/app/actions/pages/design/vcard/create-vcard-qr-code-action"
import { VirtualCardNameForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-name-form"
import { VirtualCardAddressForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-addres-form"
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-image-upload-form"
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-profile-image"
import { VirtualCardJobDetailsForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-job-details-form"
import { VirtualCardWorkAddressForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-work-addres-form"
import { VirtualCardPlatformDetialsForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/virtual-card-platform-details-form"

export const VirtualCardForm = () => {
  const { setData } = useQrDataContext()

  const form = useForm<virtualCardFormSchemaType>({
    resolver: zodResolver(virtualCardFormSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      style: {
        bottomInput: "",
        image: "",
        topInput: "",
        color: colorsList[0],
        hasFrame: false,
        shape: "square",
      },
    },
  })

  const { executeAsync, isExecuting } = useAction(createVcardQrCodeAction, {
    onSuccess: ({ data }) => {
      setData(data?.endpoint!)
      toast.success("Successfully created a QR Code")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const onSubmit = (data: virtualCardFormSchemaType) => {
    const formData = new FormData()
    const { profileImage, images, ...remaining } = data

    formData.append("profileImage", profileImage)

    if (images?.length) {
      images.forEach((image) => formData.append("images", image))
    }

    // @ts-ignore
    executeAsync({ formData, ...remaining })
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div>
          <div className="space-y-7">
            <VcardProfileImageUploadForm isExecuting={isExecuting} />
            <VirtualCardNameForm isExecuting={isExecuting} />
            <VirtualCardAddressForm isExecuting={isExecuting} />
            <VirtualCardWorkAddressForm isExecuting={isExecuting} />
            <VirtualCardJobDetailsForm isExecuting={isExecuting} />
            <VirtualCardPlatformDetialsForm isExecuting={isExecuting} />
            <VcardImageUploadForm isExecuting={isExecuting} />
            <QrControls isExecuting={isExecuting} />
          </div>
          <QrStyleForm />
        </div>

        <PreviewQrCard />
      </form>
    </FormProvider>
  )
}
