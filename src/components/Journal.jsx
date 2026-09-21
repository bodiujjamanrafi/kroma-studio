import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Clock, ArrowRight, X } from 'lucide-react'

const JOURNAL_POSTS = [
  {
    id: "post_01",
    tag: "STUDY 01 / OPTICAL PHYSICS",
    title: "Liquid Light Refraction in Borosilicate Glass",
    date: "July 12, 2026",
    readTime: "6 min read",
    summary: "Exploring how multi-chambered glass sculptures refract sunlight and cast dynamic, organic color shadows across spaces.",
    image: "/liquid_glass.jpg",
    content: "Light refraction is not merely a physical event; it is an emotional occurrence. When sunlight hits our Liquid Glass sculpture, it passes through three varying densities of borosilicate chambers, each embedded with fine metallic oxide slips. In this article, we trace the math behind the color casts. By layering yellow, green, and red oxides at calculated thicknesses, we achieve a spectrum projection on surrounding surfaces. Our artisans in Kyoto discuss the double-wall flame-working technique used to lock this fluid state in static glass, enabling the object to act as a living lens inside modern living quarters."
  },
  {
    id: "post_02",
    tag: "STUDY 02 / KILN CHEMISTRY",
    title: "Thermal Glaze Cycles and Metallic Oxides",
    date: "June 28, 2026",
    readTime: "8 min read",
    summary: "Analyzing the reduction-cycle chemistry of copper and cobalt oxides firing at 1,220°C in high-fire earthenware.",
    image: "/magma_vessel.jpg",
    content: "The Triana district kilns in Seville are home to an unpredictable science: the reactive glaze flow. Unlike flat paints, mineral glazes act as fluid currents in reduction cycles. Under temperatures exceeding 1,200 degrees, cobalt oxides and iron-rich slips exchange oxygen molecules, morphing into obsidian black pools and crimson lava streams. We explore how kiln placement, atmospheric draft, and cooling times alter the viscosity of the glaze. No two pots leave the kiln identical; each glaze cycle creates a unique topographical imprint of high-temperature flow."
  },
  {
    id: "post_03",
    tag: "STUDY 03 / TEXTILE GEOMETRY",
    title: "Digital Vector Halftones to Silk Jacquard Warp Coordinates",
    date: "May 19, 2026",
    readTime: "5 min read",
    summary: "Translating digital gradient halftone waves into pure silk coordinates using the historic Lyon Jacquard coordinate weave.",
    image: "/halftone_wave.jpg",
    content: "How does one weave a gradient? Standard weaving binds solid-color blocks, but translating organic waves requires half-tone matrices. In partnership with Lyon's Jacquard mills, we developed a mathematical grid mapping coordinate coordinates. By weaving teal threads with varying densities across a deep indigo warp, we trick the human eye into perceiving smooth glow transitions. This study breaks down the tension, yarn count, and coordinate matrices required to translate digital pixels into organic silk textiles."
  }
]

export default function Journal() {
  const [readingPost, setReadingPost] = useState(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 sm:py-20 bg-transparent text-left"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-16">
        
        {/* Header */}
        <div className="border-b border-cream-dark/50 pb-8 space-y-4">
          <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted">
            KROMA JOURNAL
          </span>
          <h2 className="font-serif-elegant text-4xl sm:text-6xl font-light text-ink-dark tracking-tight">
            Material & Design Studies
          </h2>
          <p className="max-w-xl font-sans-clean text-sm leading-relaxed text-ink-muted font-light">
            Read our notes on material research, manufacturing chemistry, and historic workshops. We document each study to archive the creation of our objects.
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {JOURNAL_POSTS.map((post) => (
            <div 
              key={post.id}
              onClick={() => setReadingPost(post)}
              className="group cursor-pointer bg-cream-light border border-cream-dark/30 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-cream-dark transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Frame */}
                <div className="aspect-[16/10] overflow-hidden bg-cream-base border-b border-cream-dark/20 relative">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-4 left-4 bg-cream-light/90 border border-cream-dark/40 px-2.5 py-1 rounded text-[8px] font-bold tracking-widest uppercase text-ink-dark">
                    Article
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 text-left">
                  <span className="text-[9px] font-sans-clean font-bold tracking-[0.2em] uppercase text-gold-dark block">
                    {post.tag}
                  </span>
                  
                  <h3 className="font-serif-elegant text-xl font-light text-ink-dark tracking-tight leading-snug group-hover:text-ink-muted transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="font-sans-clean text-xs leading-relaxed text-ink-muted font-light">
                    {post.summary}
                  </p>
                </div>
              </div>

              {/* Meta bottom */}
              <div className="p-6 pt-0 border-t border-cream-dark/20 mt-4 flex items-center justify-between text-[10px] text-ink-muted font-sans-clean">
                <div className="flex items-center space-x-3">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
                
                <span className="flex items-center gap-1 font-bold uppercase tracking-wider text-ink-dark group-hover:text-gold-dark transition-colors">
                  Read <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Read Post Drawer Modal */}
        <AnimatePresence>
          {readingPost && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              
              {/* Backdrop */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setReadingPost(null)}
                className="fixed inset-0 bg-ink-dark/45 backdrop-blur-xs" 
              />

              {/* Card Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-2xl bg-cream-light border border-cream-dark/60 rounded-2xl overflow-hidden shadow-2xl z-10 p-6 sm:p-8 space-y-6 max-h-[85vh] overflow-y-auto text-left"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setReadingPost(null)}
                  className="absolute top-4 right-4 p-1.5 text-ink-muted hover:text-ink-dark rounded-full hover:bg-cream-base/50 transition-colors z-20 border border-cream-dark/30"
                  aria-label="Close article"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Tag & Title */}
                <div className="space-y-2 border-b border-cream-dark/30 pb-4 pr-10">
                  <span className="text-[9px] font-sans-clean font-bold tracking-[0.2em] uppercase text-gold-dark">
                    {readingPost.tag}
                  </span>
                  <h3 className="font-serif-elegant text-2xl sm:text-3xl font-light text-ink-dark tracking-tight leading-tight">
                    {readingPost.title}
                  </h3>
                  <div className="flex items-center space-x-4 text-[10px] text-ink-muted mt-2 font-medium">
                    <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {readingPost.date}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {readingPost.readTime}</span>
                  </div>
                </div>

                {/* Article Image */}
                <div className="w-full aspect-[16/9] rounded-lg overflow-hidden border border-cream-dark/30 bg-cream-base">
                  <img 
                    src={readingPost.image} 
                    alt={readingPost.title} 
                    className="w-full h-full object-cover object-center"
                  />
                </div>

                {/* Body Text */}
                <div className="font-sans-clean text-sm leading-relaxed text-ink-muted font-light space-y-4">
                  <p>{readingPost.content}</p>
                  <p>Our research logs are updated regularly. To follow updates or request higher resolution copies of optical and thermal diagrams, contact our Kyoto and Seville coordinates.</p>
                </div>

                {/* Bottom closing action */}
                <div className="pt-4 border-t border-cream-dark/35 flex justify-end">
                  <button
                    onClick={() => setReadingPost(null)}
                    className="rounded-full bg-ink-dark px-6 py-2.5 text-xs font-semibold tracking-widest uppercase text-cream-light hover:opacity-85 transition-opacity"
                  >
                    Close Study
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  )
}
