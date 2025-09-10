"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Star, Bot, Send } from "lucide-react"
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

export default function EcommerceChatbot() {
  const { language } = useLanguage()
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [cart, setCart] = useState<string[]>([])

  const texts = {
    en: {
      title: "Shopping Assistant",
      subtitle: "Find the perfect products",
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
    <Card className="h-[600px] flex flex-col">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="h-5 w-5" />
            <div>
              <div className="font-semibold">{t.title}</div>
              <div className="text-sm opacity-90">{t.subtitle}</div>
            </div>
          </div>
          <Badge variant="secondary" className="bg-white/20 text-white">
            {cart.length} {language === "en" ? "items" : "articoli"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] ${message.sender === "user" ? "bg-blue-600 text-white" : "bg-gray-100"} rounded-lg p-3`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center space-x-2 mb-2">
                    <Bot className="h-4 w-4 text-blue-600" />
                    <Badge variant="secondary" className="text-xs">
                      Shopping Assistant
                    </Badge>
                  </div>
                )}
                <p className="text-sm">{message.text}</p>

                {message.type === "product" && message.products && (
                  <div className="mt-3 space-y-3">
                    {message.products.map((product) => (
                      <div key={product.id} className="border rounded-lg p-3 bg-white">
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">{product.name}</h4>
                            <div className="flex items-center space-x-2 mt-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                                  />
                                ))}
                                <span className="text-xs text-gray-600 ml-1">{product.rating}</span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between mt-2">
                              <span className="font-bold text-blue-600">{product.price}</span>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700"
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
                  <div className="mt-3 p-3 bg-white rounded-lg border">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">
                        {cart.length} {language === "en" ? "items in cart" : "articoli nel carrello"}
                      </span>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700">
                        {t.checkout}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-3">
                <div className="flex items-center space-x-2">
                  <Bot className="h-4 w-4 text-blue-600" />
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={t.placeholder}
              onKeyPress={(e) => e.key === "Enter" && handleSend(inputValue)}
              className="flex-1"
            />
            <Button onClick={() => handleSend(inputValue)} className="bg-blue-600 hover:bg-blue-700">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
