"use client"

import { Loader } from "lucide-react"
import { useSession } from "next-auth/react"
import { useAction } from "next-safe-action/hooks"
import { useState } from "react"
import { toast } from "sonner"

import { updateUserAction } from "@/app/actions/user-profile/update-user-action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ProfileNameUpdateFormProps {
  defaultName: string
}

const ProfileNameUpdateForm = ({ defaultName }: ProfileNameUpdateFormProps) => {
  const [name, setName] = useState(defaultName ?? "")
  const { update } = useSession()

  const { executeAsync, isExecuting } = useAction(updateUserAction, {
    onSuccess() {
      update({ name })
      toast.success("Successfully updated your name!")
    },
    onError({ error }) {
      toast.error(error.serverError)
    }
  })

  const isDisabled = defaultName === name || name?.length <= 0 || isExecuting

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    executeAsync({ name })
  }

  return (
    <form onSubmit={onSubmit} className="rounded-lg border border-gray-200">
      <div className="px-5 pt-5 sm:px-10 sm:pt-10">
        <div className="flex flex-col space-y-3">
          <h2 className="text-xl font-medium">Your Name</h2>
          <p className="text-sm text-gray-500">
            This will be your display name on QR Leaper.
          </p>
        </div>

        <div className="my-6">
          <Input
            id="name"
            name="name"
            value={name}
            placeholder="Elon Musk"
            required
            disabled={isExecuting}
            minLength={1}
            maxLength={30}
            className="max-w-[30rem]"
            onChange={(e) => setName(e?.target?.value)}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-gray-200 bg-gray-50 px-5 py-4 sm:px-10">
        <p className="text-sm text-gray-500">Max 32 characters.</p>
        <Button
          className="cursor-pointer disabled:cursor-not-allowed"
          disabled={isDisabled}
        >
          {isExecuting && <Loader className="mr-1 size-5 animate-spin" />}
          {isExecuting ? "Submitting.." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}

export { ProfileNameUpdateForm }
