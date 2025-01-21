import Link from "next/link"

import { VcardInfo } from "@/components/templates/vcard/helpers/vcard-info"

interface TextComponentProps {
  text: string
  value: string | null
}

export const TextComponent: React.FC<TextComponentProps> & {
  Link: React.FC<{ text: string; link: string | null }>
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
  )
}

TextComponent.displayName = "TextComponent"

TextComponent.Link = ({
  text,
  link,
}: {
  text: string
  link: string | null
}) => {
  return (
    <>
      {link && (
        <VcardInfo.GridWrap>
          <VcardInfo.SubTitle>{text}</VcardInfo.SubTitle>

          <Link
            href={link}
            className="w-fit text-sm font-medium  text-green-600 break-all"
            target="_blank"
          >
            {link}
          </Link>
        </VcardInfo.GridWrap>
      )}
    </>
  )
}

TextComponent.Link.displayName = "TextComponent.Link"
