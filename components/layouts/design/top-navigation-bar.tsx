"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ListComponent } from "@/components/global/list-component";
import { topNavigationData } from "@/constants/pages/design/top-navigation";
import { cn } from "@/lib/utils";

const TopNavigationBar = () => {
	const pathname = usePathname();

	const currentTab = (endpoint: string) => {
		if (endpoint === pathname) {
			return "bg-zinc-200/60";
		}
	};

	return (
		<div className="p-3 bg-white rounded-lg">
			<ListComponent
				className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-8 gap-4 w-full "
				data={topNavigationData}
				renderItem={({ Icon, endpoint, id, label }) => (
					<Link
						key={id}
						href={endpoint}
						className={cn(
							"transition-colors text-sm flex items-center justify-center duration-200 hover:bg-zinc-200/60 font-medium text-zinc-800 bg-zinc-50 px-5 py-2 rounded-md w-full border border-zinc-200",
							currentTab(endpoint),
						)}
					>
						<Icon className="size-4 mr-2" />
						{label}
					</Link>
				)}
			/>
		</div>
	);
};

export { TopNavigationBar };
