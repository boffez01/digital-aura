"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, TrendingUp, CheckCircle, ExternalLink, Code, Lightbulb, Target, BarChart3 } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"

interface ProjectModalProps {
  project: any
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language } = useLanguage()

  if (!project) return null

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            <Badge
              className={`${
                project.category === "AI Automation"
                  ? "bg-purple-900/50 text-purple-300 border-purple-700"
                  : project.category === "Chatbot"
                    ? "bg-blue-900/50 text-blue-300 border-blue-700"
                    : project.category === "Web Development"
                      ? "bg-green-900/50 text-green-300 border-green-700"
                      : "bg-orange-900/50 text-orange-300 border-orange-700"
              }`}
            >
              {project.category}
            </Badge>
            <div className="flex items-center text-slate-300 text-sm">
              <Calendar className="h-4 w-4 mr-1" />
              {project.timeline}
            </div>
            <div className="flex items-center text-slate-300 text-sm">
              <TrendingUp className="h-4 w-4 mr-1" />
              ROI: {project.roi}
            </div>
          </div>

          <DialogTitle className="text-2xl font-bold text-white mb-2">{project.title}</DialogTitle>

          <p className="text-slate-300 text-lg leading-relaxed">{project.description}</p>
        </DialogHeader>

        <div className="space-y-6">
          {/* Project Image */}
          {project.image && (
            <div className="aspect-video rounded-lg overflow-hidden bg-slate-800">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                width={800}
                height={450}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag: string, index: number) => (
              <Badge key={index} variant="outline" className="border-slate-600 text-slate-300 bg-slate-800/50">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Tabs Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/50">
              <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:text-white">
                {language === "it" ? "Panoramica" : "Overview"}
              </TabsTrigger>
              <TabsTrigger value="problem" className="text-slate-300 data-[state=active]:text-white">
                {language === "it" ? "Problema" : "Problem"}
              </TabsTrigger>
              <TabsTrigger value="solution" className="text-slate-300 data-[state=active]:text-white">
                {language === "it" ? "Soluzione" : "Solution"}
              </TabsTrigger>
              <TabsTrigger value="results" className="text-slate-300 data-[state=active]:text-white">
                {language === "it" ? "Risultati" : "Results"}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <BarChart3 className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-xl font-semibold text-white">
                      {language === "it" ? "Dettagli Progetto" : "Project Details"}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-white mb-2">{language === "it" ? "Durata" : "Duration"}</h4>
                      <p className="text-slate-300">{project.timeline}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-2">ROI</h4>
                      <p className="text-slate-300">{project.roi}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-white mb-2">
                        {language === "it" ? "Tecnologie Utilizzate" : "Technologies Used"}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies?.map((tech: string, index: number) => (
                          <Badge key={index} className="bg-slate-700/50 text-slate-300 border-slate-600">
                            <Code className="h-3 w-3 mr-1" />
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="problem" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Lightbulb className="h-5 w-5 text-orange-400" />
                    <h3 className="text-xl font-semibold text-white">
                      {language === "it" ? "La Sfida" : "The Challenge"}
                    </h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-base">{project.problem}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="solution" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <Target className="h-5 w-5 text-green-400" />
                    <h3 className="text-xl font-semibold text-white">
                      {language === "it" ? "La Nostra Soluzione" : "Our Solution"}
                    </h3>
                  </div>
                  <p className="text-slate-300 leading-relaxed text-base">{project.solution}</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="results" className="space-y-4">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <TrendingUp className="h-5 w-5 text-cyan-400" />
                    <h3 className="text-xl font-semibold text-white">
                      {language === "it" ? "Risultati Ottenuti" : "Results Achieved"}
                    </h3>
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    {project.results?.map((result: string, index: number) => (
                      <div key={index} className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-slate-300">{result}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* CTA Section */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
            <Button
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
              onClick={() => {
                window.open("/appointments", "_blank")
              }}
            >
              {language === "it" ? "Inizia il Tuo Progetto" : "Start Your Project"}
              <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white bg-transparent"
              onClick={onClose}
            >
              {language === "it" ? "Chiudi" : "Close"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
