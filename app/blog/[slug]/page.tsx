"use client"

import { notFound } from "next/navigation"
import { motion } from "framer-motion"
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "../../contexts/language-context"
import Navbar from "../../components/navbar"
import { blogPosts } from "../../../lib/blog-data"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { language } = useLanguage()

  const post = blogPosts.find((p) => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const currentContent = language === "en" ? post.contentEn : post.content
  const currentTitle = language === "en" ? post.titleEn : post.title
  const currentExcerpt = language === "en" ? post.excerptEn : post.excerpt

  // Get related posts (same category, excluding current)
  const relatedPosts = blogPosts.filter((p) => p.category === post.category && p.slug !== post.slug).slice(0, 3)

  const getCategoryColor = (category: string) => {
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

  // Generate table of contents from content headings
  const generateTOC = (content: string) => {
    const headings = content.match(/#{2,3}\s+(.+)/g) || []
    return headings.map((heading, index) => {
      const level = heading.match(/^#{2,3}/)?.[0].length || 2
      const text = heading.replace(/^#{2,3}\s+/, "")
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-")
      return { level, text, id, index }
    })
  }

  const toc = generateTOC(currentContent)

  return (
    <div className="bg-slate-900 text-white min-h-screen">
      <Navbar />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-12 px-4 bg-gradient-to-br from-slate-800 to-slate-900">
          <div className="container mx-auto max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              {/* Back Button */}
              <Link href="/blog">
                <Button variant="ghost" className="mb-6 text-slate-400 hover:text-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {language === "it" ? "Torna al Blog" : "Back to Blog"}
                </Button>
              </Link>

              {/* Category Badge */}
              <Badge className={`${getCategoryColor(post.category)} text-white border-0 mb-4`}>{post.category}</Badge>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{currentTitle}</h1>

              {/* Excerpt */}
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">{currentExcerpt}</p>

              {/* Meta Info */}
              <div className="flex flex-wrap items-center gap-6 text-slate-400">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Table of Contents - Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-1"
              >
                <div className="sticky top-24">
                  <Card className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <BookOpen className="w-5 h-5 text-cyan-400" />
                        <h3 className="font-semibold text-white">
                          {language === "it" ? "Indice" : "Table of Contents"}
                        </h3>
                      </div>
                      <nav className="space-y-2">
                        {toc.map((item) => (
                          <a
                            key={item.index}
                            href={`#${item.id}`}
                            className={`block text-sm text-slate-400 hover:text-cyan-400 transition-colors ${
                              item.level === 3 ? "ml-4" : ""
                            }`}
                          >
                            {item.text}
                          </a>
                        ))}
                      </nav>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="lg:col-span-3"
              >
                {/* Featured Image */}
                <div className="aspect-video mb-8 rounded-xl overflow-hidden bg-slate-800">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={currentTitle}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Article Body */}
                <div className="prose prose-invert prose-lg max-w-none">
                  <div
                    className="text-slate-300 leading-relaxed space-y-6"
                    dangerouslySetInnerHTML={{
                      __html: currentContent
                        .replace(/#{2}\s+(.+)/g, '<h2 id="$1" class="text-2xl font-bold text-white mt-8 mb-4">$1</h2>')
                        .replace(
                          /#{3}\s+(.+)/g,
                          '<h3 id="$1" class="text-xl font-semibold text-white mt-6 mb-3">$1</h3>',
                        )
                        .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
                        .replace(/\*(.+?)\*/g, '<em class="text-cyan-300">$1</em>')
                        .replace(
                          /`(.+?)`/g,
                          '<code class="bg-slate-800 text-cyan-300 px-2 py-1 rounded text-sm">$1</code>',
                        )
                        .replace(/\n\n/g, '</p><p class="mb-4">')
                        .replace(/^/, '<p class="mb-4">')
                        .replace(/$/, "</p>"),
                    }}
                  />
                </div>

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {language === "it" ? "Ti è piaciuto questo articolo?" : "Did you like this article?"}
                      </h3>
                      <p className="text-slate-400">
                        {language === "it" ? "Condividilo con i tuoi colleghi" : "Share it with your colleagues"}
                      </p>
                    </div>
                    <Button className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700">
                      <Share2 className="w-4 h-4 mr-2" />
                      {language === "it" ? "Condividi" : "Share"}
                    </Button>
                  </div>
                </div>

                {/* Author Info */}
                <Card className="mt-8 bg-slate-800/50 border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
                        <User className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">{post.author}</h3>
                        <p className="text-slate-400 mb-3">
                          {language === "it"
                            ? "Esperto in soluzioni AI e trasformazione digitale. Aiuta le aziende a implementare tecnologie innovative per migliorare efficienza e competitività."
                            : "Expert in AI solutions and digital transformation. Helps companies implement innovative technologies to improve efficiency and competitiveness."}
                        </p>
                        <div className="flex gap-2">
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {language === "it" ? "AI Specialist" : "AI Specialist"}
                          </Badge>
                          <Badge variant="outline" className="border-slate-600 text-slate-300">
                            {language === "it" ? "Digital Transformation" : "Digital Transformation"}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="py-12 px-4 bg-slate-800/30">
            <div className="container mx-auto max-w-6xl">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                <h2 className="text-3xl font-bold text-white mb-8 text-center">
                  {language === "it" ? "Articoli Correlati" : "Related Articles"}
                </h2>

                <div className="grid md:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost, index) => (
                    <motion.div
                      key={relatedPost.slug}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      whileHover={{ y: -5 }}
                    >
                      <Link href={`/blog/${relatedPost.slug}`}>
                        <Card className="h-full bg-slate-800/50 border-slate-700 hover:border-cyan-500 transition-all duration-300 cursor-pointer group">
                          <div className="aspect-video overflow-hidden rounded-t-lg">
                            <Image
                              src={relatedPost.image || "/placeholder.svg"}
                              alt={language === "en" ? relatedPost.titleEn : relatedPost.title}
                              width={400}
                              height={200}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <CardContent className="p-6">
                            <Badge className={`${getCategoryColor(relatedPost.category)} text-white border-0 mb-3`}>
                              {relatedPost.category}
                            </Badge>
                            <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                              {language === "en" ? relatedPost.titleEn : relatedPost.title}
                            </h3>
                            <p className="text-slate-400 text-sm mb-4">
                              {language === "en" ? relatedPost.excerptEn : relatedPost.excerpt}
                            </p>
                            <div className="flex items-center text-slate-500 text-sm">
                              <Calendar className="w-4 h-4 mr-2" />
                              {relatedPost.date}
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-r from-cyan-600 to-blue-600">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl font-bold text-white mb-4">
                {language === "it" ? "Pronto a trasformare il tuo business?" : "Ready to transform your business?"}
              </h2>
              <p className="text-xl text-cyan-100 mb-8">
                {language === "it"
                  ? "Scopri come le nostre soluzioni AI possono aiutare la tua azienda"
                  : "Discover how our AI solutions can help your business"}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/appointments">
                  <Button size="lg" className="bg-white text-cyan-600 hover:bg-slate-100">
                    {language === "it" ? "Prenota Consulenza" : "Book Consultation"}
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/#contact">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10 bg-transparent"
                  >
                    {language === "it" ? "Contattaci" : "Contact Us"}
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  )
}
