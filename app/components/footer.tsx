"use client"
import { useLanguage } from "@/app/contexts/language-context"
import { Zap, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const { t, language } = useLanguage()

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-cyan-900/20 to-green-900/20 border-t border-cyan-400/30 text-white py-12 px-4 shadow-[0_0_50px_rgba(6,182,212,0.3)]">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-green-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-cyan-300 drop-shadow-[0_0_10px_rgba(6,182,212,0.8)]">
                Praxis Futura
              </span>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed text-base">
              {language === "it"
                ? "Trasformiamo le aziende attraverso soluzioni AI innovative e tecnologie all'avanguardia. La tua crescita digitale inizia qui."
                : "We transform businesses through innovative AI solutions and cutting-edge technologies. Your digital growth starts here."}
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-slate-300">
                <Mail className="w-4 h-4 mr-3 text-cyan-400" />
                <a href="mailto:info@praxisfutura.com" className="hover:text-cyan-300 transition-colors text-base">
                  info@praxisfutura.com
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <Phone className="w-4 h-4 mr-3 text-cyan-400" />
                <a href="tel:+393500216480" className="hover:text-cyan-300 transition-colors text-base">
                  +393500216480
                </a>
              </div>
              <div className="flex items-center text-slate-300">
                <MapPin className="w-4 h-4 mr-3 text-cyan-400" />
                <span className="text-base">Brescia, Italia - Via dei Mille 5</span>
              </div>
            </div>
          </div>
          {/* Additional columns can be added here if needed */}
        </div>
      </div>
    </footer>
  )
}
