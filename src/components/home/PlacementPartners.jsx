import { motion } from "framer-motion";

function PlacementPartners() {
  const companies = [
    "TCS",
    "Infosys",
    "Wipro",
    "Accenture",
    "Cognizant",
    "Capgemini",
    "HCL",
    "Tech Mahindra",
    "Amazon",
    "Microsoft",
    "Google",
    "Adobe",
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-slate-50">

      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >

          <span className="inline-block px-6 py-3 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-100">
            🚀 2200+ Students Placed At Top Companies
          </span>

          <h2 className="mt-6 text-4xl md:text-5xl font-bold text-slate-900">
            Trusted Hiring Partners
          </h2>

          <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
            Our learners have successfully secured opportunities
            at leading global companies and startups.
          </p>

        </motion.div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 text-center">
            <h3 className="text-4xl font-bold text-blue-600">20K+</h3>
            <p className="text-slate-500 mt-2">Students Trained</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 text-center">
            <h3 className="text-4xl font-bold text-green-600">2200+</h3>
            <p className="text-slate-500 mt-2">Placements</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 text-center">
            <h3 className="text-4xl font-bold text-purple-600">350+</h3>
            <p className="text-slate-500 mt-2">Hiring Partners</p>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100 text-center">
            <h3 className="text-4xl font-bold text-orange-600">95%</h3>
            <p className="text-slate-500 mt-2">Success Rate</p>
          </div>

        </div>

        {/* Companies Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {companies.map((company, index) => (
            <motion.div
              key={index}
              whileHover={{
                y: -8,
                scale: 1.03,
              }}
              className="
              bg-white
              rounded-3xl
              p-6
              border
              border-slate-100
              shadow-md
              text-center
              cursor-pointer
              transition-all
              duration-300
              "
            >

              <div
                className="
                w-16 h-16
                mx-auto mb-4
                rounded-2xl
                bg-gradient-to-r
                from-blue-500
                to-cyan-500
                flex
                items-center
                justify-center
                text-white
                font-bold
                text-2xl
                "
              >
                {company.charAt(0)}
              </div>

              <h4 className="font-bold text-slate-800">
                {company}
              </h4>

              <p className="text-sm text-slate-500 mt-1">
                Hiring Partner
              </p>

            </motion.div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default PlacementPartners;