"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAction } from "next-safe-action/hooks";
import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { updateQrCodeMessageAction } from "@/app/actions/pages/edit/message/update-message-qr-code-action";
import { PreviewQrCard } from "@/components/cards/pages/design/preview-qr-card";
import { QrStyleForm } from "@/components/forms/pages/design/qr-style/qr-style-form";
import { QrEditControl } from "@/components/forms/pages/edit/design/qr-edit-controls";
import { Input } from "@/components/ui/input";
import { StepLabel } from "@/components/ui/step-label";
import { Textarea } from "@/components/ui/textarea";
import { useQrDataContext } from "@/hooks/qr/useQrDataContext";
import type { editQrMessageType } from "@/types/type";
import {
	messageEditFormSchema,
	type messageEditFormSchemaType,
} from "@/zod/pages/edit/message/message-edit-form-schema";

interface MessageEditFormProps {
	qrCode: editQrMessageType;
	endpoint: string;
}

export const MessageEditForm = ({ qrCode, endpoint }: MessageEditFormProps) => {
	const { setData } = useQrDataContext();

	const { executeAsync, isExecuting } = useAction(updateQrCodeMessageAction, {
		onSuccess: () => {
			toast.success("Successfully updated a QR Code");
		},
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	const form = useForm<messageEditFormSchemaType>({
		resolver: zodResolver(messageEditFormSchema),
		defaultValues: qrCode,
	});

	useEffect(() => {
		if (endpoint) {
			setData(endpoint);
		}
	}, [endpoint, setData]);

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
							<StepLabel.Title>Edit the content</StepLabel.Title>
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
							name="phoneNumber"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Phone Number</FormLabel>
									<FormControl>
										<Input
											type="tel"
											placeholder="(5555) 5555-5555"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="message"
							disabled={isExecuting}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Message</FormLabel>
									<FormControl>
										<Textarea
											placeholder="Enter your text message here (optional)"
											{...field}
											maxLength={256}
											className="h-32"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<QrEditControl
							isExecuting={isExecuting}
							isEditable={
								JSON.stringify(form.getValues()) === JSON.stringify(qrCode)
							}
						/>
					</div>
					<QrStyleForm />
				</div>
				<PreviewQrCard />
			</form>
		</FormProvider>
	);
};
