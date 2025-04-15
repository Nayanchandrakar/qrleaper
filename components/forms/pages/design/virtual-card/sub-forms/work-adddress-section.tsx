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

interface WorkAddressSectionProps {
	isExecuting?: boolean;
}

export const WorkAddressSection = ({
	isExecuting = false,
}: WorkAddressSectionProps) => {
	const form = useFormContext();

	return (
		<AccordionItem className="border-b-0" value="work-address">
			<AccordionTrigger className="rounded-lg bg-gray-100 px-2 text-gray-500 hover:no-underline">
				Work Address
			</AccordionTrigger>
			<AccordionContent className="space-y-6 px-2 pt-4">
				<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3 ">
					<FormField
						control={form.control}
						name="workStreet"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Street Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Street Name (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="workCity"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>City Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Your City Name (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-3 ">
					<FormField
						control={form.control}
						name="workState"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>State Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Your State Name (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="workZip"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Zip Code</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Your Zip Code (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div>
					<FormField
						control={form.control}
						name="workCountry"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem>
								<FormLabel>Country Name</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Your Country Name (optional)"
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
