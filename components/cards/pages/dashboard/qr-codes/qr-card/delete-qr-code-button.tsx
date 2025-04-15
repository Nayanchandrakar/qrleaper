import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";

import { deleteQrCodeAction } from "@/app/actions/pages/dashboard/qr-codes/delete-qr-code";
import { Button } from "@/components/ui/button";
import { Loader, Trash } from "lucide-react";

interface DeleteQrCodeButtonProps {
	id: string;
}

export const DeleteQrCodeButton = ({ id }: DeleteQrCodeButtonProps) => {
	const { executeAsync, isExecuting } = useAction(deleteQrCodeAction, {
		onSuccess: () => toast.success("Succefully deleted QR Code!"),
		onError: ({ error }) => {
			toast.error(error.serverError);
		},
	});

	return (
		<Button
			onClick={() => executeAsync({ id })}
			className="absolute top-4 right-4 transition duration-200 opacity-0 group-hover:opacity-100"
			variant="destructive"
			size="icon"
			disabled={isExecuting}
		>
			{isExecuting ? (
				<Loader className="animate-spin size-4" />
			) : (
				<Trash className="size-4" />
			)}
		</Button>
	);
};
