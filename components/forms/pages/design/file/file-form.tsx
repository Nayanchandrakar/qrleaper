"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { createFileQrCodeAction } from "@/app/actions/pages/design/file/create-file-qr-code-action";
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card";
import { FileUploadForm } from "@/components/forms/pages/design/file/file-upload-form";
import { QrControls } from "@/components/forms/pages/design/qr-style/qr-controls";
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form";
import { Input } from "@/components/ui/input";
import { StepLabel } from "@/components/ui/step-label";
import { colorsList } from "@/constants/qr/colors";
import { useFileFormPersist } from "@/hooks/forms/design/useFileFormPersist";
import { useQrDataContext } from "@/hooks/qr/useQrDataContext";
import {
	fileFormSchema,
	fileFormSchemaType,
} from "@/zod/forms/file/file-form-schema";

export const FileForm = () => {
	const router = useRouter();
	const { setData } = useQrDataContext();

	const form = useForm<fileFormSchemaType>({
		resolver: zodResolver(fileFormSchema),
		defaultValues: {
			title: "",
			fileName: "",
			style: {
				bottomInput: "",
				image: "",
				topInput: "",
				hasFrame: false,
				colors: [colorsList[0]],
				colorType: "linear",
				rotation: 0,
				shape: "square",
			},
		},
	});

	// Server action for storing the  file upload data in the database
	const { executeAsync, isExecuting } = useAction(createFileQrCodeAction, {
		onSuccess: ({ data }) => {
			setData(data?.endpoint!);
			form.reset();
			toast.success("Successfully created a QR Code");
			router.push("/dashboard/qr-codes");
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	useFileFormPersist(form);

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(executeAsync)}
				className="grid grid-cols-1 lg:grid-cols-2 gap-8"
			>
				{/* main form  */}
				<div>
					<div className="space-y-4">
						<StepLabel className="mt-3">
							<StepLabel.Counter>1</StepLabel.Counter>
							<StepLabel.Title>Complete the content</StepLabel.Title>
						</StepLabel>

						<FormField
							control={form.control}
							name="title"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem>
									<FormLabel>QR title</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="example:StarBucks"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FileUploadForm />
						<QrControls isExecuting={isExecuting} />
					</div>
					<QrStyleForm />
				</div>
				<PreviewQrCard />
			</form>
		</FormProvider>
	);
};
