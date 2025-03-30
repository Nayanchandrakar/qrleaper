"use client"

import { Loader, RotateCcw } from "lucide-react"
import { useCallback } from "react"
import { useFormContext } from "react-hook-form"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import type { MouseEventType } from "@/types/event-types"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"

interface StepperNavigationButtonProps {
  handlePrev: () => void
  handleNext: (event: MouseEventType) => void
  isExecuting: boolean
  className?:string;
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
    setIsLastStep,
  } = useStepper()

  const handleReset = useCallback(() => {
    setActiveStep(0)
    setIsFirstStep(true)
    setIsLastStep(false)
    reset()
  }, [reset, setActiveStep, setIsFirstStep, setIsLastStep])

  return (
    <div className={cn("flex gap-4 flex-col lg:justify-end min-[505px]:flex-row w-full" , className)}>
      <Button
        type="button"
        disabled={isExecuting}
        onClick={handleReset}
        className="bg-zinc-100 hover:bg-zinc-100/80 text-accent-foreground items-center justify-center"
      >
        <RotateCcw className="size-4" />
        Reset Information
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
