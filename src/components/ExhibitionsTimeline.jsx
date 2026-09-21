import React from 'react'
import { MapPin, Award } from 'lucide-react'

const EXHIBITIONS = [
  {
    year: "2026",
    title: "Chromatics in Glass & Earth",
    event: "Salone del Mobile / Milan Design Week",
    location: "Brera Design District, Milan, Italy",
    type: "Featured Showcase",
    curator: "Studio Archivio Milano",
    description: "A solo architectural pavilion presenting our entire limited series of optical borosilicate sculptures and magma reduction vessels under programmed natural light corridors."
  },
  {
    year: "2025",
    title: "Dual Chamber Flame Formations",
    event: "Kyoto Craft & Material Triennial",
    location: "National Museum of Modern Art, Kyoto, Japan",
    type: "Museum Selection",
    curator: "Kyoto Guild of Flame Artisans",
    description: "Honored with the Jury Selection Award for technical excellence in borosilicate dual-wall internal mineral slip suspension."
  },
  {
    year: "2025",
    title: "Reactive Kiln Topographies",
    event: "Design Miami / Basel",
    location: "Messe Basel, Switzerland",
    type: "Gallery Exhibition",
    curator: "Galerie Nocturne Zurich",
    description: "Showcase of twenty unique glazed earthenware vessels examining the fluid reduction physics of Seville iron-rich stoneware."
  },
  {
    year: "2024",
    title: "Jacquard Vector Coordinates",
    event: "Venice Architecture Biennale (Collateral)",
    location: "Arsenale Docks, Venice, Italy",
    type: "Site-Specific Installation",
    curator: "European Textile Consortium",
    description: "Suspension of monumental 4-meter silk tapestries demonstrating modern mathematical coordinate weaving against historic Venetian naval masonry."
  }
]

export default function ExhibitionsTimeline() {
  return (
    <section className="py-20 sm:py-28 bg-cream-base/10 border-t border-cream-dark/40 text-left relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-cream-dark/30 pb-8">
          <div className="space-y-3">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted block">
              INSTITUTIONAL PROVENANCE & ARCHIVES
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark tracking-tight">
              Exhibitions & Biennials
            </h2>
            <p className="max-w-xl font-sans-clean text-xs sm:text-sm leading-relaxed text-ink-muted font-light">
              KROMA works are regularly exhibited in major design capitals and archived in private foundation collections across Europe, Japan, and the Americas.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-ink-dark bg-cream-light border border-cream-dark/40 px-4 py-2.5 rounded-full shadow-2xs self-start md:self-auto">
            <Award className="h-4 w-4 text-gold-dark" />
            <span>Museum & Biennale Provenance</span>
          </div>
        </div>

        {/* Timeline List */}
        <div className="space-y-6">
          {EXHIBITIONS.map((item, idx) => (
            <div 
              key={idx}
              className="bg-cream-light border border-cream-dark/40 hover:border-cream-dark rounded-2xl p-6 sm:p-8 transition-all duration-300 shadow-xs hover:shadow-md flex flex-col lg:flex-row justify-between lg:items-center gap-6"
            >
              {/* Left Column: Year & Context */}
              <div className="flex items-start gap-6 lg:w-1/3">
                <span className="font-serif-elegant text-3xl sm:text-4xl font-light text-ink-dark/60 tracking-tight">
                  {item.year}
                </span>

                <div className="space-y-1">
                  <span className="text-[8.5px] font-sans-clean font-bold tracking-widest uppercase text-gold-dark block">
                    {item.type}
                  </span>
                  <h3 className="font-serif-elegant text-xl sm:text-2xl font-light text-ink-dark">
                    {item.title}
                  </h3>
                  <p className="text-[11px] font-medium text-ink-muted">
                    {item.event}
                  </p>
                </div>
              </div>

              {/* Middle Column: Description */}
              <div className="lg:w-5/12 text-xs font-light text-ink-muted leading-relaxed">
                <p>{item.description}</p>
                <span className="text-[10px] text-ink-dark font-medium block mt-1.5">
                  Curated by: {item.curator}
                </span>
              </div>

              {/* Right Column: Location & Status */}
              <div className="lg:w-1/4 flex flex-col sm:flex-row lg:flex-col justify-between items-start lg:items-end gap-3 border-t lg:border-t-0 border-cream-dark/30 pt-4 lg:pt-0">
                <div className="flex items-center gap-1.5 text-xs text-ink-dark">
                  <MapPin className="h-3.5 w-3.5 text-gold-dark flex-shrink-0" />
                  <span className="text-[11px] font-light">{item.location}</span>
                </div>

                <span className="text-[9px] font-sans-clean font-bold tracking-widest uppercase bg-cream-base px-3 py-1 rounded-full border border-cream-dark/40 text-ink-muted">
                  Official Record
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
