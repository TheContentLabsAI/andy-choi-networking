import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { scaleIn } from '../utils/animations'

type ParsedStat = { prefix: string; number: number; suffix: string }

function parseStatValue(value: string): ParsedStat {
  // "98+"     → { prefix: "",  number: 98,  suffix: "+" }
  // "$100M+"  → { prefix: "$", number: 100, suffix: "M+" }
  // "$20M"    → { prefix: "$", number: 20,  suffix: "M" }
  const match = value.match(/^(\$?)(\d+)([\w+]*)$/)
  if (!match) return { prefix: '', number: 0, suffix: value }
  return { prefix: match[1], number: parseInt(match[2], 10), suffix: match[3] }
}

function useCountUp(target: number, isActive: boolean, duration = 1200): number {
  const [count, setCount] = useState(0)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (!isActive) return

    if (prefersReducedMotion) {
      setCount(target)
      return
    }

    let startTime: number | null = null
    let frameId: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        frameId = requestAnimationFrame(step)
      } else {
        setCount(target)
      }
    }

    frameId = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frameId)
  }, [isActive, target, duration, prefersReducedMotion])

  return count
}

const Counter = ({ value, label }: { value: string; label: string }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const { prefix, number, suffix } = parseStatValue(value)
  const count = useCountUp(number, isInView)

  return (
    <motion.div
      ref={ref}
      variants={scaleIn}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="flex-1 text-center px-2"
    >
      <div className="text-[var(--color-accent)] font-heading font-bold text-xl sm:text-4xl lg:text-[3.125rem] leading-none mb-1 break-words tabular-nums">
        {prefix}{count}{suffix}
      </div>
      <div className="text-slate-600 font-heading text-xs sm:text-base font-medium">
        {label}
      </div>
    </motion.div>
  )
}

export default function Stats() {
  const stats = [
    { label: 'Projects Completed', value: '98+' },
    { label: 'Asset Value', value: '$100M+' },
    { label: 'Active Pipeline', value: '$20M' },
  ]

  return (
    <section className="bg-slate-50 border-y border-slate-200 py-8 px-4 w-full">
      <div className="grid grid-cols-3 divide-x divide-slate-200 max-w-[500px] mx-auto">
        {stats.map((stat, index) => (
          <Counter key={index} {...stat} />
        ))}
      </div>

    </section>
  )
}
