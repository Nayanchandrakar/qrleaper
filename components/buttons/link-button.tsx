import Link, { type LinkProps } from "next/link"

import { cn } from "@/lib/utils"

interface LinkButtonProps extends LinkProps {
  className?: string
  children?: React.ReactNode
}

export const LinkButton = ({
  className,
  href,
  children,
  ...props
}: LinkButtonProps) => {
  return (
    <Link
      className={cn(
        "text-sm font-semibold text-gray-100 transition-colors duration-200 hover:text-gray-200",
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
