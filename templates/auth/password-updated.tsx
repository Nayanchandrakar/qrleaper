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

export default function PasswordUpdated({
	verb = "updated",
}: {
	verb?: "reset" | "updated";
}) {
	return (
		<Html>
			<Head />
			<Preview>Your password has been {verb}</Preview>
			<Tailwind>
				<Body className="mx-auto my-auto bg-white font-sans">
					<Container className="mx-auto my-10 max-w-[500px] rounded border border-gray-200 border-solid px-10 py-5">
						<Section className="mt-8">
							<Img
								src={LEAPER_WORKMARK}
								height="200"
								alt="Leaper"
								className="mx-auto my-0"
							/>
						</Section>
						<Heading className="mx-0 my-7 p-0 text-center font-semibold text-black text-xl">
							Password has been {verb}
						</Heading>
						<Text className="text-black text-sm leading-6">
							The password for your Dub account has been successfully {verb}.
						</Text>
						<Text className="text-black text-sm leading-6">
							If you did not make this change or you believe an unauthorised
							person has accessed your account, please contact us immediately to
							secure your account.
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
