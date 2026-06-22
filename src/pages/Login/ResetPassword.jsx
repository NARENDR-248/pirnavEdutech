
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Lock,
  Info,
  Moon,
  Sun,
} from "lucide-react";
import { useThemeContext } from "../../context/ThemeContext";

const OTP_LEN = 6;
const RESEND_DELAY = 60;

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { isDark, toggle: toggleTheme } = useThemeContext();

  const [otp, setOtp] = useState(Array(OTP_LEN).fill(""));
  const refs = useRef([]);

  const [count, setCount] = useState(RESEND_DELAY);
  const [canResend, setCanResend] = useState(false);

  const [showNP, setShowNP] = useState(false);
  const [showCP, setShowCP] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (count <= 0) {
      setCanResend(true);
      return;
    }

    const timer = setTimeout(() => {
      setCount((c) => c - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  const handleOtpChange = (index, value) => {
    const digit = value.replace(/\D/g, "").slice(-1);

    const next = [...otp];
    next[index] = digit;
    setOtp(next);

    if (digit && index < OTP_LEN - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleOtpKey = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      refs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LEN);

    const next = [...otp];

    pasted.split("").forEach((char, index) => {
      next[index] = char;
    });

    setOtp(next);
  };

  const handleResend = () => {
    setCount(RESEND_DELAY);
    setCanResend(false);
    alert("OTP resent successfully");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (otp.join("").length !== OTP_LEN) {
      alert("Please enter complete OTP");
      return;
    }

    if (newPassword.length < 8) {
      alert("Password must be at least 8 characters");
      return;
    }

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
setLoading(true);

try {
  // TODO: Call Reset Password API
  // POST /api/auth/reset-password

  // Request Body:
  // {
  //   email,
  //   otp: otp.join(""),
  //   newPassword
  // }

  // Example:
  // const response = await axios.post(
  //   "/api/auth/reset-password",
  //   {
  //     email,
  //     otp: otp.join(""),
  //     newPassword,
  //   }
  // );

  setLoading(false);

  alert("Password reset successfully!");

  navigate("/");
} catch (error) {
  setLoading(false);

  console.error(error);

  alert(
    error?.response?.data?.message ||
      "Failed to reset password"
  );
}
  };

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 relative overflow-hidden transition-colors duration-300 ${isDark ? 'bg-slate-950' : 'bg-slate-50'}`}>
      {isDark && <>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
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

      <div className="w-full max-w-md">
        <div className={`backdrop-blur-xl border rounded-3xl p-8 shadow-2xl transition-colors duration-300 ${isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'}`}>
          <button
            onClick={() => navigate("/forgot-password")}
            className={`flex items-center gap-2 transition mb-6 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'}`}
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="flex gap-2 mb-8">
            <div className="h-1 flex-1 rounded bg-green-500"></div>
            <div className="h-1 flex-1 rounded bg-blue-500"></div>
            <div className="h-1 flex-1 rounded bg-slate-700"></div>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2">
            Verify & Reset
          </h1>

          <p className="text-slate-400 text-sm mb-6">
            Enter the OTP and create your new password.
          </p>

          <div className="flex gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mb-6">
            <Info className="w-5 h-5 text-blue-400 flex-shrink-0" />
            <p className="text-sm text-slate-300">
              OTP expires in 10 minutes.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              className="flex justify-center gap-3 mb-8"
              onPaste={handleOtpPaste}
            >
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => (refs.current[index] = el)}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) =>
                    handleOtpChange(index, e.target.value)
                  }
                  onKeyDown={(e) =>
                    handleOtpKey(e, index)
                  }
                  className="w-12 h-14 rounded-xl border border-slate-700 text-center text-xl font-bold text-white bg-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              ))}
            </div>

            <div className="relative mb-5">
              <Lock className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
              <input
                type={showNP ? "text" : "password"}
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
              <button
                type="button"
                onClick={() => setShowNP(!showNP)}
                className="absolute right-4 top-4 text-slate-400"
              >
                {showNP ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="relative mb-6">
              <Lock className="absolute left-4 top-4 text-slate-500 w-5 h-5" />
              <input
                type={showCP ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full h-12 pl-12 pr-12 rounded-xl bg-slate-800 border border-slate-700 text-white"
              />
              <button
                type="button"
                onClick={() => setShowCP(!showCP)}
                className="absolute right-4 top-4 text-slate-400"
              >
                {showCP ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="text-center mt-5 text-sm text-slate-400">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-blue-500 font-medium"
              >
                Resend OTP
              </button>
            ) : (
              <>Resend in {count}s</>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

