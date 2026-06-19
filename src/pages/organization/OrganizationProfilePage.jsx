import React, { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import {
  Building2,
  Mail,
  Globe,
  Users,
  MapPin,
  Clock,
  Edit3,
  Save,
  X,
  Upload,
  Loader2,
  CheckCircle,
  AlertCircle,
} from 'lucide-react'

/* ─── Components ─── */
const ProfileCard = ({ label, value, icon: Icon }) => (
  <motion.div
    initial={{ opacity: 0, y: 8 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex items-start gap-3 p-4 bg-white dark:bg-slate-800/50 rounded-xl
      border border-slate-100 dark:border-slate-700/50"
  >
    <div className="w-9 h-9 rounded-lg bg-[#2563EB]/10 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-[#2563EB]" />
    </div>
    <div className="min-w-0">
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5 truncate">
        {value || <span className="text-slate-400 italic">Not set</span>}
      </p>
    </div>
  </motion.div>
)

const AvatarUpload = ({ preview, onUpload }) => {
  const inputRef = React.useRef(null)
  const [dragging, setDragging] = useState(false)

  const validate = (file) => {
    const MAX_SIZE = 2 * 1024 * 1024
    const ACCEPTED = ['image/png', 'image/jpeg', 'image/svg+xml']
    if (!ACCEPTED.includes(file.type)) return 'Only PNG, JPG, SVG'
    if (file.size > MAX_SIZE) return 'Max 2MB'
    return null
  }

  const handleFile = (file) => {
    const err = validate(file)
    if (err) return alert(err)
    onUpload(file)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]) }}
        className={`relative w-20 h-20 rounded-full flex items-center justify-center overflow-hidden cursor-pointer
          border-2 border-dashed transition-all duration-200
          ${dragging
            ? 'border-[#2563EB] bg-[#2563EB]/5'
            : 'border-slate-300 dark:border-slate-600 hover:border-[#2563EB]/50 bg-slate-50 dark:bg-slate-800/50'
          }`}
      >
        {preview ? (
          <img src={preview} alt="Org logo" className="w-full h-full object-cover" />
        ) : (
          <Building2 className="w-8 h-8 text-slate-400" />
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
          <Upload className="w-5 h-5 text-white" />
        </div>
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden"
        onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])} />
    </div>
  )
}

/* ─── Mock Data ─── */
const MOCK_ORG = {
  name: 'Acme Corp',
  email: 'hello@acme.com',
  industry: 'Technology',
  size: '51-200 employees',
  country: 'United States',
  timezone: 'America/New_York',
  logo: null,
  createdAt: 'Jan 15, 2024',
  status: 'active',
}

/* ─── Main Page ─── */
const OrganizationProfilePage = () => {
  const [org, setOrg] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({})
  const [logoPreview, setLogoPreview] = useState(null)

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setOrg(MOCK_ORG)
      setForm(MOCK_ORG)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const handleLogoUpload = useCallback((file) => {
    const reader = new FileReader()
    reader.onloadend = () => setLogoPreview(reader.result)
    reader.readAsDataURL(file)
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      await new Promise((r) => setTimeout(r, 1200)) // API call
      setOrg({ ...form, logo: logoPreview || org?.logo })
      setEditing(false)
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setForm(org)
    setLogoPreview(null)
    setEditing(false)
  }

  /* ─── Loading ─── */
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
          <p className="text-sm text-slate-400">Loading profile...</p>
        </div>
      </div>
    )
  }

  /* ─── Empty / Error ─── */
  if (!org) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertCircle className="w-12 h-12 text-slate-300" />
        <p className="text-sm text-slate-400">Organization not found</p>
      </div>
    )
  }

  /* ─── Main Render ─── */
  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                {org.name}
              </h1>
              <p className="text-sm text-slate-400">Organization Profile</p>
            </div>
          </div>

          {!editing ? (
            <button onClick={() => setEditing(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-[#2563EB]
                hover:bg-[#2563EB]/5 rounded-xl transition-colors">
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={handleCancel}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-slate-600
                  dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
                <X className="w-4 h-4" />
                Cancel
              </button>
              <button onClick={handleSave} disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold text-white
                  bg-[#2563EB] hover:brightness-110 disabled:opacity-60 rounded-xl transition-all shadow-sm">
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Logo */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-8">
        <AvatarUpload
          preview={logoPreview || org.logo}
          onUpload={handleLogoUpload}
        />
      </motion.div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <ProfileCard label="Company Name" value={org.name} icon={Building2} />
        <ProfileCard label="Email" value={org.email} icon={Mail} />
        <ProfileCard label="Industry" value={org.industry} icon={Globe} />
        <ProfileCard label="Company Size" value={org.size} icon={Users} />
        <ProfileCard label="Country" value={org.country} icon={MapPin} />
        <ProfileCard label="Timezone" value={org.timezone} icon={Clock} />
      </div>

      {/* Bottom Meta */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="mt-8 flex items-center justify-between text-xs text-slate-400 border-t
          border-slate-100 dark:border-slate-700/50 pt-4">
        <span>Member since {org.createdAt}</span>
        <span className="flex items-center gap-1">
          <CheckCircle className="w-3 h-3 text-green-500" />
          {org.status}
        </span>
      </motion.div>
    </div>
  )
}

export default OrganizationProfilePage