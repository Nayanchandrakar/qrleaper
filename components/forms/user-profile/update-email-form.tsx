"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { updateEmailAction } from "@/app/actions/user-profile/update-email-action"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { useEmailChangeContext } from "@/hooks/auth/useEmailChangeContext"
import {
  emailChangeSchema,
  type emailChangeSchemaType
} from "@/zod/auth/email-change-schema"

const UpdateEmailForm = () => {
  const { setNewEmail, setStep } = useEmailChangeContext((state) => ({
    setNewEmail: state.setNewEmail,
    setStep: state.setStep
  }))

  const form = useForm<emailChangeSchemaType>({
    resolver: zodResolver(emailChangeSchema),
    defaultValues: {
      currentPassword: "",
      newEmail: ""
    }
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
    }
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
        <div className="px-5 pt-5 sm:px-10 sm:pt-10">
          <div className="flex flex-col space-y-3">
            <h2 className="text-xl font-medium">Your Email</h2>
            <p className="text-sm text-gray-500">
              This will be the email you use to log in to QR Leaper and receive
              notifications.
            </p>
          </div>

          <div className="my-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <FormField
              control={form.control}
              name="currentPassword"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem className="w-full max-w-sm">
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
                <FormItem className="w-full max-w-sm">
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

        <div className="flex flex-col items-center justify-end gap-5 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:flex-row sm:gap-4 sm:px-10">
          <Button
            disabled={isDisabled}
            className="cursor-pointer disabled:cursor-not-allowed"
          >
            {isExecuting && <Loader className="mr-1 size-5 animate-spin" />}
            {isExecuting ? "Submitting..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export { UpdateEmailForm }
