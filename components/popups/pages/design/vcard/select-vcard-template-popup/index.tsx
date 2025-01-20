"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useVcardTemplate } from "@/hooks/pages/design/vcard/useVcardTemplate"

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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Testing</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
