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

interface SocialMediaProfileSectionProps {
	isExecuting?: boolean;
}

export const SocialMediaProfileSection = ({
	isExecuting = false,
}: SocialMediaProfileSectionProps) => {
	const form = useFormContext();

	return (
		<AccordionItem className="border-b-0" value="social-media-profile">
			<AccordionTrigger className="px-2 rounded-lg  bg-gray-100 text-gray-500 hover:no-underline">
				Social Media Profiles
			</AccordionTrigger>
			<AccordionContent className="pt-4 px-2 space-y-6">
				<div className="flex items-center sm:flex-row flex-col gap-4 sm:gap-3 ">
					<FormField
						control={form.control}
						name="linkedin"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Linkedin</FormLabel>
								<FormControl>
									<Input
										type="url"
										placeholder="Your Linkedin Url (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="twitter"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Twitter (x.com)</FormLabel>
								<FormControl>
									<Input
										type="url"
										placeholder="Your Twitter Url (optional)"
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
						control={form.control}
						name="instagram"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Instagram</FormLabel>
								<FormControl>
									<Input
										type="url"
										placeholder="Your Instagram Url (optional)"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="facebook"
						disabled={isExecuting}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Facebook</FormLabel>
								<FormControl>
									<Input
										type="url"
										placeholder="Your Facebook Url (optional)"
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
