"use server";

import { uploadBulkFiles, uploadFile } from "@/app/actions/file/utils";
import { incrementQrSubscriptionCountByUserId } from "@/app/actions/helpers/subscription/utils";
import { db } from "@/database/db";
import { qrCode, qrCodeStyle } from "@/database/schema";
import { qrVirtualCard } from "@/database/schema/qr-variations";
import { authUserActionClient } from "@/lib/action/safe-action";
import { throwSubscriptionError } from "@/lib/action/throw-subscription-error";
import { throwUserNameError } from "@/lib/action/throw-user-name-error";
import { colorType } from "@/types/type";
import { getEndpointURL, getVcardDbEndpointURL } from "@/utils";
import { virtualCardFormSchema } from "@/zod/forms/vcard/virtual-card-form-schema";
import { revalidatePath } from "next/cache";

export const createVcardQrCodeAction = authUserActionClient
	.use(async ({ next, clientInput }) => {
		// @ts-ignore
		const { formData, ...inputData } = clientInput;

		const { data, success } = virtualCardFormSchema.safeParse({
			profileImage: formData.get("profileImage"),
			images: formData.getAll("images"),
			...inputData,
		});

		if (!success) throw new Error("Invalid Input Provided");

		return next({
			ctx: { parsedInput: data },
		});
	})
	.use(throwSubscriptionError)
	.use(async ({ next, ctx }) => throwUserNameError({ next, ctx }))
	.action(async ({ ctx }) => {
		const { parsedInput, user } = ctx;

		const profileImageResponse = await uploadFile(parsedInput.profileImage);

		if (!profileImageResponse?.newFileName) {
			throw new Error("Profile image upload failed!");
		}

		const imageLinks = parsedInput.images?.length
			? await uploadBulkFiles(parsedInput.images)
			: [];

		const { title, style, ...remainingInput } = parsedInput;

		const qrCodeId = await db.transaction(async (tx) => {
			const [qrCodeRecord] = await tx
				.insert(qrCode)
				.values({
					title,
					type: "vcard",
					userId: user.id!,
				})
				.returning({ id: qrCode.id });

			const qrCodeId = qrCodeRecord.id;

			await Promise.all([
				tx.insert(qrVirtualCard).values({
					...remainingInput,
					images: imageLinks,
					profileImage: profileImageResponse.newFileName,
					qrCodeId,
				}),

				tx.insert(qrCodeStyle).values({
					qrCodeId,
					colors: style.colors,
					colorType: style.colorType as colorType,
					rotation: style.rotation,
					shape: style.shape,
					hasFrame: !!style.hasFrame,
					...(style.bottomInput && { bottomText: style.bottomInput }),
					...(style.topInput && { topText: style.topInput }),
					...(style.image && { logo: style.image }),
				}),
			]);

			incrementQrSubscriptionCountByUserId(user.id!);

			return qrCodeId;
		});

		await db.update(qrCode).set({
			endpoint: getVcardDbEndpointURL(qrCodeId),
		});

		revalidatePath("/dashboard/qr-codes");

		return { endpoint: getEndpointURL(qrCodeId) as string };
	});
