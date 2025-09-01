"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Calculator, TrendingUp, Clock, Users, Zap, Target, Euro } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

interface ROIData {
  service: string
  employees: number
  hourlyRate: number
  hoursPerWeek: number
  monthlyCosts: number
  efficiencyGoal: number
  currentRevenue: number
  growthTarget: number
}

export default function ROICalculator() {
  const { language } = useLanguage()
  const [formData, setFormData] = useState<ROIData>({
    service: "",
    employees: 50,
    hourlyRate: 25,
    hoursPerWeek: 40,
    monthlyCosts: 25000,
    efficiencyGoal: 30,
    currentRevenue: 50000,
    growthTarget: 25,
  })

  const [results, setResults] = useState({
    annualSavings: 0,
    roi: 0,
    paybackMonths: 0,
    productivityGain: 0,
    investmentCost: 0,
    annualReturn: 0,
    netProfit: 0,
  })

  const serviceOptions = {
    en: [
      { value: "chatbot", label: "Smart Chatbot", cost: 2500, efficiency: 40, revenue: 20 },
      { value: "automation", label: "AI Automation", cost: 5000, efficiency: 50, revenue: 35 },
      { value: "website", label: "Web Development", cost: 3000, efficiency: 25, revenue: 30 },
      { value: "marketing", label: "AI Marketing", cost: 1500, efficiency: 35, revenue: 45 },
    ],
    it: [
      { value: "chatbot", label: "Chatbot Intelligente", cost: 2500, efficiency: 40, revenue: 20 },
      { value: "automation", label: "Automazione AI", cost: 25000, efficiency: 50, revenue: 35 },
      { value: "website", label: "Sviluppo Web", cost: 3000, efficiency: 25, revenue: 30 },
      { value: "marketing", label: "Marketing AI", cost: 1500, efficiency: 35, revenue: 45 },
    ],
  }

  const calculateROI = () => {
    const selectedService = serviceOptions[language].find((s) => s.value === formData.service)
    if (!selectedService) return

    // Calcoli base
    const monthlyLabourCost = formData.employees * formData.hourlyRate * formData.hoursPerWeek * 4.33
    const efficiencyMultiplier = (formData.efficiencyGoal + selectedService.efficiency) / 100
    const monthlySavings = monthlyLabourCost * efficiencyMultiplier + formData.monthlyCosts * 0.2
    const annualSavings = monthlySavings * 12

    // Calcoli ROI
    const initialInvestment = selectedService.cost
    const roi = ((annualSavings - initialInvestment) / initialInvestment) * 100
    const paybackMonths = initialInvestment / monthlySavings

    // Impatto revenue
    const revenueMultiplier = (formData.growthTarget + selectedService.revenue) / 100
    const annualRevenueIncrease = formData.currentRevenue * revenueMultiplier * 12

    // Produttività
    const productivityGain = efficiencyMultiplier * 100

    // Calcoli finali
    const annualReturn = annualSavings + annualRevenueIncrease
    const netProfit = annualReturn - initialInvestment

    setResults({
      annualSavings: Math.round(annualSavings),
      roi: Math.round(roi),
      paybackMonths: Math.round(paybackMonths * 10) / 10,
      productivityGain: Math.round(productivityGain),
      investmentCost: initialInvestment,
      annualReturn: Math.round(annualReturn),
      netProfit: Math.round(netProfit),
    })
  }

  useEffect(() => {
    if (formData.service) {
      calculateROI()
    }
  }, [formData, language])

  const handleInputChange = (field: keyof ROIData, value: number | string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Calculator className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {language === "it" ? "Calcolatore ROI Automazione" : "ROI Automation Calculator"}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {language === "it"
              ? "Scopri quanto puoi risparmiare automatizzando i tuoi processi aziendali."
              : "Discover how much you can save by automating your business processes."}
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Input Panel - 2 colonne */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <Card className="shadow-xl border-0 bg-white rounded-3xl">
                <CardHeader className="bg-gray-100 rounded-t-3xl">
                  <CardTitle className="flex items-center text-gray-800">
                    <Target className="w-6 h-6 mr-2" />
                    {language === "it" ? "Parametri di Calcolo" : "Calculation Parameters"}
                  </CardTitle>
                  <p className="text-sm text-gray-600">
                    {language === "it"
                      ? "Regola i parametri per calcolare il tuo ROI personalizzato"
                      : "Adjust parameters to calculate your personalized ROI"}
                  </p>
                </CardHeader>
                <CardContent className="p-6 space-y-6">
                  {/* Service Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      {language === "it" ? "Servizio di Interesse" : "Service of Interest"}
                    </Label>
                    <Select value={formData.service} onValueChange={(value) => handleInputChange("service", value)}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder={language === "it" ? "Seleziona un servizio" : "Select a service"} />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceOptions[language].map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <div className="flex items-center justify-between w-full">
                              <span>{option.label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Number of Employees */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Users className="w-4 h-4 mr-2" />
                      {language === "it" ? "Numero di Dipendenti" : "Number of Employees"}: {formData.employees}
                    </Label>
                    <Slider
                      value={[formData.employees]}
                      onValueChange={(value) => handleInputChange("employees", value[0])}
                      max={500}
                      min={1}
                      step={1}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>1</span>
                      <span>500</span>
                    </div>
                  </div>

                  {/* Hourly Rate */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Euro className="w-4 h-4 mr-2" />
                      {language === "it" ? "Costo Orario Medio (€)" : "Average Hourly Rate (€)"}
                    </Label>
                    <Input
                      type="number"
                      value={formData.hourlyRate}
                      onChange={(e) => handleInputChange("hourlyRate", Number.parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>

                  {/* Hours per Week */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Clock className="w-4 h-4 mr-2" />
                      {language === "it" ? "Ore Lavorative Settimanali" : "Working Hours per Week"}:{" "}
                      {formData.hoursPerWeek}h
                    </Label>
                    <Slider
                      value={[formData.hoursPerWeek]}
                      onValueChange={(value) => handleInputChange("hoursPerWeek", value[0])}
                      max={60}
                      min={20}
                      step={1}
                      className="w-full"
                    />
                  </div>

                  {/* Process Efficiency */}
                  <div className="space-y-3">
                    <Label className="text-sm font-semibold text-gray-700 flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      {language === "it" ? "% Processi Automatizzabili" : "% Automatable Processes"}:{" "}
                      {formData.efficiencyGoal}%
                    </Label>
                    <Slider
                      value={[formData.efficiencyGoal]}
                      onValueChange={(value) => handleInputChange("efficiencyGoal", value[0])}
                      max={80}
                      min={10}
                      step={5}
                      className="w-full"
                    />
                  </div>

                  {/* Implementation Cost */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-gray-700">
                      {language === "it" ? "Costo Implementazione (€)" : "Implementation Cost (€)"}
                    </Label>
                    <Input
                      type="number"
                      value={formData.monthlyCosts}
                      onChange={(e) => handleInputChange("monthlyCosts", Number.parseInt(e.target.value) || 0)}
                      className="w-full"
                    />
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Results Panel - 3 colonne */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="lg:col-span-3 space-y-6"
            >
              {/* Main Results Cards */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Annual Savings */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Euro className="w-8 h-8 text-green-600" />
                    </div>
                    <p className="text-sm text-green-700 mb-2">
                      {language === "it" ? "Risparmio Annuale" : "Annual Savings"}
                    </p>
                    <div className="text-4xl font-bold text-green-600 mb-2">
                      €{results.annualSavings.toLocaleString()}
                    </div>
                    <Badge className="bg-green-100 text-green-700 border-green-200">
                      +{Math.round(results.annualSavings / 12).toLocaleString()}/mese
                    </Badge>
                  </CardContent>
                </Card>

                {/* ROI */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <TrendingUp className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-sm text-blue-700 mb-2">ROI</p>
                    <div className="text-4xl font-bold text-blue-600 mb-2">{results.roi}%</div>
                    <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                      {language === "it" ? "Ritorno investimento" : "Return on investment"}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Payback Period */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Clock className="w-8 h-8 text-orange-600" />
                    </div>
                    <p className="text-sm text-orange-700 mb-2">Payback Period</p>
                    <div className="text-4xl font-bold text-orange-600 mb-2">
                      {results.paybackMonths} {language === "it" ? "mesi" : "months"}
                    </div>
                    <Badge className="bg-orange-100 text-orange-700 border-orange-200">
                      {results.paybackMonths < 6 ? "Veloce" : results.paybackMonths < 12 ? "Medio" : "Lungo"}
                    </Badge>
                  </CardContent>
                </Card>

                {/* Productivity Gain */}
                <Card className="shadow-xl border-0 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl">
                  <CardContent className="p-6 text-center">
                    <div className="flex items-center justify-center mb-4">
                      <Zap className="w-8 h-8 text-purple-600" />
                    </div>
                    <p className="text-sm text-purple-700 mb-2">
                      {language === "it" ? "Guadagno Produttività" : "Productivity Gain"}
                    </p>
                    <div className="text-4xl font-bold text-purple-600 mb-2">{results.productivityGain}%</div>
                    <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                      {language === "it" ? "Aumento efficienza" : "Efficiency increase"}
                    </Badge>
                  </CardContent>
                </Card>
              </div>

              {/* Investment Summary */}
              <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl">
                <CardHeader>
                  <CardTitle className="text-white text-center">
                    {language === "it" ? "Riepilogo Investimento" : "Investment Summary"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">
                        {language === "it" ? "Investimento Iniziale" : "Initial Investment"}
                      </div>
                      <div className="text-xl font-bold">€{results.investmentCost.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">
                        {language === "it" ? "Ritorno Annuale" : "Annual Return"}
                      </div>
                      <div className="text-xl font-bold">€{results.annualReturn.toLocaleString()}</div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <div className="text-sm opacity-90 mb-1">
                        {language === "it" ? "Profitto Netto (Anno 1)" : "Net Profit (Year 1)"}
                      </div>
                      <div className="text-xl font-bold">€{results.netProfit.toLocaleString()}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CTA Button */}
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="text-center">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => (window.location.href = "/appointments")}
                >
                  {language === "it" ? "Richiedi Consulenza Gratuita" : "Request Free Consultation"}
                  <Calculator className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            {language === "it"
              ? "* I risultati sono stime basate sui parametri inseriti e sui dati storici dei nostri progetti. I risultati effettivi possono variare in base alle specifiche implementazioni e condizioni di mercato."
              : "* Results are estimates based on input parameters and historical data from our projects. Actual results may vary based on specific implementations and market conditions."}
          </p>
        </motion.div>
      </div>
    </section>
  )
}
