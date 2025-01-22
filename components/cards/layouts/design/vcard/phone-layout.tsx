import React from "react"
import { cn } from "@/lib/utils"

interface PhoneLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PhoneLayout({
  children,
  className,
  ...props
}: PhoneLayoutProps) {
  return (
    <div
      className={cn(
        "w-full border-[15px] rounded-[30px] border-black max-w-[20rem] relative",
        className
      )}
      {...props}
    >
      <span className="size-5 top-3 z-10 rounded-full absolute inset-0 left-[50%] -translate-x-[50%] bg-black" />

      <div className="py-12 overflow-y-auto rounded-[30px] h-[35rem]">
        {children}
      </div>
    </div>
  )
}
