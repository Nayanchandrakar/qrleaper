"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { SubscriptionUsageBar } from "@/components/sidebars/dashboard-sidebar/subscription-usage-bar";
import { dashboardNavigations } from "@/constants/navigation/dashboard-constants";
import { cn } from "@/lib/utils";
import type { subscritpionTableType } from "@/types/db-types";

interface SidebarProps {
	subscription: subscritpionTableType;
}

export const Sidebar = ({ subscription }: SidebarProps) => {
	const pathname = usePathname();

	const checkRoute = (href: string) => {
		const isActive = pathname.startsWith(href)
			? "text-slate-700 bg-slate-100"
			: "text-slate-500 ";
		return isActive;
	};

	return (
		<aside className="flex w-full flex-col justify-between gap-3 md:mt-[4.5rem]">
			<div className="flex flex-col gap-1">
				{dashboardNavigations?.map((navigation, index) => (
					<Link
						key={index}
						href={navigation?.href}
						className={cn(
							"flex w-full cursor-pointer items-center rounded-md p-2 text-sm font-medium text-black antialiased transition-colors duration-300 hover:bg-slate-100",
							checkRoute(navigation?.href),
						)}
					>
						<navigation.Icon className="animate_spin_once mr-2 size-4 transition-all duration-300" />
						{navigation?.label}
					</Link>
				))}
			</div>
			<SubscriptionUsageBar subscription={subscription} />
		</aside>
	);
};
