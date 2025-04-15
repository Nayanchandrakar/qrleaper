"use server";

import { updateFile, uploadFile } from "@/app/actions/file/utils";
import {
	getQrCodeWithStyleByUserIdAndId,
	updateQrCodeStylelogoById,
} from "@/app/actions/utils";
import { authUserActionClient } from "@/lib/action/safe-action";
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error";
import { logoFileFormSchema } from "@/zod/forms/design/logo-form-schema";

export const imageUploadAction = authUserActionClient
	.use(throwSubscriptionError)
	.use(async ({ next, clientInput }) => {
		const formData = clientInput as FormData;

		// Create an object from FormData entries
		const formValues = Object.fromEntries(formData.entries());

		const { data, success } = logoFileFormSchema.safeParse(formValues);

		if (!success) {
			throw new Error("Invalid file provided");
		}

		return next({
			ctx: data,
		});
	})
	.action(async ({ ctx }) => {
		let data;
		let response;
		const { file, image, id } = ctx;

		if (id) {
			data = await getQrCodeWithStyleByUserIdAndId(ctx.user.id!, id);

			// throw an error if no qr code found
			if (!data) throw new Error("No QR Code found with this Id!");
		}

		if (image) {
			response = await updateFile(image, file);
		} else {
			response = await uploadFile(file);
		}

		if (response && data) {
			await updateQrCodeStylelogoById(
				data.qr_code_style.id,
				response.newFileName,
			);
		}

		return { image: response.newFileName };
	});
