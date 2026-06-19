import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Mail,
  Globe,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Upload,
} from 'lucide-react'

import CompanyLogoUpload from '../../components/OrganizationRegistrationPageComponents/CompanyLogoUpload'
import OrganizationHeader from '../../components/OrganizationRegistrationPageComponents/OrganizationHeader'
import OrganizationStepper from '../../components/OrganizationRegistrationPageComponents/OrganizationStepper'
import RegistrationForm from '../../components/OrganizationRegistrationPageComponents/RegistrationForm'

import {
  INDUSTRIES,
  COMPANY_SIZES,
  COUNTRIES,
  TIMEZONES,
} from '../../data/organizationMockData'
const INITIAL_FORM = {
  companyName: '',
  companyEmail: '',
  industry: '',
  companySize: '',
  country: '',
  timezone: '',
  logo: null,
}

export default function OrganizationRegistrationPage() {
  const [step, setStep] = useState(0)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [logoPreview, setLogoPreview] = useState(null)
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const handleLogoUpload = useCallback((file) => {
    // validate
    const MAX_SIZE = 2 * 1024 * 1024
    const ACCEPTED = ['image/png', 'image/jpeg', 'image/svg+xml']
    if (!ACCEPTED.includes(file.type)) return alert('Only PNG, JPG, SVG allowed')
    if (file.size > MAX_SIZE) return alert('File must be under 2MB')

    const reader = new FileReader()
    reader.onloadend = () => {
      setLogoPreview(reader.result)
      handleChange('logo', file)
    }
    reader.readAsDataURL(file)
  }, [])

  const validateStep = (stepIndex) => {
    // your validation logic
    return true
  }

  const handleNext = () => {
    if (!validateStep(step)) return
    if (step === 2) {
      handleSubmit()
    } else {
      setStep((s) => s + 1)
    }
  }

  const handlePrev = () => setStep((s) => Math.max(0, s - 1))

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // API call
      console.log('Submitting:', formData)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <OrganizationHeader
        title="Create Your Organization"
        subtitle="Set up your company workspace"
        icon={<Building2 className="w-5 h-5 text-[#2563EB]" />}
      />

      <CompanyLogoUpload logoPreview={logoPreview} onUpload={handleLogoUpload} />

      <div className="mt-8">
        <OrganizationStepper currentStep={step} />
      </div>

      <div className="mt-8">
        <RegistrationForm
          currentStep={step}
          formData={formData}
          onChange={handleChange}
          onNext={handleNext}
          onPrev={handlePrev}
          errors={errors}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  )
}