import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Menu, X, Heart, Calendar } from 'lucide-react'

export default function Navbar({ activePage, setActivePage, cartCount, wishlistCount, onCartClick, onOpenConcierge }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'shop', label: 'Catalog' },
    { id: 'interiors', label: 'Spaces' },
    { id: 'craft', label: 'Craft Lab' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'manifesto', label: 'Manifesto' },
    { id: 'journal', label: 'Journal' }
  ]

  const handleLinkClick = (pageId) => {
    setActivePage(pageId)
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-cream-dark/40 bg-cream-light/90 backdrop-blur-md transition-colors duration-300">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8">
        
        {/* Mobile menu trigger */}
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-ink-dark p-2 hover:opacity-75 transition-opacity cursor-pointer z-50 flex-shrink-0"
          aria-label="Toggle mobile menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Brand Logo - Left-aligned on desktop, Centered on mobile */}
        <div className="flex items-center flex-shrink-0">
          <button 
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer block group text-center lg:text-left"
          >
            <span className="font-serif-elegant text-xl sm:text-2xl font-bold tracking-[0.25em] text-ink-dark group-hover:opacity-85 transition-opacity block">
              KROMA
            </span>
            <span className="block text-[7.5px] sm:text-[8px] font-sans-clean tracking-[0.4em] uppercase text-ink-muted -mt-0.5 ml-0.5">
              Studio
            </span>
          </button>
        </div>

        {/* Center: Navigation links on desktop */}
        <nav className="hidden lg:flex items-center space-x-4 xl:space-x-7 text-[10.5px] xl:text-[11px] font-semibold tracking-[0.16em] xl:tracking-[0.2em] uppercase text-ink-muted px-4">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className={`relative py-2 transition-colors duration-200 uppercase cursor-pointer hover:text-ink-dark whitespace-nowrap ${
                activePage === link.id ? "text-ink-dark font-bold" : "text-ink-muted"
              }`}
            >
              {link.label}
              {activePage === link.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-1 bg-gold-dark rounded-full" />
              )}
            </button>
          ))}
        </nav>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2.5 sm:space-x-4 flex-shrink-0">
          {/* Private Atelier Booking Pill (Desktop) */}
          <button
            onClick={onOpenConcierge}
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-cream-base border border-cream-dark hover:border-gold-dark/50 px-3.5 py-1.5 text-[9px] font-bold tracking-widest uppercase text-ink-dark hover:bg-cream-dark/40 transition-all cursor-pointer shadow-2xs"
          >
            <Calendar className="h-3 w-3 text-gold-dark" />
            <span>Private Viewing</span>
          </button>

          {/* Wishlist Icon */}
          <button 
            onClick={() => handleLinkClick('wishlist')}
            className={`group relative flex items-center p-1.5 transition-colors duration-200 cursor-pointer ${
              activePage === 'wishlist' ? "text-ink-dark" : "text-ink-muted hover:text-ink-dark"
            }`} 
            aria-label="View Saved Objects"
          >
            <Heart className={`h-4.5 w-4.5 ${activePage === 'wishlist' ? 'fill-ink-dark text-ink-dark' : 'group-hover:fill-ink-dark/10'}`} />
            
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-base text-[9px] font-semibold text-cream-light">
                {wishlistCount}
              </span>
            )}
          </button>
          
          {/* Shopping Bag Icon */}
          <button 
            onClick={onCartClick}
            className="group relative flex items-center p-1.5 text-ink-muted hover:text-ink-dark transition-colors duration-200 cursor-pointer" 
            aria-label="Shopping bag"
          >
            <ShoppingBag className="h-4.5 w-4.5" />
            
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-ink-dark text-[9px] font-medium text-cream-light transition-all duration-300 group-hover:scale-110">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel with smooth overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-20 left-0 w-full border-b border-cream-dark/40 bg-cream-light/98 backdrop-blur-xl px-6 py-6 space-y-4 shadow-xl text-left z-40 lg:hidden"
          >
            <div className="flex flex-col space-y-3 text-xs font-semibold tracking-widest uppercase">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`py-2 text-left cursor-pointer transition-colors duration-200 border-b border-cream-dark/20 pb-2 ${
                    activePage === link.id ? "text-ink-dark font-bold border-gold-dark/40" : "text-ink-muted hover:text-ink-dark"
                  }`}
                >
                  {link.label}
                </button>
              ))}
              
              <button
                onClick={() => handleLinkClick('wishlist')}
                className={`py-2 text-left flex justify-between items-center cursor-pointer transition-colors duration-200 ${
                  activePage === 'wishlist' ? "text-ink-dark font-bold" : "text-ink-muted hover:text-ink-dark"
                }`}
              >
                <span>Saved Objects</span>
                <span className="bg-gold-base/20 text-gold-dark text-[9px] font-bold px-2 py-0.5 rounded">
                  {wishlistCount}
                </span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false)
                  onOpenConcierge()
                }}
                className="w-full mt-3 rounded-full bg-ink-dark text-cream-light py-3 text-center text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <Calendar className="h-3.5 w-3.5 text-gold-base" />
                <span>Reserve Private Atelier Viewing</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
