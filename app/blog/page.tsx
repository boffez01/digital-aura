"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Search,
  Calendar,
  User,
  ArrowRight,
  Filter,
  BookOpen,
  TrendingUp,
  Zap,
  Globe,
  Shield,
  Smartphone,
  Brain,
  Cloud,
  Palette,
  Blocks,
  Mic,
} from "lucide-react"
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"
import BackToMenu from "../components/back-to-menu"

export default function BlogPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const categories = [
    { id: "all", label: language === "it" ? "Tutti" : "All", icon: <BookOpen className="w-4 h-4" /> },
    { id: "ai", label: "AI & Automation", icon: <Brain className="w-4 h-4" /> },
    { id: "web", label: "Web Development", icon: <Globe className="w-4 h-4" /> },
    { id: "marketing", label: "Digital Marketing", icon: <TrendingUp className="w-4 h-4" /> },
    { id: "chatbot", label: "Chatbots", icon: <Zap className="w-4 h-4" /> },
    { id: "security", label: language === "it" ? "Sicurezza" : "Security", icon: <Shield className="w-4 h-4" /> },
    { id: "mobile", label: "Mobile", icon: <Smartphone className="w-4 h-4" /> },
    { id: "cloud", label: "Cloud", icon: <Cloud className="w-4 h-4" /> },
    { id: "ux", label: "UX/UI Design", icon: <Palette className="w-4 h-4" /> },
    { id: "blockchain", label: "Blockchain", icon: <Blocks className="w-4 h-4" /> },
    { id: "voice", label: language === "it" ? "Tecnologia Vocale" : "Voice Tech", icon: <Mic className="w-4 h-4" /> },
    { id: "ecommerce", label: "E-commerce", icon: <ArrowRight className="w-4 h-4" /> },
    { id: "analytics", label: "Analytics", icon: <TrendingUp className="w-4 h-4" /> },
  ]

  const blogPosts = [
    {
      id: 1,
      title:
        language === "it" ? "Il Futuro dell'Automazione AI nel Business" : "The Future of AI Automation in Business",
      excerpt:
        language === "it"
          ? "Scopri come l'intelligenza artificiale sta rivoluzionando i processi aziendali e quali opportunità offre per il futuro."
          : "Discover how artificial intelligence is revolutionizing business processes and what opportunities it offers for the future.",
      category: "ai",
      date: "2024-12-15",
      author: "Digital Aura Team",
      readTime: "8 min",
      image: "/ai-business-automation.png",
      featured: true,
    },
    {
      id: 2,
      title:
        language === "it"
          ? "Chatbot per il Servizio Clienti: Guida Completa 2024"
          : "Customer Service Chatbots: Complete Guide 2024",
      excerpt:
        language === "it"
          ? "Come implementare chatbot efficaci per migliorare il servizio clienti e aumentare la soddisfazione."
          : "How to implement effective chatbots to improve customer service and increase satisfaction.",
      category: "chatbot",
      date: "2024-12-10",
      author: "Marco Rossi",
      readTime: "12 min",
      image: "/customer-service-chatbot.png",
      featured: true,
    },
    {
      id: 3,
      title:
        language === "it"
          ? "Tendenze Sviluppo Web 2024: Cosa Aspettarsi"
          : "Web Development Trends 2024: What to Expect",
      excerpt:
        language === "it"
          ? "Le tecnologie e i framework che domineranno lo sviluppo web nel 2024 e oltre."
          : "The technologies and frameworks that will dominate web development in 2024 and beyond.",
      category: "web",
      date: "2024-12-08",
      author: "Sara Bianchi",
      readTime: "10 min",
      image: "/web-development-trends.png",
      featured: false,
    },
    {
      id: 4,
      title:
        language === "it"
          ? "Strategie di Marketing AI per Piccole Imprese"
          : "AI Marketing Strategies for Small Businesses",
      excerpt:
        language === "it"
          ? "Come le piccole imprese possono sfruttare l'AI per competere con i grandi player del mercato."
          : "How small businesses can leverage AI to compete with major market players.",
      category: "marketing",
      date: "2024-12-05",
      author: "Luca Verdi",
      readTime: "7 min",
      image: "/ai-marketing-strategies.png",
      featured: false,
    },
    {
      id: 5,
      title:
        language === "it"
          ? "Analisi Dati nel Business: Trasformare i Numeri in Decisioni"
          : "Data Analytics in Business: Turning Numbers into Decisions",
      excerpt:
        language === "it"
          ? "L'importanza dell'analisi dati per prendere decisioni strategiche informate e guidare la crescita aziendale."
          : "The importance of data analysis for making informed strategic decisions and driving business growth.",
      category: "analytics",
      date: "2024-12-03",
      author: "Anna Neri",
      readTime: "9 min",
      image: "/data-analytics-business.png",
      featured: false,
    },
    {
      id: 6,
      title:
        language === "it"
          ? "Sicurezza Informatica e AI: Proteggere il Futuro Digitale"
          : "Cybersecurity & AI: Protecting the Digital Future",
      excerpt:
        language === "it"
          ? "Come l'intelligenza artificiale sta rivoluzionando la sicurezza informatica e proteggendo le aziende dalle minacce."
          : "How artificial intelligence is revolutionizing cybersecurity and protecting businesses from threats.",
      category: "security",
      date: "2024-11-28",
      author: "Roberto Blu",
      readTime: "11 min",
      image: "/cybersecurity-ai-protection.jpg",
      featured: false,
    },
    {
      id: 7,
      title:
        language === "it"
          ? "Personalizzazione E-commerce con AI: Aumentare le Conversioni"
          : "E-commerce AI Personalization: Boosting Conversions",
      excerpt:
        language === "it"
          ? "Strategie avanzate di personalizzazione per e-commerce utilizzando l'intelligenza artificiale per massimizzare le vendite."
          : "Advanced personalization strategies for e-commerce using artificial intelligence to maximize sales.",
      category: "ecommerce",
      date: "2024-11-25",
      author: "Giulia Rosa",
      readTime: "8 min",
      image: "/ecommerce-ai-personalization.jpg",
      featured: false,
    },
    {
      id: 8,
      title:
        language === "it"
          ? "Cloud Computing per PMI: Guida alla Trasformazione Digitale"
          : "Cloud Computing for SMBs: Digital Transformation Guide",
      excerpt:
        language === "it"
          ? "Come le piccole e medie imprese possono sfruttare il cloud computing per accelerare la crescita e ridurre i costi."
          : "How small and medium businesses can leverage cloud computing to accelerate growth and reduce costs.",
      category: "cloud",
      date: "2024-11-22",
      author: "Francesco Grigio",
      readTime: "10 min",
      image: "/cloud-computing-business.png",
      featured: false,
    },
    {
      id: 9,
      title:
        language === "it"
          ? "Sviluppo App Mobile: Native vs Cross-Platform nel 2024"
          : "Mobile App Development: Native vs Cross-Platform in 2024",
      excerpt:
        language === "it"
          ? "Confronto dettagliato tra sviluppo nativo e cross-platform per scegliere l'approccio migliore per la tua app."
          : "Detailed comparison between native and cross-platform development to choose the best approach for your app.",
      category: "mobile",
      date: "2024-11-20",
      author: "Elena Viola",
      readTime: "12 min",
      image: "/mobile-app-development.png",
      featured: false,
    },
    {
      id: 10,
      title:
        language === "it"
          ? "Psicologia del Design UX: Come Influenzare il Comportamento Utente"
          : "UX Design Psychology: How to Influence User Behavior",
      excerpt:
        language === "it"
          ? "Principi psicologici applicati al design UX per creare esperienze utente coinvolgenti e convertire meglio."
          : "Psychological principles applied to UX design to create engaging user experiences and convert better.",
      category: "ux",
      date: "2024-11-18",
      author: "Matteo Arancio",
      readTime: "9 min",
      image: "/ux-design-psychology.jpg",
      featured: false,
    },
    {
      id: 11,
      title:
        language === "it"
          ? "Blockchain nel Business: Applicazioni Pratiche Oltre le Criptovalute"
          : "Blockchain in Business: Practical Applications Beyond Crypto",
      excerpt:
        language === "it"
          ? "Scopri come la tecnologia blockchain può rivoluzionare settori come supply chain, sanità e servizi finanziari."
          : "Discover how blockchain technology can revolutionize sectors like supply chain, healthcare, and financial services.",
      category: "blockchain",
      date: "2024-11-15",
      author: "Chiara Verde",
      readTime: "11 min",
      image: "/blockchain-business-applications.jpg",
      featured: false,
    },
    {
      id: 12,
      title:
        language === "it"
          ? "Tecnologia Vocale e AI: Il Futuro dell'Interazione Umano-Computer"
          : "Voice Technology & AI: The Future of Human-Computer Interaction",
      excerpt:
        language === "it"
          ? "Come assistenti vocali e tecnologie speech-to-text stanno trasformando il modo in cui interagiamo con la tecnologia."
          : "How voice assistants and speech-to-text technologies are transforming how we interact with technology.",
      category: "voice",
      date: "2024-11-12",
      author: "Alessandro Oro",
      readTime: "8 min",
      image: "/voice-technology-ai-interaction.jpg",
      featured: false,
    },
  ]

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-8 pt-24">
        <BackToMenu href="/" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            {language === "it" ? "Blog Digital Aura" : "Digital Aura Blog"}
          </h1>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            {language === "it"
              ? "Insights, guide e tendenze nel mondo dell'AI, sviluppo web e trasformazione digitale"
              : "Insights, guides and trends in the world of AI, web development and digital transformation"}
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder={language === "it" ? "Cerca articoli..." : "Search articles..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-white placeholder-slate-400 focus:border-cyan-500"
              />
            </div>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 bg-transparent">
              <Filter className="w-4 h-4 mr-2" />
              {language === "it" ? "Filtri" : "Filters"}
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "border-slate-600 text-slate-300 hover:bg-slate-800"
                }`}
              >
                {category.icon}
                <span className="ml-2">{category.label}</span>
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-2xl font-bold mb-8 text-white">
              {language === "it" ? "Articoli in Evidenza" : "Featured Articles"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {featuredPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={post.image || "/placeholder.svg"}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge className="bg-cyan-500 text-white">
                          {language === "it" ? "In Evidenza" : "Featured"}
                        </Badge>
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-center gap-2 text-sm text-slate-400 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString(language === "it" ? "it-IT" : "en-US")}</span>
                        <span>•</span>
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                      <CardTitle className="text-white group-hover:text-cyan-400 transition-colors">
                        {post.title}
                      </CardTitle>
                      <CardDescription className="text-slate-400">{post.excerpt}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="border-slate-600 text-slate-300">
                          {categories.find((cat) => cat.id === post.category)?.label}
                        </Badge>
                        <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300">
                          {language === "it" ? "Leggi di più" : "Read more"}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Regular Posts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <h2 className="text-2xl font-bold mb-8 text-white">
            {language === "it" ? "Tutti gli Articoli" : "All Articles"}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -5 }}
              >
                <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden group">
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{new Date(post.date).toLocaleDateString(language === "it" ? "it-IT" : "en-US")}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <CardTitle className="text-lg text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                      {post.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400 text-sm line-clamp-3">{post.excerpt}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-slate-600 text-slate-300 text-xs">
                        {categories.find((cat) => cat.id === post.category)?.label}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-cyan-400 hover:text-cyan-300 text-xs">
                        {language === "it" ? "Leggi" : "Read"}
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* No Results */}
        {filteredPosts.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              {language === "it" ? "Nessun articolo trovato" : "No articles found"}
            </h3>
            <p className="text-slate-400 mb-6">
              {language === "it"
                ? "Prova a modificare i filtri o il termine di ricerca"
                : "Try modifying the filters or search term"}
            </p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory("all")
              }}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700"
            >
              {language === "it" ? "Mostra tutti gli articoli" : "Show all articles"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  )
}
