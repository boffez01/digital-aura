"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Input } from "@/components/ui/input"
import { useLanguage } from "../contexts/language-context"
import {
  Calculator,
  Lightbulb,
  Award,
  BarChart3,
  Users,
  Euro,
  TrendingUp,
  Zap,
  Target,
  Clock,
  Sparkles,
  Brain,
  Rocket,
  DollarSign,
  PiggyBank,
  Calendar,
} from "lucide-react"

export default function ROICalculator() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("calculator")

  // STATI OTTIMIZZATI PER SLIDER FLUIDI
  const [employees, setEmployees] = useState(50)
  const [avgSalary, setAvgSalary] = useState(45000)
  const [currentEfficiency, setCurrentEfficiency] = useState(70)
  const [expectedImprovement, setExpectedImprovement] = useState(35)
  const [implementationCost, setImplementationCost] = useState(15000)
  const [monthlyCost, setMonthlyCost] = useState(2500)

  // Valori temporanei per non far scattare i ricalcoli a ogni movimento
  const [localEmployees, setLocalEmployees] = useState(employees)
  const [localEfficiency, setLocalEfficiency] = useState(currentEfficiency)
  const [localImprovement, setLocalImprovement] = useState(expectedImprovement)

  // Sincronizza i valori locali quando cambiano quelli principali
  useEffect(() => {
    setLocalEmployees(employees)
  }, [employees])

  useEffect(() => {
    setLocalEfficiency(currentEfficiency)
  }, [currentEfficiency])

  useEffect(() => {
    setLocalImprovement(expectedImprovement)
  }, [expectedImprovement])

  // Calcoli basati sugli stati principali (non quelli locali)
  const totalSalaryCost = employees * avgSalary
  const inefficiencyLoss = totalSalaryCost * ((100 - currentEfficiency) / 100)
  const potentialSavings = inefficiencyLoss * (expectedImprovement / 100)
  const annualSavings = potentialSavings
  const totalFirstYearCost = implementationCost + monthlyCost * 12
  const roi = totalFirstYearCost > 0 ? ((annualSavings - totalFirstYearCost) / totalFirstYearCost) * 100 : 0
  const paybackMonths = annualSavings > 0 ? totalFirstYearCost / (annualSavings / 12) : 0

  const tabs = [
    {
      id: "calculator",
      label: language === "it" ? "Calcolatore" : "Calculator",
      icon: <Calculator className="h-5 w-5" />,
      gradient: "from-cyan-500 to-blue-600",
      bgGradient: "from-cyan-50 to-blue-50",
    },
    {
      id: "how-it-works",
      label: language === "it" ? "Come Funziona" : "How It Works",
      icon: <Lightbulb className="h-5 w-5" />,
      gradient: "from-purple-500 to-pink-600",
      bgGradient: "from-purple-50 to-pink-50",
    },
    {
      id: "what-you-get",
      label: language === "it" ? "Cosa Ottieni" : "What You Get",
      icon: <Award className="h-5 w-5" />,
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      id: "insights",
      label: "Insights",
      icon: <BarChart3 className="h-5 w-5" />,
      gradient: "from-orange-500 to-red-600",
      bgGradient: "from-orange-50 to-red-50",
    },
  ]

  const howItWorksSteps = [
    {
      icon: <Users className="h-12 w-12" />,
      title: language === "it" ? "Inserisci Parametri" : "Enter Parameters",
      description:
        language === "it"
          ? "Inserisci i dati aziendali inclusi dimensione team, costi e livelli di efficienza attuali"
          : "Enter business data including team size, costs and current efficiency levels",
      gradient: "from-cyan-500 to-blue-500",
    },
    {
      icon: <Brain className="h-12 w-12" />,
      title: language === "it" ? "Analisi AI" : "AI Analysis",
      description:
        language === "it"
          ? "Il nostro algoritmo calcola i potenziali risparmi basati sui benefici comprovati dell'automazione"
          : "Our algorithm calculates potential savings based on proven automation benefits",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="h-12 w-12" />,
      title: language === "it" ? "Ottieni Risultati" : "Get Results",
      description:
        language === "it"
          ? "Ricevi proiezioni ROI dettagliate con timeline di implementazione e breakdown dei costi"
          : "Receive detailed ROI projections with implementation timeline and cost breakdown",
      gradient: "from-green-500 to-emerald-500",
    },
  ]

  const benefits = [
    {
      icon: <Target className="h-8 w-8" />,
      title: language === "it" ? "Riduzione Costi Operativi" : "Operational Cost Reduction",
      description:
        language === "it"
          ? "Automatizza le attività ripetitive e riduci i costi del customer service fino al 60%"
          : "Automate repetitive tasks and reduce customer service costs by up to 60%",
      color: "text-green-400",
      bgColor: "bg-green-900/20",
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: language === "it" ? "Risposta Immediata 24/7" : "Immediate 24/7 Response",
      description:
        language === "it"
          ? "Rispondi ai clienti istantaneamente senza tempi di attesa, migliorando la soddisfazione"
          : "Respond to customers instantly without waiting times, improving satisfaction",
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
    },
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: language === "it" ? "Esperienza Cliente Superiore" : "Superior Customer Experience",
      description:
        language === "it"
          ? "Offri un servizio personalizzato e sempre disponibile che supera le aspettative"
          : "Provide personalized and always available service that exceeds expectations",
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
    },
    {
      icon: <BarChart3 className="h-8 w-8" />,
      title: language === "it" ? "Insights Avanzati" : "Advanced Insights",
      description:
        language === "it"
          ? "Ottieni dati preziosi sui comportamenti e preferenze dei clienti per decisioni strategiche"
          : "Get valuable data on customer behaviors and preferences for strategic decisions",
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
    },
  ]

  const insightFactors = [
    {
      title: language === "it" ? "Complessità Processi" : "Process Complexity",
      description:
        language === "it"
          ? "Processi più complessi tipicamente generano maggiori benefici dall'automazione AI"
          : "More complex processes typically generate greater benefits from AI automation",
      icon: <Target className="h-6 w-6" />,
      impact: language === "it" ? "Alto impatto" : "High impact",
      color: "text-green-400",
    },
    {
      title: language === "it" ? "Adozione Team" : "Team Adoption",
      description:
        language === "it"
          ? "Il tasso di adozione degli utenti impatta significativamente il successo del progetto"
          : "User adoption rate significantly impacts project success",
      icon: <Users className="h-6 w-6" />,
      impact: language === "it" ? "Impatto critico" : "Critical impact",
      color: "text-red-400",
    },
    {
      title: language === "it" ? "Qualità Dati" : "Data Quality",
      description:
        language === "it"
          ? "Dati puliti e strutturati abilitano implementazioni AI più efficaci e precise"
          : "Clean and structured data enables more effective and accurate AI implementations",
      icon: <BarChart3 className="h-6 w-6" />,
      impact: language === "it" ? "Medio impatto" : "Medium impact",
      color: "text-blue-400",
    },
    {
      title: language === "it" ? "Livello Integrazione" : "Integration Level",
      description:
        language === "it"
          ? "Integrazione più profonda dei sistemi fornisce maggiori guadagni di efficienza"
          : "Deeper system integration provides greater efficiency gains",
      icon: <Zap className="h-6 w-6" />,
      impact: language === "it" ? "Alto impatto" : "High impact",
      color: "text-purple-400",
    },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "calculator":
        return (
          <div className="space-y-8">
            {/* Business Parameters */}
            <Card className="border-0 shadow-2xl bg-slate-800/50 border-slate-700 overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white pb-6">
                <CardTitle className="flex items-center text-2xl font-bold">
                  <Users className="h-8 w-8 mr-3" />
                  {language === "it" ? "Parametri Aziendali" : "Business Parameters"}
                </CardTitle>
                <p className="text-cyan-100 text-lg">
                  {language === "it"
                    ? "Inserisci i dati della tua azienda per calcolare il ROI personalizzato"
                    : "Enter your company data to calculate personalized ROI"}
                </p>
              </CardHeader>
              <CardContent className="p-8 space-y-8 bg-slate-900/50">
                {/* Employees - MIGLIORATO CON INPUT DIRETTO */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white">
                        <Users className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {language === "it" ? "Numero di Dipendenti" : "Number of Employees"}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {language === "it"
                            ? "Team coinvolto nel customer service"
                            : "Team involved in customer service"}
                        </p>
                      </div>
                    </div>
                    <Input
                      type="number"
                      value={localEmployees}
                      onChange={(e) => {
                        const val = Math.min(1000, Math.max(1, Number(e.target.value)))
                        setLocalEmployees(val)
                        setEmployees(val)
                      }}
                      className="w-28 text-lg font-bold bg-slate-800 border-slate-600 text-white"
                      min={1}
                      max={1000}
                    />
                  </div>
                  <Slider
                    value={[localEmployees]}
                    onValueChange={(value) => setLocalEmployees(value[0])}
                    onValueCommit={(value) => setEmployees(value[0])}
                    max={1000}
                    min={1}
                    step={10} // PASSO AUMENTATO per maggiore fluidità
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>1</span>
                    <span>1000</span>
                  </div>
                </div>

                {/* Average Salary - MIGLIORATO */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl text-white">
                      <Euro className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white">
                        {language === "it" ? "Stipendio Annuale Medio (€)" : "Average Annual Salary (€)"}
                      </h4>
                      <p className="text-sm text-slate-400">
                        {language === "it" ? "Costo medio per dipendente" : "Average cost per employee"}
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-green-400" />
                    <Input
                      type="number"
                      value={avgSalary}
                      onChange={(e) => setAvgSalary(Number(e.target.value))}
                      step={500} // PASSO AUMENTATO
                      className="pl-12 h-14 text-lg font-semibold border-2 border-slate-600 focus:border-green-500 bg-slate-800/50 text-white"
                      placeholder="45000"
                      min={10000}
                      max={200000}
                    />
                  </div>
                </div>

                {/* Current Efficiency */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl text-white">
                        <TrendingUp className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {language === "it" ? "Efficienza Processi Attuali (%)" : "Current Process Efficiency (%)"}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {language === "it"
                            ? "Quanto sono efficienti i tuoi processi ora"
                            : "How efficient are your processes now"}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-lg font-bold">
                      {localEfficiency}%
                    </Badge>
                  </div>
                  <Slider
                    value={[localEfficiency]}
                    onValueChange={(value) => setLocalEfficiency(value[0])}
                    onValueCommit={(value) => setCurrentEfficiency(value[0])}
                    max={95}
                    min={10}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>10%</span>
                    <span>95%</span>
                  </div>
                </div>

                {/* Expected Improvement */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl text-white">
                        <Rocket className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {language === "it" ? "Miglioramento Atteso (%)" : "Expected Improvement (%)"}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {language === "it" ? "Quanto miglioramento ti aspetti" : "How much improvement do you expect"}
                        </p>
                      </div>
                    </div>
                    <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 text-lg font-bold">
                      {localImprovement}%
                    </Badge>
                  </div>
                  <Slider
                    value={[localImprovement]}
                    onValueChange={(value) => setLocalImprovement(value[0])}
                    onValueCommit={(value) => setExpectedImprovement(value[0])}
                    max={80}
                    min={5}
                    step={5}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-slate-500">
                    <span>5%</span>
                    <span>80%</span>
                  </div>
                </div>

                {/* Implementation and Monthly Costs */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl text-white">
                        <DollarSign className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {language === "it" ? "Costo Implementazione (€)" : "Implementation Cost (€)"}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {language === "it" ? "Investimento iniziale" : "Initial investment"}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-cyan-400" />
                      <Input
                        type="number"
                        value={implementationCost}
                        onChange={(e) => setImplementationCost(Number(e.target.value))}
                        step={1000}
                        className="pl-12 h-14 text-lg font-semibold border-2 border-slate-600 focus:border-cyan-500 bg-slate-800/50 text-white"
                        placeholder="15000"
                        min={1000}
                        max={100000}
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl text-white">
                        <Calendar className="h-6 w-6" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-white">
                          {language === "it" ? "Manutenzione Mensile (€)" : "Monthly Maintenance (€)"}
                        </h4>
                        <p className="text-sm text-slate-400">
                          {language === "it" ? "Costo ricorrente" : "Recurring cost"}
                        </p>
                      </div>
                    </div>
                    <div className="relative">
                      <Euro className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-pink-400" />
                      <Input
                        type="number"
                        value={monthlyCost}
                        onChange={(e) => setMonthlyCost(Number(e.target.value))}
                        step={100}
                        className="pl-12 h-14 text-lg font-semibold border-2 border-slate-600 focus:border-pink-500 bg-slate-800/50 text-white"
                        placeholder="2500"
                        min={100}
                        max={10000}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Results */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-0 shadow-xl bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-green-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl text-white mb-4 inline-flex">
                    <PiggyBank className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-green-400 mb-2">€{annualSavings.toLocaleString()}</div>
                  <h4 className="font-semibold text-white mb-2">
                    {language === "it" ? "Risparmio Annuale" : "Annual Savings"}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {language === "it" ? "Risparmi stimati nel primo anno" : "Estimated savings in first year"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-cyan-900/50 to-blue-900/50 border-cyan-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl text-white mb-4 inline-flex">
                    <TrendingUp className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-cyan-400 mb-2">
                    {roi > 0 ? "+" : ""}
                    {roi.toFixed(1)}%
                  </div>
                  <h4 className="font-semibold text-white mb-2">ROI</h4>
                  <p className="text-sm text-slate-400">
                    {language === "it" ? "Ritorno sull'investimento" : "Return on investment"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-purple-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl text-white mb-4 inline-flex">
                    <Clock className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-purple-400 mb-2">{paybackMonths.toFixed(1)}</div>
                  <h4 className="font-semibold text-white mb-2">
                    {language === "it" ? "Mesi Payback" : "Payback Months"}
                  </h4>
                  <p className="text-sm text-slate-400">
                    {language === "it" ? "Tempo per recuperare l'investimento" : "Time to recover investment"}
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-xl bg-gradient-to-br from-orange-900/50 to-red-900/50 border-orange-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6 text-center">
                  <div className="p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl text-white mb-4 inline-flex">
                    <Euro className="h-8 w-8" />
                  </div>
                  <div className="text-3xl font-bold text-orange-400 mb-2">€{totalFirstYearCost.toLocaleString()}</div>
                  <h4 className="font-semibold text-white mb-2">{language === "it" ? "Costo Totale" : "Total Cost"}</h4>
                  <p className="text-sm text-slate-400">
                    {language === "it" ? "Investimento primo anno" : "First year investment"}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )

      case "how-it-works":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {language === "it" ? "Come Funziona il Processo" : "How the Process Works"}
              </h3>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                {language === "it"
                  ? "Il nostro processo strutturato garantisce il successo del tuo progetto chatbot"
                  : "Our structured process ensures the success of your chatbot project"}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {howItWorksSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                  <Card className="h-full border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 bg-slate-800/50 border-slate-700 group overflow-hidden">
                    <CardContent className="p-8 text-center relative">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full -translate-y-12 translate-x-12" />

                      <div className="relative z-10 mb-6">
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
                          {index + 1}
                        </div>
                        <div
                          className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.gradient} text-white group-hover:scale-110 transition-transform duration-300`}
                        >
                          {step.icon}
                        </div>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
                      <p className="text-slate-400 leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "what-you-get":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {language === "it" ? "Cosa Ottieni con i Nostri Chatbot" : "What You Get with Our Chatbots"}
              </h3>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                {language === "it"
                  ? "I vantaggi tangibili che otterrai implementando un chatbot AI nella tua attività"
                  : "The tangible benefits you'll get by implementing an AI chatbot in your business"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-start space-x-6 p-8 ${benefit.bgColor} border border-slate-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}
                >
                  <div className={`p-4 bg-slate-800 rounded-2xl ${benefit.color} flex-shrink-0`}>{benefit.icon}</div>
                  <div>
                    <h4 className="font-bold text-white mb-3 text-xl">{benefit.title}</h4>
                    <p className="text-slate-400 leading-relaxed text-lg">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "insights":
        return (
          <div className="space-y-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                {language === "it" ? "Fattori Chiave per il Successo" : "Key Success Factors"}
              </h3>
              <p className="text-xl text-slate-400 max-w-3xl mx-auto">
                {language === "it"
                  ? "Elementi che influenzano significativamente il ROI e il successo del tuo chatbot"
                  : "Elements that significantly influence the ROI and success of your chatbot"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {insightFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start space-x-6 p-8 bg-slate-800/50 border border-slate-700 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className={`p-4 bg-slate-700 rounded-2xl ${factor.color} flex-shrink-0`}>{factor.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-white text-xl">{factor.title}</h4>
                      <Badge className={`${factor.color} bg-opacity-10 border-current`}>{factor.impact}</Badge>
                    </div>
                    <p className="text-slate-400 leading-relaxed text-lg">{factor.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Tab Navigation */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {tabs.map((tab) => (
          <Button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            variant={activeTab === tab.id ? "default" : "outline"}
            size="lg"
            className={`px-8 py-4 text-lg font-semibold transition-all duration-300 ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.gradient} text-white shadow-xl hover:shadow-2xl border-0 scale-105`
                : "bg-slate-800/50 hover:bg-slate-700/50 border-2 border-slate-600 text-slate-300 hover:border-slate-500 hover:scale-105"
            }`}
          >
            <div className="flex items-center space-x-3">
              {tab.icon}
              <span>{tab.label}</span>
            </div>
          </Button>
        ))}
      </div>

      {/* Tab Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="min-h-[600px]"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  )
}
