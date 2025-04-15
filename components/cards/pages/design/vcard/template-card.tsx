"use client";

import Image from "next/image";
import { HTMLAttributes } from "react";

import { CarouselItem } from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

interface TemplateSelectCardProps extends HTMLAttributes<HTMLDivElement> {
	imageSrc: string;
}

export const TemplateSelectCard = ({
	className,
	imageSrc,
	...props
}: TemplateSelectCardProps) => {
	return (
		<CarouselItem
			className={cn(
				"flex cursor-pointer items-center justify-center rounded-lg border-[3px] border-zinc-200 pl-0 transition-all duration-200 sm:basis-1/5",
				className,
			)}
			{...props}
		>
			<Image
				src={imageSrc}
				width={1000}
				height={1000}
				sizes="100vw"
				alt="template-image"
				className="size-[10rem] h-fit rounded-lg object-cover object-top"
			/>
		</CarouselItem>
	);
};
