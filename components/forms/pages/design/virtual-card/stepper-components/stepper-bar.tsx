"use client"

import { ChevronsRight } from "lucide-react"
import { forwardRef, useEffect, useMemo } from "react"

import { cn } from "@/lib/utils"
import { Stepper } from "@/components/ui/stepper"
import type { MouseEventType } from "@/types/event-types"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { stepperVcardData } from "@/constants/pages/design/vcard/stepper-data"
import { StepperNavigationButtons } from "@/components/buttons/pages/vcard/vcard-stepper-pre-buttons"


interface StepperBarProps {
  isExecuting: boolean
  handlePrev: () => void
  handleNext: (event: MouseEventType) => void
}

export const StepperBar = forwardRef<HTMLDivElement, StepperBarProps>(
  ({ isExecuting , handleNext , handlePrev }, ref) => {
    const { activeStep, setIsFirstStep, setIsLastStep, setActiveStep } =
      useStepper()

    const isFirstStepValue = useMemo(() => activeStep === 0, [activeStep])

    const isLastStepValue = useMemo(
      () =>
        stepperVcardData.length > 0 &&
        activeStep === stepperVcardData?.length - 1,
      [activeStep]
    )

    useEffect(() => {
      setIsLastStep(isLastStepValue)
      setIsFirstStep(isFirstStepValue)
    }, [isFirstStepValue, isLastStepValue, setIsFirstStep, setIsLastStep])

    const onClick = (index: number) => {
      if (activeStep > index && !isExecuting) setActiveStep(index)
    }

    return (
      <div
        ref={ref}
        className="flex items-start lg:items-center justify-between bg-zinc-50 rounded-lg p-3 w-full lg:sticky lg:top-20 lg:z-10 border border-zinc-200 flex-col lg:flex-row gap-5"
      >
        <Stepper>
          {stepperVcardData.map(({ id, Icon, label }, index) => {
            const isLastIndex = !!(index === stepperVcardData.length - 1)
            const isActive = index === activeStep

            return (
              <Stepper.Content
                key={id}
                onClick={() => onClick(index)}
                isExecuting={isExecuting}
              >
                <Stepper.Icon isActive={isActive}>
                  <Icon
                    className={cn(
                      "size-5 text-zinc-800 transition-all duration-300",
                      isActive && "text-white"
                    )}
                  />
                </Stepper.Icon>

                <Stepper.Label isActive={isActive}>{label}</Stepper.Label>

                {/* Not Render arrow icon for last Element  */}
                {!isLastIndex && (
                  <ChevronsRight
                    className={cn(
                      "size-4 text-zinc-800 transition-all duration-300 md:inline-block hidden",
                      isActive && "text-green-600"
                    )}
                  />
                )}
              </Stepper.Content>
            )
          })}
        </Stepper>
        <StepperNavigationButtons 
          isExecuting={isExecuting}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />
      </div>
    )
  }
)

StepperBar.displayName = "StepperBar"
