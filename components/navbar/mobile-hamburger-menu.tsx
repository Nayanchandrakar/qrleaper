"use client";

import { Menu } from "lucide-react";
import Link from "next/link";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { userPublicRoutes } from "@/constants/navigation/navigation-constants";

interface MobileHamburgerMenuProps {}

export const MobileHamburgerMenu = ({}: MobileHamburgerMenuProps) => {
	return (
		<div className="inline-block flex items-center justify-center sm:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger className="outline-none">
					<Menu className="size-6 text-white" />
				</DropdownMenuTrigger>
				<DropdownMenuContent className="mr-8 w-[14rem]">
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						{userPublicRoutes?.map(({ id, Icon, href, label }) => (
							<DropdownMenuItem className="cursor-pointer" key={id} asChild>
								<Link key={label} href={href}>
									<Icon className="mr-2 size-4" />
									<span>{label}</span>
								</Link>
							</DropdownMenuItem>
						))}
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
};
