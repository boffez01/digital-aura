"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Volume2, VolumeX, Maximize, RotateCcw, PictureInPicture, Subtitles } from "lucide-react"

export default function VideoDemo() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showControls, setShowControls] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playbackRate, setPlaybackRate] = useState(1)
  const [showSubtitles, setShowSubtitles] = useState(false)

  const videoChapters = [
    { time: 0, title: "Introduzione al problema" },
    { time: 45, title: "Implementazione AI Agent" },
    { time: 120, title: "Risultati e benefici" },
    { time: 180, title: "ROI e metriche" },
  ]

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration)
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number.parseFloat(e.target.value)
    if (videoRef.current) {
      videoRef.current.currentTime = time
      setCurrentTime(time)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, "0")}`
  }

  const restart = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0
      setCurrentTime(0)
    }
  }

  const togglePictureInPicture = async () => {
    if (videoRef.current) {
      try {
        if (document.pictureInPictureElement) {
          await document.exitPictureInPicture()
        } else {
          await videoRef.current.requestPictureInPicture()
        }
      } catch (error) {
        console.error("Error toggling picture-in-picture:", error)
      }
    }
  }

  const toggleSubtitles = () => {
    setShowSubtitles(!showSubtitles)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      viewport={{ once: true }}
      className="relative max-w-4xl mx-auto"
    >
      <Card className="bg-white border border-gray-200 shadow-xl overflow-hidden">
        <div
          className="relative aspect-video bg-gradient-to-br from-gray-900 to-gray-800"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(false)}
        >
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
            poster="/placeholder.svg?height=400&width=600&text=AI+Automation+Demo"
            playbackRate={playbackRate}
          >
            {/* Placeholder for actual video source */}
            <source src="/demo-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          {/* Video Overlay Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
            {/* Play Button Overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={togglePlay}
                  className="bg-white/20 backdrop-blur-sm rounded-full p-6 border border-white/30 hover:bg-white/30 transition-all"
                >
                  <Play className="w-12 h-12 text-white ml-1" />
                </motion.button>
              </motion.div>
            )}

            {/* Video Info Overlay */}
            <div className="absolute bottom-16 left-6 right-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-black/50 backdrop-blur-sm rounded-lg p-4"
              >
                <h3 className="text-white font-semibold mb-2 text-lg">AI Agent: Automazione Processo E-commerce</h3>
                <p className="text-white/90 text-sm mb-3">
                  Guarda come il nostro AI Agent gestisce automaticamente ordini, inventario e customer service,
                  riducendo i costi operativi del 60% e aumentando l'efficienza del 300%.
                </p>
                <div className="flex items-center space-x-4 text-xs text-white/80">
                  <span>⏱️ Durata: 3:45</span>
                  <span>🎯 Settore: E-commerce</span>
                  <span>📈 ROI: +250%</span>
                </div>
              </motion.div>
            </div>

            {/* Video Controls */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
            >
              <div className="flex items-center space-x-4">
                <button onClick={togglePlay} className="text-white hover:text-cyan-400 transition-colors">
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </button>

                <button onClick={restart} className="text-white hover:text-cyan-400 transition-colors">
                  <RotateCcw className="w-4 h-4" />
                </button>

                <div className="flex-1 flex items-center space-x-2">
                  <span className="text-white text-xs min-w-[40px]">{formatTime(currentTime)}</span>
                  <input
                    type="range"
                    min="0"
                    max={duration || 0}
                    value={currentTime}
                    onChange={handleSeek}
                    className="flex-1 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #00bfff 0%, #00bfff ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) 100%)`,
                    }}
                  />
                  <span className="text-white text-xs min-w-[40px]">{formatTime(duration)}</span>
                </div>

                <button onClick={toggleMute} className="text-white hover:text-cyan-400 transition-colors">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>

                <div className="flex items-center space-x-2">
                  <select
                    value={playbackRate}
                    onChange={(e) => setPlaybackRate(Number(e.target.value))}
                    className="text-white bg-black/50 rounded px-2 py-1 text-xs"
                  >
                    <option value={0.5}>0.5x</option>
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                    <option value={2}>2x</option>
                  </select>

                  <button onClick={togglePictureInPicture} className="text-white hover:text-cyan-400 transition-colors">
                    <PictureInPicture className="w-4 h-4" />
                  </button>

                  <button
                    onClick={toggleSubtitles}
                    className={`text-white hover:text-cyan-400 transition-colors ${showSubtitles ? "bg-cyan-600 rounded px-1" : ""}`}
                  >
                    <Subtitles className="w-4 h-4" />
                  </button>
                </div>

                <button className="text-white hover:text-cyan-400 transition-colors">
                  <Maximize className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        <CardContent className="p-6 bg-gray-50">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-600 mb-1">60%</div>
              <div className="text-gray-600 text-sm">Riduzione Costi</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600 mb-1">300%</div>
              <div className="text-gray-600 text-sm">Aumento Efficienza</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
              <div className="text-gray-600 text-sm">Operatività</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <h4 className="font-semibold text-gray-800 mb-3">Cosa Vedrai nel Video:</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Gestione automatica degli ordini in tempo reale</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Ottimizzazione automatica dell'inventario</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Customer service automatizzato</span>
              </div>
              <div className="flex items-start space-x-2">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                <span>Analytics e reportistica avanzata</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
