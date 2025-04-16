import Image from "next/image";
import { useMemo } from "react";

import { cn } from "@/lib/utils";
import { getObjectFileSrc } from "@/utils/client";

interface OrangeGrayProfileAvatarProps {
	lastName: string;
	firstName: string;
	profileImage: string;
	prefix: string | null;
	suffix: string | null;
	middleName: string | null;
	jobTitle: string | null;
	isPreviewMode: boolean;
}

export const OrangeGrayProfileAvatar = ({
	firstName,
	lastName,
	jobTitle,
	middleName,
	prefix,
	suffix,
	profileImage,
	isPreviewMode,
}: OrangeGrayProfileAvatarProps) => {
	const imageSrc = useMemo(() => {
		return isPreviewMode && profileImage === undefined
			? "/global/profile-pic.jpg"
			: getObjectFileSrc(isPreviewMode, profileImage)!;
	}, [isPreviewMode, profileImage]);

	return (
		<div
			className={cn(
				"grid h-fit max-w-xl grid-cols-1 items-center gap-2 overflow-hidden rounded-xl bg-blue-900 sm:h-56 sm:grid-cols-2",
				isPreviewMode && "grid-cols-1 sm:h-fit sm:grid-cols-1",
			)}
		>
			<Image
				width={1000}
				height={1000}
				sizes="100vw"
				src={imageSrc}
				className="h-56 object-cover"
				alt="profile-cover-image"
			/>

			<div
				className={cn(
					"flex flex-col gap-2 py-4 text-center sm:py-0",
					isPreviewMode && "sm:py-4",
				)}
			>
				<h3 className="text-center font-bold text-base text-white sm:text-lg">
					{prefix} {firstName} {middleName} {lastName}
					<br />
					{suffix}
				</h3>
				<p className="font-medium text-sm text-white">{jobTitle}</p>
			</div>
		</div>
	);
};
