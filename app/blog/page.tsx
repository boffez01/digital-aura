"use client"

import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Search, Calendar, User, ArrowRight, BookOpen, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "../contexts/language-context"
import Navbar from "../components/navbar"
import { blogPosts } from "../../lib/blog-data"

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Tutti")
  const { language } = useLanguage()

  // Get unique categories
  const categories = ["Tutti", ...Array.from(new Set(blogPosts.map((post) => post.category)))]

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      const matchesSearch =
        searchTerm === "" ||
        (language === "en" ? post.titleEn : post.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
        (language === "en" ? post.excerptEn : post.excerpt).toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory = selectedCategory === "Tutti" || post.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [searchTerm, selectedCategory, language])

  const getCategoryColor = (category: string, isSelected = false) => {
    const colors = {
      Tutti: isSelected
        ? "bg-cyan-500 text-white"
        : "bg-slate-700 text-cyan-300 hover:bg-cyan-500/20 border-cyan-500/30",
      "AI & Automation": isSelected
        ? "bg-purple-500 text-white"
        : "bg-slate-700 text-purple-300 hover:bg-purple-500/20 border-purple-500/30",
      "Web Development": isSelected
        ? "bg-green-500 text-white"
        : "bg-slate-700 text-green-300 hover:bg-green-500/20 border-green-500/30",
      "Digital Marketing": isSelected
        ? "bg-orange-500 text-white"
        : "bg-slate-700 text-orange-300 hover:bg-orange-500/20 border-orange-500/30",
      Chatbots: isSelected
        ? "bg-blue-500 text-white"
        : "bg-slate-700 text-blue-300 hover:bg-blue-500/20 border-blue-500/30",
      Sicurezza: isSelected
        ? "bg-red-500 text-white"
        : "bg-slate-700 text-red-300 hover:bg-red-500/20 border-red-500/30",
      Mobile: isSelected
        ? "bg-indigo-500 text-white"
        : "bg-slate-700 text-indigo-300 hover:bg-indigo-500/20 border-indigo-500/30",
      Cloud: isSelected
        ? "bg-cyan-500 text-white"
        : "bg-slate-700 text-cyan-300 hover:bg-cyan-500/20 border-cyan-500/30",
      "UX/UI Design": isSelected
        ? "bg-pink-500 text-white"
        : "bg-slate-700 text-pink-300 hover:bg-pink-500/20 border-pink-500/30",
      Blockchain: isSelected
        ? "bg-yellow-500 text-white"
        : "bg-slate-700 text-yellow-300 hover:bg-yellow-500/20 border-yellow-500/30",
      "Tecnologia Vocale": isSelected
        ? "bg-teal-500 text-white"
        : "bg-slate-700 text-teal-300 hover:bg-teal-500/20 border-teal-500/30",
      "E-commerce": isSelected
        ? "bg-violet-500 text-white"
        : "bg-slate-700 text-violet-300 hover:bg-violet-500/20 border-violet-500/30",
      Analytics: isSelected
        ? "bg-emerald-500 text-white"
        : "bg-slate-700 text-emerald-300 hover:bg-emerald-500/20 border-emerald-500/30",
    }
    return (
      colors[category as keyof typeof colors] ||
      (isSelected ? "bg-gray-500 text-white" : "bg-slate-700 text-gray-300 hover:bg-gray-500/20 border-gray-500/30")
    )
  }

  const getCardCategoryColor = (category: string) => {
    const colors = {
      "AI & Automation": "bg-gradient-to-r from-purple-500 to-indigo-600",
      "Web Development": "bg-gradient-to-r from-green-500 to-emerald-600",
      "Digital Marketing": "bg-gradient-to-r from-orange-500 to-red-600",
      Chatbots: "bg-gradient-to-r from-blue-500 to-cyan-600",
      Sicurezza: "bg-gradient-to-r from-red-500 to-pink-600",
      Mobile: "bg-gradient-to-r from-indigo-500 to-purple-600",
      Cloud: "bg-gradient-to-r from-cyan-500 to-blue-600",
      "UX/UI Design": "bg-gradient-to-r from-pink-500 to-rose-600",
      Blockchain: "bg-gradient-to-r from-yellow-500 to-orange-600",
      "Tecnologia Vocale": "bg-gradient-to-r from-teal-500 to-green-600",
      "E-commerce": "bg-gradient-to-r from-violet-500 to-purple-600",
      Analytics: "bg-gradient-to-r from-emerald-500 to-teal-600",
    }
    return colors[category as keyof typeof colors] || "bg-gradient-to-r from-gray-500 to-gray-600"
  }

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container mx-auto max-w-6xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="flex items-center justify-center gap-2 mb-6">
                <BookOpen className="w-8 h-8 text-cyan-400" />
                <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-500/30 px-4 py-2">
                  {language === "it" ? "Blog Digitale" : "Digital Blog"}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {language === "it" ? (
                  <>
                    Insights e Tendenze nel
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Mondo Digitale
                    </span>
                  </>
                ) : (
                  <>
                    Insights and Trends in the
                    <br />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                      Digital World
                    </span>
                  </>
                )}
              </h1>

              <p className="text-lg text-slate-400 max-w-3xl mx-auto mb-8">
                {language === "it"
                  ? "Scopri le ultime novità su AI, automazione, sviluppo web e marketing digitale. Guide pratiche e case study per far crescere il tuo business."
                  : "Discover the latest news on AI, automation, web development and digital marketing. Practical guides and case studies to grow your business."}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
                {[
                  { value: "50+", label: language === "it" ? "Articoli" : "Articles" },
                  { value: "10K+", label: language === "it" ? "Lettori" : "Readers" },
                  { value: "12", label: language === "it" ? "Categorie" : "Categories" },
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="text-2xl md:text-3xl font-bold text-cyan-400 mb-2">{stat.value}</div>
                    <div className="text-slate-400 text-sm">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Search and Filters */}
        <section className="py-8 px-4 bg-slate-800/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Search Bar */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder={language === "it" ? "Cerca articoli..." : "Search articles..."}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-800 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500"
                />
              </div>

              {/* Category Filters - CONTRASTO MIGLIORATO */}
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                    className={`${getCategoryColor(category, selectedCategory === category)} transition-all duration-300 border font-medium`}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Results Count */}
              <div className="text-center text-slate-400">
                {language === "it"
                  ? `${filteredPosts.length} articoli trovati`
                  : `${filteredPosts.length} articles found`}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Blog Posts Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            {filteredPosts.length === 0 ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                <BookOpen className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-400 mb-2">
                  {language === "it" ? "Nessun articolo trovato" : "No articles found"}
                </h3>
                <p className="text-slate-500">
                  {language === "it" ? "Prova a modificare i filtri di ricerca" : "Try modifying your search filters"}
                </p>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="h-full"
                  >
                    <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all duration-300 group cursor-pointer">
                      <Link href={`/blog/${post.slug}`}>
                        {/* Image */}
                        <div className="aspect-video overflow-hidden rounded-t-lg">
                          <Image
                            src={post.image || "/placeholder.svg"}
                            alt={language === "en" ? post.titleEn : post.title}
                            width={400}
                            height={200}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={`${getCardCategoryColor(post.category)} text-white border-0`}>
                              {post.category}
                            </Badge>
                            <div className="flex items-center text-slate-500 text-sm">
                              <TrendingUp className="w-4 h-4 mr-1" />
                              {post.readTime}
                            </div>
                          </div>

                          <CardTitle className="text-xl text-white group-hover:text-cyan-400 transition-colors line-clamp-2">
                            {language === "en" ? post.titleEn : post.title}
                          </CardTitle>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <CardDescription className="text-slate-400 mb-4 line-clamp-3">
                            {language === "en" ? post.excerptEn : post.excerpt}
                          </CardDescription>

                          <div className="flex items-center justify-between text-sm text-slate-500">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span>{post.author}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>{post.date}</span>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 pt-4 border-t border-slate-700">
                            <div className="flex items-center justify-between">
                              <span className="text-cyan-400 font-medium group-hover:text-white transition-colors">
                                {language === "it" ? "Leggi articolo" : "Read article"}
                              </span>
                              <ArrowRight className="w-4 h-4 text-cyan-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300" />
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Newsletter CTA */}
        <section className="py-16 px-4 bg-gradient-to-r from-cyan-600 to-blue-600">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold text-white mb-4">
                {language === "it" ? "Non perdere i nostri aggiornamenti" : "Don't miss our updates"}
              </h2>
              <p className="text-xl text-cyan-100 mb-8">
                {language === "it"
                  ? "Ricevi i migliori articoli su AI e tecnologia direttamente nella tua inbox"
                  : "Get the best articles on AI and technology directly in your inbox"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder={language === "it" ? "La tua email" : "Your email"}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                />
                <Button className="bg-white text-cyan-600 hover:bg-slate-100 font-semibold">
                  {language === "it" ? "Iscriviti" : "Subscribe"}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
