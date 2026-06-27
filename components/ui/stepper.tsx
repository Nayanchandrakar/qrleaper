"use client"

import { cn } from "@/lib/utils"

type StepperProps = React.HTMLAttributes<HTMLOListElement>

const Stepper = ({ className, children, ...props }: StepperProps) => {
  return (
    <ol
      className={cn(
        "flex w-full flex-col items-start gap-3 md:flex-row md:items-center md:gap-4",
        className
      )}
      {...props}
    >
      {children}
    </ol>
  )
}
interface StepperContentProps extends React.HTMLAttributes<HTMLLIElement> {
  isExecuting?: boolean
}

const StepperContent = ({
  className,
  children,
  isExecuting = false,
  ...props
}: StepperContentProps) => {
  return (
    <li
      className={cn(
        "flex cursor-pointer items-center gap-2",
        isExecuting && "cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </li>
  )
}

Stepper.Content = StepperContent

interface StepperIconProps extends React.HTMLAttributes<HTMLSpanElement> {
  isActive?: boolean
}

const StepperIcon = ({
  className,
  children,
  isActive = false,
  ...props
}: StepperIconProps) => {
  return (
    <span
      className={cn(
        "flex size-10 items-center justify-center rounded-full bg-white transition-all duration-300",
        isActive && "bg-green-600",
        className
      )}
      {...props}
    >
      {children}
    </span>
  )
}

Stepper.Icon = StepperIcon

interface StepperLabel extends React.HTMLAttributes<HTMLParagraphElement> {
  isActive?: boolean
}

const StepperLabel = ({
  className,
  children,
  isActive = false,
  ...props
}: StepperLabel) => {
  return (
    <p
      className={cn(
        "text-center text-sm font-medium text-zinc-700 transition-all duration-300",
        isActive && "text-green-600",
        className
      )}
      {...props}
    >
      {children}
    </p>
  )
}

Stepper.Label = StepperLabel

export { Stepper }
