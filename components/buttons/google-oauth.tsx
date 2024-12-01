"use client"
import { Button } from "@/components/ui/button"
import { Icons } from "@/components/shared/icons"

interface GoogleOauthProps {}

const GoogleOauth = ({}: GoogleOauthProps) => {
  return (
    <Button variant="outline" className="w-full hover:bg-gray-50">
      <Icons.google className="size-4 mr-1" />
      Continue with Google
    </Button>
  )
}

export default GoogleOauth
