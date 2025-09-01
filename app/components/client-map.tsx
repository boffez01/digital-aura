"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Building, Users, TrendingUp } from "lucide-react"

const clients = [
  {
    id: 1,
    name: "TechStart Milano",
    city: "Milano",
    sector: "E-commerce",
    employees: 50,
    roi: "250%",
    position: { x: 45, y: 35 },
    description: "Automazione completa del customer service con chatbot AI",
  },
  {
    id: 2,
    name: "Fashion Forward",
    city: "Roma",
    sector: "Fashion",
    employees: 120,
    roi: "180%",
    position: { x: 48, y: 55 },
    description: "Sistema di raccomandazioni AI per e-commerce fashion",
  },
  {
    id: 3,
    name: "LogiTech Solutions",
    city: "Torino",
    sector: "Logistica",
    employees: 200,
    roi: "320%",
    position: { x: 42, y: 28 },
    description: "Ottimizzazione route delivery con machine learning",
  },
  {
    id: 4,
    name: "FinanceAI",
    city: "Napoli",
    sector: "Fintech",
    employees: 80,
    roi: "400%",
    position: { x: 50, y: 70 },
    description: "Sistema anti-frode basato su intelligenza artificiale",
  },
  {
    id: 5,
    name: "HealthTech Pro",
    city: "Bologna",
    sector: "Healthcare",
    employees: 150,
    roi: "280%",
    position: { x: 46, y: 42 },
    description: "Automazione gestione pazienti e appuntamenti",
  },
  {
    id: 6,
    name: "EduSmart",
    city: "Firenze",
    sector: "Education",
    employees: 60,
    roi: "220%",
    position: { x: 47, y: 48 },
    description: "Piattaforma e-learning con tutoring AI personalizzato",
  },
]

export default function ClientMapSection() {
  const [selectedClient, setSelectedClient] = useState<(typeof clients)[0] | null>(null)

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block p-3 rounded-full bg-gradient-to-r from-green-100 to-blue-100 mb-6">
            <MapPin className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">I Nostri Clienti in Italia</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Oltre 100 aziende in tutta Italia si affidano alle nostre soluzioni AI
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Card className="bg-gradient-to-br from-blue-50 to-green-50 border border-gray-200 shadow-lg overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative h-96 bg-gradient-to-br from-blue-100 to-green-100">
                    {/* Simplified Italy Map Background */}
                    <svg
                      viewBox="0 0 100 100"
                      className="w-full h-full"
                      style={{ filter: "drop-shadow(0 4px 8px rgba(0,0,0,0.1))" }}
                    >
                      {/* Italy Shape (simplified) */}
                      <path
                        d="M45 15 L50 12 L55 15 L58 20 L60 25 L58 30 L55 35 L52 40 L50 45 L48 50 L46 55 L48 60 L50 65 L52 70 L50 75 L48 80 L45 85 L42 80 L40 75 L38 70 L36 65 L38 60 L40 55 L42 50 L40 45 L38 40 L40 35 L42 30 L40 25 L42 20 L45 15 Z"
                        fill="rgba(59, 130, 246, 0.2)"
                        stroke="rgba(59, 130, 246, 0.4)"
                        strokeWidth="0.5"
                      />
                    </svg>

                    {/* Client Markers */}
                    {clients.map((client, index) => (
                      <motion.div
                        key={client.id}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                        viewport={{ once: true }}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                        style={{
                          left: `${client.position.x}%`,
                          top: `${client.position.y}%`,
                        }}
                        onClick={() => setSelectedClient(client)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <div
                          className={`w-4 h-4 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 border-2 border-white shadow-lg ${selectedClient?.id === client.id ? "ring-4 ring-cyan-300" : ""}`}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
                            {client.name}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Client Details */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-white border border-gray-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2 text-cyan-600" />
                    {selectedClient ? selectedClient.name : "Seleziona un Cliente"}
                  </h3>

                  {selectedClient ? (
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedClient.city}
                        </div>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">{selectedClient.sector}</Badge>
                      </div>

                      <p className="text-gray-700 leading-relaxed">{selectedClient.description}</p>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <Users className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="text-lg font-bold text-gray-800">{selectedClient.employees}</div>
                          <div className="text-xs text-gray-600">Dipendenti</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="flex items-center justify-center mb-1">
                            <TrendingUp className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="text-lg font-bold text-green-600">{selectedClient.roi}</div>
                          <div className="text-xs text-gray-600">ROI</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500">Clicca su un marker nella mappa per vedere i dettagli del cliente</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Stats Summary */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="bg-gradient-to-br from-cyan-50 to-purple-50 border border-cyan-200">
                <CardContent className="p-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-4">Risultati Complessivi</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Clienti Attivi</span>
                      <span className="font-bold text-cyan-600">100+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">ROI Medio</span>
                      <span className="font-bold text-green-600">275%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Progetti Completati</span>
                      <span className="font-bold text-purple-600">500+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Soddisfazione</span>
                      <span className="font-bold text-orange-600">98%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="bg-gradient-to-r from-cyan-600 to-purple-600 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Vuoi Essere il Prossimo Caso di Successo?</h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Unisciti alle centinaia di aziende che hanno già trasformato il loro business con le nostre soluzioni AI
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-cyan-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-all"
              >
                Inizia la Tua Trasformazione
              </motion.button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
