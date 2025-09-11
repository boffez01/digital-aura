"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface BackToMenuProps {
  onBack?: () => void
  label?: string
}

export default function BackToMenu({ onBack, label = "Back to Menu" }: BackToMenuProps) {
  const router = useRouter()

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      router.push("/")
    }
  }

  return (
    <Button
      onClick={handleBack}
      variant="outline"
      size="sm"
      className="mb-4 hover:bg-gray-50 transition-colors bg-transparent"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Button>
  )
}

// Named export for compatibility
export { BackToMenu }
