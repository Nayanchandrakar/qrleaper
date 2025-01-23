"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { VcardTemplateCarousel } from "@/components/carousels/vcard-template-carousel"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface VcardEditTemplatePopupProps {
  isExecuting: boolean
}

// Dynamic Component
const VcardEditTemplatePopupDynamic = ({
  isExecuting,
}: VcardEditTemplatePopupProps) => {
  const [IsOpen, setIsOpen] = useState(false)

  return (
    <Dialog open={IsOpen} onOpenChange={setIsOpen}>
      <Button
        disabled={isExecuting}
        onClick={() => setIsOpen(true)}
        type="button"
        variant="primary"
      >
        Change Template
      </Button>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Template</DialogTitle>
          <DialogDescription>
            Select from the pre-designed templates below to create your
            customized Vcard QR Code.
          </DialogDescription>
        </DialogHeader>
        <VcardTemplateCarousel onSelect={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

export default VcardEditTemplatePopupDynamic
