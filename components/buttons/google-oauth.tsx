"use client";
import { signIn } from "next-auth/react";
import { useTransition } from "react";

import { Icons } from "@/components/shared/icons";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";

const GoogleOauth = () => {
	const [isLoading, startTransition] = useTransition();

	return (
		<Button
			onClick={() =>
				startTransition(async () => {
					await signIn("google", { redirectTo: "/dashboard/qr-codes" });
				})
			}
			variant="outline"
			disabled={isLoading}
			className="w-full hover:bg-gray-50"
		>
			{isLoading ? (
				<Loader className="mr-1 size-5 animate-spin" />
			) : (
				<Icons.google className="mr-1 size-5" />
			)}
			Continue with Google
		</Button>
	);
};

export default GoogleOauth;
