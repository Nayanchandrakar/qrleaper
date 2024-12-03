"use client"
import { AllHTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface MiniButtonProps extends AllHTMLAttributes<HTMLButtonElement> {}

export const MiniButton = ({
  className,
  children,
  type,
  ...props
}: MiniButtonProps) => {
  return (
    <button
      className={cn(
        "bg-black hover:bg-black/90 transition-colors duration-200 text-white  px-5 py-2 font-medium rounded-full text-sm",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
