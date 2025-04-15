import { LEAPER_WORKMARK } from "@/constants/main";
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
} from "@react-email/components";

export default function VerifyEmailChange({
	code = "123456",
}: {
	code: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>Verify Your Email Address for QR Leaper</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white font-sans">
					<Container className="mx-auto my-10 max-w-[500px] rounded border border-gray-200 border-solid px-10 py-5">
						<Section className="mt-8">
							<Img
								src={LEAPER_WORKMARK}
								height="200"
								alt="Dub"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-7 p-0 text-center font-semibold text-black text-xl">
							Confirm Your Email Address
						</Heading>
						<Text className="mx-auto text-sm leading-6">
							Please enter the verification code below on the QR Leaper
							verification page to complete your registration:
						</Text>
						<Section className="my-8">
							<div className="mx-auto w-fit rounded-xl px-6 py-3 text-center font-mono font-semibold text-2xl tracking-[0.25em]">
								{code}
							</div>
						</Section>
						<Text className="text-black text-sm leading-6">
							Note: This verification code is valid for 1 hour.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
