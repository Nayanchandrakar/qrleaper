"use client"

import { PaintBucket } from "lucide-react"
import { Dispatch, SetStateAction, useCallback } from "react"

import { cn } from "@/lib/utils"
import type { colorType } from "@/types/type"

interface ColorSelectButtonsProps {
  setColorFormType: Dispatch<SetStateAction<colorType>>
  colorFormType: colorType
}

const options: { type: colorType; label: string }[] = [
  { type: "single", label: "Single" },
  { type: "gradient", label: "Gradient" },
]

export const ColorSelectButtons = ({
  setColorFormType,
  colorFormType,
}: ColorSelectButtonsProps) => {
  const handleClick = useCallback(
    (type: colorType) => () => setColorFormType(type),
    [setColorFormType]
  )

  return (
    <div className="w-fit flex items-center gap-2">
      {options.map(({ type, label }) => (
        <button
          key={type}
          type="button"
          className={cn(
            "cursor-pointer py-2 px-4 transition-colors duration-200 rounded-lg flex items-center gap-2 text-sm",
            "hover:bg-green-100 hover:text-green-500 bg-zinc-100",
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
