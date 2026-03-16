import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useForm, type FieldError } from 'react-hook-form'
import { CONTACT_ROLE_GROUPS, INVESTMENT_CAPACITY_OPTIONS } from '../utils/constants'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  title: string
  specialization: string[]
  investmentCapacity: string
  helpNeeded: string
  lookingFor: string
}

interface LeadFormProps {
  onSuccess: (firstName: string) => void
}

export default function LeadForm({ onSuccess }: LeadFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    clearErrors,
  } = useForm<FormData>({
    defaultValues: {
      specialization: [],
    },
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [activeRoleGroup, setActiveRoleGroup] = useState(CONTACT_ROLE_GROUPS[0].label)
  const [roleSearch, setRoleSearch] = useState('')
  const abortControllerRef = useRef<AbortController | null>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    register('specialization', {
      validate: (value) => (value?.length ? true : 'Please select at least one role'),
    })

    return () => {
      abortControllerRef.current?.abort()
    }
  }, [register])

  const selectedRoles = watch('specialization') ?? []
  const helpNeededValue = watch('helpNeeded') ?? ''
  const lookingForValue = watch('lookingFor') ?? ''

  const currentRoleGroup =
    CONTACT_ROLE_GROUPS.find((group) => group.label === activeRoleGroup) ?? CONTACT_ROLE_GROUPS[0]
  const visibleRoles = currentRoleGroup.options.filter((role) =>
    role.toLowerCase().includes(roleSearch.trim().toLowerCase()),
  )

  const webhookUrl =
    (import.meta.env.VITE_WEBHOOK_URL as string | undefined) ??
    'https://thecontentlabs.app.n8n.cloud/webhook/Andy-Choi-Connect'

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitError(null)

    abortControllerRef.current = new AbortController()

    try {
      const payload = {
        ...data,
        specialization: data.specialization ? data.specialization.join(', ') : '',
        submittedAt: new Date().toISOString(),
      }

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: abortControllerRef.current.signal,
      })

      if (!response.ok) {
        throw new Error('Submission failed')
      }

      onSuccess(data.firstName)
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return
      setSubmitError('Submission failed — check your connection and try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const toggleRole = (role: string) => {
    const nextRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((item) => item !== role)
      : [...selectedRoles, role]

    setValue('specialization', nextRoles, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })

    if (nextRoles.length > 0) {
      clearErrors('specialization')
    }
  }

  const counterColor = (length: number, max: number) => {
    const ratio = length / max
    if (ratio >= 0.95) return 'text-red-400'
    if (ratio >= 0.8) return 'text-amber-400'
    return 'text-slate-400'
  }

  const clearAllRoles = () => {
    setValue('specialization', [], {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    })
  }

  const inputClasses = (error?: FieldError) => `
    w-full p-3 bg-[var(--color-input-bg)] border rounded-sm outline-none transition-all duration-300
    font-ui text-base sm:text-sm text-black
    placeholder-slate-500
    input-focus-ring
    ${
      error
        ? 'border-red-600 focus:border-red-600 bg-red-50'
        : 'border-[var(--color-border)] focus:border-[var(--color-accent)] bg-white/50 focus:bg-white'
    }
  `

  const labelClasses = 'block text-[var(--color-primary)] font-ui font-semibold text-sm mb-1 ml-1'

  return (
    <section id="lead-form" className="p-4 sm:p-8">
      <div className="mb-6 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-[var(--color-primary)] font-heading relative inline-block">
          Let&apos;s Connect
          <span className="block h-1 w-1/3 bg-[var(--color-accent)] rounded-full mt-1" />
        </h2>
        <p className="text-slate-500 text-sm font-body mt-2">
          I&apos;ll follow up with you personally.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
        {/* Section 1 — Personal Information */}
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelClasses}>
                First Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="firstName"
                {...register('firstName', { required: 'First Name is required', maxLength: 50 })}
                className={inputClasses(errors.firstName)}
                aria-invalid={errors.firstName ? 'true' : 'false'}
                aria-required="true"
                aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                placeholder="John"
                autoComplete="given-name"
              />
              {errors.firstName && (
                <p role="alert" id="firstName-error" className="text-red-600 text-xs mt-1 ml-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="lastName" className={labelClasses}>
                Last Name <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="lastName"
                {...register('lastName', { required: 'Last Name is required', maxLength: 50 })}
                className={inputClasses(errors.lastName)}
                aria-invalid={errors.lastName ? 'true' : 'false'}
                aria-required="true"
                aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                placeholder="Doe"
                autoComplete="family-name"
              />
              {errors.lastName && (
                <p role="alert" id="lastName-error" className="text-red-600 text-xs mt-1 ml-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email Address <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={inputClasses(errors.email)}
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-required="true"
                aria-describedby={errors.email ? 'email-error' : undefined}
                placeholder="john@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p role="alert" id="email-error" className="text-red-600 text-xs mt-1 ml-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone Number <span className="text-red-500" aria-hidden="true">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                {...register('phone', {
                  required: 'Phone number is required',
                  minLength: { value: 10, message: 'Enter a valid phone number (at least 10 digits)' },
                })}
                className={inputClasses(errors.phone)}
                aria-invalid={errors.phone ? 'true' : 'false'}
                aria-required="true"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
                placeholder="(555) 123-4567"
                autoComplete="tel"
              />
              {errors.phone && (
                <p role="alert" id="phone-error" className="text-red-600 text-xs mt-1 ml-1">
                  {errors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="company" className={labelClasses}>
                Company <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                id="company"
                {...register('company', { maxLength: 100 })}
                className={inputClasses(errors.company)}
                placeholder="Your Organization"
                autoComplete="organization"
              />
            </div>
            <div>
              <label htmlFor="jobTitle" className={labelClasses}>
                Title / Role <span className="text-slate-500 font-normal">(optional)</span>
              </label>
              <input
                id="jobTitle"
                {...register('title', { maxLength: 100 })}
                className={inputClasses(errors.title)}
                placeholder="Manager, Director..."
                autoComplete="organization-title"
              />
            </div>
          </div>
        </div>

        {/* Section 2 — Professional Profile */}
        <div className="space-y-5 pt-2">
          <div>
            <label htmlFor="role-search" className={labelClasses}>
              What do you do? <span className="text-red-500" aria-hidden="true">*</span>
            </label>
            <p id="role-picker-hint" className="text-xs text-slate-500 ml-1 mb-3">
              Pick a role group first, then choose one or more roles. You can select across groups.
            </p>

            <div
              className={`space-y-4 p-4 border rounded-sm transition-all duration-300 ${
                errors.specialization
                  ? 'border-red-600 bg-red-50'
                  : 'border-[var(--color-border)] bg-[var(--color-input-bg)]'
              }`}
              aria-describedby="role-picker-hint"
            >
              {/* Role group tabs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {CONTACT_ROLE_GROUPS.map((group) => {
                  const isActive = group.label === activeRoleGroup
                  const selectedInGroup = selectedRoles.filter((role) =>
                    group.options.includes(role),
                  ).length

                  return (
                    <button
                      key={group.label}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        setActiveRoleGroup(group.label)
                        setRoleSearch('')
                      }}
                      className={`rounded-sm border px-3 py-3 text-left transition-colors ${
                        isActive
                          ? 'border-[var(--color-accent)] bg-white shadow-sm'
                          : 'border-[var(--color-border)] bg-white/60 hover:bg-white'
                      }`}
                    >
                      <span className="block text-sm font-semibold text-[var(--color-primary)]">
                        {group.label}
                      </span>
                      <span className="block text-xs text-slate-500 mt-1">
                        {group.options.length} roles
                        {selectedInGroup > 0 ? ` · ${selectedInGroup} selected` : ''}
                      </span>
                    </button>
                  )
                })}
              </div>

              {/* Role list panel */}
              <div className="rounded-sm border border-[var(--color-border)] bg-white p-4 space-y-4">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h4 className="font-semibold text-[var(--color-primary)] text-sm">
                      {currentRoleGroup.label}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">{currentRoleGroup.description}</p>
                  </div>
                  <p className="text-xs text-slate-500 whitespace-nowrap">
                    {selectedRoles.length} selected
                  </p>
                </div>

                <input
                  id="role-search"
                  type="text"
                  value={roleSearch}
                  onChange={(event) => setRoleSearch(event.target.value)}
                  className={inputClasses()}
                  placeholder={`Search ${currentRoleGroup.label.toLowerCase()} roles`}
                  aria-label={`Search within ${currentRoleGroup.label}`}
                />

                <div className="max-h-72 overflow-y-auto pr-1">
                  {visibleRoles.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {visibleRoles.map((role) => {
                        const isSelected = selectedRoles.includes(role)
                        return (
                          <button
                            key={role}
                            type="button"
                            onClick={() => toggleRole(role)}
                            aria-pressed={isSelected}
                            className={`rounded-sm border px-3 py-3 text-left transition-all ${
                              isSelected
                                ? 'border-[var(--color-accent)] bg-[var(--color-accent-subtle)]'
                                : 'border-[var(--color-border)] bg-white hover:bg-[#f8fbff]'
                            }`}
                          >
                            <span className="block text-sm text-[var(--color-primary)]">
                              {role}
                            </span>
                            <span
                              className={`mt-1 inline-block text-xs uppercase tracking-[0.08em] ${
                                isSelected ? 'text-[var(--color-accent)]' : 'text-slate-500'
                              }`}
                            >
                              {isSelected ? 'Selected' : 'Add role'}
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  ) : (
                    <p className="text-sm text-slate-500 py-6 text-center">
                      No roles match that search in {currentRoleGroup.label}.
                    </p>
                  )}
                </div>
              </div>

              {/* Selected roles summary */}
              <AnimatePresence>
                {selectedRoles.length > 0 && (
                  <motion.div
                    key="selected-panel"
                    initial={prefersReducedMotion ? false : { opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? {} : { opacity: 0, y: -4 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="rounded-sm border border-[var(--color-border)] bg-white p-4 space-y-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-[var(--color-primary)]">
                        Selected roles
                      </p>
                      <button
                        type="button"
                        onClick={clearAllRoles}
                        className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500 hover:text-[var(--color-accent)] transition-colors py-2 px-2 -mr-2"
                      >
                        Clear all
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence>
                        {selectedRoles.map((role) => (
                          <motion.button
                            key={role}
                            layout
                            type="button"
                            onClick={() => toggleRole(role)}
                            aria-label={`Remove ${role}`}
                            initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={prefersReducedMotion ? {} : { opacity: 0, scale: 0.85 }}
                            transition={{ duration: 0.15, ease: "easeOut" }}
                            className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-subtle)] px-3 py-1 text-sm text-[var(--color-primary)]"
                          >
                            <span>{role}</span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-[var(--color-accent)] shrink-0"
                              aria-hidden="true"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </motion.button>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {errors.specialization && (
              <p role="alert" className="text-red-600 text-xs mt-1 ml-1">
                {errors.specialization.message as string}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="investmentCapacity" className={labelClasses}>
              Investment Capacity <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <div className="relative">
              <select
                id="investmentCapacity"
                {...register('investmentCapacity')}
                className={`${inputClasses()} appearance-none bg-[url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23007CB2%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px_12px] bg-[right_1rem_center] bg-no-repeat pr-8 text-slate-700 text-base sm:text-sm`}
              >
                <option value="">Select a range</option>
                {INVESTMENT_CAPACITY_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3 — Engagement & Qualification */}
        <div className="space-y-5 pt-2">
          <div>
            <label htmlFor="helpNeeded" className={labelClasses}>
              What do you need help with?{' '}
              <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <textarea
              id="helpNeeded"
              {...register('helpNeeded', { maxLength: 500 })}
              className={inputClasses(errors.helpNeeded)}
              rows={3}
              placeholder="e.g. Finding off-market deals, construction management, investor introductions..."
            />
            <p className={`text-xs ${counterColor(helpNeededValue.length, 500)} text-right mt-0.5 mr-1 transition-colors duration-300`} aria-live="polite">
              {helpNeededValue.length}/500
            </p>
          </div>

          <div>
            <label htmlFor="lookingFor" className={labelClasses}>
              What are you looking for?{' '}
              <span className="text-slate-500 font-normal">(optional)</span>
            </label>
            <textarea
              id="lookingFor"
              {...register('lookingFor', { maxLength: 500 })}
              className={inputClasses(errors.lookingFor)}
              rows={3}
              placeholder="e.g. Capital partner, JV opportunity, advisory, networking..."
            />
            <p className={`text-xs ${counterColor(lookingForValue.length, 500)} text-right mt-0.5 mr-1 transition-colors duration-300`} aria-live="polite">
              {lookingForValue.length}/500
            </p>
          </div>
        </div>

        {submitError && (
          <div
            role="alert"
            className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-sm flex items-center gap-2"
          >
            <span className="text-lg" aria-hidden="true">!</span>
            {submitError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[var(--color-accent)] text-white font-heading font-bold py-3.5 px-6 rounded-full text-base hover:bg-[var(--color-blue-alt)] transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          {isSubmitting ? 'Connecting...' : 'Connect with Andy'}
        </button>
      </form>
    </section>
  )
}
