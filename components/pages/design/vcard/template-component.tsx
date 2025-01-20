"use client"

import { SelectTemplatePopup } from "@/components/popups/pages/design/vcard/select-vcard-template-popup"

export const TemplateComponent = () => {
  const onConfirm = () => {}

  return <SelectTemplatePopup onConfirm={onConfirm} />
}
