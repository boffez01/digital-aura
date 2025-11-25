"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "../contexts/language-context"
import LanguageSelector from "./language-selector"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { language } = useLanguage()
  const pathname = usePathname()
  const isAppointmentsPage = pathname === "/appointments"

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    {
      href: "/",
      label: language === "it" ? "Home" : "Home",
    },
    {
      href: "#services",
      label: language === "it" ? "Servizi" : "Services",
    },
    {
      href: "#contact",
      label: language === "it" ? "Contatti" : "Contact",
    },
  ]

  const scrollToSection = (href: string) => {
    if (href.startsWith("#")) {
      const element = document.getElementById(href.substring(1))
      element?.scrollIntoView({ behavior: "smooth" })
    }
    setIsOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isAppointmentsPage
          ? "bg-white border-b border-gray-200 shadow-sm"
          : scrolled
            ? "bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 shadow-lg"
            : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo SVG */}
          <Link href="/" className="group">
            <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} className="relative h-10 w-auto">
              <Image
                src="/praxis-futura-logo.png"
                alt="Praxis Futura"
                width={280}
                height={40}
                className={`h-10 w-auto object-contain transition-all duration-300 ${
                  isAppointmentsPage ? "brightness-0 saturate-100" : ""
                }`}
                priority
              />
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {item.href.startsWith("#") ? (
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className={`${
                      isAppointmentsPage ? "text-gray-700 hover:text-cyan-600" : "text-slate-300 hover:text-cyan-400"
                    } transition-colors font-medium relative group`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                        isAppointmentsPage ? "bg-cyan-600" : "bg-cyan-400"
                      } transition-all duration-300 group-hover:w-full`}
                    ></span>
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`${
                      isAppointmentsPage ? "text-gray-700 hover:text-cyan-600" : "text-slate-300 hover:text-cyan-400"
                    } transition-colors font-medium relative group`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 w-0 h-0.5 ${
                        isAppointmentsPage ? "bg-cyan-600" : "bg-cyan-400"
                      } transition-all duration-300 group-hover:w-full`}
                    ></span>
                  </Link>
                )}
              </motion.div>
            ))}
          </div>

          {/* Right Side - Language Selector & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <LanguageSelector isAppointmentsPage={isAppointmentsPage} />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/appointments">
                <Button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-6 py-2 rounded-full shadow-lg shadow-cyan-500/20 transition-all duration-300">
                  {language === "it" ? "Prenota Consulenza" : "Book Consultation"}
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <LanguageSelector isAppointmentsPage={isAppointmentsPage} />
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className={`${
                isAppointmentsPage ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-slate-800/50"
              } p-2 rounded-lg transition-colors`}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className={`md:hidden ${
                isAppointmentsPage
                  ? "bg-white border-t border-gray-200"
                  : "bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50"
              } overflow-hidden`}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item.href.startsWith("#") ? (
                      <button
                        onClick={() => scrollToSection(item.href)}
                        className={`block w-full text-left ${
                          isAppointmentsPage
                            ? "text-gray-700 hover:text-cyan-600 hover:bg-gray-100"
                            : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                        } transition-colors font-medium py-2 px-4 rounded-lg`}
                      >
                        {item.label}
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={`block ${
                          isAppointmentsPage
                            ? "text-gray-700 hover:text-cyan-600 hover:bg-gray-100"
                            : "text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50"
                        } transition-colors font-medium py-2 px-4 rounded-lg`}
                      >
                        {item.label}
                      </Link>
                    )}
                  </motion.div>
                ))}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 }}
                  className={`pt-4 ${isAppointmentsPage ? "border-t border-gray-200" : "border-t border-slate-700/50"}`}
                >
                  <Link href="/appointments" onClick={() => setIsOpen(false)}>
                    <Button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-full shadow-lg shadow-cyan-500/20">
                      {language === "it" ? "Prenota Consulenza" : "Book Consultation"}
                    </Button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
