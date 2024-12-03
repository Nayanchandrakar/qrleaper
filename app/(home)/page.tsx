"use client"
import { signOut } from "next-auth/react"
import { Button } from "@/components/ui/button"

const HomePage = () => {
  return (
    <div>
      <Button
        onClick={async () => {
          await signOut()
        }}
      >
        Sign out
      </Button>
    </div>
  )
}

export default HomePage
