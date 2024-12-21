import Link from "next/link"

import { VcardInfo } from "@/components/pages/vcard/vcard-info"

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

          <Link href={link} className="w-fit" target="_blank">
            <VcardInfo.SubDescription className="text-green-600">
              {link}
            </VcardInfo.SubDescription>
          </Link>
        </VcardInfo.GridWrap>
      )}
    </>
  )
}

TextComponent.Link.displayName = "TextComponent.Link"
