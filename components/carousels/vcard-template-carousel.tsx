"use client"

import { useFormContext } from "react-hook-form"

import {
  Carousel,
  CarouselContent,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { TemplateSelectCard } from "@/components/cards/pages/design/vcard/template-card"
import { templateCarouselData } from "@/constants/pages/design/vcard/template-carousel-data"

export const VcardTemplateCarousel = () => {
  const { setValue, getValues } = useFormContext()
  const currentTemplateId = getValues("templateId")

  return (
    <Carousel opts={{ align: "center" }}>
      <CarouselContent className="my-3 mx-1 gap-2">
        {templateCarouselData?.map(({ id, image, templateId }) => (
          <TemplateSelectCard
            key={id}
            imageSrc={image}
            className={
              currentTemplateId === templateId
                ? "border-green-600"
                : "hover:border-green-600"
            }
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
  )
}
