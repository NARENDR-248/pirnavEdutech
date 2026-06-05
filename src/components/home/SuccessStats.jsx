import { useEffect, useState } from "react";

function Counter({
  end,
  duration = 2000,
  suffix = "",
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment =
      end / (duration / 20);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(
          Math.floor(start)
        );
      }
    }, 20);

    return () =>
      clearInterval(timer);
  }, [end, duration]);

  return (
    <>
      {count.toLocaleString()}
      {suffix}
    </>
  );
}

const stats = [
  {
    number: 20000,
    suffix: "+",
    label: "Students Trained",
    color: "text-cyan-400",
  },
  {
    number: 1000,
    suffix: "+",
    label: "Batches",
    color: "text-green-400",
  },
  {
    number: 40,
    suffix: "+",
    label: "Expert Trainers",
    color: "text-orange-400",
  },
  {
    number: 99,
    suffix: "%",
    label: "Success Rate",
    color: "text-purple-400",
  },
];

function SuccessStats() {
  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950">

      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-80 h-80 bg-cyan-500/20 blur-[120px] rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/20 blur-[120px] rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-5">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="text-cyan-400 font-semibold uppercase tracking-[3px]">
            Our Achievements
          </span>

          <h2 className="mt-4 text-4xl md:text-6xl font-extrabold text-white">
            Trusted By Thousands
          </h2>

          <p className="mt-5 text-slate-300 max-w-2xl mx-auto">
            Helping students build
            successful careers through
            industry-ready training and
            mentorship.
          </p>

        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">

          {stats.map(
            (stat, index) => (
              <div
                key={index}
                className="group bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center hover:-translate-y-3 hover:border-cyan-400/40 transition-all duration-500"
              >

                <h3
                  className={`text-5xl lg:text-6xl font-extrabold ${stat.color}`}
                >
                  <Counter
                    end={stat.number}
                    suffix={
                      stat.suffix
                    }
                  />
                </h3>

                <div className="w-14 h-1 bg-cyan-400 mx-auto my-5 rounded-full"></div>

                <p className="text-white text-lg font-medium">
                  {stat.label}
                </p>

              </div>
            )
          )}

        </div>

      </div>

    </section>
  );
}

export default SuccessStats;