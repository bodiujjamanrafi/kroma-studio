import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ShoppingBag, Check, Star, CornerDownRight } from 'lucide-react'

const INITIAL_REVIEWS = {
  prod_01: [
    { name: "Clarissa V.", rating: 5, date: "2 weeks ago", text: "Incredible refractive projection. During sunset, it casts warm gradients of green and red across my entire living room. A masterpiece." },
    { name: "Marcus Dunhill", rating: 5, date: "1 month ago", text: "The glass weight feels solid and premium. The double-chamber glass structure projects light beautifully." }
  ],
  prod_02: [
    { name: "Julian H.", rating: 5, date: "3 days ago", text: "The glaze flow is absolutely striking. The contrasting obsidian charcoal and magma orange glaze is gorgeous in person." },
    { name: "Elena Rostova", rating: 4, date: "3 weeks ago", text: "A stunning piece of earthenware clay. The reactive glaze flows are individual and unique." }
  ],
  prod_03: [
    { name: "Pierre L.", rating: 5, date: "1 month ago", text: "Woven silk fibers catch light beautifully. Halftone dots give a unique depth of teal over indigo backdrop." }
  ],
  prod_04: [
    { name: "Sarah K.", rating: 5, date: "1 week ago", text: "Projects a gorgeous solar prism on our white oak credenza. Exquisite Kyoto glass craftsmanship." }
  ],
  prod_05: [
    { name: "Dimitri N.", rating: 5, date: "5 days ago", text: "Stunning ceramic presentation. Reactive glazes created beautiful celestial spirals." }
  ],
  prod_06: [
    { name: "Sophia M.", rating: 4, date: "2 weeks ago", text: "Extremely soft blend of merino and cashmere. Colors are vibrant and look premium on my off-white sofa." }
  ]
}

export default function ProductModal({ product, isOpen, onClose, onAddToCart, isInCart }) {
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' })
  const [hoverRating, setHoverRating] = useState(0)
  const [reviewSuccess, setReviewSuccess] = useState(false)

  // Initialize reviews for the active product
  useEffect(() => {
    if (product) {
      setReviews(INITIAL_REVIEWS[product.id] || [])
      setReviewSuccess(false)
      setNewReview({ name: '', rating: 5, text: '' })
    }
  }, [product])

  if (!isOpen || !product) return null

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    if (!newReview.name.trim() || !newReview.text.trim()) return

    const submission = {
      name: newReview.name,
      rating: newReview.rating,
      date: "Just now",
      text: newReview.text
    }

    setReviews(prev => [submission, ...prev])
    setReviewSuccess(true)
    setNewReview({ name: '', rating: 5, text: '' })
  }

  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : "5.0"

  const totalReviewsCount = reviews.length
  const getStarPercentage = (starNum) => {
    if (totalReviewsCount === 0) return 0
    const count = reviews.filter(r => r.rating === starNum).length
    return Math.round((count / totalReviewsCount) * 100)
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink-dark/45 backdrop-blur-xs" 
        />

        {/* Modal Container - behaves as bottom sheet on mobile, centered card on desktop */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 60 }}
          transition={{ type: "spring", duration: 0.6, bounce: 0.05 }}
          className="relative w-full max-w-5xl bg-cream-light border-t sm:border border-cream-dark/60 rounded-t-2xl sm:rounded-2xl overflow-y-auto md:overflow-hidden shadow-2xl z-10 grid grid-cols-1 md:grid-cols-12 max-h-[92vh] md:max-h-[90vh] mt-auto sm:mt-0"
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-ink-muted hover:text-ink-dark bg-cream-base/60 backdrop-blur-md rounded-full border border-cream-dark/30 hover:bg-cream-base transition-colors duration-200 z-20 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Left: Product Image & Palette Visualizer (5 Cols) */}
          <div className="md:col-span-5 bg-cream-base/60 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-cream-dark/30 md:overflow-y-auto">
            <div className="space-y-6">
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden border border-cream-dark/30 ring-1 ring-cream-dark/20 bg-cream-base shadow-sm">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-center hover:scale-[1.02] transition-transform duration-500"
                />
              </div>
              
              {/* Pinterest Palette Section */}
              <div className="border-t border-cream-dark/30 pt-4">
                <h4 className="text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted mb-3 text-left">
                  Design Palette Swatches: {product.paletteName}
                </h4>
                
                <div className="grid grid-cols-3 gap-3">
                  {product.colors.map((color, idx) => (
                    <div 
                      key={idx} 
                      className="flex flex-col items-center bg-cream-light border border-cream-dark/30 p-2 rounded-lg text-center"
                    >
                      <div 
                        className="h-6 w-full rounded-md border border-cream-dark/20 mb-2 shadow-inner"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="text-[8.5px] font-sans-clean font-semibold tracking-wider text-ink-dark truncate w-full">
                        {color.name}
                      </span>
                      <span className="text-[8.5px] font-sans-clean text-ink-muted font-mono tracking-wider mt-0.5">
                        {color.hex}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <p className="text-[9px] font-sans-clean text-ink-muted font-light mt-6 text-left leading-relaxed">
              *Visual tones extracted from matching design study coordinates. Colors are vibrant and reactive in light.
            </p>
          </div>

          {/* Right: Product Details, Specs & Reviews (7 Cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between md:overflow-y-auto md:max-h-[90vh]">
            <div className="space-y-6 pb-6">
              
              {/* Category & Title */}
              <div className="space-y-2 text-left">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-sans-clean font-bold tracking-[0.25em] uppercase text-gold-dark">
                    {product.categoryLabel}
                  </span>
                  
                  {/* Reviews Summary count */}
                  <div className="flex items-center space-x-1.5 text-xs text-ink-muted font-semibold">
                    <Star className="h-3.5 w-3.5 fill-gold-base text-gold-base" />
                    <span>{averageRating} ({reviews.length})</span>
                  </div>
                </div>
                
                <h3 className="font-serif-elegant text-3xl sm:text-4xl font-light text-ink-dark tracking-tight leading-tight">
                  {product.name}
                </h3>
                <span className="block font-sans-clean text-2xl font-light text-ink-dark mt-2">
                  {product.priceFormatted}
                </span>
              </div>

              {/* Description */}
              <div className="text-left">
                <p className="font-sans-clean text-sm leading-relaxed text-ink-muted font-light">
                  {product.description}
                </p>
              </div>

              {/* Specs Table */}
              <div className="border-t border-cream-dark/40 pt-4 text-left">
                <h4 className="text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted mb-3">
                  Specifications
                </h4>
                <div className="divide-y divide-cream-dark/30 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-2.5">
                      <span className="font-sans-clean text-ink-muted font-light">{key}</span>
                      <span className="font-sans-clean text-ink-dark font-medium">{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Reviews & Client Feedback Section */}
              <div className="border-t border-cream-dark/40 pt-6 text-left space-y-6">
                <h4 className="text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted">
                  Client Feedbacks
                </h4>

                {/* Star Percentage Breakdown Graph */}
                <div className="bg-cream-base/30 border border-cream-dark/30 rounded-xl p-4 space-y-2">
                  {[5, 4, 3, 2, 1].map((star) => {
                    const percent = getStarPercentage(star)
                    return (
                      <div key={star} className="flex items-center text-[10px] sm:text-xs text-ink-muted gap-3">
                        <span className="w-3 text-right">{star}</span>
                        <Star className="h-3 w-3 fill-gold-base text-gold-base flex-shrink-0" />
                        <div className="flex-1 h-1.5 bg-cream-dark/40 rounded-full overflow-hidden">
                          <div className="h-full bg-gold-base rounded-full transition-all duration-500" style={{ width: `${percent}%` }} />
                        </div>
                        <span className="w-8 text-right font-semibold text-ink-dark">{percent}%</span>
                      </div>
                    )
                  })}
                </div>

                {/* Review Form */}
                <form onSubmit={handleReviewSubmit} className="bg-cream-base/40 border border-cream-dark/40 rounded-xl p-4 space-y-3.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">Share your review</span>
                    
                    {/* Star Rating select input */}
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReview(prev => ({ ...prev, rating: star }))}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          className="text-gold-base focus:outline-none p-0.5"
                          aria-label={`Rate ${star} stars`}
                        >
                          <Star className={`h-4 w-4 transition-colors ${
                            star <= (hoverRating || newReview.rating) 
                              ? 'fill-gold-base text-gold-base' 
                              : 'text-cream-dark'
                          }`} />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input 
                      type="text" 
                      placeholder="Username (e.g. Clara)"
                      value={newReview.name}
                      onChange={(e) => setNewReview(prev => ({ ...prev, name: e.target.value }))}
                      className="border border-cream-dark/80 bg-cream-light/60 p-2.5 text-xs rounded-lg focus:outline-none focus:border-ink-dark sm:col-span-1"
                      required
                    />
                    <input 
                      type="text" 
                      placeholder="Comments (e.g. Beautiful shape!)"
                      value={newReview.text}
                      onChange={(e) => setNewReview(prev => ({ ...prev, text: e.target.value }))}
                      className="border border-cream-dark/80 bg-cream-light/60 p-2.5 text-xs rounded-lg focus:outline-none focus:border-ink-dark sm:col-span-2"
                      required
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    {reviewSuccess ? (
                      <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                        <Check className="h-3.5 w-3.5" /> Feedback published.
                      </span>
                    ) : <span />}
                    
                    <button
                      type="submit"
                      className="rounded-full bg-ink-dark px-4 py-2 text-[9px] font-bold tracking-widest uppercase text-cream-light hover:opacity-90 transition-opacity"
                    >
                      Publish
                    </button>
                  </div>
                </form>

                {/* Reviews List */}
                <div className="space-y-4">
                  {reviews.map((rev, i) => (
                    <div key={i} className="flex gap-2 items-start border-b border-cream-dark/20 pb-4">
                      <CornerDownRight className="h-4 w-4 text-ink-muted/50 mt-1 flex-shrink-0" />
                      <div className="space-y-1.5 flex-1 text-xs">
                        <div className="flex justify-between items-center">
                          <span className="font-semibold text-ink-dark">{rev.name}</span>
                          <div className="flex items-center space-x-1.5 text-ink-muted">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, starIdx) => (
                                <Star 
                                  key={starIdx} 
                                  className={`h-3 w-3 ${starIdx < rev.rating ? 'fill-gold-base text-gold-base' : 'text-cream-dark'}`} 
                                />
                              ))}
                            </div>
                            <span className="text-[9px]">{rev.date}</span>
                          </div>
                        </div>
                        <p className="font-sans-clean font-light text-ink-muted leading-relaxed">
                          "{rev.text}"
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Bottom Add-to-cart Action Button */}
            <div className="pt-6 border-t border-cream-dark/40 flex flex-col gap-4 bg-cream-light sticky bottom-0">
              <button
                onClick={() => onAddToCart(product)}
                disabled={isInCart}
                className={`group flex items-center justify-center gap-3 rounded-full border border-ink-dark py-4 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                  isInCart 
                    ? "bg-transparent text-ink-dark border-cream-dark cursor-default" 
                    : "bg-ink-dark text-cream-light hover:bg-transparent hover:text-ink-dark"
                }`}
              >
                {isInCart ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="h-4 w-4" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>
              <p className="text-[10px] font-sans-clean text-ink-muted font-light text-center">
                Complimentary gift wrapping & shipping insurance included.
              </p>
            </div>

          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
