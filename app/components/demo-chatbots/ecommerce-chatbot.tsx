"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Bot, Send, User, X, ArrowLeft } from "lucide-react"
import { useLanguage } from "../../contexts/language-context"

interface Message {
  id: string
  text: string
  sender: "user" | "bot"
  timestamp: Date
  type?: "text" | "product" | "cart"
  products?: Array<{
    id: string
    name: string
    price: string
    image: string
    rating: number
  }>
}

interface EcommerceChatbotProps {
  onBack: () => void
}

export default function EcommerceChatbot({ onBack }: EcommerceChatbotProps) {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [cart, setCart] = useState<string[]>([])

  const texts = {
    en: {
      title: "Shopping Assistant",
      subtitle: "Find the perfect products",
      online: "Online",
      greeting:
        "Hi! I'm your shopping assistant. I can help you find products, check prices, and manage your cart. What are you looking for today?",
      showProducts: "Here are some popular products:",
      addedToCart: "Great! I've added that to your cart. Would you like to see more products or checkout?",
      cartSummary: "Your cart summary:",
      placeholder: "Ask about products...",
      addToCart: "Add to Cart",
      viewCart: "View Cart",
      checkout: "Checkout",
    },
    it: {
      title: "Assistente Shopping",
      subtitle: "Trova i prodotti perfetti",
      online: "Online",
      greeting:
        "Ciao! Sono il tuo assistente shopping. Posso aiutarti a trovare prodotti, controllare prezzi e gestire il carrello. Cosa stai cercando oggi?",
      showProducts: "Ecco alcuni prodotti popolari:",
      addedToCart: "Perfetto! L'ho aggiunto al carrello. Vuoi vedere altri prodotti o procedere al checkout?",
      cartSummary: "Riepilogo carrello:",
      placeholder: "Chiedi sui prodotti...",
      addToCart: "Aggiungi al Carrello",
      viewCart: "Vedi Carrello",
      checkout: "Checkout",
    },
  }

  const t = texts[language]

  const products = [
    {
      id: "1",
      name: language === "en" ? "Wireless Headphones" : "Cuffie Wireless",
      price: "€89.99",
      image: "/wireless-headphones.png",
      rating: 4.5,
    },
    {
      id: "2",
      name: language === "en" ? "Smart Watch" : "Smartwatch",
      price: "€199.99",
      image: "/modern-smartwatch.png",
      rating: 4.8,
    },
    {
      id: "3",
      name: language === "en" ? "Laptop Stand" : "Supporto Laptop",
      price: "€45.99",
      image: "/laptop-stand.png",
      rating: 4.3,
    },
  ]

  useEffect(() => {
    const initialMessage: Message = {
      id: "1",
      text: t.greeting,
      sender: "bot",
      timestamp: new Date(),
    }
    setMessages([initialMessage])
  }, [language])

  const addMessage = (
    text: string,
    sender: "user" | "bot",
    type: "text" | "product" | "cart" = "text",
    products?: any[],
  ) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: new Date(),
      type,
      products,
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

  const handleSend = (message: string) => {
    if (!message.trim()) return

    addMessage(message, "user")
    setInputValue("")

    simulateTyping(() => {
      if (
        message.toLowerCase().includes("product") ||
        message.toLowerCase().includes("show") ||
        message.toLowerCase().includes("prodott")
      ) {
        addMessage(t.showProducts, "bot", "product", products)
      } else if (message.toLowerCase().includes("cart") || message.toLowerCase().includes("carrello")) {
        addMessage(t.cartSummary, "bot", "cart")
      } else {
        addMessage(
          "I can help you find products, check your cart, or answer questions about our items. Try asking 'show products' or 'view cart'!",
          "bot",
        )
      }
    })
  }

  const addToCart = (productId: string) => {
    setCart((prev) => [...prev, productId])
    simulateTyping(() => {
      addMessage(t.addedToCart, "bot")
    }, 800)
  }

  return (
    <div className="flex flex-col h-full bg-slate-800">
      {/* Header - STILE BOOKING ASSISTANT */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button onClick={onBack} className="hover:bg-white/20 p-1 rounded">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-xs opacity-90">{t.subtitle}</div>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm">{t.online}</span>
        </div>
        <button onClick={onBack} className="hover:bg-white/20 p-1 rounded">
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-slate-800">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
            <div className="flex items-start space-x-3 max-w-xs">
              {message.sender === "bot" && (
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div
                className={`rounded-lg p-3 ${
                  message.sender === "user" ? "bg-blue-500 text-white" : "bg-slate-700 text-white"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                      Shopping Assistant
                    </Badge>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>
                <div className="text-xs opacity-75 mt-1">04:27 PM</div>

                {message.type === "product" && message.products && (
                  <div className="mt-3 space-y-3">
                    {message.products.map((product) => (
                      <div key={product.id} className="border border-slate-600 rounded-lg p-3 bg-slate-800">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white">{product.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-500"}`}
                                  />
                                ))}
                                <span className="text-xs text-slate-400 ml-1">{product.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-blue-400">{product.price}</span>
                              <Button
                                size="sm"
                                className="bg-blue-500 hover:bg-blue-600"
                                onClick={() => addToCart(product.id)}
                              >
                                {t.addToCart}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {message.type === "cart" && (
                  <div className="mt-3 p-3 bg-slate-800 rounded-lg border border-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">
                        {cart.length} {language === "en" ? "items in cart" : "articoli nel carrello"}
                      </span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        {t.checkout}
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {message.sender === "user" && (
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-600 rounded-full flex items-center justify-center flex-shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-slate-700 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-slate-700 p-4 bg-slate-800">
        <div className="flex space-x-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={t.placeholder}
            onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
            className="flex-1 bg-slate-700 border-slate-600 text-white"
          />
          <Button onClick={() => handleSend(inputValue)} className="bg-blue-500 hover:bg-blue-600">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
