import React, { useRef, useMemo, useEffect } from "react";
import Tilt from "react-parallax-tilt";

const LOGOS = [
  "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
  "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
];

export default function Partners() {
  const containerRef = useRef(null);

  // ✅ Stable particles (no re-random on render)
  const particles = useMemo(() => {
    return Array.from({ length: 15 }).map(() => ({
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 12 + Math.random() * 8,
    }));
  }, []);

  // ✅ Parallax using requestAnimationFrame (no re-render)
  useEffect(() => {
    const el = containerRef.current;
    let rafId = null;

    const handleMove = (e) => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;

        el.style.setProperty("--px", px);
        el.style.setProperty("--py", py);

        rafId = null;
      });
    };

    el.addEventListener("mousemove", handleMove);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // ✅ Detect mobile (disable heavy effects)
  const isMobile =
    typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <section
      ref={containerRef}
      className="relative py-28 bg-[#0b0f19] overflow-hidden"
    >
      {/* 🌌 Parallax Background */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform:
            "translate3d(calc(var(--px,0.5)*-30px), calc(var(--py,0.5)*-30px), 0)",
        }}
      >
        <div className="w-full h-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)]" />
      </div>

      {/* ✨ Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <span
            key={i}
            className="particle"
            style={{
              left: `${p.left}%`,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <div className="text-center mb-16 relative z-10">
        <h2 className="text-4xl md:text-5xl font-semibold text-white">
          Industry-Relevent Curriculum
        </h2>
        <p className="text-gray-400 mt-3">
          Built around current market technologies
        </p>
      </div>

      {/* Glass Container */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl">

          <div className="marquee flex gap-20 px-8 py-10">

            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <Tilt
                key={i}
                tiltEnable={!isMobile}
                glareEnable={!isMobile}
                glareMaxOpacity={0.15}
                scale={1.05}
                tiltMaxAngleX={12}
                tiltMaxAngleY={12}
                transitionSpeed={800}
                className="min-w-[100px] flex items-center justify-center"
              >
                <img
                  src={logo}
                  alt="company logo"
                  loading="lazy"
                  className="
                    h-10 w-auto
                    opacity-60 grayscale
                    hover:opacity-100 hover:grayscale-0
                    transition duration-300
                  "
                />
              </Tilt>
            ))}

          </div>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .marquee {
          animation: scroll 45s linear infinite;
          will-change: transform;
        }

        .marquee:hover {
          animation-duration: 70s;
        }

        @keyframes scroll {
          to {
            transform: translateX(-50%);
          }
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255,255,255,0.12);
          border-radius: 50%;
          animation: float linear infinite;
          will-change: transform;
        }

        @keyframes float {
          from {
            transform: translate3d(0, 100vh, 0);
          }
          to {
            transform: translate3d(0, -10vh, 0);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none;
          }
          .particle {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}