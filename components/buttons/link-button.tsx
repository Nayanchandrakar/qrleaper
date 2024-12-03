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
        "text-sm text-gray-500 transition-colors duration-200 hover:text-gray-800 font-semibold",
        className
      )}
      href={href}
      {...props}
    >
      {children}
    </Link>
  )
}
