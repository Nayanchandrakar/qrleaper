"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { Loader } from "lucide-react"
import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  verifyEmailChangeSchema,
  verifyEmailChangeSchemaType,
} from "@/zod/auth/email-change-schema"
import { useEmailChangeContext } from "@/hooks/auth/useEmailChangeContext"
import { verifyEmailChange } from "@/app/actions/user-profile/verify-email-change-action"

interface VerifyEmailChangeFormFormProps {}

export const VerifyEmailChangeForm = ({}: VerifyEmailChangeFormFormProps) => {
  const { update } = useSession()

  const { newEmail, setStep } = useEmailChangeContext((state) => ({
    newEmail: state.newEmail,
    setStep: state.setStep,
  }))

  if (!newEmail) {
    return null
  }

  const form = useForm<verifyEmailChangeSchemaType>({
    resolver: zodResolver(verifyEmailChangeSchema),
    defaultValues: {
      token: "",
      newEmail,
    },
  })

  const { executeAsync, isExecuting } = useAction(verifyEmailChange, {
    onSuccess() {
      update()
      setStep("input")
      toast.success(`Successfully updated email address!`)
    },
    onError({ error }) {
      toast.error(error.serverError)
    },
  })

  const onSubmit = (formData: verifyEmailChangeSchemaType) => {
    executeAsync(formData)
  }

  const isDisabled = !!(form.getValues("token")?.length <= 0 || isExecuting)

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border border-gray-200"
      >
        <div className="pt-5 px-5 sm:pt-10 sm:px-10">
          <div className="flex flex-col space-y-3 ">
            <h2 className="text-xl font-medium">Verify Your Email</h2>
            <p className="text-sm text-gray-500">
              This will be the email you use to log in to QR Leaper and receive
              notifications.
            </p>
          </div>

          <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 my-6">
            <input
              id="newEmail"
              name="newEmail"
              value={newEmail}
              {...form.register}
              required
              type="hidden"
            />

            <FormField
              control={form.control}
              name="token"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem className="max-w-sm w-full">
                  <FormLabel>Your Otp</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Your Code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border-t border-gray-200 flex items-center gap-5 sm:gap-4 sm:flex-row flex-col justify-end bg-gray-50 py-4 px-5 sm:px-10">
          <Button
            disabled={isDisabled}
            type="submit"
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            {isExecuting && <Loader className="size-5 mr-1 animate-spin" />}
            {isExecuting ? "Submitting..." : "Continue"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
