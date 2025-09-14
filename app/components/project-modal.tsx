"use client"
import { X, Calendar, ArrowRight, Sparkles, Target, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useLanguage } from "@/contexts/language-context"

interface Project {
  id: string
  title: string
  titleEn: string
  category: string
  categoryEn: string
  description: string
  descriptionEn: string
  image: string
  technologies: string[]
  results: {
    metric: string
    value: string
    metricEn: string
  }[]
  problem: string
  problemEn: string
  solution: string
  solutionEn: string
  roi: string
  roiEn: string
  duration: string
  durationEn: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const { language } = useLanguage()

  if (!isOpen || !project) return null

  const t = {
    it: {
      problem: "Problema",
      solution: "Soluzione",
      results: "Risultati",
      technologies: "Tecnologie",
      duration: "Durata",
      roi: "ROI",
      startProject: "Inizia il Tuo Progetto",
      close: "Chiudi",
    },
    en: {
      problem: "Problem",
      solution: "Solution",
      results: "Results",
      technologies: "Technologies",
      duration: "Duration",
      roi: "ROI",
      startProject: "Start Your Project",
      close: "Close",
    },
  }

  const currentT = t[language as keyof typeof t] || t.it

  const getCategoryColor = (category: string) => {
    const colors = {
      "AI Automation": "bg-gradient-to-r from-purple-500 to-indigo-600",
      Chatbot: "bg-gradient-to-r from-blue-500 to-cyan-600",
      "Web Development": "bg-gradient-to-r from-green-500 to-emerald-600",
      "AI Marketing": "bg-gradient-to-r from-orange-500 to-red-600",
      "E-commerce": "bg-gradient-to-r from-pink-500 to-rose-600",
      Healthcare: "bg-gradient-to-r from-teal-500 to-blue-600",
    }
    return colors[category as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-gray-600"
  }

  const getRoiColor = (roi: string) => {
    const roiValue = Number.parseInt(roi.replace(/[^0-9]/g, ""))
    if (roiValue >= 300) return "bg-gradient-to-r from-green-500 to-emerald-600"
    if (roiValue >= 200) return "bg-gradient-to-r from-blue-500 to-cyan-600"
    return "bg-gradient-to-r from-orange-500 to-yellow-600"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 rounded-2xl shadow-2xl border border-slate-700">
        {/* Header with Background Image */}
        <div className="relative h-64 overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />

          {/* Close Button */}
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <X className="w-5 h-5" />
          </Button>

          {/* Title and Badges */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge className={`${getCategoryColor(project.category)} text-white border-0 px-3 py-1`}>
                {language === "en" ? project.categoryEn : project.category}
              </Badge>
              <Badge
                className={`${getRoiColor(language === "en" ? project.roiEn : project.roi)} text-white border-0 px-3 py-1`}
              >
                {currentT.roi}: {language === "en" ? project.roiEn : project.roi}
              </Badge>
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">
              {language === "en" ? project.titleEn : project.title}
            </h2>
            <p className="text-slate-200 text-lg">{language === "en" ? project.descriptionEn : project.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 space-y-8">
          {/* Problem Section */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-red-500/20 rounded-lg">
                <Target className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">{currentT.problem}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">{language === "en" ? project.problemEn : project.problem}</p>
          </div>

          {/* Solution Section */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">{currentT.solution}</h3>
            </div>
            <p className="text-slate-300 leading-relaxed">
              {language === "en" ? project.solutionEn : project.solution}
            </p>
          </div>

          {/* Results Section */}
          <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-white">{currentT.results}</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.results.map((result, index) => (
                <div key={index} className="text-center p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                  <div className="text-2xl font-bold text-cyan-400 mb-1">{result.value}</div>
                  <div className="text-sm text-slate-400">{language === "en" ? result.metricEn : result.metric}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Technologies and Duration */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Technologies */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">{currentT.technologies}</h3>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech, index) => (
                  <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-200 border-slate-600">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Duration */}
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-lg font-semibold text-white mb-4">{currentT.duration}</h3>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-slate-400" />
                <span className="text-slate-300">{language === "en" ? project.durationEn : project.duration}</span>
              </div>
            </div>
          </div>

          {/* CTA Button - SOLO "Inizia il Tuo Progetto" */}
          <div className="pt-6 border-t border-slate-700">
            <Button
              onClick={() => (window.location.href = "/appointments")}
              className="w-full bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-semibold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] group"
            >
              <Calendar className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
              {currentT.startProject}
              <ArrowRight className="w-5 h-5 ml-3 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
