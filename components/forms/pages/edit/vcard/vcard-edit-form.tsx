"use client"

import { toast } from "sonner"
import { FormEvent, useEffect } from "react"
import { useAction } from "next-safe-action/hooks"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, FormProvider } from "react-hook-form"

import { useQrDataContext } from "@/hooks/qr/useQrDataContext"
import { VcardTemplateChangeButton } from "@/components/dynamic"
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form"
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card"
import { QrEditControl } from "@/components/forms/pages/edit/design/qr-edit-controls"
import {
  vCardEditFormSchema,
  type vCardEditFormSchemaType,
} from "@/zod/pages/edit/vcard/vcard-edit-form-schema"
import { editQrVcardType } from "@/types/type"

import { QrCodeInfoWithNameSection } from "@/components/forms/pages/design/virtual-card/sub-forms/qr-code-info-with-name-section"
import { PhoneNumberSection } from "@/components/forms/pages/design/virtual-card/sub-forms/phone-number-section"
import { EmailAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/email-address-section"
import { AddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/addresses-section"
import { WorkAddressSection } from "@/components/forms/pages/design/virtual-card/sub-forms/work-adddress-section"
import { WebsiteSection } from "@/components/forms/pages/design/virtual-card/sub-forms/website-url-section"
import { ProfessionalInformationSection } from "@/components/forms/pages/design/virtual-card/sub-forms/professional-information-section"
import { AdditionalInformationSection } from "@/components/forms/pages/design/virtual-card/sub-forms/additional-information-section"
import { VcardImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-image-upload-form"
import { SocialMediaProfileSection } from "@/components/forms/pages/design/virtual-card/sub-forms/social-media-profile-section"
import { VcardProfileImageUploadForm } from "@/components/forms/pages/design/virtual-card/sub-forms/vcard-profile-image"
import { updateQrCodeVcardAction } from "@/app/actions/pages/edit/vcard/update-qr-code-vcard-action"
import { Accordion } from "@/components/ui/accordion"

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

  const userNameError = form.getFieldState("userName")?.error

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    event.stopPropagation()

    if (userNameError) {
      toast.error(userNameError.message)
      return
    }

    form.handleSubmit((data) => {
      const formData = new FormData()

      const { profileImage, images, ...remaining } = data

      if (
        typeof profileImage === "string" ||
        typeof profileImage === "object"
      ) {
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
    })(event)
  }

  useEffect(() => {
    if (endpoint) {
      setData(endpoint)
    }
  }, [endpoint, setData])

  return (
    <FormProvider {...form}>
      <form
        onSubmit={onSubmit}
        className="grid grid-cols-1 lg:grid-cols-2 gap-8"
      >
        <div>
          <Accordion
            type="single"
            collapsible
            defaultValue="basic-information"
            className="space-y-7"
          >
            <div className="flex items-center justify-between gap-4">
              <VcardProfileImageUploadForm isExecuting={isExecuting} />
              <VcardTemplateChangeButton isExecuting={isExecuting} />
            </div>
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
          </Accordion>
          <QrStyleForm />
        </div>

        <PreviewQrCard />
      </form>
    </FormProvider>
  )
}
