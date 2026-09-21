import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Ruler, Maximize2, Box, Check, HelpCircle } from 'lucide-react'

const OBJECTS_SCALE = [
  {
    id: "prod_01",
    name: "Liquid Glass Droplets",
    category: "Glass Art",
    image: "/liquid_glass.jpg",
    heightInch: 12,
    widthInch: 9,
    depthInch: 8,
    weightLbs: 3.4,
    heightCm: 30.5,
    widthCm: 22.8,
    depthCm: 20.3,
    weightKg: 1.54,
    idealSurfaces: ["Travertine / Marble Console", "Dedicated 36” Pedestal Plinth", "Low Architectural Coffee Table"],
    viewingDistance: "4 – 8 ft (1.2 – 2.4 m)",
    lightRecommendation: "Unobstructed morning or directional 3000K spot for maximum caustic arcs.",
    cratingSpecs: "Custom dual-density EPE foam nestled inside birch plywood crate."
  },
  {
    id: "prod_02",
    name: "Magma Ceramic Vessel",
    category: "Ceramics",
    image: "/magma_vessel.jpg",
    heightInch: 14,
    widthInch: 8,
    depthInch: 8,
    weightLbs: 5.8,
    heightCm: 35.5,
    widthCm: 20.3,
    depthCm: 20.3,
    weightKg: 2.63,
    idealSurfaces: ["Dining Table Centerpiece", "Entry Foyer Credenza", "Tokonoma Wall Niche"],
    viewingDistance: "3 – 6 ft (0.9 – 1.8 m)",
    lightRecommendation: "Raking angle side-light to emphasize bubbling 3D glaze relief.",
    cratingSpecs: "Fitted high-impact molded shell with velvet contact gaskets."
  },
  {
    id: "prod_03",
    name: "Halftone Wave Silk Tapestry",
    category: "Fine Textiles",
    image: "/halftone_wave.jpg",
    heightInch: 60,
    widthInch: 45,
    depthInch: 0.2,
    weightLbs: 1.2,
    heightCm: 152.4,
    widthCm: 114.3,
    depthCm: 0.5,
    weightKg: 0.54,
    idealSurfaces: ["Double-Height Foyer Wall", "Above Modern Low Sofa", "Acoustically Treated Listening Room"],
    viewingDistance: "6 – 15 ft (1.8 – 4.5 m)",
    lightRecommendation: "Diffused perimeter LED strip or gallery flood lighting (avoid direct UV).",
    cratingSpecs: "Acid-free archival museum tube inside reinforced aluminum cylinder."
  },
  {
    id: "prod_04",
    name: "Prismatic Wave Bowl",
    category: "Glass Art",
    image: "/prismatic_bowl.jpg",
    heightInch: 6,
    widthInch: 10,
    depthInch: 10,
    weightLbs: 2.8,
    heightCm: 15.2,
    widthCm: 25.4,
    depthCm: 25.4,
    weightKg: 1.27,
    idealSurfaces: ["Polished Dark Stone Table", "Credenza Center", "Sunlit Shelf"],
    viewingDistance: "2 – 5 ft (0.6 – 1.5 m)",
    lightRecommendation: "Top-down lighting creates glowing chromatic rings on surfaces.",
    cratingSpecs: "Suspension foam double-box system tested to 2-meter drop standard."
  }
]

export default function ScaleFittingGuide({ onSelectProduct }) {
  const [selectedObjId, setSelectedObjId] = useState("prod_01")
  const [unitMetric, setUnitMetric] = useState(false) // false = Imperial, true = Metric

  const currentObj = OBJECTS_SCALE.find(o => o.id === selectedObjId) || OBJECTS_SCALE[0]

  return (
    <section className="py-20 sm:py-28 bg-cream-base/15 border-t border-cream-dark/40 text-left relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cream-dark/30 pb-8">
          <div className="space-y-3">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted block">
              PRECISION DIMENSIONS & SPATIAL FITTING
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark tracking-tight">
              Scale & Architectural Fitting Guide
            </h2>
            <p className="max-w-xl font-sans-clean text-xs sm:text-sm leading-relaxed text-ink-muted font-light">
              Evaluate real physical footprint, sightlines, and placement recommendations prior to archival acquisition.
            </p>
          </div>

          {/* Unit Toggle */}
          <div className="flex items-center space-x-2 bg-cream-light border border-cream-dark/40 p-1 rounded-full self-start md:self-auto">
            <button
              onClick={() => setUnitMetric(false)}
              className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                !unitMetric ? "bg-ink-dark text-cream-light" : "text-ink-muted hover:text-ink-dark"
              }`}
            >
              Inches / Lbs
            </button>
            <button
              onClick={() => setUnitMetric(true)}
              className={`px-3 py-1 rounded-full text-[9px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                unitMetric ? "bg-ink-dark text-cream-light" : "text-ink-muted hover:text-ink-dark"
              }`}
            >
              Centimeters / Kg
            </button>
          </div>
        </div>

        {/* Object Selection Tabs */}
        <div className="flex items-center space-x-3 overflow-x-auto scrollbar-none pb-2">
          {OBJECTS_SCALE.map(obj => (
            <button
              key={obj.id}
              onClick={() => setSelectedObjId(obj.id)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold tracking-wider uppercase transition-all cursor-pointer flex-shrink-0 flex items-center gap-2 ${
                selectedObjId === obj.id
                  ? "bg-ink-dark text-cream-light shadow-xs"
                  : "bg-cream-light border border-cream-dark/40 text-ink-muted hover:text-ink-dark"
              }`}
            >
              <span>{obj.name}</span>
            </button>
          ))}
        </div>

        {/* Visual Comparison Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-cream-light border border-cream-dark/40 rounded-3xl p-6 sm:p-10 shadow-sm">
          
          {/* Left: Dimension Diagram & Visualizer */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center p-6 bg-cream-base/30 rounded-2xl border border-cream-dark/30 min-h-[360px] relative">
            <div className="absolute top-4 left-4 flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-ink-muted">
              <Ruler className="h-3.5 w-3.5 text-gold-dark" />
              <span>Scale Reference Simulation</span>
            </div>

            {/* Object Silhouette / Photo Representation */}
            <div className="relative flex flex-col items-center my-6">
              <motion.img
                key={currentObj.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.4 }}
                src={currentObj.image}
                alt={currentObj.name}
                className="max-h-64 sm:max-h-72 object-contain rounded-xl shadow-lg border border-cream-dark/40"
              />

              {/* Dimension Callout Badges */}
              <div className="absolute -bottom-3 bg-ink-dark text-cream-light px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase shadow-md flex items-center gap-2">
                <span>
                  {unitMetric 
                    ? `${currentObj.heightCm} × ${currentObj.widthCm} × ${currentObj.depthCm} cm`
                    : `${currentObj.heightInch}”H × ${currentObj.widthInch}”W × ${currentObj.depthInch}”D`
                  }
                </span>
                <span className="text-gold-base">•</span>
                <span>
                  {unitMetric ? `${currentObj.weightKg} kg` : `${currentObj.weightLbs} lbs`}
                </span>
              </div>
            </div>

            {/* Surface Reference Line */}
            <div className="w-full border-t border-dashed border-cream-dark mt-6 pt-3 flex justify-between text-[9px] font-sans-clean text-ink-muted">
              <span>Standard 36” (91cm) Console Plane</span>
              <span>Protective Felt Pads Included</span>
            </div>
          </div>

          {/* Right: Technical Placement Specifications */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-gold-dark block">
                SPATIAL SPECIFICATIONS
              </span>
              <h3 className="font-serif-elegant text-2xl sm:text-3xl font-light text-ink-dark">
                {currentObj.name}
              </h3>
              <p className="text-xs text-ink-muted font-light leading-relaxed">
                Engineered for structural stability and museum lighting environments.
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 border-y border-cream-dark/30 py-4">
              <div>
                <span className="text-[8px] font-bold tracking-widest uppercase text-ink-muted block">
                  RECOMMENDED VIEW DISTANCE
                </span>
                <p className="font-serif-elegant text-lg text-ink-dark font-medium mt-0.5">
                  {currentObj.viewingDistance}
                </p>
              </div>

              <div>
                <span className="text-[8px] font-bold tracking-widest uppercase text-ink-muted block">
                  NET OBJECT WEIGHT
                </span>
                <p className="font-serif-elegant text-lg text-ink-dark font-medium mt-0.5">
                  {unitMetric ? `${currentObj.weightKg} kg` : `${currentObj.weightLbs} lbs`}
                </p>
              </div>
            </div>

            {/* Ideal Surfaces */}
            <div className="space-y-2">
              <span className="text-[9px] font-bold tracking-widest uppercase text-ink-muted block">
                OPTIMAL ARCHITECTURAL PLACEMENTS:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentObj.idealSurfaces.map((surface, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 bg-cream-base border border-cream-dark/40 px-3 py-1 rounded-md text-[10px] text-ink-dark font-medium"
                  >
                    <Check className="h-3 w-3 text-gold-dark" />
                    <span>{surface}</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Ambient Lighting Advice */}
            <div className="bg-cream-base/40 border border-cream-dark/30 rounded-xl p-4 space-y-1">
              <div className="flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase text-ink-dark">
                <HelpCircle className="h-3.5 w-3.5 text-gold-dark" />
                <span>Curator's Lighting Note</span>
              </div>
              <p className="text-[11px] font-light text-ink-muted leading-relaxed">
                {currentObj.lightRecommendation}
              </p>
            </div>

            {/* Crating Standard */}
            <div className="flex items-center gap-3 pt-2 text-xs text-ink-muted font-light">
              <Box className="h-4 w-4 text-gold-dark flex-shrink-0" />
              <span><strong>Crating Standard:</strong> {currentObj.cratingSpecs}</span>
            </div>

            {/* Action */}
            <div className="pt-2">
              <button
                onClick={() => onSelectProduct && onSelectProduct(currentObj.id)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink-dark border border-ink-dark px-7 py-3 text-xs font-bold tracking-widest uppercase text-cream-light hover:bg-transparent hover:text-ink-dark transition-all duration-300 cursor-pointer shadow-xs"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span>Inspect Object Specifications</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
