"use client"

import { useFormContext } from "react-hook-form"

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TemplateSelectCard } from "@/components/cards/pages/design/vcard/template-card"
import { templateCarouselData } from "@/constants/pages/design/vcard/template-carousel-data"
import { VcardTemplatePreview } from "@/components/cards/pages/design/vcard/vcard-template-preview"

// Dynamic Component
const TemplateComponentDynamic = () => {
  const { setValue, getValues } = useFormContext()
  const currentTemplateId = getValues("templateId")

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[60%_40%] gap-8">
      <div className="flex items-start flex-col">
        <CardHeader className="p-0 pb-3">
          <CardTitle className="font-semibold text-lg tracking-tight">
            Choose Template
          </CardTitle>
          <CardDescription>
            Select from the pre-designed templates below to create your
            customized Vcard QR Code.
          </CardDescription>
        </CardHeader>

        <Carousel className="w-full" opts={{ align: "center" }}>
          <CarouselContent className="my-3 mx-1 gap-2">
            {templateCarouselData?.map(({ id, image, templateId }) => (
              <TemplateSelectCard
                key={id}
                imageSrc={image}
                className={`h-full ${
                  currentTemplateId === templateId
                    ? "border-green-600"
                    : "hover:border-green-600"
                }`}
                onClick={() => {
                  setValue("templateId", templateId, {
                    shouldDirty: true,
                    shouldTouch: true,
                    shouldValidate: true,
                  })
                }}
              />
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0" />
          <CarouselNext className="absolute right-0" />
        </Carousel>
      </div>

      <VcardTemplatePreview />
    </div>
  )
}

export default TemplateComponentDynamic
