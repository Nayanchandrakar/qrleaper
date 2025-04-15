import { Skeleton } from "@/components/ui/skeleton";

export const ProfileEditCardSkeleton = () => {
	return (
		<div className="rounded-lg border border-gray-200">
			<div className="px-5 pt-5 sm:px-10 sm:pt-10">
				<div className="flex flex-col space-y-3 ">
					<Skeleton className="h-8 w-48" />
					<Skeleton className="h-6 w-64" />
				</div>

				<div className="my-6">
					<Skeleton className="h-[4rem] w-full" />
				</div>
			</div>

			<div className="flex items-center justify-end gap-2 border-gray-200 border-t bg-gray-50 px-5 py-4 sm:px-10">
				<Skeleton className="h-9 w-36 px-4 py-2" />
			</div>
		</div>
	);
};
