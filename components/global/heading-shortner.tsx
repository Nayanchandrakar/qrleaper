import type { HTMLAttributes } from "react"

import { cn } from "@/lib/utils"

type HeadingShortnerContainerProps = HTMLAttributes<HTMLDivElement>

const HeadingShortner = ({
  className,
  children,
  ...props
}: HeadingShortnerContainerProps) => {
  return (
    <div
      className={cn("flex flex-col items-start gap-1", className)}
      {...props}
    >
      {children}
    </div>
  )
}

interface HeadingShortnerProps extends HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const Heading = ({ className, children, ...props }: HeadingShortnerProps) => {
  return (
    <h3 className={cn("text-xl font-bold md:text-2xl", className)} {...props}>
      {children}
    </h3>
  )
}

HeadingShortner.Title = Heading

interface HeadingShortnerTitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const Paragraph = ({
  className,
  children,
  ...props
}: HeadingShortnerTitleProps) => {
  return (
    <p
      className={cn("text-base font-medium text-gray-600", className)}
      {...props}
    >
      {children}
    </p>
  )
}

HeadingShortner.Description = Paragraph

export { HeadingShortner }
