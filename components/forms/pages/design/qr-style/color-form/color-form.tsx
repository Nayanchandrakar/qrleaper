"use client"

import { useFormContext } from "react-hook-form"

import ColorCard from "@/components/cards/color-card"
import { ListComponent } from "@/components/global/list-component"
import { colorsList } from "@/constants/qr/colors"

interface ColorFormProps {}

export const ColorForm = ({}: ColorFormProps) => {
  const { getValues, setValue } = useFormContext()

  return (
    <ListComponent
      className="flex flex-wrap gap-3 "
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
  )
}
