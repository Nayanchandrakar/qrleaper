"use client";

import { useFormContext } from "react-hook-form";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

interface EmailAddressSectionProps {
	isExecuting?: boolean;
}

export const EmailAddressSection = ({
	isExecuting = false,
}: EmailAddressSectionProps) => {
	const { control } = useFormContext();

	return (
		<AccordionItem className="border-b-0" value="email-address-section">
			<AccordionTrigger className="rounded-lg bg-gray-100 px-2 text-gray-500 hover:no-underline">
				Email Addresses
			</AccordionTrigger>
			<AccordionContent className="space-y-6 px-2 pt-4">
				<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3 ">
					<FormField
						control={control}
						name="personalEmail"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Personal Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Personal Email address (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="workEmail"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Work Email</FormLabel>
								<FormControl>
									<Input
										type="email"
										placeholder="Your Work Email (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
			</AccordionContent>
		</AccordionItem>
	);
};
