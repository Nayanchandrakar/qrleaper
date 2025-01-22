import { ListComponent } from "@/components/global/list-component"
import { newQrData } from "@/constants/layouts/design/new-qr-data"
import { HeadingShortner } from "@/components/global/heading-shortner"
import { NewQrCodeGridCard } from "@/components/cards/pages/design/new-qr-code-grid-card"

export const NewQrCodeGrid = () => {
  return (
    <section>
      <HeadingShortner>
        <HeadingShortner.Title>Explore More QR Codes</HeadingShortner.Title>
      </HeadingShortner>

      <ListComponent
        data={newQrData}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-8 mb-20"
        renderItem={(data) => <NewQrCodeGridCard key={data.id} {...data} />}
      />
    </section>
  )
}
