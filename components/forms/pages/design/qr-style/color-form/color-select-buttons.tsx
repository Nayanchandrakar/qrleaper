"use client"

import { PaintBucket } from "lucide-react"
import { type Dispatch, type SetStateAction, useCallback } from "react"

import { cn } from "@/lib/utils"
import type { colorSelectType } from "@/types/type"

interface ColorSelectButtonsProps {
  setColorFormType: Dispatch<SetStateAction<colorSelectType>>
  colorFormType: colorSelectType
}

const options: { type: colorSelectType; label: string }[] = [
  { type: "single", label: "Single" },
  { type: "gradient", label: "Gradient" }
]

export const ColorSelectButtons = ({
  setColorFormType,
  colorFormType
}: ColorSelectButtonsProps) => {
  const handleClick = useCallback(
    (type: colorSelectType) => () => setColorFormType(type),
    [setColorFormType]
  )

  return (
    <div className="flex w-fit items-center gap-2">
      {options.map(({ type, label }) => (
        <button
          key={type}
          type="button"
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 text-sm transition-colors duration-200",
            "bg-zinc-100 hover:bg-green-100 hover:text-green-500",
            colorFormType === type && "bg-green-100 text-green-500"
          )}
          onClick={handleClick(type)}
        >
          {label}
          <PaintBucket className="size-5" />
        </button>
      ))}
    </div>
  )
}
