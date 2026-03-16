import { Component, type ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Stats from './components/Stats'
import LeadForm from './components/LeadForm'
import ThankYou from './components/ThankYou'
import { fadeIn, slideUp } from './utils/animations'

class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <p className="text-slate-600 font-body text-sm">
            Something went wrong loading this section. Please refresh the page.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [firstName, setFirstName] = useState("")

  const handleSuccess = (name: string) => {
    setFirstName(name)
    setIsSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex justify-center py-0 sm:py-8 font-body text-[var(--color-primary)] relative overflow-x-hidden">
      {/* Main Container */}
      <motion.main 
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="w-full max-w-[640px] bg-white sm:rounded-2xl overflow-hidden min-h-screen sm:min-h-fit flex flex-col border border-slate-200 relative z-10"
      >
        
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="landing"
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Hero />
              <Stats />
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <ErrorBoundary>
                  <LeadForm onSuccess={handleSuccess} />
                </ErrorBoundary>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="thank-you"
              variants={slideUp}
              initial="hidden"
              animate="visible"
              className="w-full overflow-hidden"
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
