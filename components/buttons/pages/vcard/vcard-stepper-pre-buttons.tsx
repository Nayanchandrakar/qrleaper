"use client"

import { Loader, RotateCcw } from "lucide-react"
import { useCallback } from "react"
import { useFormContext } from "react-hook-form"

import { Button } from "@/components/ui/button"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { cn } from "@/lib/utils"
import type { MouseEventType } from "@/types/event-types"

interface StepperNavigationButtonProps {
  handlePrev: () => void
  handleNext: (event: MouseEventType) => void
  isExecuting: boolean
  className?: string
}

export const StepperNavigationButtons = ({
  handlePrev,
  handleNext,
  isExecuting,
  className
}: StepperNavigationButtonProps) => {
  const { reset } = useFormContext()
  const {
    isLastStep,
    isFirstStep,
    setActiveStep,
    setIsFirstStep,
    setIsLastStep
  } = useStepper()

  const handleReset = useCallback(() => {
    setActiveStep(0)
    setIsFirstStep(true)
    setIsLastStep(false)
    reset()
  }, [reset, setActiveStep, setIsFirstStep, setIsLastStep])

  return (
    <div
      className={cn(
        "flex w-full flex-col gap-4 min-[505px]:flex-row lg:justify-end",
        className
      )}
    >
      <Button
        type="button"
        disabled={isExecuting}
        onClick={handleReset}
        className="items-center justify-center bg-zinc-100 text-accent-foreground hover:bg-zinc-100/80"
      >
        <RotateCcw className="size-4" />
        Reset Information
      </Button>

      <Button
        type="button"
        onClick={handlePrev}
        disabled={isFirstStep || isExecuting}
        className="bg-zinc-100 text-accent-foreground hover:bg-zinc-100/80"
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
          <Loader className="size-4 animate-spin" />
        )}
        Continue
      </Button>
    </div>
  )
}
