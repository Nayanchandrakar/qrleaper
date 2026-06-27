"use client"
import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useEffect, useState } from "react"

import { sendOtpAction } from "@/app/actions/auth/send-otp-action"
import { cn } from "@/lib/utils"

interface ResendOtpButtonProps {
  email: string
}

const ResendOtpButton = ({ email }: ResendOtpButtonProps) => {
  const [delaySeconds, setDelaySeconds] = useState(0)
  const [state, setState] = useState<"default" | "success" | "error">("default")

  const { executeAsync, isExecuting } = useAction(sendOtpAction, {
    onSuccess: () => setState("success"),
    onError: () => setState("error")
  })

  useEffect(() => {
    if (state === "success") {
      setDelaySeconds(60)
    } else if (state === "error") {
      setDelaySeconds(5)
    }
  }, [state])

  useEffect(() => {
    if (delaySeconds > 0) {
      const interval = setInterval(
        () => setDelaySeconds(delaySeconds - 1),
        1000
      )

      return () => clearInterval(interval)
    } else {
      setState("default")
    }
  }, [delaySeconds])

  return (
    <div className="relative mt-4 text-center text-sm text-gray-500">
      {state === "default" && (
        <>
          {isExecuting && (
            <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 pr-1.5">
              <Loader className="size-5 animate-spin" />
            </div>
          )}

          <p className={cn(isExecuting && "opacity-80")}>
            Didn&apos;t receive a code?{" "}
            <button
              onClick={() => executeAsync({ email })}
              className={cn(
                "font-semibold text-gray-500 underline underline-offset-2 transition-colors hover:text-black",
                isExecuting && "pointer-events-none"
              )}
            >
              Resend
            </button>
          </p>
        </>
      )}

      {state === "success" && (
        <p className="text-sm text-gray-500">
          Code sent successfully. <Delay seconds={delaySeconds} />
        </p>
      )}

      {state === "error" && (
        <p className="text-sm text-gray-500">
          Failed to send code. <Delay seconds={delaySeconds} />
        </p>
      )}
    </div>
  )
}

const Delay = ({ seconds }: { seconds: number }) => {
  return (
    <span className="ml-1 text-sm tabular-nums text-gray-400">{seconds}s</span>
  )
}

export { ResendOtpButton }
