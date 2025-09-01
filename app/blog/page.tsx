"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLanguage } from "@/app/contexts/language-context"
import { BackToMenu } from "@/app/components/back-to-menu"

// Blog post interface
interface BlogPost {
  id: string
  title: string
  titleIt: string
  excerpt: string
  excerptIt: string
  content: string
  contentIt: string
  category: string
  image: string
  author: string
  date: string
  readTime: number
}

export default function BlogPage() {
  const { language } = useLanguage()
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([])

  // Sample blog posts data
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of AI in Business Automation",
      titleIt: "Il Futuro dell'AI nell'Automazione Aziendale",
      excerpt: "Discover how AI is transforming business processes and creating new opportunities for efficiency.",
      excerptIt: "Scopri come l'AI sta trasformando i processi aziendali e creando nuove opportunità per l'efficienza.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "ai-automation",
      image: "/ai-business-automation.png",
      author: "Marco Rossi",
      date: "2023-10-15",
      readTime: 5,
    },
    {
      id: "2",
      title: "Building Effective Chatbots for Customer Service",
      titleIt: "Costruire Chatbot Efficaci per il Servizio Clienti",
      excerpt: "Learn the best practices for designing chatbots that enhance customer experience and satisfaction.",
      excerptIt:
        "Scopri le migliori pratiche per progettare chatbot che migliorano l'esperienza e la soddisfazione del cliente.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "chatbots",
      image: "/customer-service-chatbot.png",
      author: "Laura Bianchi",
      date: "2023-09-28",
      readTime: 7,
    },
    {
      id: "3",
      title: "Web Development Trends for 2024",
      titleIt: "Tendenze nello Sviluppo Web per il 2024",
      excerpt: "Stay ahead of the curve with these emerging web development technologies and methodologies.",
      excerptIt: "Rimani all'avanguardia con queste tecnologie e metodologie emergenti nello sviluppo web.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "web-development",
      image: "/web-development-trends.png",
      author: "Alessandro Verdi",
      date: "2023-11-05",
      readTime: 6,
    },
    {
      id: "4",
      title: "AI-Driven Marketing Strategies That Work",
      titleIt: "Strategie di Marketing Basate sull'AI che Funzionano",
      excerpt: "Explore how artificial intelligence is revolutionizing marketing campaigns and customer targeting.",
      excerptIt:
        "Esplora come l'intelligenza artificiale sta rivoluzionando le campagne di marketing e il targeting dei clienti.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "ai-marketing",
      image: "/ai-marketing-strategies.png",
      author: "Giulia Ferrari",
      date: "2023-10-22",
      readTime: 8,
    },
    {
      id: "5",
      title: "The Role of Data Analytics in Modern Business",
      titleIt: "Il Ruolo dell'Analisi dei Dati nel Business Moderno",
      excerpt: "Understand how data-driven decision making is becoming essential for business success.",
      excerptIt:
        "Comprendi come il processo decisionale basato sui dati sta diventando essenziale per il successo aziendale.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "data-analytics",
      image: "/data-analytics-business.png",
      author: "Roberto Neri",
      date: "2023-11-12",
      readTime: 6,
    },
  ]

  // Categories
  const categories = [
    { id: "all", name: language === "it" ? "Tutti" : "All" },
    { id: "ai-automation", name: "AI Automation" },
    { id: "chatbots", name: language === "it" ? "Chatbot" : "Chatbots" },
    { id: "web-development", name: language === "it" ? "Sviluppo Web" : "Web Development" },
    { id: "ai-marketing", name: "AI Marketing" },
    { id: "data-analytics", name: language === "it" ? "Analisi Dati" : "Data Analytics" },
  ]

  // Filter posts based on search term and active category
  useEffect(() => {
    let filtered = [...blogPosts]

    if (searchTerm) {
      filtered = filtered.filter(
        (post) =>
          (language === "it" ? post.titleIt : post.title).toLowerCase().includes(searchTerm.toLowerCase()) ||
          (language === "it" ? post.excerptIt : post.excerpt).toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    if (activeCategory !== "all") {
      filtered = filtered.filter((post) => post.category === activeCategory)
    }

    setFilteredPosts(filtered)
  }, [searchTerm, activeCategory, language])

  // Handle newsletter subscription
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Subscribing email:", email)
    setSubscribed(true)
    setEmail("")

    // Reset the subscribed state after 5 seconds
    setTimeout(() => {
      setSubscribed(false)
    }, 5000)
  }

  // Format date based on language
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return language === "it"
      ? date.toLocaleDateString("it-IT", { year: "numeric", month: "long", day: "numeric" })
      : date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackToMenu />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4">{language === "it" ? "Il Nostro Blog" : "Our Blog"}</h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          {language === "it"
            ? "Scopri le ultime novità, tendenze e approfondimenti nel mondo della tecnologia e dell'innovazione digitale."
            : "Discover the latest news, trends, and insights in the world of technology and digital innovation."}
        </p>
      </motion.div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
          <Input
            type="text"
            placeholder={language === "it" ? "Cerca articoli..." : "Search articles..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />

          <Tabs
            defaultValue="all"
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full md:w-auto"
          >
            <TabsList className="w-full md:w-auto overflow-x-auto flex-nowrap">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>

      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={language === "it" ? post.titleIt : post.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{categories.find((c) => c.id === post.category)?.name}</Badge>
                    <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                  </div>
                  <CardTitle className="text-xl hover:text-purple-600 transition-colors">
                    {language === "it" ? post.titleIt : post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-gray-600">{language === "it" ? post.excerptIt : post.excerpt}</p>
                </CardContent>
                <CardFooter className="flex items-center justify-between border-t pt-4">
                  <div className="text-sm text-gray-500">
                    {post.readTime} {language === "it" ? "min di lettura" : "min read"}
                  </div>
                  <Button variant="ghost" className="text-purple-600 hover:text-purple-800 hover:bg-purple-50">
                    {language === "it" ? "Leggi di più" : "Read more"}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">
            {language === "it"
              ? "Nessun articolo trovato. Prova a modificare i filtri di ricerca."
              : "No articles found. Try changing your search filters."}
          </p>
        </div>
      )}

      {/* Newsletter Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mt-16 bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8"
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">
            {language === "it" ? "Iscriviti alla nostra Newsletter" : "Subscribe to our Newsletter"}
          </h2>
          <p className="text-gray-600 mb-6">
            {language === "it"
              ? "Ricevi i nostri ultimi articoli, aggiornamenti e risorse direttamente nella tua casella di posta."
              : "Get our latest articles, updates, and resources straight to your inbox."}
          </p>

          {subscribed ? (
            <div className="bg-green-100 text-green-800 p-4 rounded-md">
              {language === "it"
                ? "Grazie per l'iscrizione! Ti abbiamo inviato un'email di conferma."
                : "Thank you for subscribing! We've sent you a confirmation email."}
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Input
                type="email"
                placeholder={language === "it" ? "La tua email" : "Your email"}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="max-w-xs"
              />
              <Button type="submit" className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                {language === "it" ? "Iscriviti" : "Subscribe"}
              </Button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
