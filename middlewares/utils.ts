import type { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const redirectTo = (nextURL: NextURL, path?: string) => {
	return NextResponse.redirect(new URL(path ?? "/design", nextURL));
};
