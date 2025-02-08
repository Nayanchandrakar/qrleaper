"use client"

import { Loader } from "lucide-react"
import { useCallback } from "react"
import { useFormContext } from "react-hook-form"

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
  const { reset } = useFormContext()
  const {
    isLastStep,
    isFirstStep,
    setActiveStep,
    setIsFirstStep,
    setIsLastStep,
  } = useStepper()

  const handleReset = useCallback(() => {
    setActiveStep(0)
    setIsFirstStep(false)
    setIsLastStep(false)
    reset()
  }, [reset, setActiveStep, setIsFirstStep, setIsLastStep])

  return (
    <div className="mt-8 flex justify-end gap-4 sm:flex-row flex-col">
      <Button
        type="button"
        variant="destructive"
        disabled={isExecuting}
        onClick={handleReset}
      >
        Reset Form
      </Button>

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
        disabled={isExecuting}
      >
        {isExecuting && isLastStep && (
          <Loader className="animate-spin size-4" />
        )}
        Continue
      </Button>
    </div>
  )
}
