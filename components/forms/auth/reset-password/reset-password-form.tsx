"use client"

import { useRouter } from "next/navigation"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { Loader } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"

import {
  resetPasswordSchema,
  type resetPasswordSchemaType,
} from "@/zod/auth/reset-password-schema"
import { resetPasswordAction } from "@/app/actions/auth/reset-password-action"

const ResetPasswordForm = ({ token }: { token: string }) => {
  const router = useRouter()

  const form = useForm<resetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      token,
      password: "",
      confirmPassword: "",
    },
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
    },
  })

  const onSubmit = (formData: resetPasswordSchemaType) => executeAsync(formData)

  return (
    <Card className="sm:rounded-2xl border border-gray-200 w-full max-w-[460px] overflow-hidden">
      <CardHeader className="text-center p-0 py-7 border-b  border-gray-200">
        <CardTitle className="text-lg font-semibold ">
          Reset your password
        </CardTitle>
        <CardDescription>Enter new password for your account.</CardDescription>
      </CardHeader>
      <CardContent className=" bg-gray-50 px-4 pt-8  sm:px-16">
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
              {isExecuting && <Loader className="animate-spin size-5" />}
              {isExecuting ? "Submitting.." : "Reset Password"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

export { ResetPasswordForm }
