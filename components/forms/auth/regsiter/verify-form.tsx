"use client"

import { OTPInput } from "input-otp"
import { useMediaQuery } from "usehooks-ts"
import { Loader } from "lucide-react"
import { signIn } from "next-auth/react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { useRegisterContext } from "@/hooks/auth/useRegisterContext"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { toast } from "sonner"
import { useAction } from "next-safe-action/hooks"
import { createUserAccountAction } from "@/app/actions/auth/create-user-action"
import { ResendOtpButton } from "./resend-otp-button"

const VerifyForm = () => {
  const router = useRouter()
  const isMobile = useMediaQuery("(min-width: 768px)")
  const [code, setCode] = useState("")
  const [isInvalidCode, setIsInvalidCode] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)

  const { email, password, name } = useRegisterContext((state) => ({
    name: state.name,
    email: state.email,
    password: state.password,
  }))

  const { executeAsync, isExecuting } = useAction(createUserAccountAction, {
    async onSuccess() {
      toast.success("Account created! Redirecting to dashboard...")
      setIsRedirecting(true)

      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })

      if (response?.ok) {
        router.push("/dashboard/qr-codes")
      } else {
        toast.error("Failed to redirect to dashboard.")
      }
    },
    onError({ error }) {
      toast.error(error.serverError as string)
      setCode("")
      setIsInvalidCode(true)
    },
  })

  if (!email || !password) {
    return null
  }

  return (
    <Card className="sm:rounded-2xl border border-gray-200 w-full max-w-[460px] overflow-hidden">
      <CardHeader className="text-center p-0 border-b py-7 border-gray-200">
        <CardTitle className="text-lg font-semibold mb-2">
          Verify your email address
        </CardTitle>
        <CardDescription className="text-center">
          Enter the six digit verification code sent to <br />
          {email ?? ""}
        </CardDescription>
      </CardHeader>
      <CardContent className=" bg-gray-50 px-4 pt-8 pb-4 sm:px-16">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            executeAsync({ name, email, password, code })
          }}
        >
          <div>
            <OTPInput
              maxLength={6}
              value={code}
              onChange={(code) => {
                setIsInvalidCode(false)
                setCode(code)
              }}
              autoFocus={!isMobile}
              containerClassName="group flex items-center justify-center"
              render={({ slots }) => (
                <div className="flex items-center">
                  {slots.map(({ char, isActive, hasFakeCaret }, idx) => (
                    <div
                      key={idx}
                      className={cn(
                        "relative flex h-14 w-10 items-center justify-center text-xl",
                        "border-y border-r border-gray-200 bg-white first:rounded-l-lg first:border-l last:rounded-r-lg",
                        "ring-0 transition-all",
                        isActive &&
                          "z-10 border border-gray-500 ring-2 ring-gray-200",
                        isInvalidCode && "border-red-500 ring-red-200"
                      )}
                    >
                      {char}
                      {hasFakeCaret && (
                        <div className="animate-caret-blink pointer-events-none absolute inset-0 flex items-center justify-center">
                          <div className="h-5 w-px bg-black" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              onComplete={() => {
                executeAsync({ name, email, password, code })
              }}
            />
            {isInvalidCode && (
              <p className="mt-2 text-center text-sm text-red-500 ">
                Invalid code. Please try again.
              </p>
            )}

            <Button
              className="mt-8 w-full disabled:bg-gray-200 border-gray-300"
              type="submit"
              variant="outline"
              disabled={!code || code.length < 6}
            >
              {(isExecuting || isRedirecting) && (
                <Loader className="size-5 animate-spin" />
              )}
              {isExecuting ? "Verifying..." : "Continue"}
            </Button>
          </div>
        </form>
      </CardContent>

      <CardFooter className=" justify-center">
        <ResendOtpButton email={email} />
      </CardFooter>
    </Card>
  )
}

export { VerifyForm }
