"use client"

import { useFormContext } from "react-hook-form"

import { ListComponent } from "@/components/global/list-component"
import { shapeData } from "@/constants/qr/shape"
import { cn } from "@/lib/utils"

export const ShapeForm = () => {
  const { getValues, setValue } = useFormContext()

  return (
    <ListComponent
      data={shapeData}
      className="flex items-center gap-3"
      renderItem={({ Icon, id, label, value }) => (
        <button
          key={id}
          type="button"
          className={cn(
            "cursor-pointer py-2 px-4  transition-colors duration-200 hover:bg-green-100 rounded-lg flex items-center gap-2 text-sm hover:text-green-500",
            value === getValues("style.shape") && "bg-green-100 text-green-500"
          )}
          onClick={() =>
            setValue("style.shape", value, {
              shouldDirty: true,
              shouldTouch: true,
              shouldValidate: true,
            })
          }
        >
          {label}
          <Icon className="size-5 " />
        </button>
      )}
    />
  )
}
