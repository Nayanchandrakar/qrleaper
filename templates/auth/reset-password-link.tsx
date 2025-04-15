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
import Link from "next/link";

export default function ResetPasswordLink({
	url = "http://localhost:3000/auth/reset-password/asdfasdfasdfasdfasdfsdfsdadfsdfasdfasdfasdf",
}: {
	url: string;
}) {
	return (
		<Html>
			<Head />
			<Preview>Reset Password Link</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white font-sans">
					<Container className="mx-auto my-10 max-w-[500px] rounded border border-gray-200 border-solid px-10 py-5">
						<Section className="mt-8">
							<Img
								src={LEAPER_WORKMARK}
								height="200"
								alt="QR"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-7 p-0 text-center font-semibold text-black text-xl">
							Reset password link
						</Heading>
						<Text className="text-black text-sm leading-6">
							You are receiving this email because we received a password reset
							request for your account at QR Leaper.
						</Text>
						<Text className="text-black text-sm leading-6">
							Please click the button below to reset your password.
						</Text>
						<Section className="my-8 text-center">
							<Link
								className="rounded-full bg-black px-6 py-3 text-center font-semibold text-[12px] text-white no-underline"
								href={url}
							>
								Reset Password
							</Link>
						</Section>
						<Text className="text-black text-sm leading-6">
							or copy and paste this URL into your browser:
						</Text>
						<Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
							{url.replace(/^https?:\/\//, "")}
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
