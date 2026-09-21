import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Count from 00 to 100 in 1.8s
    const duration = 1800
    const stepTime = Math.abs(Math.floor(duration / 100))
    
    const timer = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          // Hold at 100 for 400ms then animate exit
          setTimeout(() => {
            setIsVisible(false)
            setTimeout(() => {
              onComplete()
            }, 600) // matches exit animation duration
          }, 400)
          return 100
        }
        return prev + 1
      })
    }, stepTime)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{ y: "-100svh" }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-cream-light z-50 flex flex-col justify-between p-8 sm:p-16 text-left"
        >
          
          {/* Header */}
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-sans-clean font-bold tracking-[0.25em] uppercase text-ink-dark block">
                KROMA
              </span>
              <span className="block text-[8px] font-sans-clean tracking-[0.4em] uppercase text-ink-muted -mt-0.5">
                Studio
              </span>
            </div>
            <span className="text-[8px] font-sans-clean tracking-[0.3em] uppercase text-ink-muted font-semibold mt-1">
              EST. 2026 / STUDY
            </span>
          </div>

          {/* Center Brand Statement */}
          <div className="max-w-xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h2 className="font-serif-elegant text-3xl sm:text-5xl font-light text-ink-dark tracking-tight leading-tight">
                An Archive of <br />
                <span className="italic font-normal text-ink-muted">The Unrepeatable Object</span>
              </h2>
              <p className="font-sans-clean text-xs leading-relaxed text-ink-muted font-light max-w-sm tracking-wide">
                Bridging digital color refraction with hand-blown glass, stoneware clay, and French silk coordinate weaving.
              </p>
            </motion.div>
          </div>

          {/* Bottom Count indicator */}
          <div className="flex justify-between items-end border-t border-cream-dark/50 pt-8">
            <div className="text-[9px] font-sans-clean font-bold tracking-[0.2em] uppercase text-ink-muted">
              INITIALIZING INTERFACES
            </div>
            
            {/* Display formatted count */}
            <div className="font-sans-clean text-5xl sm:text-7xl font-light tracking-tighter text-ink-dark flex items-baseline">
              <span>{count < 10 ? `0${count}` : count}</span>
              <span className="text-sm text-ink-muted font-normal ml-1">%</span>
            </div>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  )
}
