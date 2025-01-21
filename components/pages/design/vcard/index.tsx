"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { MouseEventType } from "@/types/event-types"
import { VcarStepperFieldNameType } from "@/types/type"

import {
  virtualCardFormSchema,
  virtualCardFormSchemaType,
} from "@/zod/forms/vcard/virtual-card-form-schema"

import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { StepperBar } from "@/components/pages/design/vcard/stepper-bar"
import { stepperVcardData } from "@/constants/pages/design/vcard/stepper-data"
import { useVcardCreateHandler } from "@/handlers/pages/design/vcard/useVcardCreateHandler"
import { vcardCreateDefaultValues } from "@/constants/global/vcard-create-form-default-values"
import { StepperNavigationButtons } from "@/components/buttons/pages/vcard/vcard-stepper-pre-buttons"
import { useVcardFormPersist } from "@/hooks/forms/design/useVcardFormPersist"

export function VcardCreateStepperForm() {
  const { activeStep, isFirstStep, isLastStep, onNext, onPrev } = useStepper()

  const form = useForm<virtualCardFormSchemaType>({
    resolver: zodResolver(virtualCardFormSchema),
    defaultValues: vcardCreateDefaultValues,
    mode: "onChange",
  })

  useVcardFormPersist(form)

  const { onSubmit, isExecuting } = useVcardCreateHandler({ reset: form.reset })
  const currentStep = stepperVcardData.find((e) => e.index === activeStep)!
  const StepperComponent = currentStep?.Component

  const handleNext = async (event: MouseEventType) => {
    const isSuccess = await form.trigger(
      currentStep.fields as VcarStepperFieldNameType[],
      { shouldFocus: true }
    )

    if (isSuccess && isLastStep) form.handleSubmit(onSubmit)(event)
    if (isSuccess && !isLastStep) onNext()
  }

  const handlePrev = () => !isFirstStep && onPrev()

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepperBar />

        <div className="my-12">
          <StepperComponent />
        </div>

        <StepperNavigationButtons
          handleNext={handleNext}
          handlePrev={handlePrev}
          isExecuting={isExecuting}
        />
      </form>
    </FormProvider>
  )
}
