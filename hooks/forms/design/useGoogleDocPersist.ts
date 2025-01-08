"use client"

import { useIsClient } from "usehooks-ts"
import useFormPersist from "react-hook-form-persist"

import { formType } from "@/types/type"

export const useGoogleDocPersist = (form: formType) => {
  const isClient = useIsClient()

  useFormPersist("google-doc-form", {
    watch: isClient ? form.watch : () => {},
    setValue: isClient ? form.setValue : () => {},
    storage: isClient ? window.localStorage : undefined,
  })
}
