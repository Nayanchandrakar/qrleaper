"use client"

import { HTMLAttributes } from "react"
import Link, { type LinkProps } from "next/link"

import { cn } from "@/lib/utils"

/* eslint-disable-next-line  @typescript-eslint/no-empty-object-type */
interface SocialIconProps extends HTMLAttributes<HTMLDivElement> {}
interface SocialIconLinkProps
  extends HTMLAttributes<HTMLAnchorElement>,
    LinkProps {}

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
        "flex items-center justify-center size-10 rounded-full bg-gradient-brand",
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
