import { Container } from "@/components/global/container"
import { Skeleton } from "@/components/ui/skeleton"
import { TotalQrCodeSkeleton } from "@/components/skeletons/pages/dashboard/analytics/total-qr-code-skeleton"
import { DurationChangeSkeleton } from "@/components/skeletons/pages/dashboard/analytics/duration-change-skeleton"

const Loading = () => {
  return (
    <Container className="my-8 sm:mt-12">
      <TotalQrCodeSkeleton />
      <section className="space-y-12">
        <DurationChangeSkeleton />
        <Skeleton className="h-[26rem] w-full" />
        <Skeleton className="h-[42rem] w-full" />
      </section>
    </Container>
  )
}

export default Loading
