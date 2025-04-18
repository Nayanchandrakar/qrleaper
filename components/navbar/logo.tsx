import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

export const NavbarLogo = ({ className }: { className?: string }) => {
	return (
		<Link className={cn(className)} href="/design">
			<Image
				width={1000}
				height={1000}
				sizes="100vw"
				alt="navbar-logo"
				src="/white-logo-full.svg"
				className="size-36"
				priority
			/>
		</Link>
	);
};
