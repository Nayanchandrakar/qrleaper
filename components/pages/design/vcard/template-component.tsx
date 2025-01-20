"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { useVcardTemplate } from "@/hooks/pages/design/vcard/useVcardTemplate"
import { SelectTemplatePopup } from "@/components/popups/pages/design/vcard/select-vcard-template-popup"

export const TemplateComponent = () => {
  const router = useRouter()
  const { setActiveStep } = useStepper()
  const { setIsOpen, isOpen } = useVcardTemplate()

  const onConfirm = () => {
    setIsOpen(false)

    // Proceed for vcard form
    setActiveStep(2)
  }

  const onCollapse = () => {
    setIsOpen(false)
    router.push("/design")
  }

  useEffect(() => {
    if (!isOpen) setIsOpen(true)
  }, [])

  return <SelectTemplatePopup onCollapse={onCollapse} onConfirm={onConfirm} />
}
