import React, { useState } from 'react'
import { SlidersHorizontal, Search, Heart } from 'lucide-react'
import { PRODUCTS } from '../data/products'


export default function ProductGrid({ onProductClick, wishlist, onToggleWishlist }) {
  const [filter, setFilter] = useState("all")
  const [sortBy, setSortBy] = useState("featured")
  const [searchQuery, setSearchQuery] = useState("")

  // Filter products by category AND search query
  const filteredProducts = PRODUCTS.filter(prod => {
    const matchesCategory = filter === "all" ? true : prod.category === filter
    const matchesSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          prod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          prod.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price
    if (sortBy === "price-high") return b.price - a.price
    return 0 // default 'featured'
  })

  return (
    <section id="catalog" className="bg-cream-base/15 py-12 sm:py-24 border-t border-cream-dark/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-16">
          <div className="text-left">
            <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted">
              ARTISANAL ARCHIVE
            </span>
            <h2 className="font-serif-elegant text-3xl sm:text-5xl font-light tracking-tight text-ink-dark mt-2">
              The Design Objects
            </h2>
          </div>

          {/* Real-time search bar */}
          <div className="relative w-full max-w-xs border-b border-cream-dark focus-within:border-ink-dark transition-colors py-1 flex items-center">
            <Search className="h-4 w-4 text-ink-muted mr-2 flex-shrink-0" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search objects..."
              className="bg-transparent text-sm focus:outline-none placeholder-ink-muted/50 w-full text-ink-dark"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="text-xs text-ink-muted hover:text-ink-dark pr-1 cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter and sorting actions panel - Horizontally scrollable on mobile */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-cream-dark/30 pb-4 mb-8">
          
          {/* Scrollable Category pills */}
          <div className="flex items-center overflow-x-auto scrollbar-none space-x-2 w-full sm:w-auto -mx-4 px-4 sm:mx-0 sm:px-0 pb-3 sm:pb-0">
            <button 
              onClick={() => setFilter("all")} 
              className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer flex-shrink-0 ${
                filter === "all" 
                  ? "bg-ink-dark border-ink-dark text-cream-light" 
                  : "border-cream-dark/60 text-ink-muted hover:text-ink-dark"
              }`}
            >
              All
            </button>
            <button 
              onClick={() => setFilter("sculpture")} 
              className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer flex-shrink-0 ${
                filter === "sculpture" 
                  ? "bg-ink-dark border-ink-dark text-cream-light" 
                  : "border-cream-dark/60 text-ink-muted hover:text-ink-dark"
              }`}
            >
              Glass
            </button>
            <button 
              onClick={() => setFilter("ceramic")} 
              className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer flex-shrink-0 ${
                filter === "ceramic" 
                  ? "bg-ink-dark border-ink-dark text-cream-light" 
                  : "border-cream-dark/60 text-ink-muted hover:text-ink-dark"
              }`}
            >
              Ceramics
            </button>
            <button 
              onClick={() => setFilter("textile")} 
              className={`px-3 py-1.5 rounded-full border text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer flex-shrink-0 ${
                filter === "textile" 
                  ? "bg-ink-dark border-ink-dark text-cream-light" 
                  : "border-cream-dark/60 text-ink-muted hover:text-ink-dark"
              }`}
            >
              Textiles
            </button>
          </div>

          {/* Sorting */}
          <div className="flex items-center space-x-2 cursor-pointer pr-2 self-end sm:self-auto">
            <SlidersHorizontal className="h-3.5 w-3.5 text-ink-muted" />
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-ink-muted hover:text-ink-dark focus:outline-none cursor-pointer pr-4 font-semibold uppercase text-[10px]"
            >
              <option value="featured">Featured Order</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid - 2 columns on mobile */}
        {sortedProducts.length === 0 ? (
          <div className="py-20 text-center text-ink-muted space-y-3 font-sans-clean font-light text-sm bg-cream-light border border-cream-dark/30 rounded-xl max-w-lg mx-auto px-4">
            <p>No objects matched your criteria.</p>
            <button 
              onClick={() => { setFilter("all"); setSearchQuery(""); }}
              className="text-xs font-bold text-ink-dark underline uppercase tracking-wider block mx-auto hover:opacity-75 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 md:gap-8">
            {sortedProducts.map((product) => {
              const isFavorited = wishlist.some(item => item.id === product.id)

              return (
                <div
                  key={product.id}
                  onClick={() => onProductClick(product)}
                  className="group relative cursor-pointer text-left bg-cream-light border border-cream-dark/30 rounded-xl p-3 sm:p-5 shadow-sm hover:shadow-md hover:border-cream-dark transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Image Frame */}
                    <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-cream-base mb-3 sm:mb-6 border border-cream-dark/20 ring-1 ring-cream-dark/30">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-ink-dark/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      
                      {/* Wishlist toggle overlay */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation() // Prevent opening modal
                          onToggleWishlist(product)
                        }}
                        className="absolute top-2 right-2 sm:top-4 sm:right-4 p-1.5 sm:p-2 bg-cream-light/95 border border-cream-dark/40 rounded-full text-ink-muted hover:text-ink-dark transition-all hover:scale-105 z-10 cursor-pointer"
                        title={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors duration-200 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                      </button>

                      {/* Color Palette overlay */}
                      <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 flex space-x-1 bg-cream-light/90 border border-cream-dark/30 p-1 sm:p-1.5 rounded-full shadow-xs">
                        {product.colors.map((color, i) => (
                          <div 
                            key={i} 
                            className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full border border-cream-dark/30 shadow-inner"
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Metadata */}
                    <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-2">
                      <div className="space-y-1 sm:space-y-1.5 max-w-full">
                        <span className="text-[7.5px] sm:text-[9px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted">
                          {product.categoryLabel}
                        </span>
                        <h3 className="font-serif-elegant text-sm sm:text-base md:text-xl lg:text-2xl font-light text-ink-dark tracking-tight leading-tight group-hover:text-ink-muted transition-colors duration-200">
                          {product.name}
                        </h3>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <span className="font-sans-clean text-xs sm:text-sm font-semibold text-ink-dark">
                          {product.priceFormatted}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Footer view details bar */}
                  <div className="mt-4 sm:mt-6 pt-2 sm:pt-4 border-t border-cream-dark/30 flex justify-between items-center text-[8px] sm:text-[10px] font-bold tracking-widest uppercase text-ink-dark group-hover:text-gold-dark transition-colors">
                    <span>Acquire Object</span>
                    <span className="transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

      </div>
    </section>
  )
}
