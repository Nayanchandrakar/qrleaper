"use client"

import { cn } from "@/lib/utils"

interface StepperProps extends React.HTMLAttributes<HTMLOListElement> {}

const Stepper = ({ className, children, ...props }: StepperProps) => {
  return (
    <ol
      className={cn(
        "flex flex-col items-start md:flex-row md:items-center gap-3 w-full md:gap-4",
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
        "flex items-center gap-2 cursor-pointer",
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
        "flex items-center justify-center size-10 rounded-full bg-white transition-all duration-300",
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
        "text-sm font-medium text-zinc-700 text-center transition-all duration-300",
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
