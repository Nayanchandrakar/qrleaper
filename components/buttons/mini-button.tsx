"use client"
import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

interface MiniButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
  disabled?: boolean
}

export const MiniButton = ({
  className,
  children,
  type = "button",
  disabled = false,
  ...props
}: MiniButtonProps) => {
  return (
    <button
      className={cn(
        "rounded-full bg-black px-5 py-2 text-sm font-medium text-white transition-colors duration-200 hover:bg-black/90 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
