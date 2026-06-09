import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FaUserGraduate,
  FaBriefcase,
  FaChalkboardTeacher,
} from "react-icons/fa";

function EnrollmentForm() {
  const [formData, setFormData] = useState({
    topic: "",
    name: "",
    email: "",
    phone: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        "http://localhost:3000/api/register",
        formData
      );

      toast.success(res.data.message);

      setFormData({
        topic: "",
        name: "",
        email: "",
        phone: "",
        experience: "",
      });
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: <FaUserGraduate />,
      value: "500+",
      label: "Students Trained",
    },
    {
      icon: <FaChalkboardTeacher />,
      value: "50+",
      label: "Industry Mentors",
    },
    {
      icon: <FaBriefcase />,
      value: "95%",
      label: "Placement Success",
    },
  ];

  return (
    <section className="relative overflow-hidden py-24 bg-gradient-to-br from-slate-50 via-white to-cyan-50">
      
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">

  <div className="absolute top-[-10%] left-[-5%] h-[500px] w-[500px] rounded-full bg-cyan-400/20 blur-[180px]" />

  <div className="absolute bottom-[-10%] right-[-5%] h-[500px] w-[500px] rounded-full bg-blue-500/20 blur-[180px]" />

  <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/40" />

</div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-cyan-200 bg-cyan-100 text-cyan-700 font-semibold text-sm">
              🚀 Start Your Learning Journey
            </span>

            <h2 className="mt-8 text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-slate-900">
              Secure Your Role In 
              <span className="block bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
                The Technology Sector
              </span>
            </h2>

            <p className="mt-6 text-lg text-slate-600 leading-8">
              Learn from industry experts, build real-world projects, prepare
              for interviews, and get placement assistance. Join thousands of
              students building successful careers in technology.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10">
              {stats.map((item, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-white border border-slate-200 rounded-3xl p-5 shadow-md"
                >
                  <div className="text-cyan-600 text-2xl mb-3">
                    {item.icon}
                  </div>

                  <h3 className="text-slate-900 text-3xl font-bold">
                    {item.value}
                  </h3>

                  <p className="text-slate-500 mt-2">{item.label}</p>
                </motion.div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 mt-10 text-sm text-slate-600">
              <span>✓ Live Classes</span>
              <span>✓ Placement Support</span>
              <span>✓ Real Projects</span>
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white border border-slate-200 rounded-[32px] p-8 lg:p-10 shadow-xl">
              
              <h3 className="text-3xl font-bold text-slate-900">
                Free Career Consultation
              </h3>

              <p className="text-slate-500 mt-2 mb-8">
                Fill out the form and our experts will contact you.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="input"
                  />

                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="input"
                  />

                  <select
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className="input"
                  >
                    <option value="">Experience</option>
                    <option value="Fresher">Fresher</option>
                    <option value="0-1 Years">0-1 Years</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3+ Years">3+ Years</option>
                  </select>
                </div>

                <input
                  type="text"
                  name="topic"
                  placeholder="Interested Course"
                  value={formData.topic}
                  onChange={handleChange}
                  className="input"
                />

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={loading}
                  type="submit"
                  className="w-full py-4 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg"
                >
                  {loading ? "Submitting..." : "Book Free Consultation"}
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Tailwind Input Utility */}
      <style jsx>{`
        .input {
          width: 100%;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 16px 20px;
          color: #0f172a;
          outline: none;
          transition: all 0.3s;
        }
        .input:focus {
          border-color: #06b6d4;
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
        }
      `}</style>
    </section>
  );
}

export default EnrollmentForm;