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
import { PhoneNumberSection } from "./vcard-section-forms/phone-number-section"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { WorkAddressSection } from "./vcard-section-forms/work-adddress-section"
import { EmailAddressSection } from "./vcard-section-forms/email-address-section"
import { QrControls } from "@/components/forms/pages/design/qr-style/qr-controls"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import { AdditionalInformationSection } from "./vcard-section-forms/additional-information-section"
import { createVcardQrCodeAction } from "@/app/actions/pages/design/vcard/create-vcard-qr-code-action"
import { AddressSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/addresses-section"
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-image-upload-form"
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-profile-image"
import { QrCodeInfoWithNameSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/qr-code-info-with-name-section"
import { ProfessionalInformationSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/professional-information-section"
import { SocialMediaProfileSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/social-media-profile-section"
import { WebsiteSection } from "./vcard-section-forms/website-url-section"

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
            <QrCodeInfoWithNameSection isExecuting={isExecuting} />
            <PhoneNumberSection isExecuting={isExecuting} />
            <EmailAddressSection isExecuting={isExecuting} />
            <AddressSection isExecuting={isExecuting} />
            <WorkAddressSection isExecuting={isExecuting} />
            <WebsiteSection isExecuting={isExecuting} />
            <ProfessionalInformationSection isExecuting={isExecuting} />
            <SocialMediaProfileSection isExecuting={isExecuting} />
            <AdditionalInformationSection isExecuting={isExecuting} />
            <VcardImageUploadForm isExecuting={isExecuting} />
            <QrControls isExecuting={isExecuting} />
          </div>
          <QrStyleForm />
        </div>

        <PreviewQrCard className="sm:sticky sm:top-0" />
      </form>
    </FormProvider>
  )
}
