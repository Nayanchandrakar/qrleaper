"use client"

import React from "react"
import { useFormContext } from "react-hook-form"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { ListComponent } from "@/components/global/list-component"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ColorInput } from "@/components/forms/pages/design/qr-style/color-form/single-color-form/color-input"

const options = [
  {
    id: 324234,
    value: "linear",
    label: "Linear",
  },
  { id: 3456367, value: "radial", label: "Radial" },
]

const GradientColorForm = () => {
  const { control, getValues, setValue } = useFormContext()

  const colors = getValues("style.colors")

  const onColorChange = (value: string, index: number) => {
    const colorValue = [...colors]
    colorValue[index] = value

    setValue("style.colors", colorValue, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  return (
    <div className="space-y-5">
      <FormField
        control={control}
        name="style.colorType"
        render={({ field }) => (
          <FormItem className="space-y-3">
            <FormLabel>Color Type</FormLabel>
            <FormControl>
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <ListComponent
                  data={options}
                  className="flex items-center space-x-3"
                  renderItem={({ id, label, value }) => (
                    <React.Fragment key={id}>
                      <RadioGroupItem value={value} id={value} />
                      <Label htmlFor={value}>{label}</Label>
                    </React.Fragment>
                  )}
                />
              </RadioGroup>
            </FormControl>
          </FormItem>
        )}
      />

      <div className="space-y-2">
        <FormLabel>Select Colors</FormLabel>

        <div className="flex items-center gap-2 ">
          <ColorInput
            color={colors[0]}
            onColorChange={(value) => onColorChange(value, 0)}
          />

          <ColorInput
            color={colors[1] ?? colors[0]}
            onColorChange={(value) => onColorChange(value, 1)}
          />
        </div>
      </div>

      <FormField
        control={control}
        name="style.rotation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rotation</FormLabel>
            <FormControl className="w-full max-w-sm">
              <Input
                type="number"
                min={0}
                max={180}
                placeholder="range:0-180"
                {...field}
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  )
}

export default GradientColorForm
