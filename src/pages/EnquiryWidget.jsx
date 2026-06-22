import { useEffect, useState } from "react";
import {
  FaTimes,
  FaRocket,
  FaAward,
  FaUserGraduate,
  FaTrophy,
} from "react-icons/fa";

const EnquiryWidget = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[9998]" />

      {/* Modal */}
      <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
        <div
          className="
            relative
            w-[92vw]
            max-w-[1050px]
            bg-[#1b2230]
            rounded-3xl
            overflow-hidden
            shadow-[0_25px_80px_rgba(0,0,0,0.5)]
            grid
            lg:grid-cols-[34%_66%]
          "
        >
          {/* Close */}
          <button
            onClick={() => setShow(false)}
            className="
              absolute
              top-4
              right-4
              text-white
              text-xl
              hover:rotate-90
              transition-all
              duration-300
              cursor-pointer
              z-50
            "
          >
            <FaTimes />
          </button>

          {/* Left Panel */}
          <div
            className="
              bg-gradient-to-b
              from-cyan-500
              via-blue-500
              to-purple-600
              p-8
              flex
              flex-col
              justify-center
            "
          >
            <h2 className="text-4xl font-bold text-white leading-tight">
              Talk to our
              <br />
              Advisor
            </h2>

            <p className="text-2xl text-white/90 mt-4">
              AND GET
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex items-center gap-3 text-white text-lg">
                <FaRocket className="text-yellow-300" />
                <span>Personalized Career Roadmap</span>
              </div>

              <div className="flex items-center gap-3 text-white text-lg">
                <FaAward className="text-yellow-300" />
                <span>Free Career Counseling</span>
              </div>

              <div className="flex items-center gap-3 text-white text-lg">
                <FaUserGraduate className="text-yellow-300" />
                <span>Free Access to Master Classes</span>
              </div>

              <div className="flex items-center gap-3 text-white text-lg">
                <FaTrophy className="text-yellow-300" />
                <span>Get Job-Ready and Stay Ahead</span>
              </div>
            </div>
          </div>

          {/* Right Panel */}
          <div className="p-8 text-white">
            <h2 className="text-3xl font-bold mb-6">
              Book a FREE Career Growth Session!
            </h2>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Name */}
              <div>
                <label className="block mb-2 text-base">
                  Your Name <span className="text-red-500">*</span>
                </label>

                <input
                  type="text"
                  placeholder="Your Name"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-transparent
                    border
                    border-slate-500
                    outline-none
                    focus:border-cyan-400
                  "
                />
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-base">
                  Email Address <span className="text-red-500">*</span>
                </label>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-transparent
                    border
                    border-slate-500
                    outline-none
                    focus:border-cyan-400
                  "
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block mb-2 text-base">
                  Mobile Number <span className="text-red-500">*</span>
                </label>

                <input
                  type="tel"
                  placeholder="Mobile Number"
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-transparent
                    border
                    border-slate-500
                    outline-none
                    focus:border-cyan-400
                  "
                />
              </div>

              {/* Experience */}
              <div>
                <label className="block mb-2 text-base">
                  Experience <span className="text-red-500">*</span>
                </label>

                <select
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-transparent
                    border
                    border-slate-500
                    outline-none
                    focus:border-cyan-400
                  "
                >
                  <option className="text-black">Fresher</option>
                  <option className="text-black">1 Year</option>
                  <option className="text-black">2 Years</option>
                  <option className="text-black">3+ Years</option>
                </select>
              </div>

              {/* City */}
              <div className="md:col-span-2">
                <label className="block mb-2 text-base">
                  City <span className="text-red-500">*</span>
                </label>

                <select
                  className="
                    w-full
                    h-12
                    px-4
                    rounded-xl
                    bg-transparent
                    border
                    border-slate-500
                    outline-none
                    focus:border-cyan-400
                  "
                >
                  <option className="text-black">Select City</option>
                  <option className="text-black">Hyderabad</option>
                  <option className="text-black">Bangalore</option>
                  <option className="text-black">Chennai</option>
                </select>
              </div>
            </div>

            {/* Terms */}
            <div className="mt-5 flex items-center gap-3">
              <input type="checkbox" />

              <span className="text-sm text-slate-300">
                I agree to the{" "}
                <span className="text-cyan-400 cursor-pointer">
                  Terms and Conditions
                </span>
              </span>
            </div>

            {/* CTA */}
            <button
              className="
                w-full
                mt-6
                h-12
                rounded-xl
                bg-gradient-to-r
                from-cyan-500
                to-blue-600
                text-white
                font-semibold
                text-lg
                hover:scale-[1.02]
                transition-all
                duration-300
                cursor-pointer
              "
            >
              Register For Career Growth
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EnquiryWidget;