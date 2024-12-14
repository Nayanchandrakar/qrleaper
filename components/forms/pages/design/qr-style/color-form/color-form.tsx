"use client"

import { useFormContext } from "react-hook-form"

import { colorsList } from "@/constants/qr/colors"
import ColorCard from "@/components/cards/color-card"
import { ListComponent } from "@/components/global/list-component"
import { ColorInput } from "@/components/forms/pages/design/qr-style/color-form/color-input"

export const ColorForm = () => {
  const { getValues, setValue } = useFormContext()

  return (
    <div className="flex flex-col items-start gap-3">
      <ColorInput />

      <ListComponent
        className="flex flex-wrap gap-3 mt-2"
        data={colorsList}
        renderItem={(color) => (
          <ColorCard
            color={color}
            key={color}
            currentColor={getValues("style.color")}
            onClick={() => {
              setValue("style.color", color, {
                shouldDirty: true,
                shouldTouch: true,
                shouldValidate: true,
              })
            }}
          />
        )}
      />
    </div>
  )
}
