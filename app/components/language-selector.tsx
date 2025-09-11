"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Globe } from "lucide-react"
import { useLanguage } from "../contexts/language-context"
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select"

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const languages = [
    { code: "it", name: "Italiano", flag: "🇮🇹", display: "IT Italiano" },
    { code: "en", name: "English", flag: "🇺🇸", display: "US English" },
  ]

  const currentLanguage = languages.find((lang) => lang.code === language)

  return (
    <div className="relative">
      <Select value={language} onValueChange={(value: "en" | "it") => setLanguage(value)}>
        <SelectTrigger className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white border border-white/20 w-auto min-w-[120px]">
          <Globe className="w-4 h-4" />
          <span className="text-sm font-medium">{currentLanguage?.code.toUpperCase()}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </SelectTrigger>
        <SelectContent className="bg-white rounded-lg shadow-xl border border-gray-200 overflow-hidden z-50 min-w-[160px]">
          {languages.map((lang) => (
            <SelectItem
              key={lang.code}
              value={lang.code}
              className={`flex items-center space-x-3 px-4 py-3 cursor-pointer transition-colors ${
                language === lang.code ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-50"
              }`}
            >
              <div className="flex items-center space-x-3 w-full">
                <span className="text-lg">{lang.flag}</span>
                <span className="font-medium">{lang.display}</span>
                {language === lang.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-auto w-2 h-2 bg-blue-600 rounded-full"
                  />
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
