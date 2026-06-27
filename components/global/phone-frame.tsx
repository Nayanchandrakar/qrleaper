import type React from "react"

import { cn } from "@/lib/utils"

type PhoneLayoutProps = React.HTMLAttributes<HTMLDivElement>

export function PhoneFrame({
  children,
  className,
  ...props
}: PhoneLayoutProps) {
  return (
    <div
      className={cn(
        "relative w-full max-w-[20rem] rounded-[30px] border-[15px] border-black",
        className
      )}
      {...props}
    >
      <span className="absolute inset-0 left-[50%] z-10 h-6 w-28 -translate-x-[50%] rounded-b-lg bg-black" />

      <div className="hide-scrollbar h-[35rem] overflow-y-auto rounded-[16px]">
        {children}
      </div>
    </div>
  )
}
