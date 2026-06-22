import { useState, useEffect, useCallback, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  Building2, Mail, Globe, Users, MapPin, Clock, ArrowRight, ArrowLeft,
  CheckCircle, Upload, DollarSign, Languages, Calendar,
  Sparkles, ChevronRight, AlertCircle,
  Monitor, Sun, Moon, PartyPopper, Loader2
} from 'lucide-react'
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
   CONFETTI COMPONENT
────────────────────────────────────────────────────────────────────────────── */
function Confetti() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.2 + Math.random() * 1.5,
    rotation: Math.random() * 720 - 360,
    color: ['#2563EB', '#7C3AED', '#10B981', '#F59E0B', '#EF4444', '#EC4899', '#06B6D4', '#8B5CF6'][Math.floor(Math.random() * 8)],
    size: 6 + Math.random() * 8,
    shape: Math.random() > 0.5 ? 'circle' : 'square',
  }))

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: -20 }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: '110vh',
            opacity: [1, 1, 0],
            rotate: p.rotation,
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          <div
            className={`${p.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
            style={{
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              boxShadow: `0 0 6px ${p.color}40`,
            }}
          />
        </motion.div>
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   MAGNETIC BUTTON
────────────────────────────────────────────────────────────────────────────── */
function MagneticButton({ children, onClick, disabled, className = '', type = 'button' }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    if (!ref.current || disabled) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    setPosition({ x: x * 0.15, y: y * 0.15 })
  }

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

  return (
    <motion.button
      ref={ref}
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 250, damping: 12, mass: 0.5 }}
      className={className}
    >
      {children}
    </motion.button>
  )
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
        <span className="text-xs font-mono font-bold text-[#2563EB]">
          {Math.round(((currentStep + 1) / TOTAL_STEPS) * 100)}%
        </span>
      </div>

      {/* Animated progress bar with glow */}
      <div className="relative h-2 bg-slate-200/80 dark:bg-slate-700/50 rounded-full overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: 'linear-gradient(90deg, #2563EB, #7C3AED, #2563EB)',
            backgroundSize: '200% 100%',
          }}
          initial={{ width: 0 }}
          animate={{
            width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%`,
            backgroundPosition: ['0% 0%', '100% 0%'],
          }}
          transition={{
            width: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
            backgroundPosition: { duration: 2, repeat: Infinity, ease: 'linear' },
          }}
        />
        <div
          className="absolute inset-y-0 left-0 rounded-full opacity-30 blur-sm"
          style={{
            background: 'linear-gradient(90deg, #2563EB, #7C3AED)',
            width: `${((currentStep + 1) / TOTAL_STEPS) * 100}%`,
            transition: 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      </div>

      {/* Step dots */}
      <div className="relative flex justify-between mt-5">
        <div className="absolute top-[18px] left-[4.5%] right-[4.5%] h-px bg-slate-200 dark:bg-slate-700/50" />
        <motion.div
          className="absolute top-[18px] left-[4.5%] h-px -z-0"
          animate={{ width: `${(currentStep / (TOTAL_STEPS - 1)) * 91}%` }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }}
        />
        {STEPS_META.map((step, i) => {
          const isActive = i === currentStep
          const isDone = i < currentStep
          return (
            <div key={step.id} className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: isActive ? 1.15 : 1,
                  backgroundColor: isDone
                    ? '#10B981'
                    : isActive
                    ? '#2563EB'
                    : 'rgba(148,163,184,0.15)',
                  boxShadow: isActive
                    ? '0 0 20px rgba(37,99,235,0.3)'
                    : isDone
                    ? '0 0 12px rgba(16,185,129,0.2)'
                    : 'none',
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold
                  relative z-10 shadow-sm transition-shadow
                  ${isDone || isActive ? 'text-white' : 'text-slate-400'}`}
              >
                {isDone ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                  >
                    <CheckCircle className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <span className="text-sm">{i + 1}</span>
                )}
              </motion.div>
              <p className={`mt-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors duration-300
                ${isActive ? 'text-[#2563EB]' : isDone ? 'text-emerald-500' : 'text-slate-400'}`}>
                {step.title}
              </p>
            </div>
          )
        })}
      </div>

      {/* Auto-save indicator */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-center justify-center gap-1.5 mt-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-medium text-emerald-500">Draft saved</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────────────────────
   FLOATING LABEL INPUT
────────────────────────────────────────────────────────────────────────────── */
function InputField({ label, type = 'text', placeholder, value, onChange, error, Icon, hint }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="space-y-1.5">
      <div className="relative">
        {Icon && (
          <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 transition-colors duration-200
            ${focused ? 'text-[#2563EB]' : error ? 'text-red-400' : 'text-slate-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full h-11 px-4 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
            border-2 ${error
              ? 'border-red-300 dark:border-red-400/50 ring-2 ring-red-400/10'
              : focused
                ? 'border-[#2563EB] ring-2 ring-[#2563EB]/15'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }
            rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400
            focus:outline-none transition-all duration-200`}
        />
        {/* Focus ring glow */}
        {focused && !error && (
          <motion.div
            layoutId="inputGlow"
            className="absolute -inset-0.5 rounded-xl opacity-30 blur-sm pointer-events-none"
            style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED)' }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          />
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />{error}
        </motion.p>
      )}
      {hint && !error && <p className="text-xs text-slate-400">{hint}</p>}
    </div>
  )
}

function SelectField({ label, placeholder, options, value, onChange, error, Icon }) {
  const [focused, setFocused] = useState(false)

  return (
    <div className="space-y-1.5">
      <div className="relative">
        {Icon && (
          <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10 transition-colors duration-200
            ${focused ? 'text-[#2563EB]' : 'text-slate-400'}`}>
            <Icon className="w-4 h-4" />
          </div>
        )}
        <select
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`w-full h-11 px-4 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
            border-2 ${error
              ? 'border-red-300 dark:border-red-400/50 ring-2 ring-red-400/10'
              : focused
                ? 'border-[#2563EB] ring-2 ring-[#2563EB]/15'
                : 'border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600'
            }
            rounded-xl text-sm text-slate-900 dark:text-white appearance-none cursor-pointer
            focus:outline-none transition-all duration-200`}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
          <svg className={`w-4 h-4 transition-colors duration-200 ${focused ? 'text-[#2563EB]' : 'text-slate-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs text-red-400 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3" />{error}
        </motion.p>
      )}
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
          <motion.button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium
              border-2 transition-all duration-200
              ${selected
                ? 'bg-[#2563EB]/10 border-[#2563EB]/40 text-[#2563EB] dark:text-[#60A5FA] shadow-sm'
                : 'bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-600'
              }`}
          >
            {IconComp && <IconComp className="w-4 h-4" />}
            {opt.label}
          </motion.button>
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
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`relative w-22 h-22 sm:w-24 sm:h-24 rounded-[20px] flex items-center justify-center overflow-hidden cursor-pointer
          border-2 border-dashed transition-all duration-200
          ${dragging
            ? 'border-[#2563EB] bg-[#2563EB]/10 scale-105 shadow-lg shadow-[#2563EB]/10'
            : preview
              ? 'border-transparent shadow-md'
              : 'border-slate-300 dark:border-slate-600 hover:border-[#2563EB]/50 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800/70'
          }`}
      >
        {preview ? (
          <motion.img
            src={preview} alt="Logo" className="w-full h-full object-cover"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        ) : (
          <div className="flex flex-col items-center gap-1">
            <Building2 className="w-8 h-8 text-slate-400" />
            <Upload className="w-3.5 h-3.5 text-slate-400" />
          </div>
        )}
        {dragging && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-[#2563EB]/5 flex items-center justify-center"
          >
            <span className="text-xs font-semibold text-[#2563EB]">Drop here</span>
          </motion.div>
        )}
      </motion.div>
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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Organization Details</h2>
        <p className="text-sm text-slate-400 mt-0.5">Tell us about your company</p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <LogoUploader
          preview={form.logoPreview}
          onUpload={(file) => {
            const reader = new FileReader()
            reader.onloadend = () => onChange('logoPreview', reader.result)
            reader.readAsDataURL(file)
            onChange('logo', file)
          }}
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.3 }}
      >
        <InputField label="Company Name" placeholder="e.g. Acme Corp" value={form.companyName}
          onChange={(e) => onChange('companyName', e.target.value)} error={errors.companyName} Icon={Building2} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <InputField label="Company Email" type="email" placeholder="hello@company.com" value={form.companyEmail}
          onChange={(e) => onChange('companyEmail', e.target.value)} error={errors.companyEmail} Icon={Mail} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.3 }}
      >
        <InputField label="Website" type="url" placeholder="https://acmecorp.com" value={form.website}
          onChange={(e) => onChange('website', e.target.value)} error={errors.website} Icon={Globe} hint="Optional" />
      </motion.div>
    </motion.div>
  )
}

function StepBusiness({ form, onChange, errors }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Business Details</h2>
        <p className="text-sm text-slate-400 mt-0.5">Define your organization scope</p>
      </motion.div>
      {[
        { label: 'Industry', placeholder: 'Select your industry', options: INDUSTRIES, key: 'industry', Icon: Globe },
        { label: 'Company Size', placeholder: 'Select company size', options: COMPANY_SIZES, key: 'companySize', Icon: Users },
        { label: 'Country', placeholder: 'Select country', options: COUNTRIES, key: 'country', Icon: MapPin },
        { label: 'Timezone', placeholder: 'Select timezone', options: TIMEZONES, key: 'timezone', Icon: Clock },
      ].map((field, i) => (
        <motion.div
          key={field.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * i, duration: 0.3 }}
        >
          <SelectField
            label={field.label}
            placeholder={field.placeholder}
            options={field.options}
            value={form[field.key]}
            onChange={(e) => onChange(field.key, e.target.value)}
            error={errors[field.key]}
            Icon={field.Icon}
          />
        </motion.div>
      ))}
    </motion.div>
  )
}

function StepPreferences({ form, onChange }) {
  const themeOptions = THEMES.map((t) => ({ ...t, icon: themeIcon(t.value) }))
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Workspace Preferences</h2>
        <p className="text-sm text-slate-400 mt-0.5">Customize your workspace experience</p>
      </motion.div>
      {[
        { label: 'Currency', options: CURRENCIES, key: 'currency', Icon: DollarSign },
        { label: 'Language', options: LANGUAGES, key: 'language', Icon: Languages },
        { label: 'Date Format', options: DATE_FORMATS, key: 'dateFormat', Icon: Calendar },
      ].map((field, i) => (
        <motion.div
          key={field.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 * i, duration: 0.3 }}
        >
          <SelectField
            label={field.label}
            placeholder={`Select ${field.label.toLowerCase()}`}
            options={field.options}
            value={form[field.key]}
            onChange={(e) => onChange(field.key, e.target.value)}
            Icon={field.Icon}
          />
        </motion.div>
      ))}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.3 }}
        className="space-y-1.5"
      >
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Theme</label>
        <RadioGroup options={themeOptions} value={form.theme} onChange={(v) => onChange('theme', v)} />
      </motion.div>
    </motion.div>
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
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-14 h-14 rounded-[14px] overflow-hidden border-2 border-slate-200 dark:border-slate-700 shrink-0 shadow-sm"
          >
            <img src={form.logoPreview} alt="Logo" className="w-full h-full object-cover" />
          </motion.div>
        )}
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <motion.div
            key={section.label}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * sections.indexOf(section) }}
            className="bg-white/60 dark:bg-slate-800/30 rounded-[16px] border border-slate-100 dark:border-slate-700/40 overflow-hidden hover:border-slate-200 dark:hover:border-slate-700/60 transition-colors"
          >
            <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100 dark:border-slate-700/40 bg-white/40 dark:bg-slate-800/20">
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">{section.label}</span>
              <motion.button
                whileHover={{ x: 2 }}
                type="button"
                onClick={() => onEdit(section.step)}
                className="text-xs font-medium text-[#2563EB] hover:text-blue-400 transition-colors flex items-center gap-1"
              >
                Edit <ChevronRight className="w-3 h-3" />
              </motion.button>
            </div>
            <div className="px-5 py-3 space-y-2.5">
              {section.fields.map((f) => (
                <div key={f.label} className="flex items-center gap-3">
                  <f.icon className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="text-xs text-slate-400 w-24 shrink-0">{f.label}</span>
                  <span className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">{f.value || <span className="text-slate-400 italic">Not set</span>}</span>
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
  enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0, scale: 0.97 }),
  center: { x: 0, opacity: 1, scale: 1 },
  exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0, scale: 0.97 }),
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
  const [showConfetti, setShowConfetti] = useState(false)

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
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1800))
    setSubmitting(false)
    setCompleted(true)
    setShowConfetti(true)
    localStorage.removeItem(STORAGE_KEY)
    setTimeout(() => navigate('/organization/overview'), 1200)
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

  // Completion screen
  if (completed) {
    return (
      <>
        {showConfetti && <Confetti />}
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-md"
          >
            {/* Celebration icon */}
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 250, damping: 15 }}
              className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#10B981] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#2563EB]/30 relative"
            >
              <PartyPopper className="w-12 h-12 text-white" />
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 rounded-[28px] bg-white/20"
              />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              Workspace Created!
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 mt-2"
            >
              Your organization <span className="font-semibold text-slate-700 dark:text-slate-200">{form.companyName}</span> is ready.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="text-xs text-slate-400 mt-4 flex items-center justify-center gap-2"
            >
              <Loader2 className="w-3 h-3 animate-spin" />
              Taking you to your workspace...
            </motion.p>
          </motion.div>
        </div>
      </>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 dark:from-[#0B1121] dark:via-[#0F172A] dark:to-[#0B1121] py-8 sm:py-12 px-4 relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-[#2563EB]/3 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#7C3AED]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-xl mx-auto relative z-10">
        <motion.button
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/organization/overview')}
          className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors mb-6 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Back to Dashboard
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Card with glass morphism */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-slate-200/60 dark:border-slate-700/40 rounded-[24px] p-6 sm:p-8 shadow-xl shadow-slate-200/50 dark:shadow-black/20"
            style={{ boxShadow: '0 0 0 0.5px rgba(255,255,255,0.08) inset, 0 8px 40px rgba(0,0,0,0.04)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 mb-2">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-10 h-10 rounded-[14px] bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center ring-1 ring-[#2563EB]/10"
              >
                <Sparkles className="w-5 h-5 text-[#2563EB]" />
              </motion.div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">Create Your Workspace</h1>
                <p className="text-sm text-slate-400">Set up your organization in minutes</p>
              </div>
            </div>

            <StepIndicator currentStep={step} saved={saved} />

            {/* Step Content */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={step}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>

            {/* Footer Actions */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200 dark:border-slate-700/40">
              <motion.button
                whileHover={step > 0 ? { x: -2 } : {}}
                onClick={handlePrev}
                disabled={step === 0}
                className={`inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium rounded-xl transition-all duration-200
                  ${step === 0
                    ? 'text-slate-300 dark:text-slate-600 cursor-not-allowed'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </motion.button>

              <MagneticButton
                onClick={handleNext}
                disabled={submitting}
                className="relative inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold text-white
                  bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:brightness-110 rounded-xl transition-all duration-200
                  shadow-lg shadow-[#2563EB]/25 disabled:opacity-60 disabled:cursor-not-allowed
                  overflow-hidden group"
              >
                {/* Button shimmer */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000
                  bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                {submitting ? (
                  <>
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Creating...
                  </>
                ) : step < TOTAL_STEPS - 1 ? (
                  <>Continue <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>
                ) : (
                  <>Create Organization <Sparkles className="w-4 h-4" /></>
                )}
              </MagneticButton>
            </div>
          </div>

          {/* Step hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-center text-[11px] text-slate-400 mt-4"
          >
            Your progress is saved automatically
          </motion.p>
        </motion.div>
      </div>
    </div>
  )
}
