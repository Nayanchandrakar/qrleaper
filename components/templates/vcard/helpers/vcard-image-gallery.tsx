"use client";

import { useMemo } from "react";

import { getObjectFileSrc } from "@/utils/client";

interface VcardImageGalleryProps {
	imageSrc: string;
	isPreviewMode: boolean;
}

export const VcardImageGallery = ({
	imageSrc,
	isPreviewMode,
}: VcardImageGalleryProps) => {
	const data = useMemo(
		() => getObjectFileSrc(isPreviewMode, imageSrc),
		[imageSrc, isPreviewMode],
	);

	return (
		<img
			key={imageSrc}
			src={data!}
			alt="Gallery Image"
			className="size-full rounded-lg"
		/>
	);
};
