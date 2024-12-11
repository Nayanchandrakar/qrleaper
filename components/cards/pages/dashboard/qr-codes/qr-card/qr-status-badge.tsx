import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface QrStatusBadgeProps {
  status: string
}
export const QrStatusBadge = ({ status }: QrStatusBadgeProps) => {
  return (
    <Badge
      className={cn(
        "cursor-pointer rounded-full",
        status === "active"
          ? "bg-green-600 hover:bg-green-600/80"
          : "bg-destructive hover:bg-destructive/80"
      )}
    >
      {status === "active" ? "Active" : "Inactive"}
    </Badge>
  )
}
