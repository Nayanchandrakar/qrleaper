"use client"

import { HexColorInput, HexColorPicker } from "react-colorful"
import { PopOverComponent } from "@/components/ui/popover-content"

interface ColorInputProps {
  onColorChange: (value: string) => void
  color: string
}

export const ColorInput = ({ color, onColorChange }: ColorInputProps) => {
  return (
    <div className="relative flex h-9 w-full sm:max-w-40 flex-shrink-0 rounded-md shadow-sm">
      <PopOverComponent
        content={
          <div className="flex max-w-xs flex-col items-center space-y-3 p-5 text-center">
            <HexColorPicker color={color} onChange={onColorChange} />
          </div>
        }
      >
        <div
          className="h-full w-12 rounded-l-md border"
          style={{
            backgroundColor: color,
            borderColor: color,
          }}
        />
      </PopOverComponent>
      <HexColorInput
        id="color"
        name="color"
        color={color}
        onChange={onColorChange}
        prefixed
        style={{ borderColor: color }}
        className="block w-full rounded-r-md border-2 border-l-0 pl-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-black sm:text-sm"
      />
    </div>
  )
}
