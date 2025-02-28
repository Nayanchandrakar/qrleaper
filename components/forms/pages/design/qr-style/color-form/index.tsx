"use client"

import { useState } from "react"
import { useFormContext } from "react-hook-form"

import type { colorType } from "@/types/type"
import { ColorSelectButtons } from "./color-select-buttons"
import { SingleColorForm, GradientColorForm } from "@/components/dynamic"

export const ColorForm = () => {
  const { getValues } = useFormContext()
  const colors = getValues("style.colors")

  const [colorFormType, setColorFormType] = useState<colorType>(
    colors?.length > 1 ? "gradient" : "single"
  )

  const Component =
    colorFormType === "gradient" ? GradientColorForm : SingleColorForm

  return (
    <div className="flex flex-col gap-2">
      <ColorSelectButtons
        colorFormType={colorFormType}
        setColorFormType={setColorFormType}
      />

      <div className="mt-3">
        <Component />
      </div>
    </div>
  )
}
