import { SolutionsCard } from "@/components/cards/pages/solutions/solutions-card"
import { Container } from "@/components/global/container"
import { HeadingShortner } from "@/components/global/heading-shortner"
import { ListComponent } from "@/components/global/list-component"
import { solutionsData } from "@/constants/pages/solutions/solutions-data"

const SolutionsPage = () => {
  return (
    <Container>
      <HeadingShortner className="mt-20 items-center gap-3 sm:mt-24">
        <HeadingShortner.Title className="text-center text-3xl sm:text-4xl md:text-5xl">
          Our QR Code Solutions
        </HeadingShortner.Title>
        <HeadingShortner.Description className="max-w-4xl text-center text-muted-foreground">
          Simplify your QR Code needs with QR Leaper. We provide a user-friendly
          platform and a complete range of solutions for all your QR Code
          marketing and business requirements.
        </HeadingShortner.Description>
      </HeadingShortner>

      <ListComponent
        data={solutionsData}
        className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        renderItem={(data) => <SolutionsCard key={data.id} {...data} />}
      />
    </Container>
  )
}

export default SolutionsPage
