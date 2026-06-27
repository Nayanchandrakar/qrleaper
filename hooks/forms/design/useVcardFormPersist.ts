"use client"

import useFormPersist from "react-hook-form-persist"
import { useIsClient } from "usehooks-ts"

import type { formType } from "@/types/type"

export const useVcardFormPersist = (form: formType) => {
  const isClient = useIsClient()

  useFormPersist("vcard-form", {
    watch: isClient ? form.watch : () => {},
    setValue: isClient ? form.setValue : () => {},
    exclude: isClient ? ["images", "profileImage"] : undefined,
    storage: isClient ? window.localStorage : undefined
  })
}
