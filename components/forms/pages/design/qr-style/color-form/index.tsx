"use client"

import { useEffect, useMemo, useState } from "react"
import { useFormContext } from "react-hook-form"

import { GradientColorForm, SingleColorForm } from "@/components/dynamic"
import type { colorSelectType } from "@/types/type"

import { ColorSelectButtons } from "./color-select-buttons"

export const ColorForm = () => {
  const { watch } = useFormContext()
  const colors = watch("style.colors")

  const defaultFormType = useMemo(
    () => (colors?.length > 1 ? "gradient" : "single"),
    [colors]
  )

  const [colorFormType, setColorFormType] =
    useState<colorSelectType>(defaultFormType)

  useEffect(() => {
    setColorFormType(defaultFormType)
  }, [defaultFormType])

  return (
    <div className="flex flex-col gap-2">
      <ColorSelectButtons
        colorFormType={colorFormType}
        setColorFormType={setColorFormType}
      />

      <div className="mt-3">
        {colorFormType === "gradient" ? (
          <GradientColorForm />
        ) : (
          <SingleColorForm />
        )}
      </div>
    </div>
  )
}
