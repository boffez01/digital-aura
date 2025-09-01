"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User, Send, ShoppingCart, Star, Package } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  products?: Product[]
  options?: string[]
}

interface Product {
  id: string
  name: string
  price: number
  image: string
  rating: number
  inStock: boolean
}

const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Smartphone Pro Max",
    price: 899,
    image: "/modern-smartphone.png",
    rating: 4.8,
    inStock: true,
  },
  {
    id: "2",
    name: "Wireless Headphones",
    price: 199,
    image: "/diverse-people-listening-headphones.png",
    rating: 4.6,
    inStock: true,
  },
  {
    id: "3",
    name: "Smart Watch",
    price: 299,
    image: "/modern-smartwatch.png",
    rating: 4.7,
    inStock: false,
  },
]

export default function EcommerceChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content: "Ciao! Sono il tuo assistente shopping AI. Posso aiutarti a trovare i prodotti perfetti per te! 🛍️",
      timestamp: new Date(),
      options: ["Mostra prodotti popolari", "Cerca per categoria", "Offerte del giorno", "Il mio carrello"],
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [cart, setCart] = useState<Product[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { language } = useLanguage()

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const addMessage = (content: string, type: "user" | "bot", products?: Product[], options?: string[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      type,
      content,
      timestamp: new Date(),
      products,
      options,
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const simulateTyping = (callback: () => void, delay = 1500) => {
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      callback()
    }, delay)
  }

  const handleOptionClick = (option: string) => {
    addMessage(option, "user")
    simulateTyping(() => {
      switch (option) {
        case "Mostra prodotti popolari":
          addMessage(
            "Ecco i nostri prodotti più popolari! Tutti con ottime recensioni e disponibili per la spedizione immediata:",
            "bot",
            sampleProducts.filter((p) => p.inStock),
            ["Aggiungi al carrello", "Vedi dettagli", "Confronta prodotti"],
          )
          break
        case "Cerca per categoria":
          addMessage("In quale categoria sei interessato?", "bot", undefined, [
            "Elettronica",
            "Abbigliamento",
            "Casa e Giardino",
            "Sport e Tempo Libero",
          ])
          break
        case "Offerte del giorno":
          addMessage(
            "🔥 Offerte speciali di oggi! Sconti fino al 50% su prodotti selezionati:",
            "bot",
            sampleProducts.slice(0, 2),
            ["Acquista ora", "Aggiungi ai preferiti", "Condividi offerta"],
          )
          break
        case "Il mio carrello":
          if (cart.length === 0) {
            addMessage("Il tuo carrello è vuoto. Vuoi dare un'occhiata ai nostri prodotti?", "bot", undefined, [
              "Mostra prodotti popolari",
              "Cerca per categoria",
            ])
          } else {
            const total = cart.reduce((sum, item) => sum + item.price, 0)
            addMessage(
              `Il tuo carrello contiene ${cart.length} prodotti per un totale di €${total}. Vuoi procedere al checkout?`,
              "bot",
              cart,
              ["Procedi al checkout", "Continua shopping", "Svuota carrello"],
            )
          }
          break
        case "Aggiungi al carrello":
          if (sampleProducts[0]) {
            setCart((prev) => [...prev, sampleProducts[0]])
            addMessage(
              `✅ ${sampleProducts[0].name} aggiunto al carrello! Vuoi continuare a fare shopping?`,
              "bot",
              undefined,
              ["Vai al checkout", "Continua shopping", "Vedi prodotti simili"],
            )
          }
          break
        default:
          handleGeminiResponse(option)
      }
    })
  }

  const handleGeminiResponse = async (userMessage: string) => {
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          context: "ecommerce",
          products: sampleProducts,
          cart: cart,
        }),
      })

      if (response.ok) {
        const data = await response.json()
        addMessage(data.response, "bot", undefined, ["Mostra prodotti", "Cerca altro", "Vai al carrello", "Supporto"])
      } else {
        addMessage(
          "Mi dispiace, sto avendo problemi tecnici. Posso aiutarti con le opzioni qui sotto:",
          "bot",
          undefined,
          ["Mostra prodotti popolari", "Supporto clienti", "FAQ"],
        )
      }
    } catch (error) {
      addMessage("Scusa, c'è stato un errore. Prova con una delle opzioni qui sotto:", "bot", undefined, [
        "Mostra prodotti popolari",
        "Il mio carrello",
        "Supporto",
      ])
    }
  }

  const handleSendMessage = () => {
    if (!inputValue.trim()) return
    const message = inputValue.trim()
    addMessage(message, "user")
    setInputValue("")
    simulateTyping(() => handleGeminiResponse(message))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <Card className="h-[600px] flex flex-col bg-gradient-to-br from-blue-50 to-white border-blue-200">
      <CardHeader className="border-b border-blue-200 bg-blue-600 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <CardTitle className="text-lg">E-commerce Assistant</CardTitle>
              <p className="text-blue-100 text-sm">Il tuo shopping assistant AI</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-white/20 text-white border-white/30">
              <Package className="w-3 h-3 mr-1" />
              {cart.length}
            </Badge>
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    }`}
                  >
                    {message.type === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                  </div>

                  <div
                    className={`rounded-lg p-3 ${
                      message.type === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-white border border-blue-200 text-gray-800"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>

                    {/* Products Display */}
                    {message.products && (
                      <div className="mt-3 space-y-2">
                        {message.products.map((product) => (
                          <div
                            key={product.id}
                            className="bg-gray-50 rounded-lg p-3 flex items-center space-x-3 border"
                          >
                            <img
                              src={product.image || "/placeholder.svg"}
                              alt={product.name}
                              className="w-12 h-12 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm text-gray-900">{product.name}</h4>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-lg font-bold text-blue-600">€{product.price}</span>
                                <div className="flex items-center">
                                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                                </div>
                                <Badge
                                  className={`text-xs ${
                                    product.inStock ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {product.inStock ? "Disponibile" : "Esaurito"}
                                </Badge>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700 text-white"
                              disabled={!product.inStock}
                              onClick={() => {
                                if (product.inStock) {
                                  setCart((prev) => [...prev, product])
                                  addMessage(`✅ ${product.name} aggiunto al carrello!`, "bot", undefined, [
                                    "Vai al checkout",
                                    "Continua shopping",
                                  ])
                                }
                              }}
                            >
                              <ShoppingCart className="w-3 h-3 mr-1" />
                              {product.inStock ? "Aggiungi" : "Esaurito"}
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Options */}
                    {message.options && (
                      <div className="mt-3 space-y-2">
                        {message.options.map((option, index) => (
                          <button
                            key={index}
                            onClick={() => handleOptionClick(option)}
                            className="block w-full text-left p-2 rounded bg-blue-50 hover:bg-blue-100 transition-colors border border-blue-200 text-sm text-blue-800"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isTyping && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
              <div className="flex items-start space-x-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white border border-blue-200 rounded-lg p-3">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="border-t border-blue-200 p-4 bg-blue-50">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Scrivi il tuo messaggio..."
              className="flex-1 border-blue-200 focus:border-blue-400"
            />
            <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
