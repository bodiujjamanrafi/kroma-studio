import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Globe, Shield, Sparkles, ChevronRight } from 'lucide-react'

const CRAFT_TIMELINE = [
  {
    step: "01",
    title: "The Kyoto Glassworks",
    location: "Higashiyama-ku, Kyoto, JP",
    focus: "Translucent Fluid Dynamics",
    desc: "Our borosilicate art begins in Kyoto. Using double-wall flame-working techniques, molten glass is blown and shaped at 1,200°C. Color rods containing mineral formulas (copper, manganese, iron oxide) are added in layers. This creates shifting, multi-colored internal chambers resembling trapped liquid droplets.",
    image: "/liquid_glass.jpg",
    details: ["Borosilicate glass base", "Layered mineral coloring", "Dual-flame annealing process"]
  },
  {
    step: "02",
    title: "The Sevillian Pottery Kilns",
    location: "Triana district, Seville, ES",
    focus: "Reactive Glazing Chemistry",
    desc: "Our ceramic vessels are hand-thrown using custom iron-rich local clay mixtures. Once bone-dry, they receive two coats of reactive glaze. Copper carbonate and cobalt oxide are layered before firing at Cone 6 (1,220°C). The melting glazes run downwards, blending magma waves in black, crimson, and gold.",
    image: "/magma_vessel.jpg",
    details: ["Iron-rich earthenware clay", "Double-layered mineral slip", "Reduction-cycle kiln firing"]
  },
  {
    step: "03",
    title: "The Lyonese Silk Weavers",
    location: "Croix-Rousse, Lyon, FR",
    focus: "Jacquard Halftone Matrices",
    desc: "The textile tapestries are woven in historic silk mills in France. Using fine mulberry silk threads colored in deep indigo dye baths, the loom translates digital vector patterns into high-density weave structures. A specialized warp-weft coordinate system layers teal and pink threads to construct glowing retro halftones.",
    image: "/halftone_wave.jpg",
    details: ["100% Organic mulberry silk", "Indigo indigo-dye baths", "Ultra-dense Jacquard coordinates"]
  }
]

export default function Manifesto() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="py-12 sm:py-20 bg-transparent text-left"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-8 space-y-16">
        
        {/* Editorial Heading */}
        <div className="border-b border-cream-dark/50 pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-xl space-y-4">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted">
              ARTISAN MANIFESTO
            </span>
            <h2 className="font-serif-elegant text-4xl sm:text-6xl font-light text-ink-dark tracking-tight leading-[1.1]">
              Crafting The <br />
              <span className="italic font-normal text-ink-muted">Unrepeatable Object</span>
            </h2>
          </div>
          
          <div className="max-w-md">
            <p className="font-sans-clean text-sm leading-relaxed text-ink-muted font-light">
              KROMA Studio maintains three dedicated design workshops globally, each selected for its historic ties to materials and techniques. We reject mass manufacturing; our objects are built to reflect the organic imperfections of fire, breath, and loom.
            </p>
          </div>
        </div>

        {/* Feature Narrative Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Side: Step Selector (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {CRAFT_TIMELINE.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`w-full text-left p-6 rounded-xl border transition-all duration-300 flex items-start gap-4 ${
                  activeStep === idx 
                    ? "bg-cream-base/80 border-cream-dark/80 shadow-sm shadow-ink-dark/5"
                    : "bg-cream-light/30 border-cream-dark/30 hover:border-cream-dark/60"
                }`}
              >
                <span className="font-serif-elegant text-xl font-light text-ink-muted">{item.step}</span>
                <div className="space-y-1 flex-grow">
                  <h4 className="font-serif-elegant text-lg font-medium text-ink-dark">{item.title}</h4>
                  <p className="text-[10px] font-sans-clean tracking-wider uppercase text-ink-muted font-semibold">{item.location}</p>
                </div>
                <ChevronRight className={`h-4 w-4 text-ink-muted mt-1.5 transition-transform duration-300 ${activeStep === idx ? "rotate-90 text-ink-dark" : ""}`} />
              </button>
            ))}

            {/* Quality Seals */}
            <div className="bg-cream-base/30 border border-cream-dark/30 rounded-xl p-6 mt-8 space-y-4">
              <h5 className="text-[10px] font-sans-clean font-bold tracking-widest uppercase text-ink-dark border-b border-cream-dark/40 pb-2">
                STUDIO ASSURANCE
              </h5>
              
              <div className="flex gap-3 text-xs">
                <Globe className="h-4 w-4 text-gold-dark mt-0.5 flex-shrink-0" />
                <span className="font-sans-clean text-ink-muted font-light leading-relaxed">
                  Full material trace detailing carbon footprint and chemical safety declarations are archived.
                </span>
              </div>
              <div className="flex gap-3 text-xs">
                <Shield className="h-4 w-4 text-gold-dark mt-0.5 flex-shrink-0" />
                <span className="font-sans-clean text-ink-muted font-light leading-relaxed">
                  10-year surface durability certificates are provided with every glass and ceramic design object.
                </span>
              </div>
            </div>
          </div>

          {/* Right Side: Showcase View (7 Cols) */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="bg-cream-light border border-cream-dark/50 rounded-2xl p-6 sm:p-8 shadow-md flex flex-col gap-6"
              >
                {/* Image Aspect ratio box */}
                <div className="w-full aspect-[16/10] overflow-hidden rounded-lg border border-cream-dark/30 bg-cream-base">
                  <img 
                    src={CRAFT_TIMELINE[activeStep].image} 
                    alt={CRAFT_TIMELINE[activeStep].title} 
                    className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
                  />
                </div>

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b border-cream-dark/30 pb-3">
                    <span className="text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase text-gold-dark">
                      Focus: {CRAFT_TIMELINE[activeStep].focus}
                    </span>
                    <span className="flex items-center text-[10px] font-sans-clean text-ink-muted font-semibold gap-1">
                      <Sparkles className="h-3.5 w-3.5" /> Handcrafted
                    </span>
                  </div>

                  <p className="font-sans-clean text-sm leading-relaxed text-ink-muted font-light">
                    {CRAFT_TIMELINE[activeStep].desc}
                  </p>

                  <div className="pt-4 flex flex-wrap gap-3">
                    {CRAFT_TIMELINE[activeStep].details.map((detail, i) => (
                      <span 
                        key={i} 
                        className="text-[10px] font-sans-clean tracking-wider font-semibold uppercase text-ink-dark bg-cream-base border border-cream-dark/50 px-3 py-1.5 rounded-full"
                      >
                        {detail}
                      </span>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </motion.div>
  )
}
