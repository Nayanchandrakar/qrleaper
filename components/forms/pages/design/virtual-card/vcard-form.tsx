"use client"

import React from "react"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import type { MouseEventType } from "@/types/event-types"
import type { VcarStepperFieldNameType } from "@/types/type"

import {
  virtualCardFormSchema,
  virtualCardFormSchemaType,
} from "@/zod/forms/vcard/virtual-card-form-schema"

import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { useVcardFormPersist } from "@/hooks/forms/design/useVcardFormPersist"
import { stepperVcardData } from "@/constants/pages/design/vcard/stepper-data"
import { useVcardCreateHandler } from "@/handlers/pages/design/vcard/useVcardCreateHandler"
import { vcardCreateDefaultValues } from "@/constants/global/vcard-create-form-default-values"
import { StepperNavigationButtons } from "@/components/buttons/pages/vcard/vcard-stepper-pre-buttons"
import { StepperBar } from "@/components/forms/pages/design/virtual-card/stepper-components/stepper-bar"

export function VCardForm() {
  const { activeStep, isFirstStep, isLastStep, onNext, onPrev } = useStepper()

  const form = useForm<virtualCardFormSchemaType>({
    resolver: zodResolver(virtualCardFormSchema),
    defaultValues: vcardCreateDefaultValues,
    mode: "onChange",
  })

  useVcardFormPersist(form)

  const { onSubmit, isExecuting, throwFormErrors } = useVcardCreateHandler({
    form,
  })

  const currentStep = stepperVcardData.find((e) => e.index === activeStep)!
  const userNameInputError = form?.formState?.errors?.userName
  const StepperComponent = currentStep?.Component

  const handleNext = async (event: MouseEventType) => {
    if (activeStep === 1 && userNameInputError) {
      toast.error(userNameInputError?.message)
      return
    }

    const isSuccess = await form.trigger(
      currentStep.fields as VcarStepperFieldNameType[],
      { shouldFocus: true }
    )

    if (!isSuccess) {
      throwFormErrors()
      return
    }

    if (isLastStep) form.handleSubmit(onSubmit)(event)
    if (!isLastStep) onNext()
  }

  const handlePrev = () => !isFirstStep && onPrev()

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <StepperBar isExecuting={isExecuting} />

        <div className="mb-12 mt-20">
          {StepperComponent && <StepperComponent isExecuting={isExecuting} />}
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
