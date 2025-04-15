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

import {
	designFormSchema,
	designFormSchemaType,
} from "@/zod/forms/design/design-form-schema";

import { createQrCodeAction } from "@/app/actions/pages/design/create-qr-code-action";
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card";
import { QrControls } from "@/components/forms/pages/design/qr-style/qr-controls";
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form";
import { Input } from "@/components/ui/input";
import { StepLabel } from "@/components/ui/step-label";
import { appUrl } from "@/constants/config";
import { colorsList } from "@/constants/qr/colors";
import { useDesignFormPersist } from "@/hooks/forms/design/useDesignFormPersist";
import { useQrDataContext } from "@/hooks/qr/useQrDataContext";

export const DesignForm = () => {
	const router = useRouter();
	const { setData } = useQrDataContext();

	const form = useForm<designFormSchemaType>({
		resolver: zodResolver(designFormSchema),
		defaultValues: {
			title: "",
			link: "",
			style: {
				bottomInput: "",
				image: "",
				topInput: "",
				colors: [colorsList[0]],
				colorType: "linear",
				rotation: 0,
				hasFrame: false,
				shape: "square",
			},
		},
	});

	const { executeAsync, isExecuting } = useAction(createQrCodeAction, {
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

	// For Persisting the form data in localStorage
	useDesignFormPersist(form);

	return (
		<FormProvider {...form}>
			<form
				onSubmit={form.handleSubmit(executeAsync)}
				className="grid grid-cols-1 gap-8 lg:grid-cols-2"
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

						<FormField
							control={form.control}
							name="link"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Link</FormLabel>
									<FormControl>
										<Input type="url" placeholder={appUrl} {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<QrControls isExecuting={isExecuting} />
					</div>
					<QrStyleForm />
				</div>
				<PreviewQrCard />
			</form>
		</FormProvider>
	);
};
