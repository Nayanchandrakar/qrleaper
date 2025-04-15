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

import { createQrCodeYoutubeAction } from "@/app/actions/pages/design/youtube/create-youtube-qr-code-action";
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card";
import { QrControls } from "@/components/forms/pages/design/qr-style/qr-controls";
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form";
import { Input } from "@/components/ui/input";
import { StepLabel } from "@/components/ui/step-label";
import { colorsList } from "@/constants/qr/colors";
import { useYoutubeFormPersist } from "@/hooks/forms/design/useYoutubeFormPersist";
import { useQrDataContext } from "@/hooks/qr/useQrDataContext";
import {
	youtubeFormSchema,
	youtubeFormSchemaType,
} from "@/zod/forms/youtube/youtube-form-schema";

export const YoutubeForm = () => {
	const router = useRouter();
	const { setData } = useQrDataContext();

	const { executeAsync, isExecuting } = useAction(createQrCodeYoutubeAction, {
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

	const form = useForm<youtubeFormSchemaType>({
		resolver: zodResolver(youtubeFormSchema),
		defaultValues: {
			title: "",
			youtubeUrl: "",
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

	useYoutubeFormPersist(form);

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
							name="youtubeUrl"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Youtube Video</FormLabel>
									<FormControl>
										<Input
											type="url"
											placeholder="https://www.youtube.com/adson-videos"
											{...field}
										/>
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
