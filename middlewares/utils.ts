import type { qrType } from "@/types/db-types";
import type { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const redirectTo = (nextURL: NextURL, path?: string) => {
	return NextResponse.redirect(new URL(path ?? "/design", nextURL));
};

export const handleFinalRedirect = (
	nexturl: NextURL,
	path: string,
	qrType: qrType,
) => {
	if (["email", "sms"].includes(qrType)) {
		return NextResponse.redirect(path);
	}

	return redirectTo(nexturl, path);
};
