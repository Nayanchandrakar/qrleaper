import { Loader, Trash } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

import { deleteQrCodeAction } from "@/app/actions/pages/dashboard/qr-codes/delete-qr-code"
import { Button } from "@/components/ui/button"

interface DeleteQrCodeButtonProps {
  id: string
}

export const DeleteQrCodeButton = ({ id }: DeleteQrCodeButtonProps) => {
  const { executeAsync, isExecuting } = useAction(deleteQrCodeAction, {
    onSuccess: () => toast.success("Succefully deleted QR Code!"),
    onError: ({ error }) => {
      toast.error(error.serverError)
    }
  })

  return (
    <Button
      onClick={() => executeAsync({ id })}
      className="absolute right-4 top-4 opacity-0 transition duration-200 group-hover:opacity-100"
      variant="destructive"
      size="icon"
      disabled={isExecuting}
    >
      {isExecuting ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Trash className="size-4" />
      )}
    </Button>
  )
}
