import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Droplet, Layers, Thermometer, ShieldCheck, Cpu, Clock } from 'lucide-react'

const LAB_MODULES = [
  {
    id: "glass",
    title: "Optical Borosilicate Glass",
    studio: "Kyoto Flame-working Atelier",
    icon: Droplet,
    accentColor: "#10B981",
    tagline: "High-dispersion optical glass engineered with dual internal vapor chambers.",
    metrics: [
      { label: "Refractive Index", value: "1.473 nD", note: "High dispersion index casting broad caustic rainbows" },
      { label: "Annealing Cycle", value: "18.5 Hours", note: "Gradual cooling from 560°C eliminates all internal micro-stress" },
      { label: "Thermal Shock", value: "ΔT 160°C", note: "Resistant to extreme temperature shifts without fracturing" },
      { label: "Archival Longevity", value: "Perpetual", note: "Zero oxidation, non-porous silica glass matrix" }
    ],
    recipe: [
      { element: "Silicon Dioxide (SiO₂)", pct: "81%", role: "Structural high-clarity optical glass matrix" },
      { element: "Boron Trioxide (B₂O₃)", pct: "13%", role: "Reduces thermal expansion coefficient" },
      { element: "Sodium & Aluminum Oxides", pct: "4%", role: "Improves melt fluidity and crystal clarity" },
      { element: "Colloidal Gold & Cobalt Vapors", pct: "2%", role: "Forms green, radiant amber, and crimson internal tint chambers" }
    ],
    processNote: "Under twin oxy-hydrogen flame torches reaching 1,600°C, master flame-worker Kenji Tanaka shapes the exterior vessel before injecting color rods. The interior droplets are annealed under closed vacuum conditions to freeze liquid currents in solid glass."
  },
  {
    id: "ceramic",
    title: "Reactive Reduction Earthenware",
    studio: "Triana Kiln Works, Seville",
    icon: Flame,
    accentColor: "#DC2626",
    tagline: "1,220°C high-fire stoneware utilizing multi-layer metallic oxide slips.",
    metrics: [
      { label: "Kiln Temperature", value: "1,220°C (Cone 6)", note: "Reaches full vitrification for impermeable durability" },
      { label: "Glaze Viscosity Shift", value: "1,180°C", note: "Point where reactive slips melt and swirl organically" },
      { label: "Reduction Atmosphere", value: "0.8% Oxygen", note: "Starves oxygen to force metallic oxides into iridescent color states" },
      { label: "Clay Sourcing", value: "Guadalquivir Basin", note: "Naturally rich in iron oxide and sedimentary minerals" }
    ],
    recipe: [
      { element: "Local Seville Earthenware", pct: "70%", role: "Dense structural clay substrate with thermal retention" },
      { element: "Cobalt Carbonate Slip", pct: "12%", role: "Develops deep obsidian and ink-dark mineral pools" },
      { element: "Copper Oxide & Iron Slag", pct: "10%", role: "Produces volcanic crimson and magma streaks" },
      { element: "Feldspar & Wood Ash Flux", pct: "8%", role: "Promotes downward viscous flow during reduction peak" }
    ],
    processNote: "Each pot is hand-thrown and coated with contrasting slip layers. As temperatures pass 1,200°C in the reduction kiln, the outer glaze liquefies, running down the vase surface like molten lava. The exact cooling curve dictates the crystalline speckling."
  },
  {
    id: "textile",
    title: "Jacquard Mulberry Silk Coordinate Weave",
    studio: "Historic Lyon Jacquard Mill",
    icon: Layers,
    accentColor: "#0891B2",
    tagline: "Translating mathematical digital gradients into pure silk thread matrices.",
    metrics: [
      { label: "Thread Count", value: "320 Threads/dm", note: "Ultra-dense warp density preserving micro-detail" },
      { label: "Yarn Material", value: "100% Mulberry Silk", note: "A-Grade continuous filament silk from Rhône-Alpes" },
      { label: "Halftone Matrix", value: "12-Color Dither", note: "Digital wave algorithms mapped directly to loom cards" },
      { label: "Acoustic Dampening", value: "NRC 0.45", note: "Naturally dampens room reflections in modern open spaces" }
    ],
    recipe: [
      { element: "Natural Indigo Dye Bath", pct: "40%", role: "Provides cosmic deep blue warp base" },
      { element: "Acid Cyan & Teal Silk", pct: "30%", role: "Woven in micro-dots to generate luminous wave contours" },
      { element: "Fluorescent Magenta Silk", pct: "15%", role: "Accent halftone highlight points" },
      { element: "Organic Wool Selvedge", pct: "15%", role: "Hand-finished edge binding ensuring dimensional stability" }
    ],
    processNote: "Using modified electronic Jacquard looms in Lyon, we translate vector sine waves into loom coordinates. Each millimeter comprises thousands of warp-weft intersections, producing an optical depth that changes as light strikes the silk sheen."
  }
]

export default function CraftLab() {
  const [activeModuleId, setActiveModuleId] = useState("glass")

  const currentModule = LAB_MODULES.find(m => m.id === activeModuleId) || LAB_MODULES[0]

  return (
    <section className="py-20 sm:py-28 bg-cream-light border-t border-cream-dark/40 text-left relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="border-b border-cream-dark/30 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted block">
              MATERIAL CHEMISTRY & WORKSHOP SCIENCE
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark tracking-tight">
              The Craft Laboratory
            </h2>
            <p className="max-w-xl font-sans-clean text-xs sm:text-sm leading-relaxed text-ink-muted font-light">
              Explore the temperatures, chemical formulas, and workshop metrics that turn raw earth, silica, and silk into heirloom design objects.
            </p>
          </div>

          {/* Module Selector Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {LAB_MODULES.map(mod => {
              const ModIcon = mod.icon
              return (
                <button
                  key={mod.id}
                  onClick={() => setActiveModuleId(mod.id)}
                  className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer flex items-center gap-2 flex-shrink-0 ${
                    activeModuleId === mod.id
                      ? "bg-ink-dark text-cream-light shadow-xs"
                      : "bg-cream-base border border-cream-dark/40 text-ink-muted hover:text-ink-dark"
                  }`}
                >
                  <ModIcon className="h-3.5 w-3.5" style={{ color: activeModuleId === mod.id ? "#FAF9F6" : mod.accentColor }} />
                  <span>{mod.title.split(" ")[0]} Lab</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Interactive Lab Display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentModule.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35 }}
            className="space-y-10"
          >
            {/* Title & Tagline Banner */}
            <div className="bg-cream-base/50 border border-cream-dark/40 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: currentModule.accentColor }} />
                  <span className="text-[9px] font-bold tracking-widest uppercase text-ink-muted">
                    {currentModule.studio}
                  </span>
                </div>
                <h3 className="font-serif-elegant text-2xl sm:text-4xl font-light text-ink-dark">
                  {currentModule.title}
                </h3>
                <p className="font-sans-clean text-xs sm:text-sm text-ink-muted font-light max-w-2xl">
                  {currentModule.tagline}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-semibold text-ink-dark bg-cream-light border border-cream-dark/40 px-4 py-2 rounded-xl flex-shrink-0">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span>Museum-Grade Provenance Pass</span>
              </div>
            </div>

            {/* Technical Telemetry 4-Column Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {currentModule.metrics.map((metric, i) => (
                <div 
                  key={i}
                  className="bg-cream-light border border-cream-dark/40 rounded-xl p-5 space-y-2 shadow-2xs hover:border-cream-dark transition-colors"
                >
                  <span className="text-[8.5px] font-sans-clean font-bold tracking-widest uppercase text-ink-muted block">
                    {metric.label}
                  </span>
                  <p className="font-serif-elegant text-2xl font-light text-ink-dark">
                    {metric.value}
                  </p>
                  <p className="text-[11px] font-light text-ink-muted leading-snug">
                    {metric.note}
                  </p>
                </div>
              ))}
            </div>

            {/* Two-Column Deep-Dive: Material Recipe & Process Synthesis */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left: Material Composition Formula */}
              <div className="lg:col-span-6 bg-cream-base/30 border border-cream-dark/40 rounded-2xl p-6 sm:p-8 space-y-5">
                <div className="flex items-center justify-between border-b border-cream-dark/30 pb-3">
                  <span className="text-[9px] font-bold tracking-widest uppercase text-ink-muted">
                    MATERIAL COMPOSITION BREAKDOWN
                  </span>
                  <Cpu className="h-4 w-4 text-gold-dark" />
                </div>

                <div className="space-y-4">
                  {currentModule.recipe.map((item, idx) => (
                    <div key={idx} className="space-y-1 text-xs">
                      <div className="flex justify-between items-center font-medium text-ink-dark">
                        <span>{item.element}</span>
                        <span className="font-serif-elegant font-semibold text-sm">{item.pct}</span>
                      </div>
                      <div className="w-full bg-cream-dark/40 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all duration-700" 
                          style={{ 
                            width: item.pct, 
                            backgroundColor: currentModule.accentColor 
                          }} 
                        />
                      </div>
                      <p className="text-[10px] font-light text-ink-muted">
                        {item.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Fabrication Protocol Narrative */}
              <div className="lg:col-span-6 bg-cream-light border border-cream-dark/40 rounded-2xl p-6 sm:p-8 space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-cream-dark/30 pb-3">
                    <span className="text-[9px] font-bold tracking-widest uppercase text-ink-muted">
                      ATELIER FABRICATION PROTOCOL
                    </span>
                    <Clock className="h-4 w-4 text-gold-dark" />
                  </div>

                  <p className="font-sans-clean text-xs sm:text-sm font-light text-ink-muted leading-relaxed">
                    {currentModule.processNote}
                  </p>

                  <div className="bg-cream-base/60 border border-cream-dark/30 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-ink-dark">
                      <Thermometer className="h-3.5 w-3.5 text-gold-dark" />
                      <span>Thermal & Quality Assurance Standard</span>
                    </div>
                    <p className="text-[11px] font-light text-ink-muted leading-relaxed">
                      Every piece undergoes polarized strain gauge inspection or porosity acoustic testing. Only artifacts with zero structural flaws receive the KROMA studio serial stamp.
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-cream-dark/30 flex items-center justify-between text-[10px] font-bold tracking-widest uppercase text-ink-dark">
                  <span>Standard Tolerance: ±0.05%</span>
                  <span className="text-gold-dark">Certified By Master Guild</span>
                </div>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  )
}
