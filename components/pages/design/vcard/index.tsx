"use client"

import React from "react"

import { Step } from "@/components/ui/step"
import { Button } from "@/components/ui/button"
import { Stepper } from "@/components/ui/stepper"
import { stepperIcons } from "@/constants/pages/design/vcard/stepper-data"

export function VcardCreateStepperForm() {
  const [activeStep, setActiveStep] = React.useState(0)
  const [isLastStep, setIsLastStep] = React.useState(false)
  const [isFirstStep, setIsFirstStep] = React.useState(false)

  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1)
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1)

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
