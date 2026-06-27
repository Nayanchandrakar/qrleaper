"use client"

import useFormPersist from "react-hook-form-persist"
import { useIsClient } from "usehooks-ts"

import type { formType } from "@/types/type"

export const useDesignFormPersist = (form: formType) => {
  const isClient = useIsClient()

  useFormPersist("design-form", {
    watch: isClient ? form.watch : () => {},
    setValue: isClient ? form.setValue : () => {},
    storage: isClient ? window.localStorage : undefined
  })
}
