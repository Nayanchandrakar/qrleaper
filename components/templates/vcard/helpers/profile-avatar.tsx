import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getObjectFileSrc } from "@/utils/client";
import { useMemo } from "react";

interface ProfileAvatarProps {
	lastName: string;
	firstName: string;
	profileImage: string;
	prefix: string | null;
	suffix: string | null;
	middleName: string | null;
	jobTitle: string | null;
	isPreviewMode: boolean;
	headClassName?: string;
	paraClassName?: string;
}

export const ProfileAvatar = ({
	firstName,
	lastName,
	jobTitle,
	middleName,
	prefix,
	suffix,
	profileImage,
	isPreviewMode,
	headClassName,
	paraClassName,
}: ProfileAvatarProps) => {
	const imageSrc = useMemo(() => {
		return isPreviewMode && profileImage === undefined
			? "/global/profile-pic.jpg"
			: getObjectFileSrc(isPreviewMode, profileImage)!;
	}, [isPreviewMode, profileImage]);

	return (
		<>
			<Avatar className="size-24">
				<AvatarImage className="object-cover" src={imageSrc} />
				<AvatarFallback>
					<Skeleton className="size-full" />
				</AvatarFallback>
			</Avatar>
			<div className="flex flex-col items-center justify-center gap-2">
				<h3
					className={cn(
						"text-center font-bold text-green-600 text-lg sm:text-xl",
						headClassName,
					)}
				>
					{prefix} {firstName} {middleName} {lastName}
					<br />
					{suffix}
				</h3>
				<p className={cn("font-medium text-green-700 text-sm", paraClassName)}>
					{jobTitle}
				</p>
			</div>
		</>
	);
};
