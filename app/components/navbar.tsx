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
  const { t, language } = useLanguage()

  const navigationItems = [
    { key: "home", label: "Home", href: "/" },
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
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-600/95 via-blue-600/95 to-purple-800/95 backdrop-blur-lg border-b border-white/10 shadow-lg"
    >
      <div className="container mx-auto px-4 lg:px-6 py-4">
        {/* Desktop Layout */}
        <div className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 text-white"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-purple-300 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">⚡</span>
                </div>
                <span className="text-2xl font-bold">Digital Aura</span>
              </motion.div>
            </Link>
          </div>

          {/* Navigation Links - Centered */}
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
                      className="text-white/90 hover:text-white transition-colors font-medium"
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
                    className="text-white/90 hover:text-white transition-colors font-medium flex items-center"
                  >
                    {item.label}
                    <span className="ml-1">▼</span>
                  </motion.button>
                ) : (
                  <motion.button
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollToSection(item.key)}
                    className="text-white/90 hover:text-white transition-colors font-medium"
                  >
                    {item.label}
                  </motion.button>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Side - Language & CTA */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-white/90">
              <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center">
                <span className="text-xs">🌐</span>
              </div>
              <LanguageSelector />
            </div>
            <Link href="/appointments">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-6 py-2 rounded-full">
                  <Calendar className="w-4 h-4 mr-2" />
                  {language === "it" ? "Consulenza Gratuita" : "Free Consultation"}
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Tablet Layout (md to lg) */}
        <div className="hidden md:flex lg:hidden items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 text-white"
              >
                <div className="w-7 h-7 bg-gradient-to-r from-pink-400 to-purple-300 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">⚡</span>
                </div>
                <span className="text-xl font-bold">Digital Aura</span>
              </motion.div>
            </Link>
          </div>

          {/* Tablet Navigation - Compact */}
          <div className="flex items-center space-x-4">
            {navigationItems.slice(0, 3).map((item, index) => (
              <div key={item.key}>
                {item.href ? (
                  <Link href={item.href}>
                    <button className="text-white/90 hover:text-white transition-colors font-medium text-sm">
                      {item.label}
                    </button>
                  </Link>
                ) : item.dropdown ? (
                  <button
                    onClick={() => scrollToSection("services")}
                    className="text-white/90 hover:text-white transition-colors font-medium text-sm flex items-center"
                  >
                    {item.label}
                    <span className="ml-1 text-xs">▼</span>
                  </button>
                ) : (
                  <button
                    onClick={() => scrollToSection(item.key)}
                    className="text-white/90 hover:text-white transition-colors font-medium text-sm"
                  >
                    {item.label}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Right Side - Compact */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-white/90">
              <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
                <span className="text-xs">🌐</span>
              </div>
              <LanguageSelector />
            </div>
            <Link href="/appointments">
              <Button
                size="sm"
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold px-4 py-1 rounded-full text-xs"
              >
                <Calendar className="w-3 h-3 mr-1" />
                {language === "it" ? "Consulenza" : "Consultation"}
              </Button>
            </Link>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden flex items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
                className="flex items-center space-x-2 text-white"
              >
                <div className="w-6 h-6 bg-gradient-to-r from-pink-400 to-purple-300 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xs">⚡</span>
                </div>
                <span className="text-lg font-bold">Digital Aura</span>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Right Side */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 text-white/90">
              <div className="w-4 h-4 rounded-full border border-white/30 flex items-center justify-center">
                <span className="text-xs">🌐</span>
              </div>
              <LanguageSelector />
            </div>
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
            className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4"
          >
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <div key={item.key}>
                  {item.href ? (
                    <Link href={item.href}>
                      <button
                        onClick={() => setMobileMenuOpen(false)}
                        className="text-white/90 hover:text-white transition-colors font-medium text-left w-full"
                      >
                        {item.label}
                      </button>
                    </Link>
                  ) : (
                    <button
                      onClick={() => scrollToSection(item.key)}
                      className="text-white/90 hover:text-white transition-colors font-medium text-left w-full"
                    >
                      {item.label}
                    </button>
                  )}
                </div>
              ))}
              <Link href="/appointments">
                <Button className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold w-full mt-4">
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
