import { SolutionsCard } from "@/components/cards/pages/solutions/solutions-card";
import { Container } from "@/components/global/container";
import { HeadingShortner } from "@/components/global/heading-shortner";
import { ListComponent } from "@/components/global/list-component";
import { solutionsData } from "@/constants/pages/solutions/solutions-data";

const SolutionsPage = () => {
	return (
		<Container>
			<HeadingShortner className="items-center mt-20 sm:mt-24 gap-3">
				<HeadingShortner.Title className="text-3xl sm:text-4xl md:text-5xl text-center">
					Our QR Code Solutions
				</HeadingShortner.Title>
				<HeadingShortner.Description className="text-center text-muted-foreground max-w-4xl">
					Simplify your QR Code needs with QR Leaper. We provide a user-friendly
					platform and a complete range of solutions for all your QR Code
					marketing and business requirements.
				</HeadingShortner.Description>
			</HeadingShortner>

			<ListComponent
				data={solutionsData}
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-16"
				renderItem={(data) => <SolutionsCard key={data.id} {...data} />}
			/>
		</Container>
	);
};

export default SolutionsPage;
