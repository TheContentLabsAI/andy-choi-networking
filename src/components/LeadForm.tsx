
import { useState } from 'react'
import { useForm, type FieldError } from "react-hook-form"
import { SPECIALIZATION_OPTIONS, INVESTMENT_CAPACITY_OPTIONS } from '../utils/constants'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  title: string
  specialization: string
  investmentCapacity: string
  helpNeeded: string
  lookingFor: string
}

interface LeadFormProps {
  onSuccess: (firstName: string) => void
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const payload = {
        ...data,
        submittedAt: new Date().toISOString()
      }

      // Production Webhook URL
      const webhookUrl = "https://thecontentlabs.app.n8n.cloud/webhook/Andy-Choi-Connect"

      if (webhookUrl) {
        const response = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        })

        if (!response.ok) {
          throw new Error('Submission failed')
        }
      } else {
        // Simulate network delay if no URL configured
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.log("Mock Submission Payload:", payload)
      }

      onSuccess(data.firstName)
    } catch (err) {
      console.error(err)
      setSubmitError("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Helper for input classes
  const inputClasses = (error?: FieldError) => `
    w-full p-3 bg-[var(--color-input-bg)] border rounded-sm outline-none transition-all duration-300
    font-ui text-[14px] text-black
    placeholder-gray-500
    input-focus-ring
    ${error 
      ? 'border-red-600 focus:border-red-600 bg-red-50' 
      : 'border-[var(--color-border)] focus:border-[var(--color-accent)] bg-white/50 focus:bg-white'
    }
  `

  const labelClasses = "block text-[var(--color-primary)] font-ui font-semibold text-sm mb-1 ml-1"

  return (
    <section className="bg-transparent p-4 sm:p-8">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading relative inline-block">
          Let's Connect
          <span className="block h-1 w-1/3 bg-[var(--color-accent)] rounded-full mt-1"></span>
        </h2>
        <p className="text-[#555555] text-sm font-body mt-2">Fill in your details below — I'll follow up personally.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        
        {/* SECTION 1 — PERSONAL INFORMATION */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>First Name <span className="text-red-500">*</span></label>
              <input 
                {...register("firstName", { required: "First Name is required", maxLength: 50 })}
                className={inputClasses(errors.firstName)}
                aria-invalid={errors.firstName ? "true" : "false"}
                placeholder="John"
              />
              {errors.firstName && <p role="alert" className="text-red-600 text-xs mt-1 ml-1">{errors.firstName.message}</p>}
            </div>
            <div>
              <label className={labelClasses}>Last Name <span className="text-red-500">*</span></label>
              <input 
                {...register("lastName", { required: "Last Name is required", maxLength: 50 })}
                className={inputClasses(errors.lastName)}
                aria-invalid={errors.lastName ? "true" : "false"}
                placeholder="Doe"
              />
              {errors.lastName && <p role="alert" className="text-red-600 text-xs mt-1 ml-1">{errors.lastName.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Email Address <span className="text-red-500">*</span></label>
              <input 
                type="email"
                {...register("email", { 
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                className={inputClasses(errors.email)}
                aria-invalid={errors.email ? "true" : "false"}
                placeholder="john@example.com"
              />
              {errors.email && <p role="alert" className="text-red-600 text-xs mt-1 ml-1">{errors.email.message}</p>}
            </div>
            <div>
              <label className={labelClasses}>Phone Number <span className="text-red-500">*</span></label>
              <input 
                type="tel"
                {...register("phone", { 
                  required: "Phone number is required",
                  minLength: { value: 10, message: "Minimum 10 digits" }
                })}
                className={inputClasses(errors.phone)}
                aria-invalid={errors.phone ? "true" : "false"}
                placeholder="(555) 123-4567"
              />
              {errors.phone && <p role="alert" className="text-red-600 text-xs mt-1 ml-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Company <span className="text-red-500">*</span></label>
              <input 
                {...register("company", { required: "Company is required", maxLength: 100 })}
                className={inputClasses(errors.company)}
                placeholder="Your Organization"
              />
              {errors.company && <p role="alert" className="text-red-600 text-xs mt-1 ml-1">{errors.company.message}</p>}
            </div>
            <div>
              <label className={labelClasses}>Title / Role <span className="text-red-500">*</span></label>
              <input 
                {...register("title", { required: "Title is required", maxLength: 100 })}
                className={inputClasses(errors.title)}
                placeholder="Manager, Director..."
              />
              {errors.title && <p role="alert" className="text-red-600 text-xs mt-1 ml-1">{errors.title.message}</p>}
            </div>
          </div>
        </div>

        {/* SECTION 2 — PROFESSIONAL PROFILE */}
        <div className="space-y-5 pt-2">
          <div>
            <label className={labelClasses}>Specialization <span className="text-red-500">*</span></label>
            <div className="relative">
              <select 
                {...register("specialization", { required: "Please select a specialization" })}
                className={`${inputClasses(errors.specialization)} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat pr-8`}
              >
                <option value="">-- Select your specialization --</option>
                {SPECIALIZATION_OPTIONS.map((group, idx) => (
                  <optgroup label={group.label} key={idx}>
                    {group.options.map((opt, optIdx) => (
                      <option key={optIdx} value={opt}>{opt}</option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
            {errors.specialization && <p role="alert" className="text-red-600 text-xs mt-1 ml-1">{errors.specialization.message}</p>}
          </div>

          <div>
            <label className={labelClasses}>Investment Capacity <span className="text-slate-500 font-normal">(optional)</span></label>
            <div className="relative">
              <select 
                {...register("investmentCapacity")}
                className={`${inputClasses()} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat pr-8 text-gray-700`}
              >
                <option value="">-- Select --</option>
                {INVESTMENT_CAPACITY_OPTIONS.map((opt, idx) => (
                  <option key={idx} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3 — ENGAGEMENT & QUALIFICATION */}
        <div className="space-y-5 pt-2">
          <div>
            <label className={labelClasses}>What do you need help with? <span className="text-slate-500 font-normal">(optional)</span></label>
            <textarea 
              {...register("helpNeeded", { maxLength: 500 })}
              className={inputClasses(errors.helpNeeded)}
              rows={3}
              placeholder="e.g. Finding off-market deals, construction management, investor introductions..."
            />
          </div>

          <div>
            <label className={labelClasses}>What are you looking for? <span className="text-slate-500 font-normal">(optional)</span></label>
            <textarea 
              {...register("lookingFor", { maxLength: 500 })}
              className={inputClasses(errors.lookingFor)}
              rows={3}
              placeholder="e.g. Capital partner, JV opportunity, advisory, networking..."
            />
          </div>
        </div>

        {submitError && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded flex items-center gap-2">
            <span className="text-xl">⚠️</span> {submitError}
          </div>
        )}

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[var(--color-accent)] text-white font-heading font-bold py-[14px] px-[24px] rounded-lg text-base hover:bg-[var(--color-blue-alt)] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed transform active:scale-[0.98]"
        >
          {isSubmitting ? "Sending..." : "Submit & Connect"}
        </button>

      </form>
    </section>
  )
}
