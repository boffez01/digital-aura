"use client"

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { useLanguage } from "../contexts/language-context"

export default function BackToMenu() {
  const router = useRouter()
  const { language } = useLanguage()

  const handleBackToMenu = () => {
    router.push("/")
  }

  return (
    <div className="mb-8">
      <Button
        onClick={handleBackToMenu}
        variant="outline"
        className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {language === "it" ? "Torna al Menu" : "Back to Menu"}
      </Button>
    </div>
  )
}
