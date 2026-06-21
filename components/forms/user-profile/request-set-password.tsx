"use client"

import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

import { setPasswordAction } from "@/app/actions/user-profile/set-password-action"
import { Button } from "@/components/ui/button"
import type { SessionType } from "@/types/type"

interface RequestSetPasswordProps {
  provider: string | null
  session: SessionType
}

export const RequestSetPassword = ({
  provider,
  session
}: RequestSetPasswordProps) => {
  const { executeAsync, isExecuting } = useAction(setPasswordAction, {
    onSuccess() {
      toast.success(
        `We've sent you an email to ${session?.user?.email} with instructions to set your password`
      )
    },
    onError({ error }) {
      toast.error(error.serverError)
    }
  })

  return (
    <div className="rounded-lg border border-gray-200 bg-white">
      <div className="flex flex-col gap-3 border-b border-gray-200 p-5 sm:p-10">
        <h2 className="text-xl font-medium">Password</h2>
        <p className="pb-2 text-sm text-gray-500">
          Your account is managed by{" "}
          <span className="uppercase">{provider ?? "other"}</span>. You can set
          a password to use with your QR Leaper account.
        </p>
      </div>
      <div className="p-5">
        <Button onClick={() => executeAsync()} disabled={isExecuting}>
          {isExecuting && <Loader className="mr-1 size-5 animate-spin" />}
          Create account password
        </Button>
      </div>
    </div>
  )
}
