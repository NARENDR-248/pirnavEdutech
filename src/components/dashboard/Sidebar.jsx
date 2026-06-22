import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

// ─── ROLE-BASED MENU CONFIGURATION ──────────────────────────────────────────

const MENU_CONFIG = {
  'super-admin': {
    label: 'Super Admin',
    items: [
      { label: 'Dashboard',    icon: 'LayoutDashboard', path: '/super-admin/dashboard' },
      { label: 'Organizations', icon: 'Building2',       path: '/super-admin/organizations' },
      { label: 'Employees',    icon: 'Users',            path: '/super-admin/employees' },
      { label: 'Subscriptions',icon: 'CreditCard',       path: '/super-admin/subscriptions' },
      { label: 'Analytics',    icon: 'BarChart3',        path: '/super-admin/analytics' },
      { label: 'Reports',      icon: 'FileText',         path: '/super-admin/reports' },
      { label: 'Settings',     icon: 'Settings',         path: '/super-admin/settings' },
    ],
  },
  'org-admin': {
    label: 'Admin',
    items: [
      { label: 'Dashboard',    icon: 'LayoutDashboard', path: '/organization/dashboard' },
      { label: 'Employees',    icon: 'Users',            path: '/organization/employees' },
      { label: 'Departments',  icon: 'Layers',           path: '/organization/departments' },
      { label: 'Teams',        icon: 'UsersRound',       path: '/organization/teams' },
      { label: 'Skills',       icon: 'Brain',            path: '/organization/skills' },
      { label: 'Goals',        icon: 'Target',           path: '/organization/goals' },
      { label: 'Performance',  icon: 'TrendingUp',       path: '/organization/performance' },
      { label: 'Reports',      icon: 'FileText',         path: '/organization/reports' },
      { label: 'Settings',     icon: 'Settings',         path: '/organization/settings' },
    ],
  },
  employee: {
    label: 'Employee',
    items: [
      { label: 'Dashboard',    icon: 'LayoutDashboard', path: '/employee/dashboard' },
      { label: 'My Skills',    icon: 'Brain',            path: '/employee/skills' },
      { label: 'My Goals',     icon: 'Target',           path: '/employee/goals' },
      { label: 'Career Path',  icon: 'TrendingUp',       path: '/employee/career' },
      { label: 'Learning',     icon: 'BookOpen',         path: '/employee/learning' },
      { label: 'Reviews',      icon: 'ClipboardCheck',   path: '/employee/reviews' },
      { label: 'Profile',      icon: 'User',             path: '/employee/profile' },
      { label: 'Settings',     icon: 'Settings',         path: '/employee/settings' },
    ],
  },
}

// ─── ICON MAP ────────────────────────────────────────────────────────────────

function MenuIcon({ name, className = 'w-5 h-5' }) {
  const icons = {
    LayoutDashboard: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" /><rect x="14" y="3" width="7" height="5" /><rect x="14" y="12" width="7" height="9" /><rect x="3" y="16" width="7" height="5" />
      </svg>
    ),
    Building2: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 22V4a2 2 0 012-2h8a2 2 0 012 2v18" /><path d="M6 12H4a2 2 0 00-2 2v6a2 2 0 002 2h2" /><path d="M18 9h2a2 2 0 012 2v9a2 2 0 01-2 2h-2" /><path d="M10 6h4" /><path d="M10 10h4" /><path d="M10 14h4" /><path d="M10 18h4" />
      </svg>
    ),
    Users: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    CreditCard: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><line x1="1" y1="10" x2="23" y2="10" />
      </svg>
    ),
    BarChart3: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
    FileText: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    Settings: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
      </svg>
    ),
    Layers: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    UsersRound: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87" /><path d="M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    Brain: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9.5 2A2.5 2.5 0 0112 4.5v15a2.5 2.5 0 01-4.96.44 2.5 2.5 0 01-2.04-2.04 2.5 2.5 0 01-.44-4.96A2.5 2.5 0 019.5 2z" /><path d="M14.5 2A2.5 2.5 0 0012 4.5v15a2.5 2.5 0 004.96.44 2.5 2.5 0 002.04-2.04 2.5 2.5 0 01.44-4.96A2.5 2.5 0 0014.5 2z" />
      </svg>
    ),
    Target: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
      </svg>
    ),
    TrendingUp: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
      </svg>
    ),
    BookOpen: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    ClipboardCheck: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" /><rect x="8" y="2" width="8" height="4" rx="1" ry="1" /><path d="M9 14l2 2 4-4" />
      </svg>
    ),
    User: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" />
      </svg>
    ),
    LogOut: (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
      </svg>
    ),
  }
  return icons[name] || <div className={className} />
}

// ─── SIDEBAR COMPONENT ─────────────────────────────────────────────────────

export default function Sidebar({ role = 'org-admin', collapsed, onToggle }) {
  const location = useLocation()
  const config = MENU_CONFIG[role] || MENU_CONFIG['org-admin']

  const isActive = (path) => {
    if (path === '/super-admin/dashboard' || path === '/organization/dashboard' || path === '/employee/dashboard') {
      return location.pathname === path
    }
    return location.pathname.startsWith(path)
  }

  return (
    <aside
      className={`relative z-40 flex flex-col bg-white dark:bg-slate-900/95 border-r border-slate-200 dark:border-slate-700/50 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        collapsed ? 'w-[72px]' : 'w-[260px]'
      }`}
    >
      {/* Logo Area */}
      <div className={`flex items-center h-[72px] shrink-0 border-b border-slate-200 dark:border-slate-700/50 px-4 ${
        collapsed ? 'justify-center' : 'justify-between'
      }`}>
        <Link to={`/${role}/dashboard`} className={`flex items-center gap-2.5 ${collapsed ? 'justify-center' : ''}`}>
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#7C3AED] flex items-center justify-center shrink-0 shadow-lg shadow-[#2563EB]/20">
            <span className="text-white font-bold text-sm">T</span>
          </div>
          {!collapsed && (
            <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
              Talent<span className="text-[#2563EB]">Sphere</span>
            </span>
          )}
        </Link>
        {!collapsed && (
          <button
            onClick={onToggle}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Collapse sidebar"
          >
            <svg className="w-4 h-4 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}
      </div>

      {/* Role Badge */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-lg bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] animate-pulse" />
            {config.label}
          </span>
        </div>
      )}

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5 scrollbar-hide">
        {config.items.map((item) => {
          const active = isActive(item.path)
          return (
            <Link key={item.path} to={item.path} className="block">
              <div className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                active
                  ? 'text-white'
                  : 'text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50'
              }`}>
                {active && (
                  <motion.div
                    layoutId="sidebarPill"
                    className="absolute inset-0 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] rounded-xl shadow-lg shadow-[#2563EB]/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-3">
                  <MenuIcon name={item.icon} className={`w-[18px] h-[18px] ${active ? 'text-white' : ''}`} />
                  {!collapsed && (
                    <span className="text-sm font-medium whitespace-nowrap">{item.label}</span>
                  )}
                </div>
                {collapsed && active && (
                  <span className="absolute -right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#2563EB]" />
                )}
              </div>
            </Link>
          )
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="shrink-0 border-t border-slate-200 dark:border-slate-700/50 px-3 py-3 space-y-0.5">
        <Link to={`/${role}/profile`} className="block">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all duration-200 group">
            <MenuIcon name="User" className="w-[18px] h-[18px]" />
            {!collapsed && <span className="text-sm font-medium">Profile</span>}
          </div>
        </Link>
        <Link to="/login" className="block">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-400 dark:text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-all duration-200 group">
            <MenuIcon name="LogOut" className="w-[18px] h-[18px]" />
            {!collapsed && <span className="text-sm font-medium">Logout</span>}
          </div>
        </Link>
      </div>

      {/* Collapse toggle button when collapsed */}
      {collapsed && (
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          aria-label="Expand sidebar"
        >
          <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}
    </aside>
  )
}
