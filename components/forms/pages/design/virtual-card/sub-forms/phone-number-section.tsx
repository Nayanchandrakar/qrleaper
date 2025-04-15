"use client";

import { useFormContext } from "react-hook-form";

import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";

import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

interface PhoneNumberSectionProps {
	isExecuting?: boolean;
}

export const PhoneNumberSection = ({
	isExecuting = false,
}: PhoneNumberSectionProps) => {
	const { control } = useFormContext();

	return (
		<AccordionItem className="border-b-0" value="phone-number">
			<AccordionTrigger className="px-2 rounded-lg  bg-gray-100 text-gray-500 hover:no-underline">
				Phone Numbers
			</AccordionTrigger>
			<AccordionContent className="pt-4 px-2 space-y-6">
				<div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
					<FormField
						control={control}
						name="mobileNumber"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Mobile Number</FormLabel>
								<FormControl>
									<Input
										type="tel"
										placeholder="Your Mobile Number (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="workNumber"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Work Number</FormLabel>
								<FormControl>
									<Input
										type="tel"
										placeholder="Work Number (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
					<FormField
						control={control}
						name="whatsappNumber"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Whatsapp Number</FormLabel>
								<FormControl>
									<Input
										type="tel"
										placeholder="Your Whatsapp Number (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={control}
						name="faxNumber"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Fax Number</FormLabel>
								<FormControl>
									<Input
										type="tel"
										placeholder="Your Fax Number (optional)"
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
