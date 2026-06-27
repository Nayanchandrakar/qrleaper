"use client"

import useFormPersist from "react-hook-form-persist"
import { useIsClient } from "usehooks-ts"

import type { formType } from "@/types/type"

export const useYoutubeFormPersist = (form: formType) => {
  const isClient = useIsClient()

  useFormPersist("youtube-form", {
    watch: isClient ? form.watch : () => {},
    setValue: isClient ? form.setValue : () => {},
    storage: isClient ? window.localStorage : undefined
  })
}
