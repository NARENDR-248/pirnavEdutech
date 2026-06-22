import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/ThemeContext";

function Counter({ end, duration = 2000, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 20);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 20);
    return () => clearInterval(timer);
  }, [end, duration]);

  return <>{count.toLocaleString()}{suffix}</>;
}

const stats = [
  { number: 20000, suffix: "+", label: "Students Trained", color: "dark:text-cyan-400 text-cyan-600" },
  { number: 1000, suffix: "+", label: "Batches", color: "dark:text-green-400 text-green-600" },
  { number: 40, suffix: "+", label: "Expert Trainers", color: "dark:text-orange-400 text-orange-600" },
  { number: 99, suffix: "%", label: "Success Rate", color: "dark:text-purple-400 text-purple-600" },
];

function SuccessStats() {
  const { isDark } = useThemeContext();

  return (
    <section
      className={`relative overflow-hidden py-24 transition-colors duration-300 ${
        isDark
          ? "bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950"
          : "bg-gradient-to-br from-blue-50 via-indigo-50 to-slate-100"
      }`}
    >
      {/* Background Glow */}
      <div
        className={`absolute top-0 left-0 w-80 h-80 blur-[120px] rounded-full ${
          isDark ? "bg-cyan-500/20" : "bg-blue-200/50"
        }`}
      />
      <div
        className={`absolute bottom-0 right-0 w-80 h-80 blur-[120px] rounded-full ${
          isDark ? "bg-purple-500/20" : "bg-purple-200/50"
        }`}
      />

      <div className="relative max-w-7xl mx-auto px-5">
        {/* Heading */}
        <div className="text-center mb-16">
          <span
            className={`font-semibold uppercase tracking-[3px] ${
              isDark ? "text-cyan-400" : "text-cyan-600"
            }`}
          >
            Our Achievements
          </span>
          <h2
            className={`mt-4 text-4xl md:text-6xl font-extrabold ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            Adopted By Thousands
          </h2>
          <p
            className={`mt-5 max-w-2xl mx-auto ${
              isDark ? "text-slate-300" : "text-slate-500"
            }`}
          >
            Helping students build successful careers through industry-ready training and
            mentorship.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`group rounded-3xl p-8 text-center transition-all duration-500 ${
                isDark
                  ? "bg-white/5 backdrop-blur-xl border border-white/10 hover:-translate-y-3 hover:border-cyan-400/40"
                  : "bg-white border border-slate-200 shadow-sm hover:-translate-y-3 hover:border-cyan-400/60 hover:shadow-md"
              }`}
            >
              <h3 className={`text-5xl lg:text-6xl font-extrabold ${stat.color}`}>
                <Counter end={stat.number} suffix={stat.suffix} />
              </h3>
              <div className="w-14 h-1 bg-cyan-500 mx-auto my-5 rounded-full" />
              <p className={`text-lg font-medium ${isDark ? "text-white" : "text-slate-800"}`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SuccessStats;