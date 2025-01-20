"use client"

import { Button } from "@/components/ui/button"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"

interface StepperNavigationButtonProps {
  handlePrev: () => void
  handleNext: () => void
}

export const StepperNavigationButtons = ({
  handlePrev,
  handleNext,
}: StepperNavigationButtonProps) => {
  const { isLastStep, isFirstStep } = useStepper()

  return (
    <div className="mt-8 flex justify-between">
      <Button
        variant="primary"
        type="button"
        onClick={handlePrev}
        disabled={isFirstStep}
      >
        Prev
      </Button>
      <Button
        variant="primary"
        type="submit"
        onClick={handleNext}
        disabled={isLastStep}
      >
        Next
      </Button>
    </div>
  )
}
