import Link from "next/link";

import { VcardInfo } from "@/components/templates/vcard/helpers/vcard-info";
import { cn } from "@/lib/utils";

interface TextComponentProps {
	text: string;
	value: string | null;
}

export const TextComponent: React.FC<TextComponentProps> & {
	Link: React.FC<{ text: string; link: string | null; linkClassName?: string }>;
} = ({ text, value }: TextComponentProps) => {
	return (
		<>
			{value && (
				<VcardInfo.GridWrap>
					<VcardInfo.SubTitle>{text}</VcardInfo.SubTitle>
					<VcardInfo.SubDescription>{value}</VcardInfo.SubDescription>
				</VcardInfo.GridWrap>
			)}
		</>
	);
};

TextComponent.displayName = "TextComponent";

TextComponent.Link = ({
	text,
	link,
	linkClassName,
}: {
	text: string;
	link: string | null;
	linkClassName?: string;
}) => {
	return (
		<>
			{link && (
				<VcardInfo.GridWrap>
					<VcardInfo.SubTitle>{text}</VcardInfo.SubTitle>

					<Link
						href={link}
						className={cn(
							"w-fit break-all font-medium text-green-600 text-sm",
							linkClassName,
						)}
						target="_blank"
					>
						{link}
					</Link>
				</VcardInfo.GridWrap>
			)}
		</>
	);
};

TextComponent.Link.displayName = "TextComponent.Link";
