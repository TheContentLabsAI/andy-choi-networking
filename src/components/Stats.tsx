import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { scaleIn } from '../utils/animations'

const Counter = ({ value, label }: { value: string, label: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  
  // Simple fade/scale for now, can be enhanced to count up if "value" was numeric
  return (
    <motion.div 
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="flex-1 text-center px-2"
    >
      <div className="text-[var(--color-accent)] font-heading font-bold text-4xl sm:text-[50px] leading-none mb-1">
        {value}
      </div>
      <div className="text-slate-600 font-heading text-sm sm:text-base font-medium">
        {label}
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const stats = [
    { label: "Projects Completed", value: "98+" },
    { label: "Asset Value", value: "$100M+" },
    { label: "Active Pipeline", value: "$20M" },
  ]

  return (
    <section className="bg-white/50 backdrop-blur-sm border-y border-slate-200 py-8 px-4 w-full relative overflow-hidden">
      
      <div className="flex divide-x divide-slate-300 relative z-10 max-w-[500px] mx-auto">
        {stats.map((stat, index) => (
          <Counter key={index} {...stat} />
        ))}
      </div>
      
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-center text-slate-400 text-[10px] sm:text-xs mt-4 font-body relative z-10"
      >
        Based on projects since 2015 across ground-up, value-add, and entitlement-driven transactions.
      </motion.p>
    </section>
  )
}
