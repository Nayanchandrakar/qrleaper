"use client";

import { useEffect } from "react";

interface RedirectPageProps {
	searchParams: {
		endpoint: string;
	};
}

const RedirectPage = ({ searchParams }: RedirectPageProps) => {
	useEffect(() => {
		if (typeof window !== undefined && searchParams?.endpoint) {
			window.location.assign(searchParams.endpoint);
		}
	});

	return "";
};

export default RedirectPage;
