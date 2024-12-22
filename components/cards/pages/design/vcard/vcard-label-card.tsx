"use client"

import { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

/* eslint-disable  @typescript-eslint/no-empty-object-type */
interface VCardLabelCardProps extends HTMLAttributes<HTMLHeadElement> {}

export const VCardLabelCard = ({
  className,
  children,
  ...props
}: VCardLabelCardProps) => {
  return (
    <h3
      className={cn(
        "flex items-start p-3 px-4 rounded-md bg-gray-100 text-sm font-semibold text-gray-500",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
}
