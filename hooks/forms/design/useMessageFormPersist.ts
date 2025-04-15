"use client";

import useFormPersist from "react-hook-form-persist";
import { useIsClient } from "usehooks-ts";

import { formType } from "@/types/type";

export const useMessageFormPersist = (form: formType) => {
	const isClient = useIsClient();

	useFormPersist("message-form", {
		watch: isClient ? form.watch : () => {},
		setValue: isClient ? form.setValue : () => {},
		storage: isClient ? window.localStorage : undefined,
	});
};
