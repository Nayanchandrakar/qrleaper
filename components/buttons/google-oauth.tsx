"use client"
import { useTransition } from "react"
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"
import { Loader } from "lucide-react"

const GoogleOauth = () => {
  const [isLoading, startTransition] = useTransition()

  return (
    <Button
      onClick={() =>
        startTransition(async () => {
          await signIn("google", { redirectTo: "/dashboard/qr-codes" })
        })
      }
      variant="outline"
      disabled={isLoading}
      className="w-full hover:bg-gray-50"
    >
      {isLoading ? (
        <Loader className="size-5 mr-1" />
      ) : (
        <Icons.google className="size-5 mr-1" />
      )}
      Continue with Google
    </Button>
  )
}

export default GoogleOauth
