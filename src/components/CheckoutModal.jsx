import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CreditCard, Lock, CheckCircle2, ArrowRight, ArrowLeft, ClipboardList } from 'lucide-react'

export default function CheckoutModal({ isOpen, onClose, cartItems, discountApplied = 0, onOrderComplete }) {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    address: '',
    city: '',
    card: '',
    expiry: '',
    cvc: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderNumber, setOrderNumber] = useState('')
  const [step, setStep] = useState(1) // Step 1: Review, Step 2: Forms

  // Reset step on modal close/open
  useEffect(() => {
    if (isOpen) {
      setStep(1)
      setIsSuccess(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const discountAmount = subtotal * discountApplied
  const finalTotal = subtotal - discountAmount

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {}
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required'
    if (formData.name.trim().length < 3) newErrors.name = 'Full name is required'
    if (formData.address.trim().length < 5) newErrors.address = 'Valid delivery address is required'
    if (formData.city.trim().length < 2) newErrors.city = 'City is required'
    if (formData.card.replace(/\s/g, '').length !== 16) newErrors.card = '16-digit card number is required'
    if (!formData.expiry.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/)) newErrors.expiry = 'MM/YY required'
    if (formData.cvc.length !== 3) newErrors.cvc = '3-digit CVC required'
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate premium payment processing
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      const num = 'KRM-' + Math.floor(100000 + Math.random() * 900000)
      setOrderNumber(num)
    }, 2500)
  }

  const handleSuccessClose = () => {
    onOrderComplete()
    onClose()
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-6 overflow-y-auto">
        
        {/* Backdrop overlay */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={isSuccess ? handleSuccessClose : onClose}
          className="fixed inset-0 bg-ink-dark/45 backdrop-blur-xs" 
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-cream-light border-t sm:border border-cream-dark/60 rounded-t-2xl sm:rounded-2xl overflow-y-auto shadow-2xl z-10 p-6 sm:p-8 max-h-[92vh] sm:max-h-none mt-auto sm:mt-0"
        >
          
          {/* Header & Close Button */}
          <div className="flex items-center justify-between pb-4 border-b border-cream-dark/35 mb-6">
            <div className="flex items-center space-x-2">
              <ClipboardList className="h-5 w-5 text-gold-dark" />
              <h3 className="font-serif-elegant text-xl sm:text-2xl text-ink-dark">
                {isSuccess ? "Order Receipt" : step === 1 ? "Review Acquisition" : "Acquisition Details"}
              </h3>
            </div>
            {!isSuccess && (
              <button 
                onClick={onClose}
                className="p-1.5 text-ink-muted hover:text-ink-dark rounded-full hover:bg-cream-base/50 transition-colors cursor-pointer"
                aria-label="Close checkout"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-center py-6 space-y-6 flex flex-col items-center"
              >
                <CheckCircle2 className="h-16 w-16 text-emerald-600 animate-bounce" />
                
                <div className="space-y-2">
                  <h4 className="font-serif-elegant text-3xl font-light text-ink-dark">Acquisition Confirmed</h4>
                  <p className="font-sans-clean text-xs tracking-wider uppercase text-ink-muted">
                    Order Reference: <strong className="text-ink-dark font-semibold">{orderNumber}</strong>
                  </p>
                </div>

                <div className="max-w-md bg-cream-base/50 border border-cream-dark/30 rounded-xl p-5 space-y-3.5 text-xs font-light text-ink-muted font-sans-clean leading-relaxed text-left">
                  <p>Thank you for acquiring these objects, <strong className="text-ink-dark font-medium">{formData.name}</strong>. A receipt and digital authentication certificates have been transmitted to <strong className="text-ink-dark font-medium">{formData.email}</strong>.</p>
                  <p>Our secure white-glove shipping courier will contact you within 24 hours to schedule a delivery window for your artifacts at <strong className="text-ink-dark font-medium">{formData.address}, {formData.city}</strong>.</p>
                </div>

                <button
                  onClick={handleSuccessClose}
                  className="rounded-full bg-ink-dark border border-ink-dark px-10 py-3.5 text-xs font-semibold tracking-widest uppercase text-cream-light hover:bg-transparent hover:text-ink-dark transition-all duration-300 cursor-pointer"
                >
                  Return to Studio
                </button>
              </motion.div>
            ) : step === 1 ? (
              // STEP 1: ORDER SUMMARY
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                {/* List items */}
                <div className="max-h-[30vh] overflow-y-auto space-y-4 pr-2">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-4 items-center bg-cream-base/20 border border-cream-dark/30 rounded-xl p-3">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="h-14 w-11 object-cover rounded bg-cream-base border border-cream-dark/30 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <span className="text-[7.5px] font-sans-clean font-bold tracking-wider uppercase text-ink-muted block">
                          {item.categoryLabel}
                        </span>
                        <h4 className="font-serif-elegant text-sm text-ink-dark font-medium truncate">
                          {item.name}
                        </h4>
                        <span className="text-[10px] text-ink-muted">Qty: {item.quantity}</span>
                      </div>
                      <span className="font-sans-clean text-xs font-semibold text-ink-dark flex-shrink-0">
                        ${(item.price * item.quantity).toLocaleString()}.00
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="bg-cream-base/40 border border-cream-dark/30 rounded-xl p-4 space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between font-sans-clean text-ink-muted font-light">
                    <span>Acquisition Subtotal</span>
                    <span>${subtotal.toLocaleString()}.00</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between font-sans-clean text-emerald-700 font-semibold">
                      <span>Promo Discount (10%)</span>
                      <span>-${discountAmount.toLocaleString()}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between font-sans-clean text-ink-muted font-light">
                    <span>White-Glove Insured Shipping</span>
                    <span className="text-emerald-600 font-medium">Complimentary</span>
                  </div>
                  <div className="flex justify-between font-sans-clean text-ink-dark font-semibold border-t border-cream-dark/30 pt-3 text-base">
                    <span>Total Due</span>
                    <span>${finalTotal.toLocaleString()}.00</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end pt-4 border-t border-cream-dark/35">
                  <button
                    onClick={() => setStep(2)}
                    className="group flex items-center justify-center gap-2.5 rounded-full bg-ink-dark border border-ink-dark px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-cream-light hover:bg-transparent hover:text-ink-dark transition-all duration-300 cursor-pointer"
                  >
                    <span>Proceed to Details</span>
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            ) : (
              // STEP 2: SHIPPING & PAYMENT FORM
              <motion.form 
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 text-left"
              >
                {/* Error Summary */}
                {Object.keys(errors).length > 0 && (
                  <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-3 rounded font-medium">
                    Please correct the errors in the highlighted fields.
                  </div>
                )}

                {/* Section: Shipping */}
                <div className="space-y-4">
                  <h4 className="text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted">
                    1. Shipping Information
                  </h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="e.g. user@domain.com"
                        className={`border rounded-lg bg-cream-base/40 p-3 text-sm focus:outline-none transition-colors ${errors.email ? 'border-red-500 bg-red-50/20' : 'border-cream-dark focus:border-ink-dark'}`}
                      />
                      {errors.email && <span className="text-[10px] text-red-600 font-semibold">{errors.email}</span>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g. Arthur Pendragon"
                        className={`border rounded-lg bg-cream-base/40 p-3 text-sm focus:outline-none transition-colors ${errors.name ? 'border-red-500 bg-red-50/20' : 'border-cream-dark focus:border-ink-dark'}`}
                      />
                      {errors.name && <span className="text-[10px] text-red-600 font-semibold">{errors.name}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 flex flex-col space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">Delivery Address</label>
                      <input 
                        type="text" 
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="e.g. 742 Evergreen Terrace"
                        className={`border rounded-lg bg-cream-base/40 p-3 text-sm focus:outline-none transition-colors ${errors.address ? 'border-red-500 bg-red-50/20' : 'border-cream-dark focus:border-ink-dark'}`}
                      />
                      {errors.address && <span className="text-[10px] text-red-600 font-semibold">{errors.address}</span>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">City</label>
                      <input 
                        type="text" 
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        placeholder="e.g. Springfield"
                        className={`border rounded-lg bg-cream-base/40 p-3 text-sm focus:outline-none transition-colors ${errors.city ? 'border-red-500 bg-red-50/20' : 'border-cream-dark focus:border-ink-dark'}`}
                      />
                      {errors.city && <span className="text-[10px] text-red-600 font-semibold">{errors.city}</span>}
                    </div>
                  </div>
                </div>

                {/* Section: Payment */}
                <div className="space-y-4 pt-4 border-t border-cream-dark/30">
                  <div className="flex justify-between items-center">
                    <h4 className="text-[10px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted">
                      2. Secure Payment
                    </h4>
                    <span className="flex items-center text-[9px] text-ink-muted gap-1 font-semibold">
                      <Lock className="h-3 w-3" /> SECURE SSL
                    </span>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="card"
                        maxLength="19"
                        value={formData.card.replace(/\s?/g, '').replace(/(\d{4})/g, '$1 ').trim()}
                        onChange={handleInputChange}
                        placeholder="0000 0000 0000 0000"
                        className={`border rounded-lg bg-cream-base/40 p-3 pl-10 text-sm focus:outline-none w-full transition-colors ${errors.card ? 'border-red-500 bg-red-50/20' : 'border-cream-dark focus:border-ink-dark'}`}
                      />
                      <CreditCard className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-ink-muted" />
                    </div>
                    {errors.card && <span className="text-[10px] text-red-600 font-semibold">{errors.card}</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">Expiry Date</label>
                      <input 
                        type="text" 
                        name="expiry"
                        maxLength="5"
                        value={formData.expiry}
                        onChange={handleInputChange}
                        placeholder="MM/YY"
                        className={`border rounded-lg bg-cream-base/40 p-3 text-sm focus:outline-none transition-colors ${errors.expiry ? 'border-red-500 bg-red-50/20' : 'border-cream-dark focus:border-ink-dark'}`}
                      />
                      {errors.expiry && <span className="text-[10px] text-red-600 font-semibold">{errors.expiry}</span>}
                    </div>

                    <div className="flex flex-col space-y-1.5">
                      <label className="text-[10px] font-bold tracking-wider uppercase text-ink-dark">CVC</label>
                      <input 
                        type="password" 
                        name="cvc"
                        maxLength="3"
                        value={formData.cvc}
                        onChange={handleInputChange}
                        placeholder="123"
                        className={`border rounded-lg bg-cream-base/40 p-3 text-sm focus:outline-none transition-colors ${errors.cvc ? 'border-red-500 bg-red-50/20' : 'border-cream-dark focus:border-ink-dark'}`}
                      />
                      {errors.cvc && <span className="text-[10px] text-red-600 font-semibold">{errors.cvc}</span>}
                    </div>
                  </div>
                </div>

                {/* Submit action */}
                <div className="pt-6 border-t border-cream-dark/30 flex items-center justify-between gap-6">
                  
                  {/* Back button */}
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-ink-muted hover:text-ink-dark transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back</span>
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 max-w-[240px] flex items-center justify-center gap-2.5 rounded-full bg-ink-dark border border-ink-dark px-8 py-3.5 text-xs font-semibold tracking-widest uppercase text-cream-light hover:bg-transparent hover:text-ink-dark transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-3 w-3 border-2 border-t-transparent border-cream-light rounded-full animate-spin" />
                        <span>Verifying...</span>
                      </span>
                    ) : (
                      <>
                        <span>Pay ${finalTotal.toLocaleString()}</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

        </motion.div>
      </div>
    </AnimatePresence>
  )
}
