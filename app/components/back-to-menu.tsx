"use client"

import { useLanguage } from "@/app/contexts/language-context"
import { Button } from "@/components/ui/button"
import { ChevronLeft, Home } from "lucide-react"
import Link from "next/link"

export function BackToMenu() {
  const { language } = useLanguage()

  return (
    <div className="py-4 px-6">
      <Button variant="ghost" size="sm" asChild className="flex items-center gap-2 hover:bg-gray-100">
        <Link href="/">
          <ChevronLeft className="h-4 w-4" />
          <Home className="h-4 w-4 mr-1" />
          {language === "it" ? "Torna al Menu" : "Back to Menu"}
        </Link>
      </Button>
    </div>
  )
}
