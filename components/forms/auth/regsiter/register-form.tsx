"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { Loader } from "lucide-react"

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
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  registerFormSchema,
  registerFormSchemaType,
} from "@/zod/auth/register-schema"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { PasswordInput } from "@/components/ui/password-input"
import GoogleOauth from "@/components/buttons/google-oauth"
import { useRegisterContext } from "@/hooks/auth/useRegisterContext"
import { sendOtpAction } from "@/app/actions/auth/send-otp-action"

interface RegisterFormProps {}

const RegisterForm = ({}: RegisterFormProps) => {
  const { setName, setEmail, setPassword, setStep } = useRegisterContext(
    (state) => ({
      setStep: state.setStep,
      setEmail: state.setEmail,
      setName: state.setName,
      setPassword: state.setPassword,
    })
  )

  const form = useForm<registerFormSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  })

  const { executeAsync, isExecuting } = useAction(sendOtpAction, {
    onSuccess: () => {
      setEmail(form.getValues("email"))
      setPassword(form.getValues("password"))
      setName(form.getValues("name"))
      setStep("verify")
    },
    onError: ({ error }) => {
      toast.error(error.serverError as string)
    },
  })

  const onSubmit = (formData: registerFormSchemaType) => executeAsync(formData)

  return (
    <Card className="sm:rounded-2xl border border-gray-200 w-full max-w-[460px] overflow-hidden">
      <CardHeader className="text-center p-0">
        <CardTitle className="text-lg font-semibold border-b py-7 border-gray-200">
          Get started with QR Leaper
        </CardTitle>
      </CardHeader>
      <CardContent className=" bg-gray-50 px-4 pt-8 pb-4 sm:px-16">
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
              {true && <Loader className="animate-spin size-5" />}
              {true ? "Sign Up" : "Submitting.."}
            </Button>
          </form>
        </Form>

        <div className="py-6 flex flex-shrink items-center justify-center gap-2">
          <div className="grow basis-0 border-b border-gray-300" />
          <span className="text-xs font-normal uppercase leading-none text-gray-500">
            or
          </span>
          <div className="grow basis-0 border-b border-gray-300" />
        </div>

        <GoogleOauth />
      </CardContent>

      <CardFooter className=" justify-center">
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

export default RegisterForm
