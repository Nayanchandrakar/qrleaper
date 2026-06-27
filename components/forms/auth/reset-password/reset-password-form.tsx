"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { resetPasswordAction } from "@/app/actions/auth/reset-password-action"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from "@/components/ui/form"
import { PasswordInput } from "@/components/ui/password-input"
import {
  resetPasswordSchema,
  type resetPasswordSchemaType
} from "@/zod/auth/reset-password-schema"

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter()

  const form = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: ""
    }
  })

  const { executeAsync, isExecuting } = useAction(resetPasswordAction, {
    async onSuccess() {
      toast.success(
        "Your password has been reset. You can now log in with your new password."
      )
      router.replace("/login")
    },
    onError({ error }) {
      toast.error(error.serverError)
    }
  })

  const onSubmit = (formData: resetPasswordSchemaType) => executeAsync(formData)

  return (
    <Card className="w-full max-w-[460px] overflow-hidden border border-gray-200 sm:rounded-2xl">
      <CardHeader className="border-b border-gray-200 p-0 py-7 text-center">
        <CardTitle className="text-lg font-semibold">
          Reset your password
        </CardTitle>
        <CardDescription>Enter new password for your account.</CardDescription>
      </CardHeader>
      <CardContent className="bg-gray-50 px-4 pt-8 sm:px-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <input value={token} {...form.register("token")} type="hidden" />
            <FormField
              control={form.control}
              name="password"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
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
              name="confirmPassword"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <PasswordInput
                      className="bg-white"
                      placeholder="Confirm Password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isExecuting} className="w-full" type="submit">
              {isExecuting && <Loader className="size-5 animate-spin" />}
              {isExecuting ? "Submitting.." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export { ResetPasswordForm }
