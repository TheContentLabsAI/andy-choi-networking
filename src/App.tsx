import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Stats from './components/Stats'
import LeadForm from './components/LeadForm'
import ThankYou from './components/ThankYou'
import { fadeIn, slideUp } from './utils/animations'

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [firstName, setFirstName] = useState("")

  const handleSuccess = (name: string) => {
    setFirstName(name)
    setIsSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex justify-center py-0 sm:py-8 font-body text-[var(--color-primary)] relative">
      {/* Decorative airy background elements - REMOVED for flat look */}
      
      {/* Main Container */}
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-[640px] bg-white sm:rounded-2xl overflow-hidden min-h-screen sm:min-h-fit flex flex-col border border-slate-200 relative z-10"
      >
        
        <Hero />
        <Stats />
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <LeadForm onSuccess={handleSuccess} />
            </motion.div>
          ) : (
            <motion.div
              key="thank-you"
              variants={slideUp}
              initial="hidden"
              animate="visible"
            >
              <ThankYou firstName={firstName} />
            </motion.div>
          )}
        </AnimatePresence>

      </motion.main>
    </div>
  )
}

export default App
