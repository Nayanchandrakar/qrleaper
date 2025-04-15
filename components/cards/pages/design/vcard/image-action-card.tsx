"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { getFileName, getProfileImage } from "@/utils/client";

interface ImageActionCardProps {
	disabled?: boolean;
	onDelete: () => void;
	file: File | string;
}

export const ImageActionCard = ({
	disabled = false,
	onDelete,
	file,
}: ImageActionCardProps) => {
	const { fileName, imageSrc } = useMemo(() => {
		return {
			fileName: getFileName(file),
			imageSrc: getProfileImage(file),
		};
	}, [file]);

	return (
		<div className="group relative flex h-80 items-center justify-center overflow-hidden rounded-lg">
			<div className="absolute top-4 flex h-fit w-full items-center justify-between gap-4 px-4">
				{fileName && (
					<span className="truncate rounded-md border border-gray-100 bg-white px-2 py-2 font-medium text-black text-xs">
						{fileName}
					</span>
				)}

				<Button
					size="icon"
					type="button"
					onClick={onDelete}
					disabled={disabled}
					variant="destructive"
					className="flex-shrink-0 opacity-0 transition duration-200 disabled:opacity-50 group-hover:opacity-100"
				>
					<Trash className="size-4" />
				</Button>
			</div>

			<Image
				src={imageSrc}
				width={1000}
				sizes="100vw"
				height={1000}
				className="size-full object-cover"
				alt="showcase-images"
			/>
		</div>
	);
};
