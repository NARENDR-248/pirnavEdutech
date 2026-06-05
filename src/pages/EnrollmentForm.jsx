import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

function EnrollmentForm() {
  const [formData, setFormData] = useState({
    topic: "",
    name: "",
    email: "",
    phone: "",
    experience: "",
  });


  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Content */}
          <div>
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              Start Your Learning Journey
            </span>

            <h2 className="mt-6 text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Enroll Today &
              <span className="text-blue-600">
                {" "}Build Your Career
              </span>
            </h2>

            <p className="mt-5 text-lg text-gray-600">
              Join industry-focused courses and learn from experienced
              mentors. Get hands-on projects, placement support,
              interview preparation, and career guidance.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white shadow-md rounded-xl px-5 py-4">
                <h4 className="font-bold text-2xl text-blue-600">
                  500+
                </h4>
                <p className="text-gray-600 text-sm">
                  Students Trained
                </p>
              </div>

              <div className="bg-white shadow-md rounded-xl px-5 py-4">
                <h4 className="font-bold text-2xl text-blue-600">
                  50+
                </h4>
                <p className="text-gray-600 text-sm">
                  Industry Mentors
                </p>
              </div>

              <div className="bg-white shadow-md rounded-xl px-5 py-4">
                <h4 className="font-bold text-2xl text-blue-600">
                  95%
                </h4>
                <p className="text-gray-600 text-sm">
                  Success Rate
                </p>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10">

            <h3 className="text-3xl font-bold text-gray-900 mb-2">
              Free Career Consultation
            </h3>

            <p className="text-gray-500 mb-8">
              Fill the form and our team will contact you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              <input
                type="text"
                name="topic"
                placeholder="Interested Course"
                value={formData.topic}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              />

              <select
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">
                  Select Experience
                </option>
                <option value="Fresher">
                  Fresher
                </option>
                <option value="0-1 Years">
                  0-1 Years
                </option>
                <option value="1-3 Years">
                  1-3 Years
                </option>
                <option value="3+ Years">
                  3+ Years
                </option>
              </select>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Enroll Now
              </button>
              

            </form>

          </div>

        </div>

      </div>
    </section>
  );
}

export default EnrollmentForm;