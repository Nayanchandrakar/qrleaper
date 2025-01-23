"use client"

import React from "react"

import { cn } from "@/lib/utils"

export interface StepProps extends React.ComponentProps<"div"> {
  className?: string
  children?: React.ReactNode
}

export const Step = React.forwardRef<HTMLDivElement, StepProps>(
  ({ className, children, ...rest }, ref) => {
    return (
      <div
        {...rest}
        ref={ref}
        className={cn(
          "relative cursor-pointer z-10 grid place-items-center size-10 rounded-full bg-zinc-100 text-zinc-800 font-bold transition-all duration-300",
          className
        )}
      >
        {children}
      </div>
    )
  }
)

Step.displayName = "Step"
