import type { User } from "next-auth";
import type { MiddlewareResult } from "next-safe-action";

import { getQrCodeByUserIdAndIdWithType } from "@/app/actions/utils";
import type { qrType } from "@/types/db-types";

export const throwQrCodeNotFoundError = async ({
	next,
	ctx,
	clientInput,
	type,
}: {
	ctx: {
		user: User;
	};
	next: <NC extends object>(
		opts?:
			| {
					ctx?: NC | undefined;
			  }
			| undefined,
	) => Promise<MiddlewareResult<string, NC>>;

	// biome-ignore lint/suspicious/noExplicitAny:
	clientInput: any;
	type: qrType;
}) => {
	const data = await getQrCodeByUserIdAndIdWithType(
		ctx.user.id!,
		clientInput.id,
		type,
	);

	if (!data) {
		throw new Error("No QR Code found to update with this id");
	}

	return next({
		ctx: {
			data,
		},
	});
};
