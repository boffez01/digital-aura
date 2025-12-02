"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ROICalculatorSection() {
  const [hoursPerWeek, setHoursPerWeek] = useState(10)
  const [hourlyRate, setHourlyRate] = useState(25)
  const [missedLeads, setMissedLeads] = useState(5)
  const [leadValue, setLeadValue] = useState(500)
  
  const [savings, setSavings] = useState(0)
  const [revenueGained, setRevenueGained] = useState(0)
  const [totalBenefit, setTotalBenefit] = useState(0)

  useEffect(() => {
    // Calcolo Costi Risparmiati (Automazione)
    // Assumiamo che l'automazione faccia il lavoro di 1 persona part-time
    const weeklyCost = hoursPerWeek * hourlyRate
    const yearlyCost = weeklyCost * 48 // 48 settimane lavorative
    
    // Calcolo Fatturato Perso (Chiamate perse/Lead)
    // Assumiamo che l'automazione recuperi l'80% dei lead persi
    const recoveredLeads = missedLeads * 0.8
    const yearlyRevenue = recoveredLeads * leadValue * 12 // 12 mesi

    setSavings(yearlyCost)
    setRevenueGained(yearlyRevenue)
    setTotalBenefit(yearlyCost + yearlyRevenue)
  }, [hoursPerWeek, hourlyRate, missedLeads, leadValue])

  return (
    <section className="py-20 px-4 bg-slate-900">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Calcolatore ROI</h2>
          <p className="text-lg text-slate-400">Scopri quanti soldi stai lasciando sul tavolo ogni anno.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* INPUTS */}
          <div className="space-y-8 bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
            <div>
              <label className="text-white font-medium mb-4 block flex justify-between">
                <span>Ore perse a settimana in task manuali</span>
                <span className="text-cyan-400">{hoursPerWeek} ore</span>
              </label>
              <Slider
                value={[hoursPerWeek]}
                onValueChange={(val) => setHoursPerWeek(val[0])}
                max={40} step={1}
                className="py-4"
              />
              <p className="text-xs text-slate-500">Es: Data entry, preventivi, gestione agenda</p>
            </div>

            <div>
              <label className="text-white font-medium mb-4 block flex justify-between">
                <span>Costo orario medio dipendente (€)</span>
                <span className="text-cyan-400">€{hourlyRate}/h</span>
              </label>
              <Slider
                value={[hourlyRate]}
                onValueChange={(val) => setHourlyRate(val[0])}
                max={100} step={5}
                className="py-4"
              />
            </div>

            <div className="pt-4 border-t border-slate-700">
              <label className="text-white font-medium mb-4 block flex justify-between">
                <span>Clienti/Chiamate perse al mese</span>
                <span className="text-cyan-400">{missedLeads}</span>
              </label>
              <Slider
                value={[missedLeads]}
                onValueChange={(val) => setMissedLeads(val[0])}
                max={50} step={1}
                className="py-4"
              />
              <p className="text-xs text-slate-500">Es: Chiamate a cui non rispondi, preventivi non inviati</p>
            </div>

            <div>
              <label className="text-white font-medium mb-2 block">Valore medio di un cliente (€)</label>
              <Input 
                type="number" 
                value={leadValue} 
                onChange={(e) => setLeadValue(Number(e.target.value))}
                className="bg-slate-900 border-slate-600 text-white"
              />
            </div>
          </div>

          {/* RESULTS */}
          <Card className="bg-gradient-to-br from-blue-900 to-slate-900 border-blue-500/30 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-32 bg-blue-500/10 blur-3xl rounded-full"></div>
            <CardContent className="p-8 relative z-10 text-center flex flex-col justify-center h-full min-h-[400px]">
              
              <h3 className="text-xl text-slate-300 mb-2">Potenziale Annuo Sprecato</h3>
              <div className="text-5xl md:text-6xl font-bold text-white mb-8 tracking-tight">
                €{totalBenefit.toLocaleString('it-IT')}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Costi Sprechi</p>
                  <p className="text-2xl font-bold text-red-400">€{savings.toLocaleString('it-IT')}</p>
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl">
                  <p className="text-sm text-slate-400 mb-1">Mancato Incasso</p>
                  <p className="text-2xl font-bold text-yellow-400">€{revenueGained.toLocaleString('it-IT')}</p>
                </div>
              </div>

              <p className="text-slate-300 mb-8">
                Con un investimento una tantum, puoi recuperare questo capitale e automatizzare la tua azienda per sempre.
              </p>

              <Link href="/appointments">
                <Button size="lg" className="w-full bg-white text-blue-900 hover:bg-blue-50 font-bold text-lg py-6 shadow-xl">
                  Smetti di Perdere Soldi <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
