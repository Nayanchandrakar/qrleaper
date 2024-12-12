import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export const QrCardSkeleton = () => {
  return (
    <Card className="overflow-hidden">
      <Skeleton className="relative h-44" />
      <CardHeader className="px-3 pt-4">
        <CardTitle>
          <Skeleton className="h-5 w-52" />
        </CardTitle>
        <CardDescription className="pt-2">
          <Skeleton className="h-7 w-24" />
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex items-center gap-2 px-3 pb-4">
        <Skeleton className="h-8 w-full rounded-full" />
        <Skeleton className="size-9 rounded-full" />
      </CardFooter>
    </Card>
  )
}
