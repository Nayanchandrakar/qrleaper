"use server";
import { eq } from "drizzle-orm";

import { updateFile, uploadFile } from "@/app/actions/file/utils";
import { getQrCodeByUserIdAndIdWithType } from "@/app/actions/utils";
import { db } from "@/database/db";
import { qrCode } from "@/database/schema";
import { qrFile } from "@/database/schema/qr-variations";
import { authUserActionClient } from "@/lib/action/safe-action";
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error";
import { getFileDbEndpointURL } from "@/utils";
import { fileUploadFormSchema } from "@/zod/forms/file/file-form-schema";

export const fileUploadAction = authUserActionClient
	.use(async ({ next, clientInput }) => {
		const formData = clientInput as FormData;

		// Create an object from FormData entries
		const formValues = Object.fromEntries(formData.entries());

		const { data, success } = fileUploadFormSchema.safeParse(formValues);

		if (!success) {
			throw new Error("Invalid file provided");
		}

		return next({
			ctx: data,
		});
	})
	.use(throwSubscriptionError)
	.action(async ({ ctx }) => {
		let data;
		let response;

		const { file, fileName, id } = ctx;

		if (id) {
			data = await getQrCodeByUserIdAndIdWithType(ctx.user.id!, id, "file");
			// throw an error if no qr code found
			if (!data) throw new Error("No QR Code found with this Id!");
		}

		if (fileName) {
			response = await updateFile(fileName, file);
		} else {
			response = await uploadFile(file);
		}

		if (response && data) {
			await db.transaction(async (tx) => {
				await tx
					.update(qrCode)
					.set({ endpoint: getFileDbEndpointURL(response.newFileName) })
					.where(eq(qrCode.id, data.id)),
					await tx
						.update(qrFile)
						.set({ fileId: response.newFileName })
						.where(eq(qrFile.qrCodeId, data.id));
			});
		}

		return { file: response.newFileName };
	});
