import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const FEATURED_ITEMS = [
  {
    tag: "COLLECTION 01 / SCULPTURAL GLASS",
    title: "Liquid Glass",
    subtitle: "Droplets",
    desc: "Capturing fluid motion in solid state, sculpted with borosilicate glass and vibrant reactive colors.",
    colorClass: "bg-liquid-green",
    image: "/liquid_glass.jpg",
    accentColor: "#10B981"
  },
  {
    tag: "COLLECTION 02 / FINE CERAMICS",
    title: "Magma Ceramic",
    subtitle: "Vessel",
    desc: "Hand-thrown earthenware coated with high-fire mineral glazes that marbleize organically under extreme heat.",
    colorClass: "bg-magma-orange",
    image: "/magma_vessel.jpg",
    accentColor: "#EA580C"
  },
  {
    tag: "COLLECTION 03 / TEXTILE ART",
    title: "Halftone Wave",
    subtitle: "Tapestry",
    desc: "Woven fine mulberry silk presenting deep cosmic indigo tones, glowing teal lines, and retro halftone patterns.",
    colorClass: "bg-cyber-teal",
    image: "/halftone_wave.jpg",
    accentColor: "#0891B2"
  }
]

export default function Hero({ onExploreClick }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_ITEMS.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [])

  const current = FEATURED_ITEMS[activeIndex]

  return (
    <section className="relative overflow-hidden bg-cream-light py-8 md:py-24">
      {/* Background soft ambient blobs */}
      <div className="absolute inset-0 -z-10 pointer-events-none opacity-20 blur-[130px] transition-all duration-1000">
        <div 
          className="absolute -top-10 -right-10 h-96 w-96 rounded-full transition-colors duration-1000"
          style={{ backgroundColor: current.accentColor }}
        />
        <div className="absolute -bottom-20 -left-10 h-80 w-80 rounded-full bg-gold-base/30" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-8 items-center">
          
          {/* Mobile-only Title block (sits above image on mobile, hidden on desktop) */}
          <div className="lg:hidden w-full text-left">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-2"
              >
                <span className="text-[9px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted">
                  {current.tag}
                </span>
                <h1 className="font-serif-elegant text-4xl font-light tracking-tight text-ink-dark leading-[1.05]">
                  {current.title}
                  <span className="block italic text-ink-muted font-normal mt-1">
                    {current.subtitle}
                  </span>
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left: Headline & Text Content */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-4 sm:space-y-6"
              >
                {/* Desktop-only Title block (hidden on mobile) */}
                <div className="hidden lg:block space-y-4">
                  <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted">
                    {current.tag}
                  </span>
                  
                  <h1 className="font-serif-elegant text-6xl lg:text-8xl font-light tracking-tight text-ink-dark leading-[1.05]">
                    {current.title}
                    <span className="block italic text-ink-muted font-normal mt-1">
                      {current.subtitle}
                    </span>
                  </h1>
                </div>

                <p className="max-w-md font-sans-clean text-xs sm:text-base leading-relaxed text-ink-muted font-light">
                  {current.desc}
                </p>

                <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                  <button
                    onClick={onExploreClick}
                    className="group relative flex items-center gap-3 overflow-hidden rounded-full border border-ink-dark bg-ink-dark px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-cream-light transition-all duration-300 hover:bg-transparent hover:text-ink-dark cursor-pointer"
                  >
                    <span className="relative z-10">Explore Catalog</span>
                    <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  
                  <div className="flex items-center space-x-2">
                    {FEATURED_ITEMS.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveIndex(idx)}
                        className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                          idx === activeIndex ? "w-8 bg-ink-dark" : "w-2 bg-cream-dark hover:bg-ink-muted"
                        }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Immersive Animated Image Frame */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center items-center">
            <div className="relative w-full max-w-[280px] xs:max-w-xs sm:max-w-md aspect-[3/4] rounded-2xl border border-cream-dark/30 bg-cream-base/50 p-3 sm:p-4 shadow-xl shadow-ink-dark/5">
              
              {/* Premium Corner ticks */}
              <div className="absolute top-2 left-2 w-3 h-3 border-t border-l border-ink-muted/30" />
              <div className="absolute top-2 right-2 w-3 h-3 border-t border-r border-ink-muted/30" />
              <div className="absolute bottom-2 left-2 w-3 h-3 border-b border-l border-ink-muted/30" />
              <div className="absolute bottom-2 right-2 w-3 h-3 border-b border-r border-ink-muted/30" />

              <div className="w-full h-full overflow-hidden rounded-lg bg-cream-base relative">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full"
                  >
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover object-center transition-all duration-700 ease-out"
                    />
                    
                    {/* Tiny decorative color indicator badge */}
                    <div className="absolute bottom-4 left-4 bg-cream-light/95 backdrop-blur-sm border border-cream-dark/50 px-3 py-1.5 rounded-full flex items-center space-x-2 shadow-sm">
                      <span className={`h-2.5 w-2.5 rounded-full ${current.colorClass} animate-pulse`} />
                      <span className="text-[10px] font-sans-clean tracking-wider font-semibold uppercase text-ink-dark">
                        Palette Match
                      </span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
