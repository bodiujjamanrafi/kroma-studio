import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import { PRODUCTS } from './data/products'
import ProductModal from './components/ProductModal'
import CartDrawer from './components/CartDrawer'
import CheckoutModal from './components/CheckoutModal'
import InteractiveBackdrop from './components/InteractiveBackdrop'
import Preloader from './components/Preloader'
import Manifesto from './components/Manifesto'
import Journal from './components/Journal'
import Wishlist from './components/Wishlist'
import CollectorReviews from './components/CollectorReviews'
import InteriorLookbook from './components/InteriorLookbook'
import ScaleFittingGuide from './components/ScaleFittingGuide'
import CraftLab from './components/CraftLab'
import ExhibitionsTimeline from './components/ExhibitionsTimeline'
import BespokeConciergeModal from './components/BespokeConciergeModal'
import { motion, AnimatePresence } from 'framer-motion'
import { ShieldCheck, RefreshCw, Truck, ChevronDown, Check, ArrowRight, UserCheck, Flame, Cpu, Calendar } from 'lucide-react'

// Home FAQ definitions
const FAQS = [
  {
    q: "Do you ship your glass and ceramics globally?",
    a: "Yes. KROMA ships globally. All sculptures and ceramics are double-crated in foam-fitted wooden cases. Every shipment is fully insured for its full retail value against breakage."
  },
  {
    q: "Can I request a custom glaze or coordinate textile?",
    a: "We accept private commissions for custom glaze flows and dimensions. Contact our Seville or Kyoto studio coordinators through our private viewings desk."
  },
  {
    q: "What is your Return Policy for space fitting?",
    a: "We offer a 14-day return period. If a glass sculpture or silk tapestry does not coordinate perfectly with your interior lighting or dimensions, we will arrange for a courier return."
  },
  {
    q: "How are individual editions authenticated?",
    a: "Each object is stamped with an archival serial number and arrives with a physical provenance passport bearing a hand-embossed brass wax seal signed by the master artisan."
  },
  {
    q: "Can I schedule a private viewing at your Kyoto, Seville, or Lyon ateliers?",
    a: "Yes. We host private architectural viewings and material consultations by appointment. Use our Private Viewing Concierge desk in the navigation bar to request dates."
  }
]

// Artisans data
const ARTISANS = [
  {
    name: "Kenji Tanaka",
    role: "Master Glassblower",
    location: "Kyoto, Japan",
    avatarIcon: UserCheck,
    tag: "GLASS ART",
    desc: "A third-generation flame-worker, Kenji combines double-wall borosilicate formations with delicate internal mineral vapor chambers.",
    items: ["Liquid Glass Droplets", "Prismatic Wave Bowl"]
  },
  {
    name: "Mateo Silva",
    role: "Stoneware Artisan",
    location: "Seville, Spain",
    avatarIcon: Flame,
    tag: "CERAMICS",
    desc: "Mateo specializes in high-temperature chemical reactions, blending cobalt oxides and reactive amber slips that melt organically.",
    items: ["Magma Ceramic Vessel", "Nebula Reactive Platter"]
  },
  {
    name: "Adèle Martin",
    role: "Jacquard Director",
    location: "Lyon, France",
    avatarIcon: Cpu,
    tag: "TEXTILES",
    desc: "Adèle maps vector wave paths onto Lyon loom coordinates, interlacing mulberry silk to project glowing halftone matrices.",
    items: ["Halftone Wave Tapestry", "Solar Flare Wool Throw"]
  }
]

function App() {
  const [showPreloader, setShowPreloader] = useState(true)
  const [activePage, setActivePage] = useState('home')
  const [cartItems, setCartItems] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [isConciergeOpen, setIsConciergeOpen] = useState(false)
  
  // Wishlist state initialized from localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('kroma_wishlist')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Promo code states
  const [appliedPromo, setAppliedPromo] = useState("")
  const [discountApplied, setDiscountApplied] = useState(0)

  // FAQ Accordion State
  const [activeFaq, setActiveFaq] = useState(null)

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false)

  // Sync wishlist to localStorage whenever it changes
  const handleToggleWishlist = (product) => {
    setWishlist((prevWishlist) => {
      const exists = prevWishlist.some(item => item.id === product.id)
      let updated
      if (exists) {
        updated = prevWishlist.filter(item => item.id !== product.id)
      } else {
        updated = [...prevWishlist, product]
      }
      localStorage.setItem('kroma_wishlist', JSON.stringify(updated))
      return updated
    })
  }

  // Cart Operations
  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existing = prevItems.find((item) => item.id === product.id)
      if (existing) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prevItems, { ...product, quantity: 1 }]
    })
  }

  const handleUpdateCartQty = (id, quantity) => {
    if (quantity <= 0) {
      handleRemoveCartItem(id)
      return
    }
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    )
  }

  const handleRemoveCartItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const handleCheckoutClick = () => {
    setIsCartOpen(false)
    setIsCheckoutOpen(true)
  }

  const handleOrderComplete = () => {
    setCartItems([]) // Empty cart
    setAppliedPromo("") // Reset promo
    setDiscountApplied(0)
  }

  // Promo operations
  const handleApplyPromo = (code, rate) => {
    setAppliedPromo(code)
    setDiscountApplied(rate)
  }

  const handleNewsletterSubmit = (e) => {
    e.preventDefault()
    if (!newsletterEmail) return
    setNewsletterSubmitted(true)
    setNewsletterEmail('')
  }

  const handleSelectProductById = (prodId) => {
    const prod = PRODUCTS.find(p => p.id === prodId)
    if (prod) {
      setSelectedProduct(prod)
    }
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const isProductInCart = selectedProduct 
    ? cartItems.some(item => item.id === selectedProduct.id) 
    : false

  const handleExploreClick = () => {
    setActivePage('shop')
    setTimeout(() => {
      const el = document.getElementById('catalog')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 100)
  }

  return (
    <div className="min-h-screen bg-transparent font-sans-clean antialiased selection:bg-cream-dark selection:text-ink-dark flex flex-col relative">
      
      {/* Luxury Preloader Screen */}
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      {/* Dynamic 3D-fluid Background Canvas */}
      <InteractiveBackdrop />

      {/* Top Banner */}
      <div className="bg-ink-dark text-cream-light py-2.5 px-4 text-center text-[9px] sm:text-[10px] font-bold tracking-[0.2em] uppercase border-b border-cream-dark/20 relative z-30 flex items-center justify-center gap-2 sm:gap-4 flex-wrap">
        <span>COMPLIMENTARY CRATING SERVICES FOR GLOBAL ARCHIVES</span>
        <span className="text-gold-base hidden sm:inline">•</span>
        <span>CODE: KROMA10 FOR 10% OFF</span>
        <span className="text-gold-base hidden md:inline">•</span>
        <button
          onClick={() => setIsConciergeOpen(true)}
          className="underline decoration-gold-dark hover:text-gold-base transition-colors cursor-pointer hidden md:inline"
        >
          PRIVATE ATELIER VIEWINGS
        </button>
      </div>

      {/* Navigation */}
      <Navbar 
        activePage={activePage}
        setActivePage={setActivePage}
        cartCount={totalCartCount} 
        wishlistCount={wishlist.length}
        onCartClick={() => setIsCartOpen(true)} 
        onOpenConcierge={() => setIsConciergeOpen(true)}
      />

      {/* Page Routing Switcher */}
      <main className="flex-grow relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {activePage === 'home' && (
              <>
                {/* Hero Slideshow Banner */}
                <Hero onExploreClick={handleExploreClick} />

                {/* Core Values banner */}
                <section className="bg-cream-base/50 backdrop-blur-xs py-10 sm:py-14 border-y border-cream-dark/40">
                  <div className="mx-auto max-w-7xl px-4 sm:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
                      <div className="flex gap-4 items-start bg-cream-light/40 border border-cream-dark/30 rounded-xl p-5 shadow-xs hover:border-gold-base/30 transition-colors">
                        <Truck className="h-5 w-5 text-gold-dark mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-serif-elegant text-lg font-medium text-ink-dark">Insured Shipping</h4>
                          <p className="text-xs font-light text-ink-muted leading-relaxed mt-1">Custom double-crate packaging with full value transit insurance globally.</p>
                        </div>
                      </div>
                      
                      <div className="flex gap-4 items-start bg-cream-light/40 border border-cream-dark/30 rounded-xl p-5 shadow-xs hover:border-gold-base/30 transition-colors">
                        <ShieldCheck className="h-5 w-5 text-gold-dark mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-serif-elegant text-lg font-medium text-ink-dark">Authenticity Guaranteed</h4>
                          <p className="text-xs font-light text-ink-muted leading-relaxed mt-1">Each object features a unique serial stamp and a hand-signed physical certificate.</p>
                        </div>
                      </div>

                      <div className="flex gap-4 items-start bg-cream-light/40 border border-cream-dark/30 rounded-xl p-5 shadow-xs hover:border-gold-base/30 transition-colors">
                        <RefreshCw className="h-5 w-5 text-gold-dark mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-serif-elegant text-lg font-medium text-ink-dark">Space fitting trials</h4>
                          <p className="text-xs font-light text-ink-muted leading-relaxed mt-1">If the object doesn't sit perfectly in your interior, return it within 14 days.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Story Preview Column */}
                <section className="py-16 sm:py-24 bg-transparent text-left">
                  <div className="mx-auto max-w-7xl px-4 sm:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                      
                      {/* Left: Editorial Image */}
                      <div className="lg:col-span-5 aspect-[4/5] rounded-2xl overflow-hidden bg-cream-base border border-cream-dark/30 shadow-lg relative max-w-md mx-auto lg:max-w-none">
                        <img 
                          src="/magma_vessel.jpg" 
                          alt="Glazing kiln setup"
                          className="w-full h-full object-cover object-center"
                        />
                      </div>

                      {/* Right: Narrative content */}
                      <div className="lg:col-span-7 space-y-6">
                        <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted block">
                          OUR PHILOSOPHY
                        </span>
                        
                        <h3 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark tracking-tight leading-[1.15]">
                          Bridging Digital Fluidity & <br />
                          <span className="italic font-normal text-ink-muted">Tactile Fine Craftsmanship</span>
                        </h3>

                        <p className="font-sans-clean text-xs sm:text-sm leading-relaxed text-ink-muted font-light">
                          KROMA was founded to explore the boundary between abstract, fluid visual forms and physical materials. We take inspiration from dynamic color gradients, organic flows, and structural waves — concepts usually locked behind screens — and materialize them through the skilled hands of artisan glassmakers, potters, and silk weavers.
                        </p>

                        <div className="flex flex-wrap gap-4 pt-2">
                          <button 
                            onClick={() => setActivePage('manifesto')}
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-ink-dark hover:text-gold-dark transition-colors duration-200 cursor-pointer"
                          >
                            Read Manifesto <ArrowRight className="h-4 w-4" />
                          </button>
                          <span className="text-cream-dark">•</span>
                          <button 
                            onClick={() => setIsConciergeOpen(true)}
                            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gold-dark hover:text-ink-dark transition-colors duration-200 cursor-pointer"
                          >
                            Request Bespoke Glaze <Calendar className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </section>

                {/* In Situ Architectural Lookbook & Light Simulator */}
                <InteriorLookbook onSelectProduct={handleSelectProductById} />

                {/* Scale & Space Fitting Guide */}
                <ScaleFittingGuide onSelectProduct={handleSelectProductById} />

                {/* Artisans Spotlight Section */}
                <section className="py-16 sm:py-24 border-t border-cream-dark/40 bg-cream-base/10 text-left">
                  <div className="mx-auto max-w-7xl px-4 sm:px-8 space-y-12">
                    
                    {/* Header */}
                    <div className="text-center sm:text-left space-y-3">
                      <span className="text-[10px] font-sans-clean font-bold tracking-[0.3em] uppercase text-ink-muted block">
                        THE PEOPLE BEHIND KROMA
                      </span>
                      <h3 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark">
                        Artisans Spotlight
                      </h3>
                      <p className="max-w-md font-sans-clean text-xs sm:text-sm leading-relaxed text-ink-muted font-light sm:mx-0">
                        Bridging geographic borders, KROMA collaborates with top creators globally to sculpt, cast, and loom limited-edition artifacts.
                      </p>
                    </div>

                    {/* Spotlight Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      {ARTISANS.map((art, idx) => {
                        const Icon = art.avatarIcon
                        return (
                          <div 
                            key={idx}
                            className="bg-cream-light border border-cream-dark/30 hover:border-cream-dark rounded-2xl p-6 space-y-6 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                          >
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div className="h-10 w-10 rounded-full bg-cream-base flex items-center justify-center border border-cream-dark/30 text-gold-dark">
                                  <Icon className="h-5 w-5" />
                                </div>
                                <span className="text-[8px] font-sans-clean font-bold tracking-widest uppercase text-ink-muted border border-cream-dark/30 px-2 py-0.5 rounded">
                                  {art.tag}
                                </span>
                              </div>
                              
                              <div className="space-y-1">
                                <h4 className="font-serif-elegant text-xl font-medium text-ink-dark">{art.name}</h4>
                                <span className="text-[10px] font-sans-clean tracking-wider uppercase text-ink-muted block">{art.role} — {art.location}</span>
                              </div>

                              <p className="text-xs font-light text-ink-muted leading-relaxed font-sans-clean">
                                {art.desc}
                              </p>
                            </div>

                            {/* Works crafted */}
                            <div className="pt-4 border-t border-cream-dark/30 space-y-2">
                              <span className="text-[8px] font-bold tracking-wider uppercase text-ink-muted block">CRAFTED DESIGNS:</span>
                              <div className="flex flex-col gap-1.5 text-xs text-ink-dark font-medium">
                                {art.items.map((item, i) => (
                                  <div key={i} className="flex items-center gap-1.5 hover:text-gold-dark transition-colors cursor-pointer" onClick={() => setActivePage('shop')}>
                                    <span className="h-1 w-1 bg-gold-dark rounded-full" />
                                    <span>{item}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </section>

                {/* Craft Laboratory & Material Chemistry */}
                <CraftLab />

                {/* Collector Voices & Press Accolades */}
                <CollectorReviews onExploreCatalog={handleExploreClick} />

                {/* Institutional Provenance & Exhibitions Timeline */}
                <ExhibitionsTimeline />

                {/* FAQ Interactive Section */}
                <section className="py-16 sm:py-24 border-t border-cream-dark/40 bg-transparent">
                  <div className="mx-auto max-w-3xl px-4">
                    <div className="text-center space-y-4 mb-12">
                      <span className="text-[10px] font-sans-clean font-bold tracking-[0.25em] uppercase text-ink-muted">
                        COMMON ANSWERS
                      </span>
                      <h3 className="font-serif-elegant text-3xl sm:text-4xl font-light text-ink-dark">
                        Studio FAQ
                      </h3>
                      <p className="text-xs text-ink-muted font-light">
                        Clear guidance on crating, insurance, provenance seals, and space trials.
                      </p>
                    </div>

                    <div className="divide-y divide-cream-dark/40 text-left border-y border-cream-dark/40">
                      {FAQS.map((faq, i) => (
                        <div key={i} className="py-4">
                          <button
                            onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                            className="w-full flex justify-between items-center text-sm font-semibold text-ink-dark focus:outline-none py-2 text-left cursor-pointer"
                          >
                            <span>{faq.q}</span>
                            <ChevronDown className={`h-4 w-4 text-ink-muted transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-ink-dark' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {activeFaq === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <p className="text-xs font-light text-ink-muted leading-relaxed pb-4 pt-2">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Private Atelier Booking Bottom Banner */}
                <section className="py-12 sm:py-16 border-t border-cream-dark/40 bg-cream-base/30">
                  <div className="mx-auto max-w-7xl px-4 sm:px-8">
                    <div className="bg-gradient-to-r from-ink-dark to-[#282522] text-cream-light rounded-3xl p-8 sm:p-14 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 shadow-xl">
                      <div className="space-y-3 max-w-xl text-left">
                        <span className="text-[9px] font-bold tracking-[0.3em] uppercase text-gold-base block">
                          PRIVATE CLIENTS & ARCHITECTS
                        </span>
                        <h3 className="font-serif-elegant text-2xl sm:text-4xl font-light leading-tight">
                          Commission a Custom Glaze or Book a Private Atelier Viewing
                        </h3>
                        <p className="text-xs font-light text-cream-dark/80 leading-relaxed">
                          Speak with our Kyoto, Seville, and Lyon coordinators. We accommodate architectural dimensions, bespoke glaze recipes, and in-person private salon appointments.
                        </p>
                      </div>

                      <button
                        onClick={() => setIsConciergeOpen(true)}
                        className="rounded-full bg-cream-light text-ink-dark px-8 py-3.5 text-xs font-bold tracking-widest uppercase hover:bg-gold-base hover:text-cream-light transition-all duration-300 shadow-md cursor-pointer flex-shrink-0 flex items-center gap-2"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Reserve Studio Consultation</span>
                      </button>
                    </div>
                  </div>
                </section>
              </>
            )}

            {activePage === 'shop' && (
              <ProductGrid 
                onProductClick={(prod) => setSelectedProduct(prod)} 
                wishlist={wishlist}
                onToggleWishlist={handleToggleWishlist}
              />
            )}

            {activePage === 'interiors' && (
              <div className="pt-6">
                <InteriorLookbook onSelectProduct={handleSelectProductById} />
                <ScaleFittingGuide onSelectProduct={handleSelectProductById} />
              </div>
            )}

            {activePage === 'craft' && (
              <div className="pt-6">
                <CraftLab />
                <ExhibitionsTimeline />
              </div>
            )}

            {activePage === 'reviews' && (
              <div className="pt-6">
                <CollectorReviews onExploreCatalog={handleExploreClick} />
              </div>
            )}

            {activePage === 'manifesto' && <Manifesto />}

            {activePage === 'journal' && <Journal />}

            {activePage === 'wishlist' && (
              <Wishlist 
                wishlist={wishlist}
                onProductClick={(prod) => setSelectedProduct(prod)}
                onToggleWishlist={handleToggleWishlist}
                onAddToCart={handleAddToCart}
                cartItems={cartItems}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="bg-cream-base/90 backdrop-blur-xs border-t border-cream-dark/50 py-16 text-left relative z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          
          {/* Col 1: About / Logo */}
          <div className="space-y-4 md:col-span-1">
            <span className="font-serif-elegant text-xl font-bold tracking-[0.2em] text-ink-dark block">
              KROMA
            </span>
            <p className="text-xs font-light text-ink-muted leading-relaxed max-w-xs">
              A studio gallery creating limited-edition tactile objects inspired by digital fluid color studies.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setIsConciergeOpen(true)}
                className="text-[10px] font-bold tracking-widest uppercase text-gold-dark hover:text-ink-dark transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calendar className="h-3 w-3" />
                <span>Private Consultation Desk</span>
              </button>
            </div>
          </div>

          {/* Grouped Explore & Service Links */}
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            {/* Col 2: Navigation Links */}
            <div>
              <h5 className="text-[10px] font-sans-clean font-bold tracking-widest uppercase text-ink-dark mb-4">
                Explore
              </h5>
              <ul className="space-y-2 text-xs font-light text-ink-muted">
                <li><button onClick={() => { setActivePage('shop'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-ink-dark transition-colors cursor-pointer text-left">Catalog Archive</button></li>
                <li><button onClick={() => { setActivePage('interiors'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-ink-dark transition-colors cursor-pointer text-left">Curated Spaces</button></li>
                <li><button onClick={() => { setActivePage('craft'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-ink-dark transition-colors cursor-pointer text-left">The Craft Lab</button></li>
                <li><button onClick={() => { setActivePage('reviews'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-ink-dark transition-colors cursor-pointer text-left">Collector Reviews</button></li>
                <li><button onClick={() => { setActivePage('manifesto'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-ink-dark transition-colors cursor-pointer text-left">Artisans Manifesto</button></li>
                <li><button onClick={() => { setActivePage('journal'); window.scrollTo({ top: 0, behavior: 'smooth' }) }} className="hover:text-ink-dark transition-colors cursor-pointer text-left">Journal Studies</button></li>
              </ul>
            </div>

            {/* Col 3: Customer Care */}
            <div>
              <h5 className="text-[10px] font-sans-clean font-bold tracking-widest uppercase text-ink-dark mb-4">
                Service & Assurance
              </h5>
              <ul className="space-y-2 text-xs font-light text-ink-muted">
                <li><button onClick={() => setIsConciergeOpen(true)} className="hover:text-ink-dark transition-colors cursor-pointer text-left">Private Commissions</button></li>
                <li><button onClick={() => setIsConciergeOpen(true)} className="hover:text-ink-dark transition-colors cursor-pointer text-left">Studio Viewings (Kyoto/Seville)</button></li>
                <li><a href="#shipping" className="hover:text-ink-dark transition-colors">Climate Crating Specs</a></li>
                <li><a href="#returns" className="hover:text-ink-dark transition-colors">14-Day In-Situ Fitting</a></li>
                <li><a href="#certificate" className="hover:text-ink-dark transition-colors">Provenance Passports</a></li>
              </ul>
            </div>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-4">
            <h5 className="text-[10px] font-sans-clean font-bold tracking-widest uppercase text-ink-dark">
              Collectors Circle
            </h5>
            <p className="text-xs font-light text-ink-muted leading-relaxed">
              Register to receive notices of private viewings, kiln opening announcements, and limited object drops.
            </p>
            
            <AnimatePresence mode="wait">
              {!newsletterSubmitted ? (
                <motion.form 
                  key="form"
                  onSubmit={handleNewsletterSubmit} 
                  className="flex items-center border-b border-ink-dark pb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <input 
                    type="email" 
                    placeholder="Email Address" 
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="bg-transparent border-none text-xs focus:outline-none w-full placeholder-ink-muted/50 py-1 text-ink-dark"
                    required
                  />
                  <button type="submit" className="p-1 hover:opacity-70 transition-opacity cursor-pointer">
                    <ArrowRight className="h-3.5 w-3.5 text-ink-dark" />
                  </button>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  className="flex items-center space-x-2 text-emerald-700 text-xs font-semibold"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <Check className="h-4 w-4 bg-emerald-100 p-0.5 rounded-full text-emerald-800" />
                  <span>Subscribed to Collectors Circle.</span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Bottom copyright banner */}
        <div className="mx-auto max-w-7xl px-4 sm:px-8 mt-16 pt-8 border-t border-cream-dark/30 flex flex-col sm:flex-row justify-between items-center text-[10px] font-light text-ink-muted gap-4">
          <span>&copy; {new Date().getFullYear()} KROMA Studio. All rights reserved. Handcrafted in Kyoto, Seville, and Lyon.</span>
          <div className="flex space-x-6">
            <a href="#privacy" className="hover:text-ink-dark transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-ink-dark transition-colors">Terms of Purchase & Provenance</a>
          </div>
        </div>
      </footer>

      {/* Cart Drawer Overlay */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckoutClick={handleCheckoutClick}
        appliedPromo={appliedPromo}
        discountApplied={discountApplied}
        onApplyPromo={handleApplyPromo}
      />

      {/* Product Details Modal Overlay */}
      <ProductModal 
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isInCart={isProductInCart}
      />

      {/* Checkout Process Overlay */}
      <CheckoutModal 
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        discountApplied={discountApplied}
        onOrderComplete={handleOrderComplete}
      />

      {/* Bespoke Commission & Concierge Appointment Modal */}
      <BespokeConciergeModal
        isOpen={isConciergeOpen}
        onClose={() => setIsConciergeOpen(false)}
      />

    </div>
  )
}

export default App
