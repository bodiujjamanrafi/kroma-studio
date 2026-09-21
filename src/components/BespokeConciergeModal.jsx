import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, ShieldCheck, Send } from 'lucide-react'

export default function BespokeConciergeModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studio: '',
    city: '',
    serviceType: 'custom-glaze',
    timeframe: 'next-quarter',
    budgetRange: 'tier-1',
    notes: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [referenceCode, setReferenceCode] = useState('')

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const code = `KROMA-ARC-${Math.floor(100000 + Math.random() * 900000)}`
    setReferenceCode(code)
    setSubmitted(true)
  }

  const handleReset = () => {
    setSubmitted(false)
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleReset}
          className="fixed inset-0 bg-ink-dark/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", duration: 0.5, bounce: 0.08 }}
          className="relative w-full max-w-2xl bg-cream-light border border-cream-dark rounded-3xl shadow-2xl overflow-hidden z-10 my-8 text-left"
        >
          {/* Close button */}
          <button
            onClick={handleReset}
            className="absolute top-5 right-5 p-2 rounded-full bg-cream-base/80 hover:bg-cream-dark text-ink-muted hover:text-ink-dark transition-colors cursor-pointer z-20"
            aria-label="Close dialog"
          >
            <X className="h-5 w-5" />
          </button>

          {!submitted ? (
            <div className="p-6 sm:p-10 space-y-6">
              
              {/* Header */}
              <div className="space-y-2 border-b border-cream-dark/40 pb-6 pr-8">
                <span className="text-[9px] font-sans-clean font-bold tracking-[0.3em] uppercase text-gold-dark block">
                  PRIVATE ATELIER DESK
                </span>
                <h3 className="font-serif-elegant text-2xl sm:text-4xl font-light text-ink-dark leading-tight">
                  Reserve a Bespoke Commission or Private Viewing
                </h3>
                <p className="font-sans-clean text-xs text-ink-muted font-light leading-relaxed">
                  Our studio coordinators in Kyoto, Seville, and Lyon collaborate directly with architects, interior specialists, and private patrons for custom site-specific objects.
                </p>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full bg-cream-base/60 border border-cream-dark rounded-xl px-4 py-2.5 text-xs text-ink-dark focus:outline-none focus:border-ink-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark block">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="curator@studio.com"
                      className="w-full bg-cream-base/60 border border-cream-dark rounded-xl px-4 py-2.5 text-xs text-ink-dark focus:outline-none focus:border-ink-dark"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark block">
                      Design Studio / Organization
                    </label>
                    <input
                      type="text"
                      value={formData.studio}
                      onChange={(e) => setFormData({ ...formData, studio: e.target.value })}
                      placeholder="e.g. Vance Architecture"
                      className="w-full bg-cream-base/60 border border-cream-dark rounded-xl px-4 py-2.5 text-xs text-ink-dark focus:outline-none focus:border-ink-dark"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark block">
                      City & Country *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Milan, Italy"
                      className="w-full bg-cream-base/60 border border-cream-dark rounded-xl px-4 py-2.5 text-xs text-ink-dark focus:outline-none focus:border-ink-dark"
                    />
                  </div>
                </div>

                {/* Inquiry Service Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark block">
                      Inquiry Category *
                    </label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
                      className="w-full bg-cream-base/60 border border-cream-dark rounded-xl px-4 py-2.5 text-xs text-ink-dark focus:outline-none focus:border-ink-dark cursor-pointer"
                    >
                      <option value="custom-glaze">Custom Glaze & Vessel Dimensions</option>
                      <option value="studio-viewing-kyoto">Private Studio Viewing — Kyoto</option>
                      <option value="studio-viewing-seville">Private Studio Viewing — Seville</option>
                      <option value="studio-viewing-lyon">Private Studio Viewing — Lyon</option>
                      <option value="spatial-fitting">Interior Architectural Fitting Consultation</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark block">
                      Estimated Project Budget
                    </label>
                    <select
                      value={formData.budgetRange}
                      onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                      className="w-full bg-cream-base/60 border border-cream-dark rounded-xl px-4 py-2.5 text-xs text-ink-dark focus:outline-none focus:border-ink-dark cursor-pointer"
                    >
                      <option value="tier-1">$1,000 — $5,000 USD</option>
                      <option value="tier-2">$5,000 — $15,000 USD</option>
                      <option value="tier-3">$15,000+ USD (Major Architectural Project)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1 pt-1">
                  <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark block">
                    Project Notes & Spatial Requirements
                  </label>
                  <textarea
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Tell us about the interior location, lighting condition, preferred palette, or target installation date..."
                    className="w-full bg-cream-base/60 border border-cream-dark rounded-xl p-3 text-xs text-ink-dark focus:outline-none focus:border-ink-dark"
                  />
                </div>

                {/* Guarantees */}
                <div className="flex items-center gap-2 text-[10px] text-ink-muted font-light pt-2">
                  <ShieldCheck className="h-4 w-4 text-gold-dark flex-shrink-0" />
                  <span>Strict confidentiality guaranteed. We respond within 24 business hours with an artisan dossier.</span>
                </div>

                {/* Submit */}
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-ink-dark border border-ink-dark px-8 py-3.5 text-xs font-bold tracking-widest uppercase text-cream-light hover:bg-gold-base hover:border-gold-base transition-all duration-300 cursor-pointer shadow-md"
                  >
                    <Send className="h-3.5 w-3.5" />
                    <span>Submit Atelier Request</span>
                  </button>
                </div>

              </form>
            </div>
          ) : (
            /* Success confirmation */
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="h-16 w-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="h-8 w-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-emerald-700 block">
                  APPOINTMENT DOSSIER DISPATCHED
                </span>
                <h3 className="font-serif-elegant text-2xl sm:text-3xl font-light text-ink-dark">
                  Thank You, {formData.name}
                </h3>
                <p className="text-xs font-light text-ink-muted leading-relaxed">
                  Your bespoke inquiry has been registered with our primary coordinator. We have dispatched a confirmation package and material guide to <strong>{formData.email}</strong>.
                </p>
              </div>

              <div className="bg-cream-base border border-cream-dark/40 rounded-xl p-4 max-w-xs mx-auto text-xs space-y-1">
                <span className="text-[9px] font-bold tracking-widest uppercase text-ink-muted block">
                  ATELIER REFERENCE CODE:
                </span>
                <span className="font-mono text-ink-dark font-bold text-sm tracking-wider">
                  {referenceCode}
                </span>
              </div>

              <button
                onClick={handleReset}
                className="rounded-full bg-ink-dark text-cream-light px-8 py-3 text-xs font-bold tracking-widest uppercase hover:bg-gold-base transition-colors cursor-pointer"
              >
                Return to Gallery
              </button>
            </div>
          )}

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
