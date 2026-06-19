import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Lock,
  CheckCircle,
  Eye,
  EyeOff,
  Shield,
  X,
  Save,
  AlertCircle,
  KeyRound,
} from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Card from '../../components/common/Card'
import { Input, Button } from '../../components/common/FormElements'

const REQUIREMENTS = [
  { id: 'min', label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { id: 'upper', label: 'One uppercase letter', test: (v) => /[A-Z]/.test(v) },
  { id: 'lower', label: 'One lowercase letter', test: (v) => /[a-z]/.test(v) },
  { id: 'number', label: 'One number', test: (v) => /[0-9]/.test(v) },
  { id: 'special', label: 'One special character', test: (v) => /[!@#$%^&*(),.?":{}|<>]/.test(v) },
]

function getStrength(password) {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[A-Z]/.test(password)) score++
  if (/[a-z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score++

  if (score <= 2) return { label: 'Weak', color: '#EF4444', width: '25%' }
  if (score <= 4) return { label: 'Medium', color: '#F59E0B', width: '50%' }
  if (score <= 5) return { label: 'Strong', color: '#10B981', width: '75%' }
  return { label: 'Very Strong', color: '#10B981', width: '100%' }
}

export default function ProfileChangePassword() {
  const [form, setForm] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' })
  const [show, setShow] = useState({ old: false, new: false, confirm: false })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const strength = getStrength(form.newPassword)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.oldPassword) {
      setError('Please enter your current password')
      return
    }

    const failed = REQUIREMENTS.filter((r) => !r.test(form.newPassword))
    if (failed.length > 0) {
      setError('Please meet all password requirements')
      return
    }

    if (form.newPassword !== form.confirmPassword) {
      setError('New passwords do not match')
      return
    }

    if (form.oldPassword === form.newPassword) {
      setError('New password must be different from current password')
      return
    }

    setLoading(true)
    await new Promise((r) => setTimeout(r, 1500))
    setLoading(false)
    setSuccess(true)
    setForm({ oldPassword: '', newPassword: '', confirmPassword: '' })

    setTimeout(() => setSuccess(false), 4000)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PageHeader
        title="Change Password"
        subtitle="Update your account password"
        icon={KeyRound}
      />

      <Card>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 mb-6 bg-[#10B981]/10 border border-[#10B981]/20 rounded-xl"
          >
            <CheckCircle className="w-5 h-5 text-[#10B981] shrink-0" />
            <div>
              <p className="text-sm font-medium text-[#10B981]">Password updated successfully</p>
              <p className="text-xs text-slate-400 mt-0.5">Your password has been changed.</p>
            </div>
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Current Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Current Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={show.old ? 'text' : 'password'}
                value={form.oldPassword}
                onChange={(e) => setForm({ ...form, oldPassword: e.target.value })}
                placeholder="Enter your current password"
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, old: !show.old })}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {show.old ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="border-t border-slate-100 dark:border-slate-700/50 pt-5" />

          {/* New Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              New Password
            </label>
            <div className="relative">
              <Shield className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={show.new ? 'text' : 'password'}
                value={form.newPassword}
                onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
                placeholder="Enter new password"
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, new: !show.new })}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {show.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Password Strength */}
          {form.newPassword && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
              <div className="h-1.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: strength.width }}
                  className="h-full rounded-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${strength.color}, ${strength.color}88)` }}
                />
              </div>
              <p className="text-xs font-medium" style={{ color: strength.color }}>{strength.label}</p>
            </motion.div>
          )}

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
              Confirm New Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type={show.confirm ? 'text' : 'password'}
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                placeholder="Confirm new password"
                className="w-full pl-10 pr-10 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all"
              />
              <button
                type="button"
                onClick={() => setShow({ ...show, confirm: !show.confirm })}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {show.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Requirements Checklist */}
          {form.newPassword && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-1.5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password Requirements</p>
              {REQUIREMENTS.map((req) => {
                const passed = req.test(form.newPassword)
                return (
                  <div key={req.id} className="flex items-center gap-2">
                    {passed ? (
                      <CheckCircle className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                    ) : (
                      <X className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    )}
                    <span className={`text-xs ${passed ? 'text-[#10B981]' : 'text-slate-400'}`}>
                      {req.label}
                    </span>
                  </div>
                )
              })}
            </motion.div>
          )}

          {/* Error */}
          {error && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-1 text-xs text-[#EF4444]">
              <AlertCircle className="w-3 h-3" />
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <div className="flex justify-end pt-2 border-t border-slate-100 dark:border-slate-700/50">
            <Button type="submit" loading={loading} icon={Save}>
              Update Password
            </Button>
          </div>
        </form>
      </Card>
    </div>
  )
}
