"use client";

import Link from "next/link";

import { LinkButton } from "@/components/buttons/link-button";
import { MiniButton } from "@/components/buttons/mini-button";
import { UserButton } from "@/components/navbar/user-button";
import { SessionType } from "@/types/type";

interface NavigationMenuProps {
	session: SessionType;
}

const NavigationMenu = ({ session }: NavigationMenuProps) => {
	const isAuthenticated = !!session?.user?.id;

	return (
		<div className="flex items-center gap-4">
			<LinkButton href="/design" className="sm:inline-block hidden">
				QR Code Generator
			</LinkButton>

			<LinkButton href="/solutions" className="sm:inline-block hidden">
				Solutions
			</LinkButton>

			<LinkButton href="/pricing">Pricing</LinkButton>

			{isAuthenticated ? (
				<>
					<LinkButton
						className="sm:inline-block hidden"
						href="/dashboard/qr-codes"
					>
						Dashboard
					</LinkButton>
					<UserButton session={session!} />
				</>
			) : (
				<>
					<LinkButton className="sm:inline-block hidden" href="/login">
						Login
					</LinkButton>

					<Link className="sm:inline-block hidden" href="/register">
						<MiniButton>Sign Up</MiniButton>
					</Link>

					<Link className="sm:hidden inline-block " href="/login">
						<MiniButton>Login</MiniButton>
					</Link>
				</>
			)}
		</div>
	);
};

export { NavigationMenu };
