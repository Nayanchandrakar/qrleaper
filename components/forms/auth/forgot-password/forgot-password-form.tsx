"use client"

import Link from "next/link"
import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { requestPasswordResetAction } from "@/app/actions/auth/request-password-reset-action"

const ForgotPasswordForm = () => {
  const router = useRouter()
  const [email, setEmail] = useState("")

  const { executeAsync, isExecuting } = useAction(requestPasswordResetAction, {
    onSuccess() {
      toast.success(
        "You will receive an email with instructions to reset your password."
      )
      router.push("/login")
    },
    onError({ error }) {
      toast.error(error.serverError)
    },
  })

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    executeAsync({ email })
  }

  return (
    <Card className="sm:rounded-2xl border border-gray-200 w-full max-w-[460px] overflow-hidden">
      <CardHeader className="text-center p-0">
        <CardTitle className="text-lg font-semibold border-b py-7 border-gray-200">
          Get started with QR Leaper
        </CardTitle>
      </CardHeader>
      <CardContent className=" bg-gray-50 px-4 pt-8 pb-4 sm:px-16">
        <form onSubmit={onSubmit} className="space-y-5">
          <label>
            <span className="text-sm font-medium text-gray-700">Email</span>
            <Input
              type="email"
              value={email}
              required
              placeholder="andrew@adson.com"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </label>
          <Button disabled={isExecuting} className="w-full" type="submit">
            {isExecuting && <Loader className="animate-spin size-5" />}
            {isExecuting ? "Sending..." : "Send reset link"}
          </Button>
        </form>
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

export { ForgotPasswordForm }
