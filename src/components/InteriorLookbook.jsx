import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, Sun, Sunset, Moon, Sparkles, MapPin, ArrowRight } from 'lucide-react'

const SPACES = [
  {
    id: "space-01",
    name: "Minimalist Alpine Salon",
    location: "Zurich, Switzerland",
    architectureStyle: "Brutalist Travertine & Cast Glass",
    image: "/liquid_glass.jpg",
    secondaryImage: "/prismatic_bowl.jpg",
    description: "Framed against rough travertine walls, the borosilicate glass droplet catches morning eastern sunlight, casting green, yellow, and red spectral refractions across the limestone surface.",
    featuredObjects: [
      {
        name: "Liquid Glass Droplets",
        category: "Glass Art",
        price: "$840.00",
        id: "prod_01",
        placement: "Central Travertine Console",
        lightReaction: "Projects 420nm-680nm caustic arcs across nearby floor planes in direct sunlight."
      },
      {
        name: "Prismatic Wave Bowl",
        category: "Glass Art",
        price: "$620.00",
        id: "prod_04",
        placement: "Low Concrete Plinth",
        lightReaction: "Acts as a thick-wall cylindrical prism, dispersing ambient window daylight into emerald haloes."
      }
    ],
    lightingModes: {
      day: { label: "Daylight (5500K)", note: "Maximum color saturation with vibrant green refraction." },
      golden: { label: "Golden Hour (3200K)", note: "Amber and crimson chambers radiate intense warmth." },
      evening: { label: "Evening Studio (2700K)", note: "Deep liquid shadows with pin-spot highlight refraction." }
    }
  },
  {
    id: "space-02",
    name: "Kyoto Machiya Courtyard Residence",
    location: "Higashiyama, Kyoto",
    architectureStyle: "Charred Cedar (Shou Sugi Ban) & Washi",
    image: "/magma_vessel.jpg",
    secondaryImage: "/reactive_platter.jpg",
    description: "Set against charred timber walls and tatami floors, the reactive mineral glaze of the Magma Vessel contrasts dramatically with natural shadows, echoing ancient tea house wabi-sabi.",
    featuredObjects: [
      {
        name: "Magma Ceramic Vessel",
        category: "Ceramics",
        price: "$490.00",
        id: "prod_02",
        placement: "Tokonoma Alcove",
        lightReaction: "Matte obsidian slip absorbs raking light, while molten lava glazes gleam like liquid embers."
      },
      {
        name: "Nebula Reactive Platter",
        category: "Ceramics",
        price: "$380.00",
        id: "prod_05",
        placement: "Low Hinoki Pedestal",
        lightReaction: "Cobalt and chrome oxides reveal delicate crystalline rings when illuminated obliquely."
      }
    ],
    lightingModes: {
      day: { label: "Filtered Courtyard (5000K)", note: "Soft diffused daylight highlights the matte earthen body." },
      golden: { label: "Sunset Rake (3000K)", note: "Emphasizes the deep 3-dimensional relief of reactive glaze flows." },
      evening: { label: "Lantern Glow (2400K)", note: "The lava orange droplets appear incandescent against black shadows." }
    }
  },
  {
    id: "space-03",
    name: "Lyon Silk Mill Loft",
    location: "Croix-Rousse, Lyon",
    architectureStyle: "Industrial Brickwork & Zinc Beams",
    image: "/halftone_wave.jpg",
    secondaryImage: "/solar_throw.jpg",
    description: "Suspended against raw masonry and industrial steel, the Halftone Wave tapestry dampens loft acoustics while injecting rhythmic cybernetic color into a heritage industrial space.",
    featuredObjects: [
      {
        name: "Halftone Wave Silk Tapestry",
        category: "Fine Textiles",
        price: "$1,250.00",
        id: "prod_03",
        placement: "Double-Height Gallery Wall",
        lightReaction: "Mulberry silk fibers reflect glancing light, creating an optical shimmer across teal coordinates."
      },
      {
        name: "Solar Flare Wool Throw",
        category: "Fine Textiles",
        price: "$740.00",
        id: "prod_06",
        placement: "Custom Cast Concrete Lounge",
        lightReaction: "Rich cashmere-merino loft absorbs harsh reflections, providing profound visual depth."
      }
    ],
    lightingModes: {
      day: { label: "Northern Skylight (6000K)", note: "Deep indigo warp tones look majestic and crisp." },
      golden: { label: "Late Afternoon (3400K)", note: "Teal and pink weave paths glow with electric intensity." },
      evening: { label: "Gallery Spotlights (3000K)", note: "Micro-halftone patterns create an immersive illusion of depth." }
    }
  }
]

export default function InteriorLookbook({ onSelectProduct }) {
  const [activeSpaceIdx, setActiveSpaceIdx] = useState(0)
  const [lightingMode, setLightingMode] = useState("day")

  const space = SPACES[activeSpaceIdx]
  const currentLighting = space.lightingModes[lightingMode]

  // Filter effect based on lighting temperature
  const getFilterStyle = () => {
    if (lightingMode === "golden") return "sepia(25%) saturate(135%) brightness(96%) contrast(105%)"
    if (lightingMode === "evening") return "brightness(85%) contrast(115%) saturate(90%) hue-rotate(-8deg)"
    return "none"
  }

  return (
    <section className="py-20 sm:py-28 bg-cream-light border-t border-cream-dark/40 text-left relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cream-dark/30 pb-8">
          <div className="space-y-3">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted block">
              IN SITU ARCHITECTURAL STAGING
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark tracking-tight">
              Curated Interiors & Light Studies
            </h2>
            <p className="max-w-xl font-sans-clean text-xs sm:text-sm leading-relaxed text-ink-muted font-light">
              Observe how our handcrafted glass, reactive stoneware, and jacquard weaves interact with architectural light and materials across living spaces.
            </p>
          </div>

          {/* Interactive Space Selectors */}
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-2 md:pb-0">
            {SPACES.map((s, idx) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSpaceIdx(idx)
                  setLightingMode("day")
                }}
                className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer flex-shrink-0 ${
                  activeSpaceIdx === idx
                    ? "bg-ink-dark text-cream-light shadow-sm"
                    : "bg-cream-base border border-cream-dark/40 text-ink-muted hover:text-ink-dark"
                }`}
              >
                {s.name.split(" ")[0]} Studio
              </button>
            ))}
          </div>
        </div>

        {/* Main Stage: Room Showcase & Lighting Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Visual Staging Frame with Lighting Simulation */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-cream-base border border-cream-dark/40 shadow-md group">
              <motion.img
                key={`${space.id}-${lightingMode}`}
                initial={{ opacity: 0.8 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={space.image}
                alt={space.name}
                style={{ filter: getFilterStyle() }}
                className="w-full h-full object-cover transition-all duration-700"
              />

              {/* Architectural Location Badge */}
              <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-cream-light/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-cream-dark/40 text-[9px] font-sans-clean font-bold tracking-widest text-ink-dark uppercase">
                <MapPin className="h-3 w-3 text-gold-dark" />
                <span>{space.location}</span>
              </div>

              {/* Interactive Hotspot Indicator */}
              <div className="absolute bottom-4 left-4 bg-ink-dark/80 backdrop-blur-md text-cream-light px-3.5 py-1.5 rounded-full text-[10px] font-medium flex items-center gap-2">
                <Sparkles className="h-3 w-3 text-gold-base animate-pulse" />
                <span>Active Lighting Simulation: {currentLighting.label}</span>
              </div>
            </div>

            {/* Interactive Lighting Temperature Bar */}
            <div className="bg-cream-base/50 border border-cream-dark/40 rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-0.5">
                <span className="text-[9px] font-sans-clean font-bold tracking-widest uppercase text-ink-muted block">
                  LIGHTING ACCLIMATIZATION SIMULATOR
                </span>
                <p className="text-xs font-light text-ink-dark">
                  {currentLighting.note}
                </p>
              </div>

              <div className="flex items-center space-x-2 bg-cream-light border border-cream-dark/40 p-1 rounded-full flex-shrink-0">
                <button
                  onClick={() => setLightingMode("day")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    lightingMode === "day"
                      ? "bg-ink-dark text-cream-light"
                      : "text-ink-muted hover:text-ink-dark"
                  }`}
                >
                  <Sun className="h-3 w-3" />
                  <span>Day</span>
                </button>
                <button
                  onClick={() => setLightingMode("golden")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    lightingMode === "golden"
                      ? "bg-amber-600 text-cream-light"
                      : "text-ink-muted hover:text-ink-dark"
                  }`}
                >
                  <Sunset className="h-3 w-3" />
                  <span>Golden</span>
                </button>
                <button
                  onClick={() => setLightingMode("evening")}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    lightingMode === "evening"
                      ? "bg-indigo-950 text-cream-light"
                      : "text-ink-muted hover:text-ink-dark"
                  }`}
                >
                  <Moon className="h-3 w-3" />
                  <span>Night</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Context & Featured Artifact Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <span className="text-[9px] font-sans-clean font-bold tracking-[0.25em] uppercase text-gold-dark block">
                {space.architectureStyle}
              </span>
              <h3 className="font-serif-elegant text-2xl sm:text-3xl font-light text-ink-dark">
                {space.name}
              </h3>
              <p className="font-sans-clean text-xs leading-relaxed text-ink-muted font-light">
                {space.description}
              </p>
            </div>

            {/* Objects in this space */}
            <div className="space-y-3 pt-2">
              <span className="text-[9px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted block">
                ARCHIVED OBJECTS IN THIS SPACE:
              </span>

              {space.featuredObjects.map((obj, i) => (
                <div 
                  key={i}
                  className="bg-cream-base/40 border border-cream-dark/40 hover:border-cream-dark rounded-xl p-4 transition-all duration-300 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[8px] font-bold tracking-wider uppercase text-ink-muted">
                        {obj.category} • {obj.placement}
                      </span>
                      <h4 className="font-serif-elegant text-lg font-medium text-ink-dark">
                        {obj.name}
                      </h4>
                    </div>
                    <span className="font-sans-clean text-xs font-semibold text-ink-dark bg-cream-light px-2.5 py-1 rounded-md border border-cream-dark/30">
                      {obj.price}
                    </span>
                  </div>

                  <p className="text-[11px] font-light text-ink-muted leading-relaxed">
                    {obj.lightReaction}
                  </p>

                  <div className="pt-2 border-t border-cream-dark/20 flex justify-between items-center">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(obj.id)}
                      className="inline-flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-ink-dark hover:text-gold-dark transition-colors cursor-pointer"
                    >
                      <Eye className="h-3 w-3" />
                      <span>Inspect Artwork Specs</span>
                    </button>
                    <ArrowRight className="h-3 w-3 text-ink-muted" />
                  </div>
                </div>
              ))}
            </div>

            {/* Spatial Guarantee Callout */}
            <div className="bg-cream-light border-l-2 border-gold-dark p-4 rounded-r-xl space-y-1">
              <h5 className="font-serif-elegant text-sm font-semibold text-ink-dark">
                14-Day Complimentary In-Situ Space Trial
              </h5>
              <p className="text-[11px] font-light text-ink-muted leading-snug">
                Test the sculpture under your own ambient morning and evening light. If the optical interaction does not enchant your interior, we provide courier collection at our cost.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  )
}
