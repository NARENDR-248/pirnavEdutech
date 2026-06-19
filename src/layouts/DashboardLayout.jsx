import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Moon, Sun, Bell, User, Menu, X, LogIn } from 'lucide-react'
import { Link, useLocation, Outlet } from 'react-router-dom'

const NAV_ITEMS = [
  { path: '/organization/overview', label: 'Overview' },
  { path: '/organization/profile', label: 'Profile' },
  { path: '/organization/branches', label: 'Branches' },
  { path: '/organization/departments', label: 'Departments' },
  { path: '/organization/teams', label: 'Teams' },
  { path: '/organization/settings', label: 'Settings' },
]

export default function DashboardLayout({ children }) {
  const [darkMode, setDarkMode] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = stored ? stored === 'dark' : prefersDark
    setDarkMode(isDark)
    document.documentElement.classList.toggle('dark', isDark)
  }, [])

  const toggleDarkMode = () => {
    const next = !darkMode
    setDarkMode(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0F172A] transition-colors duration-300">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="h-16 flex items-center justify-between">
            {/* Logo + Desktop Nav */}
            <div className="flex items-center gap-8">
              <Link to="/organization/overview" className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">H</span>
                </div>
                <span className="font-bold text-lg text-slate-900 dark:text-white hidden sm:block">
                  HRMS
                </span>
              </Link>

              {/* Desktop Nav */}
              <nav className="hidden md:flex items-center gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = location.pathname === item.path
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`relative px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200
                        ${
                          isActive
                            ? 'text-white'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="navPill"
                          className="absolute inset-0 bg-[#2563EB] rounded-xl"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Toggle theme"
              >
                {darkMode ? (
                  <Sun className="w-4 h-4 text-slate-400" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-500" />
                )}
              </button>

              <Link
                to="/login"
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:flex items-center gap-2"
              >
                <LogIn className="w-4 h-4 text-slate-500 dark:text-slate-400" />
              </Link>

              <button className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative hidden sm:block">
                <Bell className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
              </button>

              <button className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300 hidden sm:block">
                  Admin
                </span>
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-slate-500" />
                ) : (
                  <Menu className="w-5 h-5 text-slate-500" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900"
          >
            <nav className="px-4 py-3 space-y-1">
              {NAV_ITEMS.map((item) => {
                const isActive = location.pathname === item.path
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block px-3 py-2.5 text-sm font-medium rounded-xl transition-all
                      ${
                        isActive
                          ? 'bg-[#2563EB] text-white'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    {item.label}
                  </Link>
                )
              })}
            </nav>
          </motion.div>
        )}
      </header>

      {/* Page Content */}
      <motion.main
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Outlet />
      </motion.main>
    </div>
  )
}