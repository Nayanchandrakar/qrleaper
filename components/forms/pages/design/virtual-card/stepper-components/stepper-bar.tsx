"use client"

import { forwardRef } from "react"
import { Step } from "@/components/ui/step"
import { Stepper } from "@/components/ui/stepper"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { stepperVcardData } from "@/constants/pages/design/vcard/stepper-data"

interface StepperBarProps {
  isExecuting: boolean
}

export const StepperBar = forwardRef<HTMLDivElement, StepperBarProps>(
  ({ isExecuting }, ref) => {
    const { activeStep, setIsFirstStep, setIsLastStep, setActiveStep } =
      useStepper()

    const onClick = (index: number) => {
      if (activeStep > index && !isExecuting) setActiveStep(index)
    }

    return (
      <div ref={ref} className="flex items-center justify-center">
        <Stepper
          activeStep={activeStep}
          isLastStep={(value) => setIsLastStep(value)}
          isFirstStep={(value) => setIsFirstStep(value)}
          className="sm:w-[90%]"
        >
          {stepperVcardData?.map(({ Icon, id, index, label }) => (
            <Step key={id} onClick={() => onClick(index)}>
              <Icon className="size-5" />
              <div className="sm:inline-block hidden absolute w-max top-[3rem]">
                <p className="text-sm font-medium text-zinc-700 text-center">
                  {label}
                </p>
              </div>
            </Step>
          ))}
        </Stepper>
      </div>
    )
  }
)

StepperBar.displayName = "StepperBar"
