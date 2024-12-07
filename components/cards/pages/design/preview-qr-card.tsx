"use client"

import { useRef } from "react"
import { useFormContext } from "react-hook-form"

import type { qrCodeRefType } from "@/types/type"
import { QrCode } from "@/components/package/qr-code/qr-code"
import { StepLabel } from "@/components/ui/step-label"
import { MiniButton } from "@/components/buttons/mini-button"
import { ChevronDown } from "lucide-react"

export const PreviewQrCard = () => {
  const qrCodeRef = useRef<qrCodeRefType>(null)
  const { getValues } = useFormContext()
  const { style } = getValues()

  return (
    <div className="flex items-center justify-center flex-col gap-4 bg-gray-100 py-8 rounded-lg">
      <StepLabel>
        <StepLabel.Counter>3</StepLabel.Counter>
        <StepLabel.Title>Download Your QR</StepLabel.Title>
      </StepLabel>
      <QrCode
        qrCodeRef={qrCodeRef}
        bottomInput={style.bottomInput}
        topInput={style.topInput}
        color={style.color}
        hasFrame={style.hasFrame}
        logo={style.logo}
        shape={style.shape}
      />
      <MiniButton className="flex items-center gap-2">
        Download QR
        <ChevronDown className="size-4" />
      </MiniButton>
    </div>
  )
}
