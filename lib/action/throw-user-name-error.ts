import { isUserNameAvailable } from "@/app/actions/utils";
import type { User } from "next-auth";

export const throwUserNameError = async ({
	next,
	ctx,
	isEditAction = false,
}: {
	ctx: {
		user: User;
		// biome-ignore lint/suspicious/noExplicitAny:
		parsedInput: any;
	};
	// biome-ignore lint/suspicious/noExplicitAny:
	next: () => any;
	isEditAction?: boolean;
}) => {
	const userName = ctx.parsedInput.userName;
	// check is there any user name exist with this input
	const inUse = await isUserNameAvailable(userName);

	// Only return the next function if the input user name matches with the existing one and having edit action boolean true
	if (inUse && inUse === userName && isEditAction) return next();

	// If true thent throw an error
	if (inUse) {
		throw new Error("Username is already in use.");
	}

	// else return next function
	return next();
};
