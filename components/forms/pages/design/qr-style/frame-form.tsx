"use client"
import { useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export const FrameForm = () => {
  const { getValues, setValue } = useFormContext()
  const { style } = getValues()

  const handleChange = (key: string, value: boolean | string) => {
    setValue(key, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true
    })
  }

  return (
    <div>
      <span className="flex items-center gap-3 text-sm">
        Enable frame
        <Switch
          checked={style.hasFrame}
          onCheckedChange={(value) => handleChange("style.hasFrame", value)}
        />
      </span>
      {style.hasFrame && (
        <div className="mt-4 flex flex-col items-center gap-3 sm:flex-row">
          <Input
            value={style.topInput}
            onChange={(e) => handleChange("style.topInput", e?.target?.value)}
            placeholder="top text"
            maxLength={30}
          />
          <Input
            value={style.bottomInput}
            onChange={(e) =>
              handleChange("style.bottomInput", e?.target?.value)
            }
            maxLength={30}
            placeholder="bottom text"
          />
        </div>
      )}
    </div>
  )
}
