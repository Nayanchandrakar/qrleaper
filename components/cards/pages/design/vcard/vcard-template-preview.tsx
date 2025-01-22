"use client"

import { useFormContext } from "react-hook-form"

import type { qrCodevCardType } from "@/types/db-types"
import { PhoneFrame } from "@/components/global/phone-frame"
import { getTemplateComponent } from "@/utils/pages/design/vcard"

export const VcardTemplatePreview = () => {
  const { getValues } = useFormContext()
  const formValues = getValues()

  const TemplateComponent = getTemplateComponent(formValues?.templateId)

  return (
    <div className="flex items-center justify-center h-fit sticky top-20">
      <PhoneFrame>
        <TemplateComponent
          vCard={formValues as qrCodevCardType}
          isPreviewMode
        />
      </PhoneFrame>
    </div>
  )
}
