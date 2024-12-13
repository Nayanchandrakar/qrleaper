import { Container } from "@/components/global/container"
import { ListComponent } from "@/components/global/list-component"
import { HeadingShortner } from "@/components/global/heading-shortner"
import { QrCardSkeleton } from "@/components/skeletons/pages/dashboard/qr-codes/qr-card-skeleton"

const QrCodeLoadingPage = () => {
  return (
    <Container className="my-8">
      <HeadingShortner>
        <HeadingShortner.Title>Your QR Code's</HeadingShortner.Title>
        <HeadingShortner.Description>
          Easily share your beautifully crafted QR codes.
        </HeadingShortner.Description>
      </HeadingShortner>

      <ListComponent
        data={Array.from({ length: 10 })}
        renderItem={(data) => <QrCardSkeleton key={data as number} />}
        className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 min-[880px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      />
    </Container>
  )
}

export default QrCodeLoadingPage
