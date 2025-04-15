"use client";
import { CloudUpload, Loader } from "lucide-react";

interface UploadthingProps {
	isExecuting: boolean;
	fileName: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	footerText: string;
	accept: string;
	htmlFor: string;
}

export const Uploadthing = ({
	fileName,
	footerText,
	isExecuting,
	onChange,
	accept,
	htmlFor,
}: UploadthingProps) => {
	return (
		<div>
			<label
				htmlFor={htmlFor}
				className="flex h-50 p-12 w-full cursor-pointer items-center justify-center rounded-lg bg-gray-50 border border-gray-200 transition-colors duration-200 hover:bg-gray-100 flex-col gap-2"
			>
				<input
					name="file"
					id={htmlFor}
					type="file"
					hidden
					accept={accept}
					onChange={onChange}
					disabled={isExecuting}
				/>

				{isExecuting ? (
					<Loader className="animate-spin text-gray-600 size-6" />
				) : (
					<CloudUpload className="size-8 stroke-gray-500" />
				)}
				<p className="text-sm font-semibold text-gray-900 transition-colors duration-200 hover:text-green-600">
					{isExecuting ? "Uploading..." : fileName || "Click to upload a file"}
				</p>
				{!isExecuting && (
					<p className="text-xs font-medium ">Allowed content</p>
				)}
			</label>
			<p className="mt-2 text-xs text-gray-500 font-medium">{footerText}</p>
		</div>
	);
};
