"use client"
import { useFormContext } from "react-hook-form"

import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"

export const FrameForm = () => {
  const { getValues, setValue } = useFormContext()

  const handleChange = (key: string, value: boolean | string) => {
    setValue(key, value, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const checked = getValues("style.hasFrame")
  const topText = getValues("style.topInput")
  const bottomText = getValues("style.bottomInput")

  return (
    <div>
      <span className="text-sm flex items-center gap-3 ">
        has a frame ?
        <Switch
          checked={checked}
          onCheckedChange={(value) => handleChange("style.hasFrame", value)}
        />
      </span>
      {checked && (
        <div className="flex items-center gap-3 mt-4">
          <Input
            value={topText}
            onChange={(e) => handleChange("style.topInput", e?.target?.value)}
            placeholder="top text"
            maxLength={30}
          />
          <Input
            value={bottomText}
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
