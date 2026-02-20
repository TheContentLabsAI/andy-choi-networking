import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { fadeIn, scaleIn, staggerContainer } from '../utils/animations'

// Profile data
const PROFILE = {
  name: "Andy Choi",
  subtitle: "Multifamily Developer | Licensed General Contractor | Operator-First Investor",
  photoUrl: "https://res.cloudinary.com/dwklqvlag/image/upload/v1771546386/image_foke3e.png",
  shortBio: "I'm a Los Angeles–based real estate operator and developer with 15+ years of hands-on experience across acquisitions, underwriting, construction, and asset execution. My approach is operator-first and risk-controlled, delivering predictable outcomes through institutional-grade financial modeling and deep operational discipline.",
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
          <div className="relative group">
            {/* Removed glow/blur background */}
            <img 
              src={PROFILE.photoUrl} 
              alt={`${PROFILE.name} - Real Estate Developer`} 
              className="relative w-[120px] h-[120px] rounded-full object-cover border-[3px] border-slate-100 z-10"
              loading="lazy"
            />
          </div>
        </motion.div>

        {/* Text Content */}
        <div className="flex-1 text-center sm:text-left">
          <motion.h1 
            className="text-4xl sm:text-[56px] leading-[1.1] font-bold text-[var(--color-primary)] font-heading mb-2 tracking-tight"
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
            className="text-sm text-gray-800 leading-relaxed font-body text-left"
            variants={fadeIn}
          >
            <p className="mb-2">{PROFILE.shortBio}</p>
            
            <AnimatePresence>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="list-disc pl-5 space-y-1 mt-2 mb-4 text-gray-700">
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
            >
              {isExpanded ? (
                <>Read less <ChevronUp size={16} className="ml-1 group-hover:-translate-y-0.5 transition-transform" /></>
              ) : (
                <>Read more <ChevronDown size={16} className="ml-1 group-hover:translate-y-0.5 transition-transform" /></>
              )}
            </button>
          </motion.div>
        </div>

      </div>
    </motion.section>
  )
}
