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
        "w-full bg-black rounded-[30px] p-3 relative max-w-[20rem]",
        className
      )}
      {...props}
    >
      <span className="size-4 bg-black absolute left-[50%] rounded-full -translate-x-[50%] top-4 z-10" />
      <div className="bg-white rounded-[24px] py-12 overflow-y-auto h-[35rem]">
        {children}
      </div>
    </div>
  )
}
