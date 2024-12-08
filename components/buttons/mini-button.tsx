"use client"
import { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"

interface MiniButtonProps extends HTMLAttributes<HTMLButtonElement> {
  type?: "button" | "submit" | "reset"
}

export const MiniButton = ({
  className,
  children,
  type = "button",
  ...props
}: MiniButtonProps) => {
  return (
    <button
      className={cn(
        "bg-black hover:bg-black/90 transition-colors duration-200 text-white  px-5 py-2 font-medium rounded-full text-sm",
        className
      )}
      type={type}
      {...props}
    >
      {children}
    </button>
  )
}
