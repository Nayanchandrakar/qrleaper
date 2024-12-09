"use client"

import { ListRestart, Loader, Sparkles } from "lucide-react"
import { useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { useQrDataContext } from "@/hooks/qr/useQrDataContext"

interface QrControlProps {
  isExecuting: boolean
}
export const QrControls = ({ isExecuting }: QrControlProps) => {
  const { reset } = useFormContext()
  const { data, setData } = useQrDataContext()

  return (
    <>
      {data ? (
        <Button
          type="button"
          onClick={(e) => {
            e?.preventDefault()
            reset()
            setData(null)
          }}
          style={{ marginTop: "1.5rem" }}
        >
          <ListRestart className="size-5" />
          Reset Form
        </Button>
      ) : (
        <Button
          type="submit"
          style={{ marginTop: "1.5rem" }}
          disabled={isExecuting}
        >
          {isExecuting ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            <Sparkles className="size-5" />
          )}
          Generate QR Code
        </Button>
      )}
    </>
  )
}
