import Link from "next/link"
import { CirclePlus } from "lucide-react"
import { redirect } from "next/navigation"

import { auth } from "@/lib/auth/auth"
import { Container } from "@/components/global/container"
import { HeadingShortner } from "@/components/global/heading-shortner"
import { PaginationWithLinks } from "@/components/ui/pagination-with-liniks"
import { getQrCodesWithStyleAndTotalQrCount } from "@/app/actions/pages/dashboard/qr-codes/get-qr-codes"
import { MiniButton } from "@/components/buttons/mini-button"
import { ListComponent } from "@/components/global/list-component"
import { QrCard } from "@/components/cards/pages/dashboard/qr-codes/qr-card/qr-card"

export const metadata = {
  title: "Explore Your QR Codes",
}
interface QrCodePageProps {
  searchParams: {
    page: string
    pageSize: string
  }
}

const QrCodePage = async ({ searchParams }: QrCodePageProps) => {
  const session = await auth()
  if (!session?.user?.id) redirect("/login")

  const page = parseInt(searchParams.page || "1")
  const pageSize = parseInt(searchParams.pageSize || "20")

  const { count, data } = await getQrCodesWithStyleAndTotalQrCount(
    session.user.id,
    pageSize,
    page
  )

  return (
    <Container className="my-8 overflow-hidden">
      <HeadingShortner>
        <HeadingShortner.Title>Your QR Code&lsquo;s</HeadingShortner.Title>
        <HeadingShortner.Description>
          Easily share your beautifully crafted QR codes.
        </HeadingShortner.Description>
      </HeadingShortner>

      <ListComponent
        data={data}
        renderItem={(cardData) => (
          <QrCard key={cardData.qr_code.id} data={cardData} />
        )}
        className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 min-[880px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      />

      {count > 0 ? (
        <PaginationWithLinks
          page={page}
          pageSize={pageSize}
          totalCount={count}
        />
      ) : (
        <div className="flex h-[60vh] w-full items-center justify-center">
          <Link href="/design">
            <MiniButton className="flex items-center gap-2">
              <CirclePlus className="size-4" />
              Create QR Code
            </MiniButton>
          </Link>
        </div>
      )}
    </Container>
  )
}

export default QrCodePage
