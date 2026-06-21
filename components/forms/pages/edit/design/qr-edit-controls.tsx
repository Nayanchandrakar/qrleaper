"use client"

import { Loader, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"

interface QrControlProps {
  isExecuting: boolean
  isEditable: boolean
}
export const QrEditControl = ({ isExecuting, isEditable }: QrControlProps) => {
  return (
    <Button
      type="submit"
      style={{ marginTop: "1.5rem" }}
      disabled={isExecuting || isEditable!}
    >
      {isExecuting ? (
        <Loader className="size-5 animate-spin" />
      ) : (
        <Sparkles className="size-5" />
      )}
      {isExecuting ? "Saving QR Code" : "Update QR Code"}
    </Button>
  )
}
