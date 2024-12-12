"use client"

import { toast } from "sonner"
import { useCallback } from "react"
import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"

interface CopyButtonProps {
  endpoint: string
  title: string
}

export const CopyButton = ({ endpoint, title }: CopyButtonProps) => {
  const handleCopy = useCallback(() => {
    window.navigator.clipboard.writeText(endpoint)
    toast.success("Succefully Copied URL")
  }, [endpoint])

  return (
    <div className="flex items-center gap-2 justify-between">
      <span className="line-clamp-1 text-gray-500 font-semibold">{title}</span>
      <Button
        size="icon"
        onClick={handleCopy}
        className="bg-gray-100 hover:bg-gray-100/60 "
        variant="ghost"
      >
        <Copy className="size-4 text-gray-500" />
      </Button>
    </div>
  )
}
