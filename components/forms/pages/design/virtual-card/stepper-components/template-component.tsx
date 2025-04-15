"use client";

import {
	Carousel,
	CarouselContent,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { useFormContext } from "react-hook-form";

import { TemplateSelectCard } from "@/components/cards/pages/design/vcard/template-card";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { templateCarouselData } from "@/constants/pages/design/vcard/template-carousel-data";

export const TemplateComponent = () => {
	const { setValue, getValues } = useFormContext();
	const currentTemplateId = getValues("templateId");

	return (
		<div className="mt-3 flex flex-col items-start">
			<CardHeader className="p-0 pb-3">
				<CardTitle>Choose Template</CardTitle>
				<CardDescription>
					Select from the pre-designed templates below to create your customized
					Vcard QR Code.
				</CardDescription>
			</CardHeader>

			<Carousel className="w-full" opts={{ align: "center" }}>
				<CarouselContent className="mx-1 my-3 gap-2">
					{templateCarouselData?.map(({ id, image, templateId }) => (
						<TemplateSelectCard
							key={id}
							imageSrc={image}
							className={`h-full ${
								currentTemplateId === templateId
									? "border-green-600"
									: "hover:border-green-600"
							}`}
							onClick={() => {
								setValue("templateId", templateId, {
									shouldDirty: true,
									shouldTouch: true,
									shouldValidate: true,
								});
							}}
						/>
					))}
				</CarouselContent>
				<CarouselPrevious className="absolute left-0" />
				<CarouselNext className="absolute right-0" />
			</Carousel>
		</div>
	);
};
