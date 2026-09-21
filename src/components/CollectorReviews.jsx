import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Star, ShieldCheck, CheckCircle2, Award, Quote } from 'lucide-react'

const PRESS_MENTIONS = [
  { outlet: "ARCHITECTURAL DIGEST", quote: "Objects that blur the threshold between digital chromatic fluidity and physical earth." },
  { outlet: "WALLPAPER*", quote: "Kyoto flame-working meets radical European ceramic reduction chemistry." },
  { outlet: "FRAME MAGAZINE", quote: "The future of limited artisanal series: precision craft with museum-grade provenance." },
  { outlet: "ELLE DÉCOR", quote: "A mesmerizing centerpiece for contemporary architectural homes." }
]

const REVIEWS = [
  {
    id: "rev-01",
    author: "Elena Rostova",
    role: "Principal Architect, Studio Rostova",
    location: "Zurich, Switzerland",
    category: "sculpture",
    categoryLabel: "Glass Art",
    productAcquired: "Liquid Glass Droplets #14/30",
    rating: 5,
    date: "August 2026",
    verified: true,
    title: "Optical brilliance that shifts from dawn to dusk",
    review: "We specified the Liquid Glass Droplets for a private lakehouse dining salon. The refractive qualities exceed photographs: in direct morning light, the emerald core casts delicate luminous caustics across the travertine console. The crating was impeccable—custom wooden casework arrived without a single scratch.",
    highlight: "Refractive qualities exceed photographs"
  },
  {
    id: "rev-02",
    author: "Kenzo Mori",
    role: "Private Contemporary Collector",
    location: "Tokyo, Japan",
    category: "ceramic",
    categoryLabel: "Ceramics",
    productAcquired: "Magma Ceramic Vessel #08/25",
    rating: 5,
    date: "July 2026",
    verified: true,
    title: "A kiln miracle in reduction earthenware",
    review: "As someone who has collected Bizen and Mino ware for twenty years, Mateo Silva’s reactive glaze on this vessel is extraordinary. The transition from matte obsidian to the bubbling fiery crimson slip carries tremendous tactile presence. Hand-signed certificate with brass seal wax was a touch of pure reverence.",
    highlight: "Tremendous tactile presence"
  },
  {
    id: "rev-03",
    author: "Camille Laurent",
    role: "Interior Design Director, Laurent & Cie",
    location: "Paris, France",
    category: "textile",
    categoryLabel: "Fine Textiles",
    productAcquired: "Halftone Wave Silk Tapestry #03/15",
    rating: 5,
    date: "August 2026",
    verified: true,
    title: "Transforms the acoustic and visual atmosphere",
    review: "The Jacquard weave density is astonishing. The silk captures light at an angle, making the halftone teal grid appear to glow three-dimensionally against the dark indigo warp. Our clients were stunned. White-glove delivery to our 8th arrondissement showroom was seamless.",
    highlight: "Appears to glow three-dimensionally"
  },
  {
    id: "rev-04",
    author: "Harrison Vance",
    role: "Art Advisor & Trustee",
    location: "New York, USA",
    category: "sculpture",
    categoryLabel: "Glass Art",
    productAcquired: "Prismatic Wave Bowl #21/40",
    rating: 5,
    date: "June 2026",
    verified: true,
    title: "Museum-caliber borosilicate craftsmanship",
    review: "The heavy optical glass bowl serves as the central anchor for a Manhattan penthouse library. Kenji Tanaka's flame annealing work is flaw-free; zero air bubbles, perfect optical clarity, and dramatic color shadows on polished concrete floors.",
    highlight: "Flaw-free optical clarity"
  },
  {
    id: "rev-05",
    author: "Sofia Al-Mansoor",
    role: "Architectural Designer",
    location: "Dubai, UAE",
    category: "ceramic",
    categoryLabel: "Ceramics",
    productAcquired: "Nebula Reactive Platter #12/25",
    rating: 5,
    date: "July 2026",
    verified: true,
    title: "Celestial depth captured on porcelain",
    review: "Shipped directly to Dubai with temperature-controlled crating. The cobalt spiral glaze looks like an astronomical capture. Client was so delighted they immediately inquired about a private commission for their foyer wall niche.",
    highlight: "Temperature-controlled crating"
  },
  {
    id: "rev-06",
    author: "Julian Thorne",
    role: "Creative Director",
    location: "London, UK",
    category: "textile",
    categoryLabel: "Fine Textiles",
    productAcquired: "Solar Flare Wool Throw #09/35",
    rating: 5,
    date: "May 2026",
    verified: true,
    title: "Incredible heft and cashmere hand-feel",
    review: "The merino and cashmere blend is substantial yet remarkably supple. The fiery crimson gradient injects rich chromatic warmth into a brutalist concrete lounge. The numbered archive tag stitched into the hem reinforces its heirloom quality.",
    highlight: "Substantial yet remarkably supple"
  }
]

export default function CollectorReviews({ onExploreCatalog }) {
  const [activeCategory, setActiveCategory] = useState("all")

  const filteredReviews = activeCategory === "all" 
    ? REVIEWS 
    : REVIEWS.filter(r => r.category === activeCategory)

  return (
    <section className="py-20 sm:py-28 bg-cream-base/20 border-t border-cream-dark/40 text-left relative overflow-hidden">
      {/* Decorative subtle ambient circle */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-gold-base/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-16">
        
        {/* Press Accolades Marquee / Quote Grid */}
        <div className="space-y-6 pb-12 border-b border-cream-dark/30">
          <div className="flex items-center justify-between">
            <span className="text-[9px] sm:text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted">
              CRITICAL ACCLAIM & PRESS
            </span>
            <div className="flex items-center gap-1.5 text-[10px] font-bold tracking-widest text-gold-dark uppercase">
              <Award className="h-3.5 w-3.5" />
              <span>International Gallery Recognition</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PRESS_MENTIONS.map((press, i) => (
              <div 
                key={i} 
                className="bg-cream-light/80 backdrop-blur-xs border border-cream-dark/40 rounded-xl p-5 flex flex-col justify-between space-y-3 hover:border-gold-base/40 transition-colors"
              >
                <div className="flex items-center space-x-1 text-gold-dark">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} className="h-3 w-3 fill-gold-base text-gold-base" />
                  ))}
                </div>
                <p className="text-xs font-light text-ink-dark italic leading-relaxed">
                  "{press.quote}"
                </p>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-ink-muted block pt-2 border-t border-cream-dark/20">
                  {press.outlet}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Section Header & Rating Overview */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted block">
              PROVENANCE & COLLECTOR TESTIMONIALS
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark tracking-tight leading-tight">
              Collector Voices Across <br className="hidden sm:block" />
              <span className="italic font-normal text-ink-muted">Private Interiors & Galleries</span>
            </h2>
            <p className="font-sans-clean text-xs sm:text-sm leading-relaxed text-ink-muted font-light">
              Read uncensored feedback from architects, institutional trustees, and private collectors who live with KROMA artifacts daily.
            </p>
          </div>

          {/* Rating Badge Card */}
          <div className="flex items-center gap-6 bg-cream-light border border-cream-dark/40 rounded-2xl p-5 sm:p-6 shadow-xs max-w-md">
            <div className="text-center border-r border-cream-dark/30 pr-6">
              <span className="font-serif-elegant text-4xl font-light text-ink-dark block">4.98</span>
              <div className="flex justify-center text-gold-base mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-gold-base text-gold-base" />
                ))}
              </div>
              <span className="text-[8.5px] font-sans-clean font-bold tracking-widest uppercase text-ink-muted mt-1 block">
                Average Rating
              </span>
            </div>
            
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-semibold text-ink-dark">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                <span>142 Verified Acquisitions</span>
              </div>
              <p className="text-[11px] font-light text-ink-muted leading-snug">
                100% insured transit guarantee with zero damage claims across 18 countries.
              </p>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-between border-b border-cream-dark/30 pb-4 overflow-x-auto scrollbar-none gap-2">
          <div className="flex items-center space-x-2 flex-shrink-0">
            {[
              { id: "all", label: "All Reviews (6)" },
              { id: "sculpture", label: "Glass Art (2)" },
              { id: "ceramic", label: "Ceramics (2)" },
              { id: "textile", label: "Fine Textiles (2)" }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                  activeCategory === tab.id
                    ? "bg-ink-dark text-cream-light border border-ink-dark"
                    : "bg-cream-light/60 border border-cream-dark/40 text-ink-muted hover:text-ink-dark"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 text-[10px] font-medium text-ink-muted">
            <Quote className="h-3 w-3 text-gold-dark" />
            <span>Verified Collector Archives</span>
          </div>
        </div>

        {/* Reviews Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence>
            {filteredReviews.map((rev) => (
              <motion.div
                key={rev.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="bg-cream-light border border-cream-dark/40 rounded-2xl p-6 shadow-xs hover:shadow-md hover:border-cream-dark transition-all duration-300 flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  {/* Top Bar: Stars + Category Pill */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-gold-base text-gold-base" />
                      ))}
                    </div>
                    <span className="text-[8px] font-sans-clean font-bold tracking-widest uppercase text-ink-muted bg-cream-base px-2 py-0.5 rounded border border-cream-dark/30">
                      {rev.categoryLabel}
                    </span>
                  </div>

                  {/* Title & Review Text */}
                  <div className="space-y-2">
                    <h3 className="font-serif-elegant text-lg font-medium text-ink-dark leading-snug">
                      "{rev.title}"
                    </h3>
                    <p className="font-sans-clean text-xs leading-relaxed text-ink-muted font-light">
                      {rev.review}
                    </p>
                  </div>

                  {/* Highlight Callout */}
                  <div className="bg-cream-base/50 border-l-2 border-gold-dark p-2.5 rounded-r-md">
                    <span className="text-[10px] font-semibold italic text-ink-dark block">
                      "{rev.highlight}"
                    </span>
                  </div>
                </div>

                {/* Bottom: Author Details & Provenance */}
                <div className="pt-4 border-t border-cream-dark/30 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif-elegant text-base font-semibold text-ink-dark">
                        {rev.author}
                      </h4>
                      <p className="text-[10px] font-sans-clean text-ink-muted">
                        {rev.role} • <span className="font-light">{rev.location}</span>
                      </p>
                    </div>

                    {rev.verified && (
                      <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full" title="Confirmed verified acquisition from KROMA Studio">
                        <ShieldCheck className="h-3 w-3 text-emerald-600" />
                        <span>Verified</span>
                      </div>
                    )}
                  </div>

                  <div className="text-[9px] font-sans-clean text-ink-muted/70 flex justify-between items-center border-t border-cream-dark/20 pt-2">
                    <span className="tracking-wide">Acquired: {rev.productAcquired}</span>
                    <span>{rev.date}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom Acquisition CTA Banner */}
        <div className="bg-ink-dark text-cream-light rounded-2xl p-8 sm:p-12 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6 shadow-xl">
          <div className="space-y-2 max-w-xl">
            <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-base block">
              GUARANTEED SATISFACTION
            </span>
            <h3 className="font-serif-elegant text-2xl sm:text-4xl font-light leading-snug">
              Experience the Craftsmanship In Your Own Space
            </h3>
            <p className="text-xs font-light text-cream-dark/80 leading-relaxed">
              Every acquisition includes a 14-day in-situ spatial fitting trial, dedicated climate-controlled crating, and signed physical provenance certificates.
            </p>
          </div>

          <button
            onClick={onExploreCatalog}
            className="rounded-full bg-cream-light text-ink-dark px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold-base hover:text-cream-light transition-all duration-300 shadow-md cursor-pointer flex-shrink-0"
          >
            Explore Catalog Archive
          </button>
        </div>

      </div>
    </section>
  )
}
