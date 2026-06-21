"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { sendRegisterOtp } from "@/app/actions/auth/send-register-otp"
import GoogleOauth from "@/components/buttons/google-oauth"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
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
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { useRegisterContext } from "@/hooks/auth/useRegisterContext"
import {
  registerFormSchema,
  type registerFormSchemaType
} from "@/zod/auth/register-schema"

const RegisterForm = () => {
  const { setName, setEmail, setPassword, setStep } = useRegisterContext(
    (state) => ({
      setStep: state.setStep,
      setEmail: state.setEmail,
      setName: state.setName,
      setPassword: state.setPassword
    })
  )

  const form = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: ""
    }
  })

  const { executeAsync, isExecuting } = useAction(sendRegisterOtp, {
    onSuccess: () => {
      const formValues = form.getValues()
      setEmail(formValues.email)
      setPassword(formValues.password)
      setName(formValues.name)
      setStep("verify")
    },
    onError: ({ error }) => {
      toast.error(error.serverError as string)
    }
  })

  const onSubmit = async (formData: registerFormSchemaType) => {
    await executeAsync(formData)
  }

  return (
    <Card className="w-full max-w-[460px] overflow-hidden border border-gray-200 sm:rounded-2xl">
      <CardHeader className="p-0 text-center">
        <CardTitle className="border-b border-gray-200 py-7 text-lg font-semibold">
          Get started with QR Leaper
        </CardTitle>
      </CardHeader>
      <CardContent className="bg-gray-50 px-4 pb-4 pt-8 sm:px-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="name"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Your Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              disabled={isExecuting}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      className="bg-white"
                      placeholder="Work Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button disabled={isExecuting} className="w-full" type="submit">
              {isExecuting && <Loader className="size-5 animate-spin" />}
              {isExecuting ? "Submitting.." : "Sign Up"}
            </Button>
          </form>
        </Form>

        <div className="flex flex-shrink items-center justify-center gap-2 py-6">
          <div className="grow basis-0 border-b border-gray-300" />
          <span className="text-xs font-normal uppercase leading-none text-gray-500">
            or
          </span>
          <div className="grow basis-0 border-b border-gray-300" />
        </div>

        <GoogleOauth />
      </CardContent>

      <CardFooter className="justify-center">
        <p className="mt-4 text-center text-sm text-gray-500">
          Already have an account?&nbsp;
          <Link
            href="/login"
            className="font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black"
          >
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}

export { RegisterForm }
