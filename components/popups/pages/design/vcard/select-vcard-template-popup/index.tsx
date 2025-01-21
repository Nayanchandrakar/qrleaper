"use client"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useVcardTemplate } from "@/hooks/pages/design/vcard/useVcardTemplate"
import { TemplateCarousel } from "@/components/carousels/pages/design/vcard/template-carousel"

interface SelectTemplatePopupProps {
  onCollapse?: () => void
  onConfirm: () => void
}

export const SelectTemplatePopup = ({
  onConfirm,
  onCollapse,
}: SelectTemplatePopupProps) => {
  const { isOpen, setIsOpen } = useVcardTemplate()

  const onClose = (value: boolean) => {
    if (!value && onCollapse) onCollapse()
    setIsOpen(value)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Template</DialogTitle>
          <DialogDescription>
            Select from the pre-designed templates below to create your
            customized Vcard QR Code.
          </DialogDescription>
        </DialogHeader>
        <TemplateCarousel />
        <DialogFooter>
          <Button variant="primary" onClick={onConfirm}>
            Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
