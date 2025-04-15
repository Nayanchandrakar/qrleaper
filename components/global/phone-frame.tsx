import React from "react"

import { cn } from "@/lib/utils"

interface PhoneLayoutProps extends React.HTMLAttributes<HTMLDivElement> {}

export function PhoneFrame({
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
      <span className="h-6 w-28 z-10 rounded-b-lg absolute inset-0 left-[50%] -translate-x-[50%] bg-black" />

      <div className="hide-scrollbar overflow-y-auto rounded-[16px] h-[35rem]">
        {children}
      </div>
    </div>
  )
}
