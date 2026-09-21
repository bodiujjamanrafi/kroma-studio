import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Minus, Trash2, CreditCard, Tag } from 'lucide-react'

export default function CartDrawer({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQty, 
  onRemoveItem, 
  onCheckoutClick,
  appliedPromo,
  discountApplied,
  onApplyPromo
}) {
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')

  if (!isOpen) return null

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const discountAmount = subtotal * discountApplied
  const finalTotal = subtotal - discountAmount
  const isCartEmpty = cartItems.length === 0

  const handleApplyPromo = (e) => {
    e.preventDefault()
    if (promoInput.trim().toUpperCase() === "KROMA10") {
      onApplyPromo("KROMA10", 0.1)
      setPromoError('')
      setPromoInput('')
    } else {
      setPromoError('Invalid promo code. Try "KROMA10"')
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden">
        
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-ink-dark/30 backdrop-blur-xs"
        />

        {/* Drawer container - full width on mobile, max-w-md on desktop */}
        <div className="fixed inset-y-0 right-0 max-w-full flex z-50">
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", duration: 0.5, bounce: 0.02 }}
            className="w-screen sm:max-w-md bg-cream-light border-l border-cream-dark/65 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="h-20 border-b border-cream-dark/40 px-6 sm:px-8 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h3 className="font-serif-elegant text-xl tracking-tight text-ink-dark">Your Bag</h3>
                <span className="text-[10px] font-sans-clean font-bold bg-cream-dark/50 px-2 py-0.5 rounded text-ink-muted">
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)} Items
                </span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 text-ink-muted hover:text-ink-dark rounded-full hover:bg-cream-base/50 transition-colors cursor-pointer"
                aria-label="Close cart"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
              {isCartEmpty ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="h-12 w-12 rounded-full bg-cream-base flex items-center justify-center text-ink-muted">
                    <X className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-serif-elegant text-lg text-ink-dark">Your bag is empty</p>
                    <p className="font-sans-clean text-xs text-ink-muted mt-1 font-light">Explore our archive and select an object to begin.</p>
                  </div>
                  <button 
                    onClick={onClose}
                    className="font-sans-clean text-xs font-bold tracking-widest uppercase text-ink-dark underline underline-offset-4 hover:opacity-75 transition-opacity cursor-pointer"
                  >
                    Continue Browsing
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 pb-6 border-b border-cream-dark/30 items-start">
                    
                    {/* Item Thumbnail */}
                    <div className="h-20 w-16 overflow-hidden rounded bg-cream-base border border-cream-dark/30 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    {/* Item Details */}
                    <div className="flex-1 space-y-2 text-left">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[8px] font-sans-clean font-bold tracking-wider uppercase text-ink-muted">
                            {item.categoryLabel}
                          </span>
                          <h4 className="font-serif-elegant text-sm text-ink-dark font-medium leading-tight mt-0.5">
                            {item.name}
                          </h4>
                        </div>
                        <span className="font-sans-clean text-xs font-semibold text-ink-dark">
                          ${(item.price * item.quantity).toLocaleString()}.00
                        </span>
                      </div>

                      {/* Quantity Controls & Remove */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-1 border border-cream-dark/50 rounded bg-cream-base/50 p-1">
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                            className="p-1 hover:text-ink-dark text-ink-muted transition-colors cursor-pointer"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-semibold px-2 text-ink-dark min-w-[12px] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                            className="p-1 hover:text-ink-dark text-ink-muted transition-colors cursor-pointer"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="flex items-center space-x-1 text-ink-muted hover:text-ink-dark transition-colors text-[10px] font-bold tracking-wider uppercase cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Checkout Area */}
            {!isCartEmpty && (
              <div className="border-t border-cream-dark/40 bg-cream-base/40 p-6 sm:p-8 space-y-6">
                
                {/* Promo Code Form */}
                <div className="border-b border-cream-dark/30 pb-4">
                  {appliedPromo ? (
                    <div className="flex justify-between items-center text-xs font-semibold bg-emerald-50 border border-emerald-200 text-emerald-800 p-2.5 rounded-lg">
                      <span className="flex items-center gap-1.5"><Tag className="h-3.5 w-3.5" /> CODE: {appliedPromo} Applied</span>
                      <span className="text-emerald-700 font-medium">-10%</span>
                    </div>
                  ) : (
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-1">
                        <input 
                          type="text" 
                          placeholder="Promo Code (KROMA10)"
                          value={promoInput}
                          onChange={(e) => setPromoInput(e.target.value)}
                          className="w-full border border-cream-dark bg-cream-light p-2.5 pl-9 text-xs rounded-lg focus:outline-none focus:border-ink-dark"
                        />
                        <Tag className="absolute left-3 top-3.5 h-3.5 w-3.5 text-ink-muted" />
                      </div>
                      <button 
                        type="submit"
                        className="rounded-lg bg-ink-dark px-4 py-2.5 text-xs font-semibold tracking-wider text-cream-light hover:opacity-90 transition-opacity cursor-pointer"
                      >
                        Apply
                      </button>
                    </form>
                  )}
                  {promoError && <p className="text-[10px] text-red-600 font-semibold mt-1 text-left">{promoError}</p>}
                </div>

                {/* Pricing Summary */}
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between font-sans-clean text-ink-muted font-light">
                    <span>Subtotal</span>
                    <span>${subtotal.toLocaleString()}.00</span>
                  </div>
                  
                  {discountAmount > 0 && (
                    <div className="flex justify-between font-sans-clean text-emerald-700 font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>-${discountAmount.toLocaleString()}.00</span>
                    </div>
                  )}

                  <div className="flex justify-between font-sans-clean text-ink-muted font-light">
                    <span>Insured Shipping</span>
                    <span className="text-emerald-600 font-medium">Complimentary</span>
                  </div>
                  
                  <div className="flex justify-between font-sans-clean text-ink-dark font-semibold border-t border-cream-dark/30 pt-3 text-base">
                    <span>Total</span>
                    <span>${finalTotal.toLocaleString()}.00</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={onCheckoutClick}
                  className="w-full flex items-center justify-center gap-3 rounded-full border border-ink-dark bg-ink-dark py-4 text-xs font-semibold tracking-widest uppercase text-cream-light hover:bg-transparent hover:text-ink-dark transition-all duration-300 cursor-pointer"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Secure Checkout</span>
                </button>
                
                <p className="text-[9px] font-sans-clean text-ink-muted font-light text-center leading-relaxed">
                  Payments are encrypted securely. We accept Visa, Mastercard, AMEX, and crypto transfers.
                </p>
              </div>
            )}

          </motion.div>
        </div>

      </div>
    </AnimatePresence>
  )
}
