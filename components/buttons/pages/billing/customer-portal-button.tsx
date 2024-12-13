"use client"

import { toast } from "sonner"
import { Loader } from "lucide-react"
import { useAction } from "next-safe-action/hooks"

import { Button } from "@/components/ui/button"
import { openCustomerPortal } from "@/app/actions/pages/pricing/open-customer-portal"

interface CustomerPortalButtonProps {
  userStripeId: string
}

export const CustomerPortalButton = ({
  userStripeId,
}: CustomerPortalButtonProps) => {
  const { isExecuting, executeAsync } = useAction(openCustomerPortal, {
    onError: ({ error }) => {
      toast.error(error.serverError)
    },
  })

  return (
    <Button
      className="cursor-pointer disabled:cursor-not-allowed"
      disabled={isExecuting}
      onClick={() => executeAsync({ id: userStripeId })}
    >
      Customer Portal
      {isExecuting && <Loader className="size-5 mr-1 animate-spin" />}
    </Button>
  )
}
