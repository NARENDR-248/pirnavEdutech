import { useEffect } from "react";
import AOS from "aos";
import Marquee from "react-fast-marquee";

import "aos/dist/aos.css";

const companies = [
  {
    name: "Adobe",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Adobe_Corporate_logo.svg",
  },
  {
    name: "Goldman Sachs",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/61/Goldman_Sachs.svg",
  },
  {
    name: "Myntra",
    logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Myntra_logo.png",
  },
  {
    name: "Twitter",
    logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Twitter_Logo_as_of_2021.svg",
  },
  {
    name: "Accenture",
    logo: "https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg",
  },
  {
    name: "Infosys",
    logo: "https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg",
  },
  {
    name: "TCS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/b/b1/Tata_Consultancy_Services_Logo.svg",
  },
];

function PlacementPartners() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 to-blue-50 overflow-hidden">
      <div data-aos="fade-up" className="max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-flex items-center px-6 py-3 rounded-full bg-white shadow-lg border font-semibold text-slate-700">
            🎯 2200+ Students Placed in Top Companies
          </span>

          <h2 className="mt-8 text-4xl lg:text-5xl font-bold text-slate-900">
            Our Learners Work At
          </h2>

          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Join thousands of successful learners who transformed their careers through Pirnav's industry-focused programs.
          </p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-bold text-blue-600">2200+</h3>
            <p className="text-slate-600 mt-2">Students Placed</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-bold text-green-600">350+</h3>
            <p className="text-slate-600 mt-2">Hiring Partners</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-bold text-purple-600">18LPA</h3>
            <p className="text-slate-600 mt-2">Highest Package</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg text-center">
            <h3 className="text-4xl font-bold text-orange-600">95%</h3>
            <p className="text-slate-600 mt-2">Placement Rate</p>
          </div>
        </div>

        {/* Logos */}
        <div className="bg-white rounded-[40px] shadow-xl border py-10">
          <Marquee speed={50} gradient={false} pauseOnHover>
            {companies.map((company, index) => (
              <div key={index} className="mx-16 flex items-center justify-center">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="h-12 object-contain grayscale hover:grayscale-0 transition duration-500"
                />
              </div>
            ))}
          </Marquee>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
            Explore Career Programs →
          </button>
        </div>

      </div>
    </section>
  );
}

export default PlacementPartners;