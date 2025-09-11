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

  // Expanded blog posts data with more articles
  const blogPosts: BlogPost[] = [
    {
      id: "1",
      title: "The Future of AI in Business Automation",
      titleIt: "Il Futuro dell'AI nell'Automazione Aziendale",
      excerpt:
        "Discover how AI is transforming business processes and creating new opportunities for efficiency and growth in 2024.",
      excerptIt:
        "Scopri come l'AI sta trasformando i processi aziendali e creando nuove opportunità per l'efficienza e la crescita nel 2024.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "ai-automation",
      image: "/ai-business-automation.png",
      author: "Marco Rossi",
      date: "2024-01-15",
      readTime: 5,
    },
    {
      id: "2",
      title: "Building Effective Chatbots for Customer Service",
      titleIt: "Costruire Chatbot Efficaci per il Servizio Clienti",
      excerpt:
        "Learn the best practices for designing chatbots that enhance customer experience and boost satisfaction rates.",
      excerptIt:
        "Scopri le migliori pratiche per progettare chatbot che migliorano l'esperienza cliente e aumentano i tassi di soddisfazione.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "chatbots",
      image: "/customer-service-chatbot.png",
      author: "Laura Bianchi",
      date: "2024-01-08",
      readTime: 7,
    },
    {
      id: "3",
      title: "Web Development Trends for 2024",
      titleIt: "Tendenze nello Sviluppo Web per il 2024",
      excerpt:
        "Stay ahead of the curve with these emerging web development technologies and methodologies shaping the industry.",
      excerptIt:
        "Rimani all'avanguardia con queste tecnologie e metodologie emergenti nello sviluppo web che stanno plasmando l'industria.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "web-development",
      image: "/web-development-trends.png",
      author: "Alessandro Verdi",
      date: "2024-01-22",
      readTime: 6,
    },
    {
      id: "4",
      title: "AI-Driven Marketing Strategies That Work",
      titleIt: "Strategie di Marketing Basate sull'AI che Funzionano",
      excerpt:
        "Explore how artificial intelligence is revolutionizing marketing campaigns and customer targeting with real case studies.",
      excerptIt:
        "Esplora come l'intelligenza artificiale sta rivoluzionando le campagne di marketing e il targeting dei clienti con casi studio reali.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "ai-marketing",
      image: "/ai-marketing-strategies.png",
      author: "Giulia Ferrari",
      date: "2024-01-29",
      readTime: 8,
    },
    {
      id: "5",
      title: "The Role of Data Analytics in Modern Business",
      titleIt: "Il Ruolo dell'Analisi dei Dati nel Business Moderno",
      excerpt:
        "Understand how data-driven decision making is becoming essential for business success and competitive advantage.",
      excerptIt:
        "Comprendi come il processo decisionale basato sui dati sta diventando essenziale per il successo aziendale e il vantaggio competitivo.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "data-analytics",
      image: "/data-analytics-business.png",
      author: "Roberto Neri",
      date: "2024-02-05",
      readTime: 6,
    },
    {
      id: "6",
      title: "Cybersecurity in the Age of AI: Protecting Your Digital Assets",
      titleIt: "Cybersecurity nell'Era dell'AI: Proteggere i Tuoi Asset Digitali",
      excerpt:
        "Learn about the latest cybersecurity threats and how AI can both create vulnerabilities and provide solutions.",
      excerptIt:
        "Scopri le ultime minacce alla cybersecurity e come l'AI può sia creare vulnerabilità che fornire soluzioni.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "cybersecurity",
      image: "/cybersecurity-ai.png",
      author: "Francesca Romano",
      date: "2024-02-12",
      readTime: 9,
    },
    {
      id: "7",
      title: "E-commerce Revolution: Personalization Through AI",
      titleIt: "Rivoluzione E-commerce: Personalizzazione Attraverso l'AI",
      excerpt:
        "Discover how AI-powered personalization is transforming online shopping experiences and boosting conversion rates.",
      excerptIt:
        "Scopri come la personalizzazione basata sull'AI sta trasformando le esperienze di shopping online e aumentando i tassi di conversione.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "ecommerce",
      image: "/ecommerce-ai-personalization.png",
      author: "Matteo Conti",
      date: "2024-02-19",
      readTime: 7,
    },
    {
      id: "8",
      title: "Cloud Computing Strategies for Small Businesses",
      titleIt: "Strategie di Cloud Computing per Piccole Imprese",
      excerpt:
        "A comprehensive guide to adopting cloud technologies for small businesses, including cost analysis and implementation tips.",
      excerptIt:
        "Una guida completa per adottare le tecnologie cloud per piccole imprese, inclusa l'analisi dei costi e consigli per l'implementazione.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "cloud-computing",
      image: "/cloud-computing-small-business.png",
      author: "Simona Ricci",
      date: "2024-02-26",
      readTime: 8,
    },
    {
      id: "9",
      title: "Mobile App Development: Native vs Cross-Platform in 2024",
      titleIt: "Sviluppo App Mobile: Nativo vs Cross-Platform nel 2024",
      excerpt:
        "Compare the pros and cons of native and cross-platform mobile development approaches with real-world examples.",
      excerptIt:
        "Confronta i pro e i contro degli approcci di sviluppo mobile nativo e cross-platform con esempi del mondo reale.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "mobile-development",
      image: "/mobile-app-development.png",
      author: "Davide Marino",
      date: "2024-03-05",
      readTime: 10,
    },
    {
      id: "10",
      title: "The Psychology of UX Design: Creating Intuitive Interfaces",
      titleIt: "La Psicologia del Design UX: Creare Interfacce Intuitive",
      excerpt:
        "Explore the psychological principles behind effective UX design and how to apply them to create user-friendly interfaces.",
      excerptIt:
        "Esplora i principi psicologici dietro il design UX efficace e come applicarli per creare interfacce user-friendly.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "ux-design",
      image: "/ux-design-psychology.png",
      author: "Elena Grassi",
      date: "2024-03-12",
      readTime: 6,
    },
    {
      id: "11",
      title: "Blockchain Beyond Cryptocurrency: Real-World Applications",
      titleIt: "Blockchain Oltre le Criptovalute: Applicazioni nel Mondo Reale",
      excerpt:
        "Discover innovative blockchain applications in supply chain, healthcare, voting systems, and digital identity management.",
      excerptIt:
        "Scopri applicazioni innovative della blockchain nella supply chain, sanità, sistemi di voto e gestione dell'identità digitale.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "blockchain",
      image: "/blockchain-applications.png",
      author: "Andrea Lombardi",
      date: "2024-03-19",
      readTime: 9,
    },
    {
      id: "12",
      title: "Voice Technology and Conversational AI: The Next Frontier",
      titleIt: "Tecnologia Vocale e AI Conversazionale: La Prossima Frontiera",
      excerpt:
        "Explore the evolution of voice interfaces and conversational AI, from smart speakers to enterprise applications.",
      excerptIt:
        "Esplora l'evoluzione delle interfacce vocali e dell'AI conversazionale, dagli smart speaker alle applicazioni enterprise.",
      content: "Full article content here...",
      contentIt: "Contenuto completo dell'articolo qui...",
      category: "voice-technology",
      image: "/voice-technology-ai.png",
      author: "Chiara Fontana",
      date: "2024-03-26",
      readTime: 7,
    },
  ]

  // Expanded categories
  const categories = [
    { id: "all", name: language === "it" ? "Tutti" : "All" },
    { id: "ai-automation", name: "AI Automation" },
    { id: "chatbots", name: language === "it" ? "Chatbot" : "Chatbots" },
    { id: "web-development", name: language === "it" ? "Sviluppo Web" : "Web Development" },
    { id: "ai-marketing", name: "AI Marketing" },
    { id: "data-analytics", name: language === "it" ? "Analisi Dati" : "Data Analytics" },
    { id: "cybersecurity", name: language === "it" ? "Cybersecurity" : "Cybersecurity" },
    { id: "ecommerce", name: "E-commerce" },
    { id: "cloud-computing", name: "Cloud Computing" },
    { id: "mobile-development", name: language === "it" ? "Sviluppo Mobile" : "Mobile Development" },
    { id: "ux-design", name: "UX Design" },
    { id: "blockchain", name: "Blockchain" },
    { id: "voice-technology", name: language === "it" ? "Tecnologia Vocale" : "Voice Technology" },
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
      <BackToMenu label={language === "it" ? "Torna al Menu" : "Back to Menu"} />

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
                <TabsTrigger key={category.id} value={category.id} className="whitespace-nowrap text-xs">
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
