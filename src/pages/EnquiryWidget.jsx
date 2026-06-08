import { useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";

function EnquiryWidget() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-[9999]
        w-[380px]
        bg-white
        rounded-3xl
        shadow-[0_20px_60px_rgba(0,0,0,0.15)]
        border
        border-slate-200
        overflow-hidden
      "
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-500 to-blue-600 p-5 text-white">
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 cursor-pointer hover:bg-white/20 rounded-full p-1 transition"
        >
          <FaTimes />
        </button>

        <h3 className="text-xl font-bold">
          Free Career Consultation
        </h3>

        <p className="text-sm text-cyan-100 mt-1">
          Talk with our experts today
        </p>
      </div>

      {/* Body */}
      <div className="p-5">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-3 border border-slate-200 rounded-xl px-4 py-3"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="w-full mb-3 border border-slate-200 rounded-xl px-4 py-3"
        />

        <button
          className="
            w-full
            py-3
            rounded-xl
            bg-gradient-to-r
            from-cyan-500
            to-blue-600
            text-white
            font-semibold
                flex items-center justify-center gap-2
                cursor-pointer
                hover:scale-[1.02] transition
          "
        >
          Request Callback
        </button>
      </div>
    </div>
  );
}

export default EnquiryWidget;