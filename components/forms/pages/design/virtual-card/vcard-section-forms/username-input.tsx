"use client"
import { useEffect } from "react"
import { Loader } from "lucide-react"
import { useDebounceValue } from "usehooks-ts"
import { useFormContext } from "react-hook-form"
import { useAction } from "next-safe-action/hooks"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import type { userNameInputType } from "@/types/type"
import { validateInput, validInputClassName } from "@/utils/username-valid"
import { checkVCardUserNameAction } from "@/app/actions/utils/pages/vcard/check-username-action"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

interface UserNameInputWithSuffixProps {
  isExecuting: boolean
  isEditForm?: boolean
}
export const UserNameInputWithSuffix = ({
  isExecuting,
  isEditForm = false,
}: UserNameInputWithSuffixProps) => {
  const { control, setError, getValues, clearErrors, getFieldState } =
    useFormContext()

  const userNameError = getFieldState("userName")?.error
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

  const { executeAsync, isExecuting: checkingUserName } = useAction(
    checkVCardUserNameAction,
    {
      onSuccess: ({ data }) => handleValidation(data!),
    }
  )
  const isUserNameAvailable = !!(
    !checkingUserName &&
    debouncedValue &&
    !userNameError?.message
  )

  useEffect(() => {
    if (debouncedValue && debouncedValue.length > 3) {
      executeAsync({ userName: debouncedValue })
    }
  }, [debouncedValue, executeAsync])

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
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
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="suffix"
          disabled={isExecuting}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Suffix</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Your Suffix (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <p
        className={cn(
          "text-sm font-medium text-gray-600",
          validInputClassName(
            !!userNameError,
            checkingUserName,
            isUserNameAvailable
          )
        )}
      >
        {checkingUserName ? (
          <span className="flex items-center gap-1">
            <Loader className="animate-spin size-3" /> checking username...
          </span>
        ) : (
          validateInput(userNameError?.message!, isUserNameAvailable)
        )}
      </p>
    </div>
  )
}
