import {
  CheckCircle,
  XCircle,
  AlertTriangle,
} from "lucide-react";

const features = [
  {
    title: "Live Classes",
    academy: true,
    others: false,
    note: "Mostly Recorded",
  },
  {
    title: "Structured Curriculum",
    academy: true,
    others: false,
    note: "Scattered Content",
  },
  {
    title: "1:1 Mentorship",
    academy: true,
    others: false,
  },
  {
    title: "Placement Support",
    academy: true,
    others: false,
  },
  {
    title: "Real Projects",
    academy: true,
    others: "limited",
  },
  {
    title: "Mock Interviews",
    academy: true,
    others: false,
  },
];

export default function WhyChooseUs() {
  return (
  <section className="relative overflow-hidden bg-[#020617] py-20">

  {/* Premium Background */}
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
    <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-600/10 blur-[100px]" />

    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:50px_50px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-6xl px-4">

    {/* Header */}
    <div className="text-center mb-12">

      <span className="inline-flex items-center rounded-full border border-cyan-500/20 bg-cyan-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-cyan-400">
        Why Choose Pirnav EduTech
      </span>

      <h2 className="mt-5 text-3xl md:text-5xl font-extrabold text-white">
        Compare Before
        <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          You Invest Your Time
        </span>
      </h2>

      <p className="mx-auto mt-4 max-w-2xl text-slate-400">
        Structured learning, real-world projects, mentorship, and career support
        designed for modern technology careers.
      </p>

    </div>

    {/* Table Card */}
    <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.45)]">

      {/* Header */}
      <div className="grid grid-cols-3 bg-gradient-to-r from-cyan-600 to-blue-700 px-6 py-4">

        <div className="text-sm md:text-base font-semibold text-white">
          Features
        </div>

        <div className="text-center text-sm md:text-base font-semibold text-white">
          Our Academy
        </div>

        <div className="text-center text-sm md:text-base font-semibold text-white">
          Others
        </div>

      </div>

      {/* Rows */}
      {features.map((item, index) => (
        <div
          key={index}
          className="
            grid
            grid-cols-3
            items-center
            px-6
            py-4
            border-b
            border-white/5
            hover:bg-white/[0.03]
            transition-all
            duration-300
          "
        >
          {/* Feature */}
          <div>
            <h4 className="text-sm md:text-base font-medium text-white">
              {item.title}
            </h4>

            {item.note && (
              <p className="mt-1 text-xs text-slate-500">
                {item.note}
              </p>
            )}
          </div>

          {/* Academy */}
          <div className="flex justify-center">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
              <CheckCircle
                className="text-emerald-400"
                size={18}
              />
            </div>
          </div>

          {/* Others */}
          <div className="flex justify-center">
            {item.others === false ? (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
                <XCircle
                  className="text-red-400"
                  size={18}
                />
              </div>
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-yellow-500/10 border border-yellow-500/20">
                <AlertTriangle
                  className="text-yellow-400"
                  size={18}
                />
              </div>
            )}
          </div>
        </div>
      ))}

    </div>

    {/* Stats */}
    <div className="mt-10 grid gap-5 md:grid-cols-3">

      <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl hover:border-cyan-500/30 transition">
        <h3 className="text-3xl font-bold text-cyan-400">
          500+
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Students Trained
        </p>
      </div>

      <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl hover:border-cyan-500/30 transition">
        <h3 className="text-3xl font-bold text-cyan-400">
          95%
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Placement Success
        </p>
      </div>

      <div className="group rounded-2xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl hover:border-cyan-500/30 transition">
        <h3 className="text-3xl font-bold text-cyan-400">
          50+
        </h3>
        <p className="mt-1 text-sm text-slate-400">
          Industry Mentors
        </p>
      </div>

    </div>

  </div>
</section>
  );
}