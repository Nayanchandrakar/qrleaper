"use client"

import React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

import { Step } from "@/components/ui/step"
import { Stepper } from "@/components/ui/stepper"
import {
  stepperIcons,
  stepperComponents,
} from "@/constants/pages/design/vcard/stepper-data"
import {
  virtualCardFormSchema,
  virtualCardFormSchemaType,
} from "@/zod/forms/vcard/virtual-card-form-schema"
import { colorsList } from "@/constants/qr/colors"
import { useStepper } from "@/hooks/pages/design/vcard/useStepper"
import { templateCarouselData } from "@/constants/pages/design/vcard/template-carousel-data"
import { StepperNavigationButtons } from "@/components/buttons/pages/vcard/vcard-stepper-pre-buttons"

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

  const form = useForm<virtualCardFormSchemaType>({
    resolver: zodResolver(virtualCardFormSchema),
    defaultValues: {
      title: "",
      firstName: "",
      lastName: "",
      templateId: templateCarouselData[0].templateId,
      style: {
        bottomInput: "",
        image: "",
        topInput: "",
        color: colorsList[0],
        hasFrame: false,
        shape: "square",
      },
    },
  })

  return (
    <FormProvider {...form}>
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

      {/* Component  */}
      <StepperComponent />

      {/* Stepper Navigation Buttons  */}
      <StepperNavigationButtons
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
    </FormProvider>
  )
}
