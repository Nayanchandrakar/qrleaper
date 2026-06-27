"use client"

import { useFormContext } from "react-hook-form"

import ColorCard from "@/components/cards/color-card"
import { ColorInput } from "@/components/forms/pages/design/qr-style/color-form/single-color-form/color-input"
import { ListComponent } from "@/components/global/list-component"
import { colorsList } from "@/constants/qr/colors"

const SingleColorForm = () => {
  const { getValues, setValue } = useFormContext()

  const defaultColor = getValues("style.colors")?.[0]

  const onColorChange = (value: string) => {
    setValue("style.colors", [value], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <ColorInput color={defaultColor} onColorChange={onColorChange} />

      <ListComponent
        className="mt-2 flex flex-wrap gap-3"
        data={colorsList}
        renderItem={(color) => (
          <ColorCard
            color={color}
            key={color}
            currentColor={defaultColor}
            onClick={() => onColorChange(color)}
          />
        )}
      />
    </div>
  )
}

export default SingleColorForm
