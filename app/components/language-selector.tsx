"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

export default function LanguageSelector({ isAppointmentsPage = false }: { isAppointmentsPage?: boolean }) {
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
        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 border backdrop-blur-sm shadow-lg ${
          isAppointmentsPage
            ? "bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300 hover:border-cyan-500"
            : "bg-slate-800/90 hover:bg-slate-700/90 text-slate-200 border-slate-600/50 hover:border-cyan-400/50"
        }`}
      >
        <Globe className={`w-4 h-4 ${isAppointmentsPage ? "text-cyan-600" : "text-cyan-400"}`} />
        <span className={`text-sm font-medium ${isAppointmentsPage ? "text-gray-700" : "text-slate-200"}`}>
          {currentLanguage?.code.toUpperCase()}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className={`w-4 h-4 ${isAppointmentsPage ? "text-gray-600" : "text-slate-400"}`}
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
              className={`absolute top-full left-0 mt-2 backdrop-blur-md rounded-lg shadow-2xl border overflow-hidden z-50 min-w-[180px] ${
                isAppointmentsPage ? "bg-white border-gray-300" : "bg-slate-800/95 border-slate-600/50"
              }`}
            >
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code as "en" | "it")
                    setIsOpen(false)
                  }}
                  className={`flex items-center justify-between px-4 py-3 w-full text-left cursor-pointer transition-all duration-200 ${
                    isAppointmentsPage
                      ? language === lang.code
                        ? "bg-cyan-50 text-cyan-700 border-l-4 border-cyan-600"
                        : "text-gray-700 hover:bg-gray-100 hover:text-cyan-600"
                      : language === lang.code
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
                      className={`w-2 h-2 rounded-full shadow-lg ${
                        isAppointmentsPage ? "bg-cyan-600 shadow-cyan-600/50" : "bg-cyan-400 shadow-cyan-400/50"
                      }`}
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
