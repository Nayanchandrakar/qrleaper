"use client";

import { Camera, User } from "lucide-react";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { setValueConfig } from "@/constants/react-hook";
import { getProfileImage } from "@/utils/client";

interface VcardProfileImageUploadFormProps {
	isExecuting?: boolean;
}

export const VcardProfileImageUploadForm = ({
	isExecuting = false,
}: VcardProfileImageUploadFormProps) => {
	const { control, getValues, setValue } = useFormContext();
	const imageSrc = getValues("profileImage");

	// Memoize the profile image URL to prevent unnecessary re-renders
	const profileImageUrl = useMemo(() => getProfileImage(imageSrc), [imageSrc]);

	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			const file = e.target.files[0];
			setValue("profileImage", file, setValueConfig);
		}
	};

	return (
		<div className="flex items-start w-full" style={{ marginTop: "1rem" }}>
			<FormField
				control={control}
				name="profileImage"
				disabled={isExecuting}
				render={({ field: { value, onChange, ...fieldProps } }) => (
					<FormItem className="flex items-center justify-center flex-col">
						<FormLabel className="w-fit flex items-center justify-center flex-col gap-2">
							<Avatar className="size-20 relative group cursor-pointer">
								<AvatarImage
									className="object-cover"
									src={profileImageUrl} // Use the memoized URL
								/>
								<span className="w-full h-7 bg-black/20 backdrop-blur-sm absolute -bottom-[5rem] flex item-center justify-center group-hover:bottom-0 transition-all duration-200">
									<Camera className="text-white size-4 mt-1" />
								</span>
								<AvatarFallback className="flex items-center justify-center">
									<User className="size-8 text-gray-500" />
								</AvatarFallback>
							</Avatar>
						</FormLabel>

						<FormControl>
							<input
								hidden
								{...fieldProps}
								type="file"
								accept="image/*"
								onChange={handleOnChange}
							/>
						</FormControl>
						<FormDescription>Profile Image</FormDescription>
						<FormMessage className="text-center" />
					</FormItem>
				)}
			/>
		</div>
	);
};
