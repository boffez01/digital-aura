"use client"

import { useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Calendar, TrendingUp, Users, CheckCircle, ArrowRight, ExternalLink } from "lucide-react"
import { useLanguage } from "../contexts/language-context"

interface ProjectModalProps {
  project: any
  onClose: () => void
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const { language } = useLanguage()

  // Blocca lo scroll del body quando la modale è aperta
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "unset"
    }
  }, [])

  if (!project) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 50 }}
          transition={{ duration: 0.3 }}
          className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative">
            {/* Header Image */}
            <div className="relative h-64 overflow-hidden rounded-t-2xl">
              <img
                src={project.image || "/placeholder.svg?height=300&width=800"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <Badge className="bg-white/90 text-slate-900 border-0 shadow-sm">{project.category}</Badge>
                  <Badge className="bg-green-500 text-white border-0 shadow-sm">ROI: {project.roi}</Badge>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-4">{project.title}</h1>
                <p className="text-lg text-slate-400 leading-relaxed">{project.description}</p>
              </div>

              {/* Project Stats */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 bg-purple-900/20 border-purple-700">
                  <CardContent className="p-6 text-center">
                    <Calendar className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-white mb-1">{language === "it" ? "Durata" : "Timeline"}</h3>
                    <p className="text-purple-400 font-bold">{project.timeline}</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-green-900/20 border-green-700">
                  <CardContent className="p-6 text-center">
                    <TrendingUp className="w-8 h-8 text-green-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-white mb-1">ROI</h3>
                    <p className="text-green-400 font-bold">{project.roi}</p>
                  </CardContent>
                </Card>

                <Card className="border-0 bg-blue-900/20 border-blue-700">
                  <CardContent className="p-6 text-center">
                    <Users className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                    <h3 className="font-semibold text-white mb-1">
                      {language === "it" ? "Investimento" : "Investment"}
                    </h3>
                    <p className="text-blue-400 font-bold">{project.investment}</p>
                  </CardContent>
                </Card>
              </div>

              {/* Problem, Solution, Results */}
              <div className="space-y-8 mb-8">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {language === "it" ? "🎯 Il Problema" : "🎯 The Problem"}
                  </h2>
                  <p className="text-slate-400 leading-relaxed">{project.problem}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {language === "it" ? "💡 La Soluzione" : "💡 The Solution"}
                  </h2>
                  <p className="text-slate-400 leading-relaxed">{project.solution}</p>
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-white mb-4">
                    {language === "it" ? "🚀 I Risultati" : "🚀 The Results"}
                  </h2>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {project.results.map((result: string, index: number) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-4 bg-green-900/20 border border-green-700 rounded-lg"
                      >
                        <CheckCircle className="w-6 h-6 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300 font-medium">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">
                  {language === "it" ? "🛠️ Tecnologie Utilizzate" : "🛠️ Technologies Used"}
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.technologies.map((tech: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="outline" className="border-slate-600 text-slate-300 bg-slate-800/50 px-4 py-2">
                        {tech}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white flex-1"
                  onClick={onClose}
                >
                  {language === "it" ? "Inizia il Tuo Progetto" : "Start Your Project"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-slate-600 text-slate-300 hover:bg-slate-800 flex-1 bg-transparent"
                  onClick={onClose}
                >
                  <ExternalLink className="mr-2 w-5 h-5" />
                  {language === "it" ? "Vedi Demo Live" : "View Live Demo"}
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
