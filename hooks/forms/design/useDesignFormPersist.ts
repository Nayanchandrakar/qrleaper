"use client"

import { useIsClient } from "usehooks-ts"
import useFormPersist from "react-hook-form-persist"

import { formType } from "@/types/type"

export const useDesignFormPersist = (form: formType) => {
  const isClient = useIsClient()

  useFormPersist("design-form", {
    watch: isClient ? form.watch : () => {},
    setValue: isClient ? form.setValue : () => {},
  })
}
