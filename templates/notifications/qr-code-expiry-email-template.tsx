import { LEAPER_WORKMARK } from "@/constants/main"
import { formatDateToLocal } from "@/utils/date-formats"
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
  Link,
} from "@react-email/components"

export default function QrCodeExpirationNotice({
  expirationDate,
  url,
}: {
  expirationDate: Date
  url: string
}) {
  return (
    <Html>
      <Head />
      <Preview>Your QR Code Has Expired - Reactivate Now</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-gray-50 font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded-lg border border-solid border-gray-300 bg-white px-8 py-6 shadow-lg">
            <Section>
              <Img
                src={LEAPER_WORKMARK}
                height="200"
                alt="Leaper"
                className="mx-auto my-0"
              />
            </Section>
            <Heading className="mt-6 mb-4 text-center text-2xl font-bold text-gray-800">
              QR Code Expired
            </Heading>
            <Text className="mb-4 text-center text-sm leading-6 text-gray-700">
              Your QR code has expired as of:
            </Text>
            <Text className="mb-6 text-center text-lg font-semibold text-red-600">
              {formatDateToLocal(expirationDate)}
            </Text>
            <Text className="mb-6 text-sm text-center leading-6 text-gray-700">
              Reactivate your QR code to continue using it. Upgrade to a premium
              plan to access unlimited scans, advanced analytics, and exclusive
              features.
            </Text>
            <div className="text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
                target="_blank"
              >
                Reactivate Now
              </Link>
            </div>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
