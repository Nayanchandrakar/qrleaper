import "server-only";

import type { qrType } from "@/types/db-types";

export const getEndpointURL = (id: string) => {
	return `${process.env.APP_URL}/link?id=${id}`;
};

export const getvCardCopyEndpointURL = (userName: string) => {
	return `${process.env.APP_URL}/vcard/${userName}`;
};

export const getEditURL = (type: qrType, id: string) => {
	return `${process.env.APP_URL}/${id}/edit/${type === "link" ? "" : type}`;
};
export const getAnalyticsURL = (id: string) => {
	return `${process.env.APP_URL}/dashboard/analytics/${id}`;
};

export const getMessageDbEndpointURL = (
	phoneNumber: string,
	message?: string,
) => {
	if (message?.length! > 1) {
		return `sms:${phoneNumber}?&body=${encodeURIComponent(message!)}`;
	}
	return `sms:${phoneNumber}?&body=messagehere`;
};

export const getEmailDbEndpointURL = (
	email: string,
	subject?: string,
	message?: string,
) => {
	return `mailto:${email}?subject=${encodeURIComponent(
		subject!,
	)}&body=${encodeURIComponent(message!)}`;
};

export const getInstagramDbEndpointURL = (id: string) => {
	return `https://www.instagram.com/${id?.substring(1)}`;
};

export const getFileDbEndpointURL = (fileName: string) => {
	return `${process.env.APP_URL}/api/view?fileName=${fileName}&download=true`;
};

export const getVcardDbEndpointURL = (id: string) => {
	return `${process.env.APP_URL}/profile/vcard/${id}`;
};

export function absoluteUrl(path: string) {
	return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}
