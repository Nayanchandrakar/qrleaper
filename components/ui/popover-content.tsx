"use client"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"

interface TooltipComponentProps {
  content: React.ReactNode
  children: React.ReactNode
}

export const PopOverComponent = ({
  content,
  children
}: TooltipComponentProps) => {
  return (
    <Popover>
      <PopoverTrigger type="button">{children}</PopoverTrigger>
      <PopoverContent className="border border-gray-200 bg-white shadow-md shadow-black/10">
        {content}
      </PopoverContent>
    </Popover>
  )
}
