"use client"

import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { useLanguage } from "../contexts/language-context"

interface BackToMenuProps {
  href?: string
}

export default function BackToMenu({ href = "/" }: BackToMenuProps) {
  const router = useRouter()
  const { language } = useLanguage()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <Button
      variant="ghost"
      onClick={handleClick}
      className="mb-6 text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all duration-200"
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {language === "it" ? "Torna al Menu" : "Back to Menu"}
    </Button>
  )
}
