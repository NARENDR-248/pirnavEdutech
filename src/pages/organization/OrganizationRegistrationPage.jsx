import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2, Mail, Globe, Users, MapPin, Clock, ArrowRight, ArrowLeft,
  CheckCircle, Upload, DollarSign, Languages, Calendar,
  Sparkles, ChevronRight, AlertCircle,
  Monitor, Sun, Moon
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  INDUSTRIES, COMPANY_SIZES, COUNTRIES, TIMEZONES,
  CURRENCIES, LANGUAGES, DATE_FORMATS, THEMES
} from '../../data/organizationMockData'

/* ─────────────────────────────────────────────────────────────────────────────
   CONSTANTS
────────────────────────────────────────────────────────────────────────────── */
const STORAGE_KEY = 'hrms_org_registration'
const TOTAL_STEPS = 4

const STEPS_META = [
  { id: 'details', title: 'Organization', subtitle: 'Company details' },
  { id: 'business', title: 'Business', subtitle: 'Industry & size' },
  { id: 'preferences', title: 'Preferences', subtitle: 'Workspace setup' },
  { id: 'review', title: 'Review', subtitle: 'Confirm & create' },
]

const INITIAL_FORM = {
  companyName: '',
  companyEmail: '',
  website: '',
  logo: null,
  logoPreview: null,
  industry: '',
  companySize: '',
  country: '',
  timezone: '',
  currency: 'USD',
  language: 'en',
  dateFormat: 'MM/DD/YYYY',
  theme: 'system',
}

/* ─────────────────────────────────────────────────────────────────────────────
   HELPERS
────────────────────────────────────────────────────────────────────────────── */
const themeIcon = (t) => {
  switch (t) {
    case 'light': return Sun
    case 'dark': return Moon
    default: return Monitor
  }
}

const themeLabel = (t) => THEMES.find((x) => x.value === t)?.label ?? t

function findLabel(options, value) {
  return options.find((o) => o.value === value)?.label || value
}

/* ─────────────────────────────────────────────────────────────────────────────
   SUB-COMPONENTS
────────────────────────────────────────────────────────────────────────────── */

function StepIndicator({ currentStep, saved }) {
  return (
    <div className="mb-8 sm:mb-10">
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Step {currentStep + 1} of {TOTAL_STEPS}
        </span>
        <span className="text-xs font-medium text-[#2563EB]">
          {Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}% complete
        </span>
      </div>
      <div className="relative h-1.5 bg-slate-200 dark:bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-[#2563EB] to-[#7C3AED]"
          initial={{ width: 0 }}
          animate={{ width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      <div className="relative flex justify-between mt-5">
        {STEPS_META.map((step, i) => {
          const isActive = i === currentStep
          const isDone = i < currentStep
          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isDone
                    ? '#2563EB'
                    : isActive
                    ? '#2563EB'
                    : 'rgba(148,163,184,0.15)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold
                  relative z-10 shadow-sm transition-shadow
                  ${isDone || isActive ? 'text-white shadow-lg shadow-[#2563EB]/20' : 'text-slate-400'}`}
              >
                {isDone ? (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400 }}>
                    <CheckCircle className="w-4 h-4" />
                  </motion.div>
                ) : (
                  <span>{i + 1}</span>
                )}
              </motion.div>
              <p className={`mt-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors
                ${isActive ? 'text-[#2563EB]' : 'text-slate-400'}`}>
                {step.title}
              </p>
            </div>
          )
        })}
        <div className="absolute top-[18px] left-[4.5%] right-[4.5%] h-px bg-slate-200 dark:bg-slate-700/50 -z-0" />
        <motion.div
          className="absolute top-[18px] left-[4.5%] h-px bg-gradient-to-r from-[#2563EB] to-[#7C3AED] -z-0"
          animate={{ width: `${(currentStep / (TOTAL_STEPS - 1)) * 91}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
      {saved && (
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] text-emerald-500 mt-3 text-center">
          Draft saved automatically
        </motion.p>
      )}
    </div>
  )
}

function InputField({ label, type = 'text', placeholder, value, onChange, error, Icon, hint }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`w-full h-11 px-4 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
            border ${error ? 'border-red-400 ring-2 ring-red-400/20' : 'border-slate-200 dark:border-slate-700'}
            rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]
            transition-all duration-200`}
        />
      </div>
      {error && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

function SelectField({ label, placeholder, options, value, onChange, error, Icon }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
            <Icon className="w-4 h-4 text-slate-400" />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          className={`w-full h-11 px-4 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
            border ${error ? 'border-red-400 ring-2 ring-red-400/20' : 'border-slate-200 dark:border-slate-700'}
            rounded-xl text-sm text-slate-900 dark:text-white appearance-none cursor-pointer
            focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB]
            transition-all duration-200`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && <p className="text-xs text-red-400 flex items-center gap-1"><AlertCircle className="w-3 h-3" />{error}</p>}
    </div>
  )
}

function RadioGroup({ options, value, onChange }) {
  return (
    <div className="flex gap-2 flex-wrap">
      {options.map((opt) => {
        const selected = value === opt.value
        const IconComp = opt.icon
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              border transition-all duration-200
              ${selected
                ? 'bg-[#2563EB]/10 border-[#2563EB]/30 text-[#2563EB] dark:text-[#60A5FA]'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300'
              }`}
          >
            {IconComp && <IconComp className="w-4 h-4" />}
            {opt.label}
          </button>
        )
      })}
    </div>
  )
}

function LogoUploader({ preview, onUpload }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) onUpload(file)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative w-20 h-20 rounded-[18px] flex items-center justify-center overflow-hidden cursor-pointer
          border-2 border-dashed transition-all duration-200
          ${dragging
            ? 'border-[#2563EB] bg-[#2563EB]/5 scale-105'
            : preview
              ? 'border-transparent'
              : 'border-slate-300 dark:border-slate-600 hover:border-[#2563EB]/50 bg-slate-50 dark:bg-slate-800/50'
          }`}
      >
        {preview ? (
          <img src={preview} alt="Logo" className="w-full h-full object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-0.5">
            <Building2 className="w-7 h-7 text-slate-400" />
            <Upload className="w-3 h-3 text-slate-400" />
          </div>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
        const file = e.target.files[0]
        if (file) onUpload(file)
      }} />
      <div className="text-center">
        <p className="text-xs font-medium text-[#2563EB] cursor-pointer hover:underline">Upload company logo</p>
        <p className="text-[10px] text-slate-400 mt-0.5">PNG, JPG, SVG. Max 2MB</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   STEP CONTENT
────────────────────────────────────────────────────────────────────────────── */

function StepDetails({ form, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Organization Details</h2>
        <p className="text-sm text-slate-400 mt-0.5">Tell us about your company</p>
      </div>
      <LogoUploader
        preview={form.logoPreview}
        onUpload={(file) => {
          const reader = new FileReader()
          reader.onloadend = () => onChange('logoPreview', reader.result)
          reader.readAsDataURL(file)
          onChange('logo', file)
        }}
      />
      <InputField label="Company Name" placeholder="e.g. Acme Corp" value={form.companyName}
        onChange={(e) => onChange('companyName', e.target.value)} error={errors.companyName} Icon={Building2} />
      <InputField label="Company Email" type="email" placeholder="hello@company.com" value={form.companyEmail}
        onChange={(e) => onChange('companyEmail', e.target.value)} error={errors.companyEmail} Icon={Mail} />
      <InputField label="Website" type="url" placeholder="https://acmecorp.com" value={form.website}
        onChange={(e) => onChange('website', e.target.value)} error={errors.website} Icon={Globe} hint="Optional" />
    </div>
  )
}

function StepBusiness({ form, onChange, errors }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Business Details</h2>
        <p className="text-sm text-slate-400 mt-0.5">Define your organization scope</p>
      </div>
      <SelectField label="Industry" placeholder="Select your industry" options={INDUSTRIES}
        value={form.industry} onChange={(e) => onChange('industry', e.target.value)} error={errors.industry} Icon={Globe} />
      <SelectField label="Company Size" placeholder="Select company size" options={COMPANY_SIZES}
        value={form.companySize} onChange={(e) => onChange('companySize', e.target.value)} error={errors.companySize} Icon={Users} />
      <SelectField label="Country" placeholder="Select country" options={COUNTRIES}
        value={form.country} onChange={(e) => onChange('country', e.target.value)} error={errors.country} Icon={MapPin} />
      <SelectField label="Timezone" placeholder="Select timezone" options={TIMEZONES}
        value={form.timezone} onChange={(e) => onChange('timezone', e.target.value)} error={errors.timezone} Icon={Clock} />
    </div>
  )
}

function StepPreferences({ form, onChange }) {
  const themeOptions = THEMES.map((t) => ({ ...t, icon: themeIcon(t.value) }))
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Workspace Preferences</h2>
        <p className="text-sm text-slate-400 mt-0.5">Customize your workspace experience</p>
      </div>
      <SelectField label="Currency" placeholder="Select currency" options={CURRENCIES}
        value={form.currency} onChange={(e) => onChange('currency', e.target.value)} Icon={DollarSign} />
      <SelectField label="Language" placeholder="Select language" options={LANGUAGES}
        value={form.language} onChange={(e) => onChange('language', e.target.value)} Icon={Languages} />
      <SelectField label="Date Format" placeholder="Select date format" options={DATE_FORMATS}
        value={form.dateFormat} onChange={(e) => onChange('dateFormat', e.target.value)} Icon={Calendar} />
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Theme</label>
        <RadioGroup options={themeOptions} value={form.theme} onChange={(v) => onChange('theme', v)} />
      </div>
    </div>
  )
}

function StepReview({ form, onEdit }) {
  const sections = [
    {
      label: 'Organization Details',
      step: 0,
      fields: [
        { label: 'Company Name', value: form.companyName, icon: Building2 },
        { label: 'Company Email', value: form.companyEmail, icon: Mail },
        { label: 'Website', value: form.website || '\u2014', icon: Globe },
      ],
    },
    {
      label: 'Business Details',
      step: 1,
      fields: [
        { label: 'Industry', value: findLabel(INDUSTRIES, form.industry), icon: Globe },
        { label: 'Company Size', value: findLabel(COMPANY_SIZES, form.companySize), icon: Users },
        { label: 'Country', value: findLabel(COUNTRIES, form.country), icon: MapPin },
        { label: 'Timezone', value: findLabel(TIMEZONES, form.timezone), icon: Clock },
      ],
    },
    {
      label: 'Workspace Preferences',
      step: 2,
      fields: [
        { label: 'Currency', value: findLabel(CURRENCIES, form.currency), icon: DollarSign },
        { label: 'Language', value: findLabel(LANGUAGES, form.language), icon: Languages },
        { label: 'Date Format', value: form.dateFormat, icon: Calendar },
        { label: 'Theme', value: themeLabel(form.theme), icon: themeIcon(form.theme) },
      ],
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Review & Confirm</h2>
          <p className="text-sm text-slate-400 mt-0.5">Verify your organization details</p>
        </div>
        {form.logoPreview && (
          <div className="w-14 h-14 rounded-[14px] overflow-hidden border border-slate-200 dark:border-slate-700 shrink-0">
            <img src={form.logoPreview} alt="Logo" className="w-full h-full object-cover" />
          </div>
        )}
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/50 dark:bg-slate-800/30 rounded-[16px] border border-slate-100 dark:border-slate-700/40 overflow-hidden"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700/40">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{section.label}</span>
              <button
                type="button"
                onClick={() => onEdit(section.step)}
                className="text-xs font-medium text-[#2563EB] hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                Edit <ChevronRight className="w-3 h-3" />
              </button>
            </div>
            <div className="px-5 py-3 space-y-2.5">
              {section.fields.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <f.icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-400 w-24 shrink-0">{f.label}</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{f.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   SLIDE TRANSITION
────────────────────────────────────────────────────────────────────────────── */
const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAIN PAGE
────────────────────────────────────────────────────────────────────────────── */
export default function OrganizationRegistrationPage() {
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [direction, setDirection] = useState(1)
  const [form, setForm] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) return { ...INITIAL_FORM, ...JSON.parse(saved) }
    } catch {}
    return INITIAL_FORM
  })
  const [errors, setErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [saved, setSaved] = useState(false)
  const [completed, setCompleted] = useState(false)

  // Auto-save to localStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      const toSave = { ...form }
      delete toSave.logo
      localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave))
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }, 500)
    return () => clearTimeout(timer)
  }, [form])

  const onChange = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }, [])

  const validate = (s) => {
    const errs = {}
    if (s === 0) {
      if (!form.companyName.trim()) errs.companyName = 'Company name is required'
      if (!form.companyEmail.trim()) errs.companyEmail = 'Email is required'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.companyEmail)) errs.companyEmail = 'Invalid email format'
    }
    if (s === 1) {
      if (!form.industry) errs.industry = 'Select an industry'
      if (!form.companySize) errs.companySize = 'Select company size'
      if (!form.country) errs.country = 'Select a country'
      if (!form.timezone) errs.timezone = 'Select a timezone'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const goToStep = (s) => {
    setDirection(s > step ? 1 : -1)
    setStep(s)
  }

  const handleNext = () => {
    if (!validate(step)) return
    if (step < TOTAL_STEPS - 1) {
      goToStep(step + 1)
    } else {
      handleCreate()
    }
  }

  const handlePrev = () => {
    if (step > 0) goToStep(step - 1)
  }

  const handleCreate = async () => {
    setSubmitting(true)
    await new Promise((r) => setTimeout(r, 1800))
    setSubmitting(false)
    setCompleted(true)
    localStorage.removeItem(STORAGE_KEY)
    setTimeout(() => navigate('/organization/overview'), 800)
  }

  const renderStep = () => {
    switch (step) {
      case 0: return <StepDetails form={form} onChange={onChange} errors={errors} />
      case 1: return <StepBusiness form={form} onChange={onChange} errors={errors} />
      case 2: return <StepPreferences form={form} onChange={onChange} />
      case 3: return <StepReview form={form} onEdit={(s) => goToStep(s)} />
      default: return null
    }
  }

  if (completed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/20"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Organization Created!</h2>
          <p className="text-slate-400 mt-2">Redirecting to your workspace...</p>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-[#0B1121] dark:to-[#0F172A] py-8 sm:py-12 px-4">
      <div className="max-w-xl mx-auto">
        <button
          onClick={() => navigate('/organization/overview')}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 dark:bg-slate-900/70 backdrop-blur-2xl border border-slate-200/60 dark:border-slate-700/40 rounded-[24px] p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/20"
          style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.08) inset' }}
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center ring-1 ring-[#2563EB]/10">
              <Sparkles className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 dark:text-white">Create Your Workspace</h1>
              <p className="text-sm text-slate-400">Set up your organization in minutes</p>
            </div>
          </div>

          <StepIndicator currentStep={step} saved={saved} />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={step}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/40">
            <button
              onClick={handlePrev}
              disabled={step === 0}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                ${step === 0
                  ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </button>

            <button
              onClick={handleNext}
              disabled={submitting}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
                bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:brightness-110 rounded-xl transition-all duration-200
                shadow-lg shadow-[#2563EB]/20 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Creating...
                </>
              ) : step < TOTAL_STEPS - 1 ? (
                <>Continue <ArrowRight className="w-4 h-4" /></>
              ) : (
                <>Create Organization <Sparkles className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
