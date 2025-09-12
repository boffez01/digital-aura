"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X, Calendar } from "lucide-react"
import Link from "next/link"
import LanguageSelector from "./language-selector"
import { useLanguage } from "../contexts/language-context"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { language } = useLanguage()

  // Rimuoviamo "Home" dai link di navigazione - il logo è il link alla home
  const navigationItems = [
    { key: "services", label: language === "it" ? "Servizi" : "Services", dropdown: true },
    { key: "blog", label: "Blog", href: "/blog" },
    { key: "appointments", label: language === "it" ? "Appuntamenti" : "Appointments", href: "/appointments" },
  ]

  const scrollToSection = (section: string) => {
    setMobileMenuOpen(false)
    const element = document.getElementById(section)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-lg border-b border-slate-700/50 shadow-lg"
    >
      <div className="container mx-auto px-4 lg:px-6 py-4">
        {/* Desktop Layout (lg+) */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo con sfondo per maggiore visibilità */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-3 text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-sm">⚡</span>
              </div>
              <span className="text-2xl font-bold">Digital Aura</span>
            </motion.div>
          </Link>

          {/* Link di Navigazione Centrali */}
          <div className="flex items-center space-x-8">
            {navigationItems.map((item, index) => (
              <motion.div key={item.key}>
                {item.href ? (
                  <Link href={item.href}>
                    <motion.button
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-slate-300 hover:text-white transition-colors font-medium"
                    >
                      {item.label}
                    </motion.button>
                  </Link>
                ) : item.dropdown ? (
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection("services")}
                    className="text-slate-300 hover:text-white transition-colors font-medium flex items-center"
                  >
                    {item.label}
                    <span className="ml-1 text-xs">▼</span>
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.key)}
                    className="text-slate-300 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Lato Destro - Un solo selettore lingua e CTA */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link href="/appointments">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-cyan-500/20">
                  <Calendar className="w-4 h-4 mr-2" />
                  {language === "it" ? "Consulenza Gratuita" : "Free Consultation"}
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Tablet Layout (md to lg) - Ottimizzato per evitare sovrapposizioni */}
        <div className="hidden md:flex lg:hidden items-center justify-between">
          {/* Logo Compatto */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2 text-white p-1 rounded-lg hover:bg-white/10"
            >
              <div className="w-7 h-7 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">⚡</span>
              </div>
              <span className="text-xl font-bold">Digital Aura</span>
            </motion.div>
          </Link>

          {/* Navigation Compatta */}
          <div className="flex items-center space-x-3">
            {navigationItems.slice(0, 2).map((item, index) => (
              <div key={item.key}>
                {item.href ? (
                  <Link href={item.href}>
                    <button className="text-slate-300 hover:text-white transition-colors font-medium text-sm px-2">
                      {item.label}
                    </button>
                  </Link>
                ) : item.dropdown ? (
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-slate-300 hover:text-white transition-colors font-medium text-sm px-2 flex items-center"
                  >
                    {item.label}
                    <span className="ml-1 text-xs">▼</span>
                  </button>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.key)}
                    className="text-slate-300 hover:text-white transition-colors font-medium text-sm px-2"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right Side Compatto */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <Link href="/appointments">
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-3 py-1 rounded-full text-xs"
              >
                <Calendar className="w-3 h-3 mr-1" />
                {language === "it" ? "Consulenza" : "Consultation"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo Mobile */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="flex items-center space-x-2 text-white"
            >
              <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs">⚡</span>
              </div>
              <span className="text-lg font-bold">Digital Aura</span>
            </motion.div>
          </Link>

          {/* Mobile Right Side */}
          <div className="flex items-center space-x-2">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white hover:bg-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-700/50 pt-4"
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.key}>
                  {item.href ? (
                    <Link href={item.href}>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-slate-300 hover:text-white transition-colors font-medium text-left w-full"
                      >
                        {item.label}
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.key)}
                      className="text-slate-300 hover:text-white transition-colors font-medium text-left w-full"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              <Link href="/appointments">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold w-full mt-4">
                  <Calendar className="w-4 h-4 mr-2" />
                  {language === "it" ? "Consulenza Gratuita" : "Free Consultation"}
                </Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}
