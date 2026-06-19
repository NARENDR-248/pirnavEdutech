
import { useState } from "react";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      alert("OTP sent successfully!");

      navigate("/change-password");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-lg">TS</span>
            </div>

            <h2 className="text-xl font-bold text-white">
              Talent<span className="text-blue-500">Sphere</span>
            </h2>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 text-slate-400 hover:text-white text-sm transition mb-6"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </button>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            <div className="h-1 flex-1 rounded bg-blue-500"></div>
            <div className="h-1 flex-1 rounded bg-slate-700"></div>
            <div className="h-1 flex-1 rounded bg-slate-700"></div>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-white mb-2">
            Forgot Password?
          </h1>

          <p className="text-slate-400 text-sm leading-relaxed mb-8">
            Enter the email linked to your account and we'll send you a
            verification code to reset your password.
          </p>

          {/* Form */}
          <form onSubmit={handleSend}>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
              Email Address
            </label>

            <div className="relative mb-6">
              <Mail
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
              />

              <input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 pl-11 pr-4 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                "Send OTP"
              )}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-400 mt-6">
            Remembered it?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-500 hover:text-blue-400 font-medium"
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

