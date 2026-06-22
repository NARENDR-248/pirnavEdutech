import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Moon, Sun, Bell, User, Menu, Search, ChevronDown,
  LogOut, Settings as SettingsIcon, HelpCircle, ChevronRight
} from 'lucide-react'
import { Link, useLocation, Outlet, useNavigate } from 'react-router-dom'
import { useThemeContext } from '../context/ThemeContext'
import Sidebar from '../components/dashboard/Sidebar'

// ─── BREADCRUMB GENERATION ──────────────────────────────────────────────────

const BREADCRUMB_MAP = {
  '/super-admin/dashboard':       ['Super Admin', 'Dashboard'],
  '/super-admin/organizations':   ['Super Admin', 'Organizations'],
  '/super-admin/employees':       ['Super Admin', 'Employees'],
  '/super-admin/subscriptions':   ['Super Admin', 'Subscriptions'],
  '/organization/dashboard':      ['Organization', 'Dashboard'],
  '/organization/employees':      ['Organization', 'Employees'],
  '/organization/departments':    ['Organization', 'Departments'],
  '/organization/teams':          ['Organization', 'Teams'],
  '/organization/skills':         ['Organization', 'Skills'],
  '/organization/goals':          ['Organization', 'Goals'],
  '/organization/performance':    ['Organization', 'Performance'],
  '/organization/settings':       ['Organization', 'Settings'],
  '/employee/dashboard':          ['Employee', 'Dashboard'],
  '/employee/skills':             ['Employee', 'My Skills'],
  '/employee/goals':              ['Employee', 'My Goals'],
  '/employee/career':             ['Employee', 'Career Path'],
  '/employee/learning':           ['Employee', 'Learning'],
  '/employee/reviews':            ['Employee', 'Reviews'],
  '/employee/profile':            ['Employee', 'Profile'],
  '/employee/settings':           ['Employee', 'Settings'],
}

// ─── ROLE DETECTION ─────────────────────────────────────────────────────────

function detectRole(pathname) {
  if (pathname.startsWith('/super-admin')) return 'super-admin'
  if (pathname.startsWith('/employee')) return 'employee'
  return 'org-admin'
}

const ROLE_LABELS = {
  'super-admin': { initials: 'SA', label: 'Super Admin', email: 'superadmin@talentsphere.io' },
  'org-admin':   { initials: 'AD', label: 'Admin User',  email: 'admin@acmecorp.com' },
  employee:      { initials: 'ND', label: 'Narendra',     email: 'narendra@acmecorp.com' },
}

// ─── HEADER COMPONENT ────────────────────────────────────────────────────────

function Header({ darkMode, onToggleDark, role, onMenuToggle, breadcrumbs }) {
  const [searchOpen, setSearchOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()
  const roleInfo = ROLE_LABELS[role] || ROLE_LABELS['org-admin']

  // Quick search suggestions
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    const all = [
      { label: 'Dashboard', path: `/${role}/dashboard`, icon: 'grid' },
      { label: 'Employees', path: `/${role === 'employee' ? 'organization' : role}/employees`, icon: 'users' },
      { label: 'Departments', path: '/organization/departments', icon: 'layers' },
      { label: 'Teams', path: '/organization/teams', icon: 'users' },
      { label: 'Settings', path: `/${role}/settings`, icon: 'settings' },
    ]
    return all.filter(item => item.label.toLowerCase().includes(q))
  }, [searchQuery, role])

  const NOTIFICATIONS = [
    { id: 'n1', title: 'New employee added', desc: 'Sarah joined Engineering', time: '5 min ago', unread: true },
    { id: 'n2', title: 'Goal completed', desc: 'Q4 Review submitted by 3 people', time: '1 hour ago', unread: true },
    { id: 'n3', title: 'Review pending', desc: '2 performance reviews awaiting your input', time: '3 hours ago', unread: false },
  ]

  return (
    <header className="sticky top-0 z-30 h-[72px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50">
      <div className="flex items-center justify-between h-full px-4 sm:px-6 gap-4">
        {/* Left: Menu toggle + Breadcrumbs */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle menu"
          >
            <Menu className="w-5 h-5 text-slate-500 dark:text-slate-400" />
          </button>

          {/* Breadcrumbs */}
          <nav className="flex items-center gap-1.5 text-sm min-w-0" aria-label="Breadcrumb">
            <Link to="/" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </Link>
            {breadcrumbs.map((crumb, i) => (
              <div key={i} className="flex items-center gap-1.5 min-w-0">
                <ChevronRight className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600 shrink-0" />
                <span className={`truncate ${
                  i === breadcrumbs.length - 1
                    ? 'text-slate-900 dark:text-white font-semibold'
                    : 'text-slate-400'
                }`}>
                  {crumb}
                </span>
              </div>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          {/* Global Search */}
          <div className="relative hidden sm:block">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800/50 hover:bg-slate-200 dark:hover:bg-slate-700/50 transition-colors text-xs text-slate-400 min-w-[180px]"
            >
              <Search className="w-4 h-4" />
              <span>Search anything...</span>
              <kbd className="ml-auto px-1.5 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-[10px] font-semibold text-slate-400">⌘K</kbd>
            </button>

            <AnimatePresence>
              {searchOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden"
                >
                  <div className="p-3 border-b border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-xl">
                      <Search className="w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Search pages, people..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-1 bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto p-2">
                    {searchResults.length > 0 ? searchResults.map((r, i) => (
                      <button
                        key={i}
                        onClick={() => { navigate(r.path); setSearchOpen(false); setSearchQuery('') }}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
                      >
                        <div className="w-6 h-6 rounded-lg bg-[#2563EB]/10 flex items-center justify-center">
                          <div className={`w-3 h-3 rounded-sm ${r.icon === 'grid' ? 'bg-[#2563EB]' : r.icon === 'users' ? 'bg-[#8B5CF6]' : r.icon === 'layers' ? 'bg-[#10B981]' : 'bg-[#F59E0B]'}`} />
                        </div>
                        {r.label}
                      </button>
                    )) : searchQuery ? (
                      <p className="px-3 py-6 text-center text-xs text-slate-400">No results found</p>
                    ) : (
                      <p className="px-3 py-6 text-center text-xs text-slate-400">Type to search...</p>
                    )}
                  </div>
                  <div className="p-2 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-3 px-3 py-2 text-[10px] text-slate-400">
                    <span><kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">↑↓</kbd> Navigate</span>
                    <span><kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">↵</kbd> Open</span>
                    <span><kbd className="px-1 py-0.5 rounded bg-slate-200 dark:bg-slate-700 font-mono">Esc</kbd> Close</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDark}
            className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle theme"
          >
            {darkMode ? (
              <Sun className="w-[18px] h-[18px] text-amber-400" />
            ) : (
              <Moon className="w-[18px] h-[18px] text-slate-500" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-[18px] h-[18px] text-slate-500 dark:text-slate-400" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white dark:ring-slate-900" />
            </button>

            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden"
                >
                  <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
                    <span className="text-sm font-bold text-slate-900 dark:text-white">Notifications</span>
                    <span className="text-[10px] font-semibold text-[#2563EB] cursor-pointer hover:underline">Mark all read</span>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {NOTIFICATIONS.map((n) => (
                      <div key={n.id} className={`flex items-start gap-3 px-4 py-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors cursor-pointer ${n.unread ? 'bg-[#2563EB]/[0.02]' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${n.unread ? 'bg-[#2563EB]/10' : 'bg-slate-100 dark:bg-slate-800'}`}>
                          <Bell className={`w-4 h-4 ${n.unread ? 'text-[#2563EB]' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm ${n.unread ? 'font-semibold text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>{n.title}</p>
                          <p className="text-xs text-slate-400 mt-0.5">{n.desc}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                        </div>
                        {n.unread && <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] shrink-0 mt-2" />}
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-3 border-t border-slate-100 dark:border-slate-700/50 text-center">
                    <button className="text-xs font-semibold text-[#2563EB] hover:underline">View All Notifications</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Profile Menu */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shadow-sm">
                <span className="text-[10px] font-bold text-white">{roleInfo.initials}</span>
              </div>
              <div className="hidden sm:block text-left">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-tight">{roleInfo.label}</p>
                <p className="text-[10px] text-slate-400 leading-tight truncate max-w-[120px]">{roleInfo.email}</p>
              </div>
              <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-slate-400" />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full right-0 mt-2 w-56 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-2xl shadow-slate-900/10 dark:shadow-black/30 overflow-hidden"
                >
                  <div className="p-3 border-b border-slate-100 dark:border-slate-700/50">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{roleInfo.initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-900 dark:text-white">{roleInfo.label}</p>
                        <p className="text-xs text-slate-400">{roleInfo.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-2">
                    <Link to={`/${role}/profile`} onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <User className="w-4 h-4" /> Profile
                    </Link>
                    <Link to={`/${role}/settings`} onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <SettingsIcon className="w-4 h-4" /> Settings
                    </Link>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                      <HelpCircle className="w-4 h-4" /> Help & Support
                    </button>
                  </div>
                  <div className="p-2 border-t border-slate-100 dark:border-slate-700/50">
                    <Link to="/login" onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                      <LogOut className="w-4 h-4" /> Logout
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}

// ─── MAIN LAYOUT ────────────────────────────────────────────────────────────

export default function DashboardLayout() {
  const { isDark: darkMode, toggle: toggleDarkMode } = useThemeContext()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const location = useLocation()
  const role = detectRole(location.pathname)

  // Breadcrumbs
  const breadcrumbs = BREADCRUMB_MAP[location.pathname] || ['Dashboard']

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300 flex">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          role={role}
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 lg:hidden"
            >
              <Sidebar
                role={role}
                collapsed={false}
                onToggle={() => setMobileSidebarOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          darkMode={darkMode}
          onToggleDark={toggleDarkMode}
          role={role}
          onMenuToggle={() => setMobileSidebarOpen(true)}
          breadcrumbs={breadcrumbs}
        />

        {/* Page Content */}
        <motion.main
          key={location.pathname}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="flex-1"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  )
}
