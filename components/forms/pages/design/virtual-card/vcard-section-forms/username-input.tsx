"use client"

import { useEffect } from "react"
import { useDebounceValue } from "usehooks-ts"
import { useFormContext } from "react-hook-form"
import { useAction } from "next-safe-action/hooks"

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import type { userNameInputType } from "@/types/type"
import { checkVCardUserNameAction } from "@/app/actions/utils/pages/vcard/check-username-action"

interface UserNameInputProps {
  isExecuting: boolean
  isEditForm?: boolean
}
export const UserNameInput = ({
  isExecuting,
  isEditForm = false,
}: UserNameInputProps) => {
  const { control, setError, getValues, clearErrors } = useFormContext()

  const defaultUserName = getValues("userName") as string
  const [debouncedValue, setValue] = useDebounceValue(defaultUserName, 500)

  const handleError = (message?: string) => {
    if (!message) {
      clearErrors("userName")
      return
    }

    setError("userName", { message, type: "validate" }, { shouldFocus: true })
  }

  const handleValidation = (data: userNameInputType) => {
    if (isEditForm) {
      if (!data.result) {
        handleError()
        return
      }

      if (
        data.result === data.currentUserName &&
        data.result === defaultUserName
      ) {
        handleError()
        return
      }

      if (data.result) {
        handleError("username already in use.")
        return
      }
    } else {
      if (!data.result) {
        handleError()
        return
      }

      if (data.result === data.currentUserName && data.result) {
        handleError("username already in use.")
        return
      }

      handleError()
    }
  }

  const { executeAsync } = useAction(checkVCardUserNameAction, {
    onSuccess: ({ data }) => handleValidation(data!),
  })

  useEffect(() => {
    if (debouncedValue) executeAsync({ userName: debouncedValue })
  }, [debouncedValue, executeAsync])

  return (
    <FormField
      control={control}
      name="userName"
      disabled={isExecuting}
      render={({ field }) => (
        <FormItem className="w-full">
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input
              type="text"
              placeholder="Your Unique username"
              {...field}
              onChange={(e) => {
                field.onChange(e)
                setValue(e.target.value)
              }}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
