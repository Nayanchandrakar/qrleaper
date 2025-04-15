import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getObjectFileSrc } from "@/utils/client";
import Image from "next/image";
import { useMemo } from "react";

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
				"grid grid-cols-1 h-fit sm:h-56 sm:grid-cols-2 gap-2 bg-blue-900 rounded-xl max-w-xl items-center overflow-hidden",
				isPreviewMode && "grid-cols-1 sm:grid-cols-1 sm:h-fit",
			)}
		>
			<Image
				width={1000}
				height={1000}
				sizes="100vw"
				src={imageSrc}
				className="object-cover h-56"
				alt="profile-cover-image"
			/>

			<div
				className={cn(
					"flex  flex-col gap-2 text-center sm:py-0 py-4",
					isPreviewMode && "sm:py-4",
				)}
			>
				<h3 className="font-bold text-white text-base sm:text-lg text-center">
					{prefix} {firstName} {middleName} {lastName}
					<br />
					{suffix}
				</h3>
				<p className="font-medium text-sm text-white">{jobTitle}</p>
			</div>
		</div>
	);
};
