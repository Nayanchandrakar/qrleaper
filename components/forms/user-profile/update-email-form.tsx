"use client"

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
import { PasswordInput } from "@/components/ui/password-input"

import { Input } from "@/components/ui/input"
import {
  emailChangeSchema,
  emailChangeSchemaType,
} from "@/zod/auth/email-change-schema"
import { useEmailChangeContext } from "@/hooks/auth/useEmailChangeContext"
import { updateEmailAction } from "@/app/actions/user-profile/update-email-action"

const UpdateEmailForm = () => {
  const { setNewEmail, setStep } = useEmailChangeContext((state) => ({
    setNewEmail: state.setNewEmail,
    setStep: state.setStep,
  }))

  const form = useForm<emailChangeSchemaType>({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      currentPassword: "",
      newEmail: "",
    },
  })

  const { executeAsync, isExecuting } = useAction(updateEmailAction, {
    onSuccess() {
      const newEmail = form.getValues("newEmail")
      setNewEmail(newEmail)
      setStep("verification")
      toast.success(
        `We've sent you an verification email to ${newEmail} to change your email account.`
      )
    },
    onError({ error }) {
      toast.error(error.serverError)
    },
  })

  const onSubmit = (formData: emailChangeSchemaType) => {
    executeAsync(formData)
  }

  const isDisabled = !!(
    form.getValues("currentPassword")?.length <= 0 || isExecuting
  )

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="rounded-lg border border-gray-200"
      >
        <div className="pt-5 px-5 sm:pt-10 sm:px-10">
          <div className="flex flex-col space-y-3 ">
            <h2 className="text-xl font-medium">Your Email</h2>
            <p className="text-sm text-gray-500">
              This will be the email you use to log in to QR Leaper and receive
              notifications.
            </p>
          </div>

          <div className="flex flex-col  sm:flex-row items-center justify-between gap-4 my-6">
            <FormField
              control={form.control}
              name="currentPassword"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem className="max-w-sm w-full">
                  <FormLabel>Current Password</FormLabel>
                  <FormControl>
                    <PasswordInput
                      className="bg-white"
                      placeholder="Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newEmail"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem className="max-w-sm w-full">
                  <FormLabel>New Email</FormLabel>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Your New Email"
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
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            {isExecuting && <Loader className="size-5 mr-1 animate-spin" />}
            {isExecuting ? "Submitting..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { UpdateEmailForm }
