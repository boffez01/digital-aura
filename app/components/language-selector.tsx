"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

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
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-slate-800/90 hover:bg-slate-700/90 transition-all duration-200 text-slate-200 border border-slate-600/50 hover:border-cyan-400/50 backdrop-blur-sm shadow-lg"
      >
        <Globe className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-medium text-slate-200">{currentLanguage?.code.toUpperCase()}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-4 h-4 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 bg-slate-800/95 backdrop-blur-md rounded-lg shadow-2xl border border-slate-600/50 overflow-hidden z-50 min-w-[180px]"
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as "en" | "it")
                    setIsOpen(false)
                  }}
                  className={`flex items-center justify-between px-4 py-3 w-full text-left cursor-pointer transition-all duration-200 ${
                    language === lang.code
                      ? "bg-cyan-500/20 text-cyan-300 border-l-4 border-cyan-400"
                      : "text-slate-300 hover:bg-slate-700/50 hover:text-cyan-200"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.display}</span>
                  </div>
                  {language === lang.code && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-2 h-2 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400/50"
                    />
                  )}
                </button>
              ))}
            </motion.div>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
