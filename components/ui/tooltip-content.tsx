"use client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface TooltipComponentProps {
  content: React.ReactNode
  children: React.ReactNode
}

export const TooltipComponent = ({
  content,
  children,
}: TooltipComponentProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger type="button">{children}</TooltipTrigger>
        <TooltipContent className="bg-white shadow-md shadow-black/10 border border-gray-200">
          {content}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
