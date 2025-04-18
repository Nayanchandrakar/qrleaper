import { qrType } from "@/types/db-types";
import type { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const redirectTo = (nextURL: NextURL, path?: string) => {
	return NextResponse.redirect(new URL(path ?? "/design", nextURL));
};

export const handleRedirect = (
	type: qrType,
	endpoint: string,
	nextUrl: NextURL,
) => {
	if (["email", "sms"].includes(type)) {
		return redirectTo(nextUrl, `/redirect?endpoint=${endpoint}`);
	} else {
		return redirectTo(nextUrl, endpoint);
	}
};
