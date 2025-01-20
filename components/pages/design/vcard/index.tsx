"use client"

import React from "react"

import { Step } from "@/components/ui/step"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import {
  stepperIcons,
  stepperComponents,
} from "@/constants/pages/design/vcard/stepper-data"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"

export function VcardCreateStepperForm() {
  const {
    activeStep,
    isFirstStep,
    isLastStep,
    onNext,
    onPrev,
    setActiveStep,
    setIsFirstStep,
    setIsLastStep,
  } = useStepper()

  const handleNext = () => !isLastStep && onNext()
  const handlePrev = () => !isFirstStep && onPrev()

  const StepperComponent = stepperComponents.find((e) => e.index === activeStep)
    ?.Component!

  return (
    <div className="w-full">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        {stepperIcons.map(({ Icon, id }, index) => (
          <Step key={id} onClick={() => setActiveStep(index)}>
            <Icon className="size-5" />
          </Step>
        ))}
      </Stepper>

      <StepperComponent />

      <div className="mt-8 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div>
    </div>
  )
}
