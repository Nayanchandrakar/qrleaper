"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { useVcardTemplate } from "@/hooks/pages/design/vcard/useVcardTemplate"

interface SelectTemplatePopupProps {
  isCollapsible?: boolean
  onConfirm: () => void
}

export const SelectTemplatePopup = ({
  isCollapsible = false,
  onConfirm,
}: SelectTemplatePopupProps) => {
  const { isOpen, setIsOpen } = useVcardTemplate()

  return (
    <Dialog open={isCollapsible || true} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Testing</DialogTitle>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
