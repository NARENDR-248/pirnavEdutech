import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Shield, CheckCircle, ArrowRight, Info, Smartphone } from 'lucide-react'
import { useNavigate, useLocation } from 'react-router-dom'

const OTP_LENGTH = 6
const RESEND_DELAY = 60

export default function OtpVerification() {
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email || 'your email'

  const [otp, setOtp] = useState(Array(OTP_LENGTH).fill(''))
  const inputRefs = useRef([])

  const [count, setCount] = useState(RESEND_DELAY)
  const [canResend, setCanResend] = useState(false)
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [error, setError] = useState('')

  /* ── Timer ── */
  useEffect(() => {
    if (count <= 0) {
      setCanResend(true)
      return
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count])

  /* ── Auto-focus first input on mount ── */
  useEffect(() => {
    inputRefs.current[0]?.focus()
  }, [])

  const handleChange = (index, value) => {
    const digit = value.replace(/\D/g, '').slice(-1)
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    setError('')

    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKey = (e, index) => {
    if (e.key === 'Backspace') {
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH)
    const next = [...otp]
    pasted.split('').forEach((char, i) => { next[i] = char })
    setOtp(next)
  }

  const handleResend = () => {
    setCount(RESEND_DELAY)
    setCanResend(false)
    setOtp(Array(OTP_LENGTH).fill(''))
    inputRefs.current[0]?.focus()
  }

  const handleVerify = async (e) => {
    e.preventDefault()

    const code = otp.join('')
    if (code.length !== OTP_LENGTH) {
      setError('Please enter the complete verification code')
      return
    }

    setLoading(true)
    setError('')

    await new Promise((r) => setTimeout(r, 1500))

    setLoading(false)
    setVerified(true)

    setTimeout(() => {
      navigate('/change-password', { state: { email, otp: code } })
    }, 1800)
  }

  return (
    <div className="min-h-screen bg-[#070711] flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-blue-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-[480px] h-[480px] rounded-full bg-purple-600/15 blur-[140px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[24px] p-8 shadow-2xl"
          style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 0.5px rgba(255,255,255,0.06)' }}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              HRMS<span className="text-blue-400"> Portal</span>
            </h2>
          </div>

          {/* Back */}
          <button
            onClick={() => navigate('/forgot-password')}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition-all mb-6 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back
          </button>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            <div className="h-1 flex-1 rounded bg-[#10B981]" />
            <div className="h-1 flex-1 rounded bg-[#2563EB]" />
            <div className="h-1 flex-1 rounded bg-white/10" />
          </div>

          {/* Icon */}
          <div className="w-14 h-14 rounded-[18px] bg-[#2563EB]/10 border border-[#2563EB]/20 flex items-center justify-center mb-6">
            <Smartphone className="w-7 h-7 text-[#2563EB]" />
          </div>

          <AnimatePresence mode="wait">
            {verified ? (
              /* ── Success State ── */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-6"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="w-20 h-20 rounded-full bg-[#10B981]/20 border border-[#10B981]/30 flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-[#10B981]" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Verified!</h2>
                <p className="text-slate-400 text-sm">Redirecting to set new password...</p>
              </motion.div>
            ) : (
              /* ── OTP Form ── */
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-2xl font-bold text-white mb-2">Verification code</h1>
                <p className="text-slate-400 text-sm leading-relaxed mb-6">
                  Enter the 6-digit code sent to{' '}
                  <span className="text-white font-medium">{email}</span>
                </p>

                {/* Info Banner */}
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-[#2563EB]/5 border border-[#2563EB]/15 mb-6">
                  <Info className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <p className="text-xs text-slate-300">
                    The code expires in 10 minutes. Please check your spam folder if you don't see it.
                  </p>
                </div>

                {/* OTP Inputs */}
                <form onSubmit={handleVerify}>
                  <div
                    className="flex justify-center gap-3 mb-6"
                    onPaste={handlePaste}
                  >
                    {otp.map((digit, index) => (
                      <motion.input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKey(e, index)}
                        whileFocus={{ scale: 1.05 }}
                        className={`w-12 h-14 rounded-xl border text-center text-xl font-bold text-white bg-white/5
                          focus:outline-none focus:ring-2 focus:ring-[#2563EB]/40 focus:border-[#2563EB]/60
                          transition-all duration-200
                          ${error ? 'border-red-500/50 ring-2 ring-red-500/20' : 'border-white/10'}
                          ${digit ? 'border-[#2563EB]/40 bg-[#2563EB]/5' : ''}
                        `}
                      />
                    ))}
                  </div>

                  {error && (
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs text-red-400 text-center -mt-4 mb-6">
                      {error}
                    </motion.p>
                  )}

                  {/* Verify Button */}
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
                        Verify Code
                        <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>

                {/* Resend */}
                <div className="text-center mt-6">
                  {canResend ? (
                    <button onClick={handleResend} className="text-[#2563EB] hover:text-blue-400 text-sm font-medium transition-colors">
                      Resend Code
                    </button>
                  ) : (
                    <p className="text-sm text-slate-500">
                      Resend code in <span className="text-white font-medium">{count}s</span>
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="text-center text-sm text-slate-500 mt-6 pt-6 border-t border-white/5">
            {verified ? '' : 'Wrong email? '}
            {!verified && (
              <button onClick={() => navigate('/forgot-password')} className="text-[#2563EB] hover:text-blue-400 font-medium transition-colors">
                Try again
              </button>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
