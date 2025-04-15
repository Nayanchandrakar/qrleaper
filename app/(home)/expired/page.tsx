import { AlarmClockOff } from "lucide-react";
import Link from "next/link";

import { Icons } from "@/components/shared/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata = {
	title: "QR Code is being Expired",
};

const ExpiredPage = () => {
	return (
		<section className="relative flex h-[calc(100vh_-_62px)] w-full items-center justify-center">
			<Icons.gridPattern className="fixed z-[-1]" />

			<div className="flex flex-col items-center justify-center gap-5 px-5 sm:px-0">
				<span className="flex size-20 items-center justify-center rounded-full border">
					<AlarmClockOff className="size-8 text-gray-600" />
				</span>
				<h4 className="text-5xl font-bold text-black sm:text-6xl">
					Expired Link.
				</h4>
				<p className="text-center text-base font-medium text-gray-600 min-[400px]:text-lg sm:text-xl">
					This link has expired. Please contact the owner of this link to <br />
					get a new one.
				</p>
				<Link
					className={cn(
						buttonVariants({ size: "lg", className: "rounded-full" }),
					)}
					href="/design"
				>
					Create Your Free Branded Link
				</Link>
			</div>
		</section>
	);
};

export default ExpiredPage;
