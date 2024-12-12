import { Activity } from "lucide-react"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export const TotalQrCodeSkeleton = () => {
  return (
    <Card className="max-w-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">
          <Skeleton className="w-16 h-5" />
        </CardTitle>
        <Activity className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <Skeleton className="w-11 h-5" />
        <p className="mt-2 text-xs text-muted-foreground">
          <Skeleton className="w-36 h-5" />
        </p>
      </CardContent>
    </Card>
  )
}
