import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Building2,
  Mail,
  Bell,
  Shield,
  Users,
  CreditCard,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  ToggleLeft,
  ToggleRight,
  Globe,
  Clock,
  MapPin,
  Plus,
  X,
  LogOut,
} from 'lucide-react'

/* ═══════════════════════════════════════════
   DATA & CONSTANTS
   ═══════════════════════════════════════════ */

const TABS = [
  { id: 'general', label: 'General', icon: Building2 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'danger', label: 'Danger Zone', icon: AlertTriangle },
]

const INDUSTRIES = [
  { value: 'tech', label: 'Technology' },
  { value: 'finance', label: 'Finance' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'education', label: 'Education' },
  { value: 'ecommerce', label: 'E-commerce' },
  { value: 'other', label: 'Other' },
]

const NOTIFICATION_EVENTS = [
  { id: 'member_joined', label: 'New team member joins' },
  { id: 'member_left', label: 'Team member leaves' },
  { id: 'settings_changed', label: 'Organization settings changed' },
  { id: 'billing_update', label: 'Billing update or invoice' },
  { id: 'security_alert', label: 'Security alert' },
  { id: 'weekly_report', label: 'Weekly summary report' },
]

const TEAM_MEMBERS = [
  { id: 1, name: 'Alex Johnson', email: 'alex@acme.com', role: 'Admin', status: 'active' },
  { id: 2, name: 'Sarah Chen', email: 'sarah@acme.com', role: 'Editor', status: 'active' },
  { id: 3, name: 'Mike Rivera', email: 'mike@acme.com', role: 'Viewer', status: 'pending' },
]

const ROLES = ['Admin', 'Editor', 'Viewer']

const PLANS = [
  { name: 'Free', price: '$0', users: 'Up to 3', features: ['Basic integrations', '1 project'] },
  { name: 'Pro', price: '$29', users: 'Up to 15', features: ['All integrations', 'Unlimited projects', 'Priority support'] },
  { name: 'Enterprise', price: '$99', users: 'Unlimited', features: ['Everything in Pro', 'SSO', 'Custom SLA', 'Dedicated support'] },
]

/* ═══════════════════════════════════════════
   SUB-COMPONENTS
   ═══════════════════════════════════════════ */

const SectionHeader = ({ title, description }) => (
  <div className="mb-6">
    <h3 className="text-lg font-bold text-slate-900 dark:text-white">{title}</h3>
    {description && <p className="text-sm text-slate-400 mt-1">{description}</p>}
  </div>
)

const InputField = ({ label, type = 'text', value, onChange, icon: Icon, error, placeholder }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      )}
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full px-4 py-2.5 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
          border ${error ? 'border-red-500 ring-2 ring-red-500/20' : 'border-slate-200 dark:border-slate-700'}
          rounded-xl text-sm text-slate-900 dark:text-white placeholder:text-slate-400
          focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all`} />
    </div>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
)

const SelectField = ({ label, value, onChange, options, icon: Icon, placeholder }) => (
  <div className="space-y-1.5">
    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{label}</label>
    <div className="relative">
      {Icon && (
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
          <Icon className="w-4 h-4 text-slate-400" />
        </div>
      )}
      <select value={value} onChange={onChange}
        className={`w-full px-4 py-2.5 ${Icon ? 'pl-10' : ''} bg-white dark:bg-slate-800/50
          border border-slate-200 dark:border-slate-700 rounded-xl text-sm
          text-slate-900 dark:text-white appearance-none cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all`}>
        <option value="" disabled>{placeholder || 'Select...'}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none">
        <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  </div>
)

const Toggle = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between py-3">
    <div className="pr-4">
      <p className="text-sm font-medium text-slate-900 dark:text-white">{label}</p>
      {description && <p className="text-xs text-slate-400 mt-0.5">{description}</p>}
    </div>
    <button onClick={onChange}
      className={`relative w-11 h-6 rounded-full transition-colors duration-200 shrink-0
        ${checked ? 'bg-[#2563EB]' : 'bg-slate-300 dark:bg-slate-600'}`}>
      <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow-sm
        transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'}`} />
    </button>
  </div>
)

const Badge = ({ variant = 'default', children }) => {
  const styles = {
    default: 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300',
    success: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
    warning: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
    danger: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
  }
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[variant]}`}>
      {children}
    </span>
  )
}

const ConfirmDialog = ({ open, title, message, onConfirm, onCancel, loading }) => {
  if (!open) return null
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
        className="bg-white dark:bg-slate-800 rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
        <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-center text-slate-900 dark:text-white">{title}</h3>
        <p className="text-sm text-slate-400 text-center mt-2">{message}</p>
        <div className="flex gap-3 mt-6">
          <button onClick={onCancel} disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-medium text-slate-600 dark:text-slate-300
              bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={onConfirm} disabled={loading}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700
              disabled:opacity-60 rounded-xl transition-colors">
            {loading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : 'Confirm'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

const Toast = ({ message, type = 'success', show, onClose }) => (
  <AnimatePresence>
    {show && (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-lg
          ${type === 'success' ? 'bg-green-600' : type === 'error' ? 'bg-red-600' : 'bg-slate-800'}`}>
        {type === 'success' ? <CheckCircle className="w-5 h-5 text-white" /> :
         type === 'error' ? <AlertTriangle className="w-5 h-5 text-white" /> : null}
        <span className="text-sm font-medium text-white">{message}</span>
        <button onClick={onClose} className="ml-2 text-white/70 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    )}
  </AnimatePresence>
)

/* ═══════════════════════════════════════════
   TAB CONTENT COMPONENTS
   ═══════════════════════════════════════════ */

const GeneralSettings = ({ form, onChange, onSave, saving }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <SectionHeader title="General Information" description="Manage your organization's basic details" />
    <div className="space-y-4">
      <InputField label="Organization Name" value={form.name} onChange={(e) => onChange('name', e.target.value)} icon={Building2} />
      <InputField label="Organization Email" type="email" value={form.email} onChange={(e) => onChange('email', e.target.value)} icon={Mail} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField label="Industry" value={form.industry} onChange={(e) => onChange('industry', e.target.value)} options={INDUSTRIES} icon={Globe} />
        <SelectField label="Timezone" value={form.timezone} onChange={(e) => onChange('timezone', e.target.value)}
          options={[
            { value: 'UTC', label: 'UTC' },
            { value: 'America/New_York', label: 'Eastern (EST)' },
            { value: 'America/Chicago', label: 'Central (CST)' },
            { value: 'America/Denver', label: 'Mountain (MST)' },
            { value: 'America/Los_Angeles', label: 'Pacific (PST)' },
            { value: 'Europe/London', label: 'London (GMT)' },
            { value: 'Europe/Berlin', label: 'Berlin (CET)' },
            { value: 'Asia/Tokyo', label: 'Tokyo (JST)' },
          ]} icon={Clock} />
      </div>
      <SelectField label="Country" value={form.country} onChange={(e) => onChange('country', e.target.value)}
        options={[
          { value: 'US', label: 'United States' },
          { value: 'UK', label: 'United Kingdom' },
          { value: 'CA', label: 'Canada' },
          { value: 'DE', label: 'Germany' },
          { value: 'JP', label: 'Japan' },
          { value: 'AU', label: 'Australia' },
        ]} icon={MapPin} />
    </div>
    <div className="mt-6 flex justify-end">
      <button onClick={onSave} disabled={saving}
        className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white
          bg-[#2563EB] hover:brightness-110 disabled:opacity-60 rounded-xl transition-all shadow-sm">
        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        {saving ? 'Saving...' : 'Save Changes'}
      </button>
    </div>
  </motion.div>
)

const NotificationSettings = ({ prefs, onToggle }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <SectionHeader title="Notification Preferences" description="Choose what updates you receive" />
    <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 px-4 divide-y divide-slate-100 dark:divide-slate-700/50">
      {NOTIFICATION_EVENTS.map((event) => (
        <Toggle key={event.id}
          label={event.label}
          checked={prefs[event.id]}
          onChange={() => onToggle(event.id)} />
      ))}
    </div>
    <div className="mt-4">
      <Toggle label="Email digest" description="Receive a daily digest instead of instant emails"
        checked={prefs.digest} onChange={() => onToggle('digest')} />
    </div>
  </motion.div>
)

const SecuritySettings = () => {
  const [twoFactor, setTwoFactor] = useState(false)
  const [sessionExpiry, setSessionExpiry] = useState('24h')
  const [showPasswordForm, setShowPasswordForm] = useState(false)
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionHeader title="Security" description="Protect your organization's data" />

      {/* Password */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 mb-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900 dark:text-white">Password</p>
            <p className="text-xs text-slate-400">Last changed 3 months ago</p>
          </div>
          <button onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-sm font-medium text-[#2563EB] hover:underline">
            {showPasswordForm ? 'Cancel' : 'Change'}
          </button>
        </div>
        <AnimatePresence>
          {showPasswordForm && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
              <div className="space-y-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-700/50">
                <InputField label="Current Password" type="password" value={passwords.current}
                  onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} icon={Shield} />
                <InputField label="New Password" type="password" value={passwords.new}
                  onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} icon={EyeOff} />
                <InputField label="Confirm New Password" type="password" value={passwords.confirm}
                  onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} icon={EyeOff} />
                <button className="w-full px-4 py-2.5 text-sm font-semibold text-white bg-[#2563EB]
                  hover:brightness-110 rounded-xl transition-all">Update Password</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 2FA */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 mb-4">
        <Toggle label="Two-Factor Authentication (2FA)"
          description="Add an extra layer of security to your account"
          checked={twoFactor} onChange={() => setTwoFactor(!twoFactor)} />
      </div>

      {/* Session */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4">
        <SelectField label="Session Expiry" value={sessionExpiry} onChange={(e) => setSessionExpiry(e.target.value)}
          options={[
            { value: '1h', label: '1 hour' },
            { value: '4h', label: '4 hours' },
            { value: '24h', label: '24 hours' },
            { value: '7d', label: '7 days' },
            { value: '30d', label: '30 days' },
          ]} />
      </div>
    </motion.div>
  )
}

const TeamSettings = () => {
  const [members, setMembers] = useState(TEAM_MEMBERS)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('Editor')
  const [showInvite, setShowInvite] = useState(false)

  const removeMember = (id) => setMembers(members.filter((m) => m.id !== id))
  const changeRole = (id, role) => setMembers(members.map((m) => m.id === id ? { ...m, role } : m))

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center justify-between mb-6">
        <SectionHeader title="Team Members" description="Manage who has access to your organization" />
        <button onClick={() => setShowInvite(!showInvite)}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white
            bg-[#2563EB] hover:brightness-110 rounded-xl transition-all shadow-sm">
          <Plus className="w-4 h-4" />
          Invite
        </button>
      </div>

      {/* Invite Form */}
      <AnimatePresence>
        {showInvite && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }} className="overflow-hidden mb-4">
            <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4">
              <div className="flex gap-3">
                <div className="flex-1">
                  <input type="email" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="w-full px-4 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200
                      dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2
                      focus:ring-[#2563EB]/30 focus:border-[#2563EB] transition-all" />
                </div>
                <select value={inviteRole} onChange={(e) => setInviteRole(e.target.value)}
                  className="px-3 py-2.5 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700
                    rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 appearance-none cursor-pointer">
                  {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
                <button className="px-4 py-2.5 text-sm font-semibold text-white bg-[#2563EB]
                  hover:brightness-110 rounded-xl transition-all">Send</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Members List */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 divide-y divide-slate-100 dark:divide-slate-700/50">
        {members.map((member) => (
          <div key={member.id} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#2563EB]/20 to-[#7C3AED]/20
                flex items-center justify-center text-sm font-bold text-[#2563EB]">
                {member.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-900 dark:text-white">{member.name}</p>
                <p className="text-xs text-slate-400">{member.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant={member.status === 'active' ? 'success' : 'warning'}>
                {member.status}
              </Badge>
              <select value={member.role} onChange={(e) => changeRole(member.id, e.target.value)}
                className="px-2 py-1 text-xs bg-transparent border border-slate-200 dark:border-slate-600
                  rounded-lg cursor-pointer focus:outline-none">
                {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
              </select>
              <button onClick={() => removeMember(member.id)}
                className="text-slate-400 hover:text-red-500 transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const BillingSettings = () => {
  const [plan, setPlan] = useState('Pro')

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionHeader title="Billing & Plan" description="Manage your subscription and payment methods" />

      {/* Current Plan */}
      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4 mb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-400">Current Plan</p>
            <p className="text-xl font-bold text-slate-900 dark:text-white">{plan}</p>
          </div>
          <Badge variant="success">Active</Badge>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {PLANS.map((p) => (
          <div key={p.name} onClick={() => setPlan(p.name)}
            className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
              ${plan === p.name
                ? 'border-[#2563EB] bg-[#2563EB]/5 shadow-sm shadow-[#2563EB]/20'
                : 'border-slate-100 dark:border-slate-700/50 bg-white dark:bg-slate-800/50 hover:border-[#2563EB]/30'
              }`}>
            <p className="text-sm font-medium text-slate-400">{p.name}</p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">
              {p.price}<span className="text-sm font-normal text-slate-400">/mo</span>
            </p>
            <p className="text-xs text-slate-400 mt-1">{p.users}</p>
            <ul className="mt-3 space-y-1.5">
              {p.features.map((f, i) => (
                <li key={i} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                  <CheckCircle className="w-3 h-3 text-green-500" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

const DangerZone = () => {
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    setDeleting(true)
    await new Promise((r) => setTimeout(r, 1500))
    setDeleting(false)
    setConfirmOpen(false)
    alert('Organization deleted (demo)')
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <SectionHeader title="Danger Zone" description="Irreversible actions — proceed with caution" />

      <div className="bg-white dark:bg-slate-800/50 rounded-xl border border-red-200 dark:border-red-900/30 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center shrink-0">
              <Trash2 className="w-4 h-4 text-red-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Delete Organization</p>
              <p className="text-xs text-slate-400 mt-0.5">
                Permanently delete your organization and all of its data. This action cannot be undone.
              </p>
            </div>
          </div>
          <button onClick={() => setConfirmOpen(true)}
            className="px-4 py-2 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-colors shrink-0">
            Delete
          </button>
        </div>
      </div>

      <div className="mt-4 bg-white dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700/50 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-lg bg-slate-100 dark:bg-slate-700 flex items-center justify-center shrink-0">
              <LogOut className="w-4 h-4 text-slate-500" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-900 dark:text-white">Leave Organization</p>
              <p className="text-xs text-slate-400 mt-0.5">Remove yourself from this organization</p>
            </div>
          </div>
          <button className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-300
            bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-xl transition-colors shrink-0">
            Leave
          </button>
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        title="Delete Organization?"
        message="This will permanently delete all data, projects, and team members. Are you sure?"
        onConfirm={handleDelete}
        onCancel={() => setConfirmOpen(false)}
        loading={deleting} />
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   MAIN PAGE COMPONENT
   ═══════════════════════════════════════════ */

const OrganizationSettingsPage = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' })

  const [form, setForm] = useState({
    name: 'Acme Corp',
    email: 'hello@acme.com',
    industry: 'tech',
    timezone: 'America/New_York',
    country: 'US',
  })

  const [notifPrefs, setNotifPrefs] = useState({
    member_joined: true,
    member_left: false,
    settings_changed: true,
    billing_update: true,
    security_alert: true,
    weekly_report: false,
    digest: true,
  })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500)
    return () => clearTimeout(timer)
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type })
    setTimeout(() => setToast({ show: false, message: '', type: 'success' }), 3000)
  }

  const handleChange = (field, value) => setForm({ ...form, [field]: value })

  const handleSaveGeneral = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    showToast('Settings saved successfully')
  }

  const handleNotifToggle = (id) => setNotifPrefs({ ...notifPrefs, [id]: !notifPrefs[id] })

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
      </div>
    )
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general': return <GeneralSettings form={form} onChange={handleChange} onSave={handleSaveGeneral} saving={saving} />
      case 'notifications': return <NotificationSettings prefs={notifPrefs} onToggle={handleNotifToggle} />
      case 'security': return <SecuritySettings />
      case 'team': return <TeamSettings />
      case 'billing': return <BillingSettings />
      case 'danger': return <DangerZone />
      default: return null
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#7C3AED]/10 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-[#2563EB]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Organization Settings</h1>
            <p className="text-sm text-slate-400">Manage your organization preferences</p>
          </div>
        </div>
      </motion.div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-1 mb-8 p-1 bg-slate-100 dark:bg-slate-800/50 rounded-xl">
        {TABS.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200
              ${activeTab === tab.id
                ? 'bg-white dark:bg-slate-700 text-[#2563EB] shadow-sm'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
              }`}>
            <tab.icon className="w-4 h-4" />
            <span className="hidden sm:inline">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {renderTabContent()}
        </AnimatePresence>
      </div>

      {/* Toast */}
      <Toast {...toast} onClose={() => setToast({ ...toast, show: false })} />
    </div>
  )
}

export default OrganizationSettingsPage