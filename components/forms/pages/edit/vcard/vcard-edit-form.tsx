"use client"

import { toast } from "sonner"
import { useEffect } from "react"
import { useAction } from "next-safe-action/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrEditControl } from "@/components/forms/pages/edit/design/qr-edit-controls"
import {
  vCardEditFormSchema,
  type vCardEditFormSchemaType,
} from "@/zod/pages/edit/vcard/vcard-edit-form-schema"
import { editQrVcardType } from "@/types/type"
import { updateQrCodeVcardAction } from "@/app/actions/pages/edit/vcard/update-qr-code-vcard-action"
import { AddressSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/addresses-section"
import { QrCodeInfoWithNameSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/qr-code-info-with-name-section"
import { PhoneNumberSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/phone-number-section"
import { EmailAddressSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/email-address-section"
import { WorkAddressSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/work-adddress-section"
import { WebsiteSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/website-url-section"
import { ProfessionalInformationSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/professional-information-section"
import { SocialMediaProfileSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/social-media-profile-section"
import { AdditionalInformationSection } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/additional-information-section"
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-profile-image"
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/vcard-section-forms/vcard-image-upload-form"

interface VcardEditFormProps {
  qrCode: editQrVcardType
  endpoint: string
}

export const VcardEditForm = ({ qrCode, endpoint }: VcardEditFormProps) => {
  const { setData } = useQrDataContext()

  const { executeAsync, isExecuting } = useAction(updateQrCodeVcardAction, {
    onSuccess: () => {
      toast.success("Successfully updated a QR Code")
    },
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  const form = useForm<vCardEditFormSchemaType>({
    resolver: zodResolver(vCardEditFormSchema),
    defaultValues: qrCode as vCardEditFormSchemaType,
  })

  const onSubmit = (data: vCardEditFormSchemaType) => {
    const formData = new FormData()

    const { profileImage, images, ...remaining } = data

    if (typeof profileImage === "string" || typeof profileImage === "object") {
      formData.append("profileImage", profileImage)
    }

    if (Array.isArray(images)) {
      images.forEach((image) => {
        if (typeof image === "string" || typeof image === "object") {
          formData.append("images", image)
        }
      })
    }

    // @ts-ignore
    executeAsync({ formData, ...remaining })
  }

  useEffect(() => {
    if (endpoint) {
      setData(endpoint)
    }
  }, [endpoint, setData])

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div>
          <div className="space-y-7">
            <VcardProfileImageUploadForm isExecuting={isExecuting} />
            <QrCodeInfoWithNameSection isExecuting={isExecuting} isEditForm />
            <PhoneNumberSection isExecuting={isExecuting} />
            <EmailAddressSection isExecuting={isExecuting} />
            <AddressSection isExecuting={isExecuting} />
            <WorkAddressSection isExecuting={isExecuting} />
            <WebsiteSection isExecuting={isExecuting} />
            <ProfessionalInformationSection isExecuting={isExecuting} />
            <SocialMediaProfileSection isExecuting={isExecuting} />
            <AdditionalInformationSection isExecuting={isExecuting} />
            <VcardImageUploadForm isExecuting={isExecuting} />
            <QrEditControl
              isExecuting={isExecuting}
              isEditable={
                JSON.stringify(form.getValues()) === JSON.stringify(qrCode)
              }
            />
          </div>
          <QrStyleForm />
        </div>

        <PreviewQrCard />
      </form>
    </FormProvider>
  )
}
