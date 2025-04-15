import { LEAPER_WORKMARK } from "@/constants/main";
import { formatDateToLocal } from "@/utils/date-formats";
import {
	Body,
	Container,
	Head,
	Heading,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from "@react-email/components";

export function QrCodeLimitReached({ url }: { url: string }) {
	return (
		<Html>
			<Head />
			<Preview>QR Code Limit Reached</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white font-sans">
					<Container className="mx-auto my-10 max-w-[500px] rounded border border-gray-200 border-solid px-10 py-5">
						<Section className="mt-8">
							<Img
								src={LEAPER_WORKMARK}
								height="200"
								alt="QR leaper"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-7 p-0 text-center font-semibold text-black text-xl"></Heading>
						<Text className="text-black text-sm leading-6">
							You've Reached the Scan Limit
						</Text>
						<Text className="text-black text-sm leading-6">
							Your QR code has reached its maximum limit of 500 scans and
							expired on:
							{formatDateToLocal(new Date())}
						</Text>
						<Section className="my-8 text-center">
							<Link
								className="rounded-full bg-black px-6 py-3 text-center font-semibold text-[12px] text-white no-underline"
								href={url}
								target="_blank"
							>
								Upgrade Your Plan
							</Link>
						</Section>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
