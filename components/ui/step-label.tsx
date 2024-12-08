import { cn } from "@/lib/utils"
import { HTMLAttributes } from "react"

/* eslint-disable  @typescript-eslint/no-empty-object-type */
interface StepLabelProps extends HTMLAttributes<HTMLDivElement> {}

const StepLabel = ({ className, children, ...props }: StepLabelProps) => {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props}>
      {children}
    </div>
  )
}

interface StepLabelCounterProps extends HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode
}

const StepLabelCounter = ({
  className,
  children,
  ...props
}: StepLabelCounterProps) => {
  return (
    <span
      className={cn(
        "text-sm size-7 bg-black  flex items-center justify-center rounded-full text-white font-medium",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

StepLabel.Counter = StepLabelCounter

interface StepLabelTitleProps extends HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const StepLabelTitle = ({
  className,
  children,
  ...props
}: StepLabelTitleProps) => {
  return (
    <p className={cn("text-sm font-semibold", className)} {...props}>
      {children}
    </p>
  )
}

StepLabel.Title = StepLabelTitle

export { StepLabel }
