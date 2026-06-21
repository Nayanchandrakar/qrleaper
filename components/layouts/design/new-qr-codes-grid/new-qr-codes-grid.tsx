import { NewQrCodeGridCard } from "@/components/cards/pages/design/new-qr-code-grid-card"
import { HeadingShortner } from "@/components/global/heading-shortner"
import { ListComponent } from "@/components/global/list-component"
import { newQrData } from "@/constants/layouts/design/new-qr-data"

export const NewQrCodeGrid = () => {
  return (
    <section>
      <HeadingShortner>
        <HeadingShortner.Title>Explore More QR Codes</HeadingShortner.Title>
      </HeadingShortner>

      <ListComponent
        data={newQrData}
        className="mb-20 mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        renderItem={(data) => <NewQrCodeGridCard key={data.id} {...data} />}
      />
    </section>
  )
}
