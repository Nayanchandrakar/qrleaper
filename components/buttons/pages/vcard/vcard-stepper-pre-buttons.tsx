"use client"

import { Button } from "@/components/ui/button"
import type { MouseEventType } from "@/types/event-types"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"

interface StepperNavigationButtonProps {
  handlePrev: () => void
  handleNext: (event: MouseEventType) => void
  isExecuting: boolean
}

export const StepperNavigationButtons = ({
  handlePrev,
  handleNext,
  isExecuting,
}: StepperNavigationButtonProps) => {
  const { isLastStep, isFirstStep } = useStepper()

  return (
    <div className="mt-8 flex justify-end gap-4">
      <Button
        type="button"
        onClick={handlePrev}
        disabled={isFirstStep || isExecuting}
        className="bg-zinc-100 hover:bg-zinc-100/80 text-accent-foreground"
      >
        Back
      </Button>
      <Button
        variant="primary"
        type="button"
        onClick={handleNext}
        disabled={isLastStep || isExecuting}
      >
        Continue
      </Button>
    </div>
  )
}
