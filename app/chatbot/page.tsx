"use client"

import Navbar from "../components/navbar"
import ChatbotWidget from "../components/chatbot-widget"
import { MessageSquare, Sparkles, Zap, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ChatbotPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <Navbar />

      <main className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold text-white">
              Meet{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
                AuraBot
              </span>
            </h1>
            <p className="text-xl text-slate-300">
              Your intelligent AI assistant, available 24/7 to help you with services, bookings, and support
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
              <Sparkles className="h-10 w-10 text-cyan-400 mx-auto" />
              <h3 className="font-semibold text-white">AI-Powered</h3>
              <p className="text-sm text-slate-400">Powered by advanced AI to understand and respond to your needs</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
              <Zap className="h-10 w-10 text-purple-400 mx-auto" />
              <h3 className="font-semibold text-white">Instant Responses</h3>
              <p className="text-sm text-slate-400">Get immediate answers to your questions, anytime</p>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 space-y-3">
              <Shield className="h-10 w-10 text-green-400 mx-auto" />
              <h3 className="font-semibold text-white">Secure & Private</h3>
              <p className="text-sm text-slate-400">Your conversations are encrypted and private</p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 border border-cyan-500/20 rounded-lg">
            <MessageSquare className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">Try AuraBot Now</h2>
            <p className="text-slate-300 mb-6">
              Click the chat button in the bottom right corner to start a conversation
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Button className="bg-cyan-600 hover:bg-cyan-700">Ask about Services</Button>
              <Button
                variant="outline"
                className="border-purple-600 text-purple-400 hover:bg-purple-600/10 bg-transparent"
              >
                Book a Consultation
              </Button>
              <Button
                variant="outline"
                className="border-green-600 text-green-400 hover:bg-green-600/10 bg-transparent"
              >
                Get Support
              </Button>
            </div>
          </div>
        </div>
      </main>

      <ChatbotWidget />
    </div>
  )
}
