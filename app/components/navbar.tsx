"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { LanguageSelector } from "@/app/components/language-selector"
import { useLanguage } from "@/app/contexts/language-context"

export function Navbar() {
  const pathname = usePathname()
  const { language } = useLanguage()
  const isAdmin = pathname?.startsWith("/admin")

  // Translations
  const translations = {
    menu: language === "it" ? "Menu" : "Menu",
    services: language === "it" ? "Servizi" : "Services",
    aiAutomation: language === "it" ? "AI Automation" : "AI Automation",
    smartChatbots: language === "it" ? "Smart Chatbots" : "Smart Chatbots",
    webDevelopment: language === "it" ? "Web Development" : "Web Development",
    aiMarketing: language === "it" ? "AI Marketing" : "AI Marketing",
    chatbotDemo: language === "it" ? "Demo Chatbot" : "Chatbot Demo",
    portfolio: language === "it" ? "Portfolio" : "Portfolio",
    blog: language === "it" ? "Blog" : "Blog",
    about: language === "it" ? "Chi Siamo" : "About Us",
    contact: language === "it" ? "Contatti" : "Contact",
    admin: language === "it" ? "Admin" : "Admin",
    appointment: language === "it" ? "Appuntamento" : "Book Appointment",
  }

  return (
    <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <motion.div initial={{ rotate: -10 }} animate={{ rotate: 0 }} transition={{ duration: 0.5 }}>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center text-white font-bold text-lg">
                DA
              </div>
            </motion.div>
            <span className="font-bold text-xl hidden sm:inline-block">Digital Aura</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{translations.menu}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-purple-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium text-white">Digital Aura</div>
                          <p className="text-sm leading-tight text-white/90">
                            {language === "it"
                              ? "Soluzioni digitali innovative per il tuo business"
                              : "Innovative digital solutions for your business"}
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/services/ai-automation" title={translations.aiAutomation}>
                      {language === "it"
                        ? "Automatizza i processi aziendali con l'AI"
                        : "Automate business processes with AI"}
                    </ListItem>
                    <ListItem href="/services/chatbot" title={translations.smartChatbots}>
                      {language === "it"
                        ? "Chatbot intelligenti per il tuo business"
                        : "Intelligent chatbots for your business"}
                    </ListItem>
                    <ListItem href="/services/web-development" title={translations.webDevelopment}>
                      {language === "it"
                        ? "Sviluppo web moderno e performante"
                        : "Modern and performant web development"}
                    </ListItem>
                    <ListItem href="/services/ai-marketing" title={translations.aiMarketing}>
                      {language === "it"
                        ? "Marketing potenziato dall'intelligenza artificiale"
                        : "Marketing powered by artificial intelligence"}
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>{translations.services}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <ListItem href="/services/ai-automation" title={translations.aiAutomation}>
                      {language === "it"
                        ? "Automatizza i processi aziendali con l'AI"
                        : "Automate business processes with AI"}
                    </ListItem>
                    <ListItem href="/services/chatbot" title={translations.smartChatbots}>
                      {language === "it"
                        ? "Chatbot intelligenti per il tuo business"
                        : "Intelligent chatbots for your business"}
                    </ListItem>
                    <ListItem href="/services/web-development" title={translations.webDevelopment}>
                      {language === "it"
                        ? "Sviluppo web moderno e performante"
                        : "Modern and performant web development"}
                    </ListItem>
                    <ListItem href="/services/ai-marketing" title={translations.aiMarketing}>
                      {language === "it"
                        ? "Marketing potenziato dall'intelligenza artificiale"
                        : "Marketing powered by artificial intelligence"}
                    </ListItem>
                    <ListItem href="/services/chatbot-demo" title={translations.chatbotDemo}>
                      {language === "it" ? "Prova i nostri chatbot demo" : "Try our demo chatbots"}
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{translations.blog}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>{translations.about}</NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    {translations.contact}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector />

          {!isAdmin && (
            <Link href="/admin">
              <Button variant="ghost" size="sm">
                {translations.admin}
              </Button>
            </Link>
          )}

          <Link href="/appointments">
            <Button variant="default" size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600">
              {translations.appointment}
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"
