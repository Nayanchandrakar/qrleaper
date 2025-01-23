"use client"

import React, { useCallback } from "react"

import { cn } from "@/lib/utils"

export interface StepperProps extends React.ComponentProps<"div"> {
  activeStep?: number
  isFirstStep?: (value: boolean) => void
  isLastStep?: (value: boolean) => void
  className?: string
  lineClassName?: string
  activeLineClassName?: string
  children: React.ReactNode
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      activeStep = 0,
      isFirstStep,
      isLastStep,
      className,
      lineClassName,
      activeLineClassName,
      children,
      ...rest
    },
    ref
  ) => {
    const containerRef = React.useRef<HTMLDivElement | null>(null)
    const [widthPerStep, setWidthPerStep] = React.useState(0)

    const isFirstStepValue = activeStep === 0
    const isLastStepValue =
      React.Children.count(children) > 0 &&
      activeStep === React.Children.count(children) - 1

    const isReachEnd =
      React.Children.count(children) > 0 &&
      activeStep > React.Children.count(children) - 1

    const updateWidthPerStep = useCallback(() => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect()
        const totalSteps = React.Children.count(children)
        const widthPerStepCalc = totalSteps > 1 ? width / (totalSteps - 1) : 0

        setWidthPerStep(widthPerStepCalc)
      }
    }, [children])

    const width = React.useMemo(() => {
      return !isReachEnd ? widthPerStep * activeStep : 0
    }, [activeStep, isReachEnd, widthPerStep])

    React.useEffect(() => {
      if (typeof isFirstStep === "function") {
        isFirstStep(isFirstStepValue)
      }

      if (typeof isLastStep === "function") {
        isLastStep(isFirstStepValue)
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFirstStepValue, isLastStepValue])

    React.useEffect(() => {
      updateWidthPerStep()
      window.addEventListener("resize", updateWidthPerStep)
      return () => {
        window.removeEventListener("resize", updateWidthPerStep)
      }
    }, [updateWidthPerStep])

    return (
      <div
        {...rest}
        ref={containerRef}
        className={cn(
          "w-full relative flex items-center justify-between ",
          className
        )}
      >
        <div
          className={cn(
            "absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-zinc-100",
            lineClassName
          )}
        />
        <div
          className={cn(
            "absolute left-0 top-2/4 h-0.5 w-full -translate-y-2/4 bg-green-600 transition-all duration-500",
            activeLineClassName
          )}
          style={{ width: `${width}px` }}
        />
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        {React.Children.map(children, (child: any, index) =>
          React.cloneElement(child as React.ReactElement, {
            className: cn(
              (child as React.ReactElement).props.className,
              index === activeStep
                ? cn("bg-green-600 text-white", child?.props?.activeClassName)
                : index < activeStep
                ? cn(
                    "bg-green-600 text-white",
                    child?.props?.completedClassName
                  )
                : ""
            ),
          })
        )}
      </div>
    )
  }
)

Stepper.displayName = "Stepper"

export { Stepper }
