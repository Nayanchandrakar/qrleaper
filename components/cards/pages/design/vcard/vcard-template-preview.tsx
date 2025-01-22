"use client"

import { useFormContext } from "react-hook-form"

import { qrCodevCardType } from "@/types/db-types"
import { getTemplateComponent } from "@/utils/pages/design/vcard"
import { PhoneLayout } from "@/components/cards/layouts/design/vcard/phone-layout"

export const VcardTemplatePreview = () => {
  const { getValues } = useFormContext()
  const formValues = getValues()

  const TemplateComponent = getTemplateComponent(formValues?.templateId)

  return (
    <div className="flex items-center justify-center h-fit sticky top-20">
      <PhoneLayout>
        <TemplateComponent
          vCard={formValues as qrCodevCardType}
          isPreviewMode
        />
      </PhoneLayout>
    </div>
  )
}
