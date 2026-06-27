"use client"

import Link, { type LinkProps } from "next/link"
import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type SocialIconProps = HTMLAttributes<HTMLDivElement>
interface SocialIconLinkProps
  extends HTMLAttributes<HTMLAnchorElement>, LinkProps {}

export const SocialIcon = ({
  children,
  className,
  ...props
}: SocialIconProps) => {
  return (
    <div className={cn("flex items-center gap-4", className)} {...props}>
      {children}
    </div>
  )
}

// Define the Icon sub-component
const SocialIconIcon = ({
  children,
  className,
  ...props
}: SocialIconLinkProps) => {
  return (
    <Link
      className={cn(
        "bg-gradient-brand flex size-10 items-center justify-center rounded-full",
        className
      )}
      {...props}
      target="_blank"
    >
      {children}
    </Link>
  )
}

// Set display names for better debugging
SocialIcon.displayName = "SocialIcon"
SocialIconIcon.displayName = "SocialIcon.Icon"

// Attach the Icon sub-component to SocialIcon
SocialIcon.Icon = SocialIconIcon
