import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { fadeIn, scaleIn, staggerContainer } from '../utils/animations'

// Profile data
const PROFILE = {
  name: "Andy Choi",
  subtitle: "Multifamily Developer | Licensed General Contractor | Operator-First Investor",
  photoUrl: "https://assets.cdn.filesafe.space/3qtK4a2wJAvaHk77pbNQ/media/69ab26ccb003fab409f37bfd.jpg",
  shortBio: "I'm a Los Angeles–based real estate operator and developer since 2015 and have hands-on experience across acquisitions, underwriting, construction, and asset execution. My approach is operator-first and risk-controlled, delivering predictable outcomes through institutional-grade financial modeling and deep operational discipline.",
  fullBio: [
    "Since 2015, I've completed 98+ projects totaling $100MM+ in asset value.",
    "Licensed General Contractor (B-Class) with zero bond claims and AQMD certification.",
    "Managing Partner on three Rule 506(b) syndications.",
    "Expertise in ground-up development, value-add repositioning, and complex entitlements.",
    "Former manufacturing executive with deep cost control and execution discipline."
  ]
}

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false)
  const prefersReducedMotion = useReducedMotion()

  return (
    <motion.section 
      className="px-4 pt-8 pb-6 sm:px-8 sm:pt-10"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
        
        {/* Profile Photo */}
        <motion.div className="shrink-0" variants={scaleIn}>
          <img
            src={PROFILE.photoUrl}
            alt={`${PROFILE.name} - Real Estate Developer`}
            className="w-[120px] h-[120px] rounded-full object-cover border-[3px] border-slate-100"
            width={120}
            height={120}
            loading="eager"
            fetchPriority="high"
          />
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 text-center sm:text-left">
          <motion.h1 
            className="text-4xl sm:text-[3.5rem] leading-[1.1] font-bold text-[var(--color-primary)] font-heading mb-2 tracking-tight"
            variants={fadeIn}
          >
            {PROFILE.name}
          </motion.h1>
          <motion.h2 
            className="text-[var(--color-accent)] font-heading font-bold text-base sm:text-lg mb-4 leading-tight"
            variants={fadeIn}
          >
            {PROFILE.subtitle}
          </motion.h2>
          
          <motion.div
            className="text-sm text-slate-800 leading-relaxed font-body text-left"
            variants={fadeIn}
          >
            <p className="mb-2">{PROFILE.shortBio}</p>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  id="bio-expanded"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="list-disc pl-5 space-y-1 mt-2 mb-4 text-slate-600">
                    {PROFILE.fullBio.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center text-[var(--color-accent)] font-semibold hover:text-[var(--color-blue-alt)] transition-colors mt-1 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/50 rounded px-1 -ml-1 group"
              aria-expanded={isExpanded}
              aria-controls="bio-expanded"
            >
              {isExpanded ? (
                <>Read less <ChevronUp size={16} className="ml-1 group-hover:-translate-y-0.5 transition-transform" /></>
              ) : (
                <>Read more <ChevronDown size={16} className="ml-1 group-hover:translate-y-0.5 transition-transform" /></>
              )}
            </button>
            
            <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
              <button 
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-[var(--color-accent)] text-white font-heading font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:bg-[var(--color-blue-alt)] transition-all duration-300 hover:-translate-y-0.5 active:scale-95"
              >
                Connect with Andy
              </button>
              <motion.div
                className="text-slate-400 cursor-pointer"
                animate={prefersReducedMotion ? {} : { y: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                onClick={() => document.getElementById('lead-form')?.scrollIntoView({ behavior: 'smooth' })}
                aria-hidden="true"
              >
                <ChevronDown size={22} />
              </motion.div>
            </div>

          </motion.div>
        </div>

      </div>
    </motion.section>
  )
}
