
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mail, ArrowLeft, CheckCircle, Shield, ArrowRight, AlertCircle, Moon, Sun } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useThemeContext } from '../../context/ThemeContext'

export default function ForgotPasswordPage() {
  const { isDark, toggle: toggleTheme } = useThemeContext();
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSend = async (e) => {
    e.preventDefault()

    if (!email) {
      setError('Please enter your email address')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    setError('')

    await new Promise((r) => setTimeout(r, 1500))

    setLoading(false)
    setSent(true)
  }

  /* ── Animated gradient angle ── */
  const [angle, setAngle] = useState(135)
  useEffect(() => {
    let frame, t = 0
    const tick = () => {
      t += 0.3
      setAngle(135 + Math.sin((t * Math.PI) / 180) * 20)
      frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-[#070711]' : 'bg-slate-50'}`}>
      {/* Ambient glows */}
      {isDark && <>
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-blue-600/20 blur-[140px] pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />
      </>}

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className={`absolute top-5 right-5 z-50 p-2.5 rounded-xl border transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 ${
          isDark
            ? "bg-white/[0.04] border-white/[0.06] hover:bg-white/[0.08] hover:border-white/[0.12]"
            : "bg-white border-slate-200 hover:bg-slate-100 hover:border-slate-300 shadow-sm"
        }`}
        aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      >
        {isDark ? (
          <Sun className="w-4 h-4 text-amber-400" />
        ) : (
          <Moon className="w-4 h-4 text-slate-500" />
        )}
      </button>

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`backdrop-blur-2xl border rounded-[24px] p-8 shadow-2xl transition-colors duration-300 ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200'
          }`}
          style={{ boxShadow: isDark ? '0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)' : '0 4px 24px rgba(0,0,0,0.06)' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: `linear-gradient(${angle}deg, #2563EB, #7C3AED)` }}
            >
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
              HRMS<span className="text-blue-400"> Portal</span>
            </h2>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate('/login')}
            className={`flex items-center gap-2 text-sm transition-all mb-6 group ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Sign In
          </button>

          {/* Progress Indicator */}
          <div className="flex gap-2 mb-8">
            <motion.div
              animate={{ backgroundColor: sent ? '#10B981' : '#2563EB' }}
              className="h-1 flex-1 rounded"
            />
            <div className="h-1 flex-1 rounded bg-white/10" />
            <div className="h-1 flex-1 rounded bg-white/10" />
          </div>

          {/* Icon */}
          <div className="w-14 h-14 rounded-[18px] bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mb-6">
            <Shield className="w-7 h-7 text-[#2563EB]" />
          </div>

          {/* Heading */}
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Check your email</h1>
                <p className={`text-sm leading-relaxed mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  We've sent a 6-digit verification code to{' '}
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-900'}`}>{email}</span>
                </p>

                <button
                  onClick={() => navigate('/otp-verification', { state: { email } })}
                  className="group w-full h-12 rounded-xl bg-[#2563EB] hover:brightness-110 text-white font-semibold transition-all duration-200 shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
                >
                  Enter Verification Code
                  <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                </button>

                <div className="mt-6 text-center">
                  <p className="text-sm text-slate-500">
                    Didn't receive it?{' '}
                    <button onClick={handleSend} className="text-[#2563EB] hover:text-blue-400 font-medium transition-colors">
                      Resend
                    </button>
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <h1 className={`text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>Forgot password?</h1>
                <p className={`text-sm leading-relaxed mb-8 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  No worries. Enter your email and we'll send you a reset code.
                </p>

                {/* Form */}
                <form onSubmit={handleSend} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value); setError('') }}
                        className={`w-full h-12 pl-11 pr-4 rounded-xl bg-white/5 border ${
                          error ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-white/10 focus:border-[#2563EB]/50'
                        } text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-[#2563EB]/30 transition-all`}
                      />
                    </div>
                    {error && (
                      <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="w-3 h-3" />
                        {error}
                      </motion.p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full h-12 rounded-xl bg-[#2563EB] hover:brightness-110 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200 shadow-lg shadow-[#2563EB]/25 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                      </svg>
                    ) : (
                      <>
                        Send Reset Code
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer */}
          <p className={`text-center text-sm mt-6 pt-6 ${isDark ? 'text-slate-500 border-t border-white/5' : 'text-slate-400 border-t border-slate-200'}`}>
            Remember your password?{' '}
            <button onClick={() => navigate('/login')} className="text-[#2563EB] hover:text-blue-400 font-medium transition-colors">
              Sign In
            </button>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

