import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const DurationChangeSkeleton = () => {
  return (
    <CardHeader className="mt-8 flex items-start gap-2 space-y-0 border-b py-5 sm:flex-row sm:items-center">
      <div className="grid flex-1 gap-1 text-left">
        <CardTitle>
          <Skeleton className="h-5 w-48" />
        </CardTitle>
        <CardDescription>
          <Skeleton className="h-5 w-64" />
        </CardDescription>
      </div>

      <Skeleton className="w-50 h-8" />
    </CardHeader>
  )
}
