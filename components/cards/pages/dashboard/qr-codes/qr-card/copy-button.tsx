"use client"

import { toast } from "sonner"
import { useCallback } from "react"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  endpoint: string
}

export const CopyButton = ({ endpoint }: CopyButtonProps) => {
  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(endpoint)
    toast.success("Succefully Copied URL")
  }, [endpoint])

  return (
    <Button
      size="icon"
      onClick={handleCopy}
      className="bg-gray-100 hover:bg-gray-100/60 "
      variant="ghost"
    >
      <Copy className="size-4 text-gray-500" />
    </Button>
  )
}
