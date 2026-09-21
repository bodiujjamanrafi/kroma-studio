import React from 'react'
import { motion } from 'framer-motion'
import { Heart, ShoppingBag, X } from 'lucide-react'

export default function Wishlist({ wishlist, onProductClick, onToggleWishlist, onAddToCart, cartItems }) {
  const isWishlistEmpty = wishlist.length === 0

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
        <div className="border-b border-cream-dark/50 pb-8 flex justify-between items-end">
          <div className="space-y-4">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted">
              YOUR ARCHIVE
            </span>
            <h2 className="font-serif-elegant text-4xl sm:text-6xl font-light text-ink-dark tracking-tight">
              Favorited Objects
            </h2>
          </div>
          <span className="text-[10px] font-sans-clean font-bold tracking-widest uppercase bg-cream-base px-3 py-1.5 rounded border border-cream-dark/40 text-ink-muted">
            {wishlist.length} Items Saved
          </span>
        </div>

        {/* Wishlist Grid */}
        {isWishlistEmpty ? (
          <div className="py-24 text-center max-w-md mx-auto space-y-6 flex flex-col items-center">
            <div className="h-16 w-16 rounded-full bg-cream-base flex items-center justify-center text-ink-muted border border-cream-dark/30">
              <Heart className="h-6 w-6 font-light" />
            </div>
            <div className="space-y-2">
              <h3 className="font-serif-elegant text-2xl font-light text-ink-dark">No saved objects</h3>
              <p className="font-sans-clean text-xs leading-relaxed text-ink-muted font-light">
                Browse our collections and tap the heart icon to save objects to your private archive.
              </p>
            </div>
            
            {/* Action */}
            <a 
              href="#catalog"
              className="inline-flex items-center gap-2 rounded-full bg-ink-dark border border-ink-dark px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-cream-light hover:bg-transparent hover:text-ink-dark transition-all duration-300"
            >
              Discover Catalog
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlist.map((product) => {
              const isInCart = cartItems.some(item => item.id === product.id)
              
              return (
                <div
                  key={product.id}
                  className="group relative bg-cream-light border border-cream-dark/30 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-cream-dark transition-all duration-300 flex flex-col justify-between"
                >
                  {/* Remove Button (X) */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onToggleWishlist(product)
                    }}
                    className="absolute top-8 right-8 z-10 p-1.5 bg-cream-light/90 hover:bg-cream-light border border-cream-dark/30 text-ink-muted hover:text-ink-dark rounded-full transition-colors"
                    title="Remove from wishlist"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>

                  <div onClick={() => onProductClick(product)} className="cursor-pointer">
                    {/* Image */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-cream-base mb-6 border border-cream-dark/20">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      
                      {/* Color Palette Indicators */}
                      <div className="absolute top-4 left-4 flex flex-col space-y-1.5">
                        {product.colors.map((color, i) => (
                          <div 
                            key={i} 
                            className="h-3 w-3 rounded-full border border-cream-light shadow-sm"
                            style={{ backgroundColor: color.hex }}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="space-y-1.5 mb-6">
                      <span className="text-[9px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted">
                        {product.categoryLabel}
                      </span>
                      <h3 className="font-serif-elegant text-xl md:text-2xl font-light text-ink-dark tracking-tight leading-tight">
                        {product.name}
                      </h3>
                      <span className="block font-sans-clean text-sm font-semibold text-ink-dark">
                        {product.priceFormatted}
                      </span>
                    </div>
                  </div>

                  {/* Actions Row */}
                  <div className="pt-4 border-t border-cream-dark/30 flex gap-3">
                    <button
                      onClick={() => onProductClick(product)}
                      className="flex-1 rounded-full border border-cream-dark/60 py-2.5 text-[10px] font-bold tracking-widest uppercase text-ink-dark hover:bg-cream-base transition-colors"
                    >
                      Details
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      disabled={isInCart}
                      className={`flex-grow-2 flex items-center justify-center gap-2 rounded-full border py-2.5 text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                        isInCart
                          ? "bg-transparent border-cream-dark text-ink-muted cursor-default"
                          : "bg-ink-dark border-ink-dark text-cream-light hover:bg-transparent hover:text-ink-dark"
                      }`}
                    >
                      <ShoppingBag className="h-3.5 w-3.5" />
                      <span>{isInCart ? "Added" : "Add to Bag"}</span>
                    </button>
                  </div>

                </div>
              )
            })}
          </div>
        )}

      </div>
    </motion.div>
  )
}
