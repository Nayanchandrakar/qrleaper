"use client"

import { Step } from "@/components/ui/step"
import { Stepper } from "@/components/ui/stepper"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { stepperVcardData } from "@/constants/pages/design/vcard/stepper-data"

export const StepperBar = () => {
  const { activeStep, setIsFirstStep, setIsLastStep, setActiveStep } =
    useStepper()

  return (
    <Stepper
      activeStep={activeStep}
      isLastStep={(value) => setIsLastStep(value)}
      isFirstStep={(value) => setIsFirstStep(value)}
    >
      {stepperVcardData?.map(({ Icon, id, index }) => (
        <Step key={id} onClick={() => setActiveStep(index)}>
          <Icon className="size-5" />
        </Step>
      ))}
    </Stepper>
  )
}
