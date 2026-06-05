import React from "react";

function Partners() {
  const logos = [
    "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    "https://upload.wikimedia.org/wikipedia/commons/c/cd/Meta_Platforms_Inc._logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/Sass_Logo_Color.svg",
    "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
  ];

  return (
    <section className="py-20 bg-white overflow-hidden">
      
      {/* Heading */}
      <h2 className="text-center text-3xl md:text-4xl font-bold mb-12 text-gray-800">
        Our Collaboration Partners
      </h2>

      {/* Slider Container */}
      <div className="relative w-full overflow-hidden">

        {/* Left Gradient Fade */}
        <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-white to-transparent z-10" />

        {/* Right Gradient Fade */}
        <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-white to-transparent z-10" />

        {/* Scrolling Track */}
        <div className="flex animate-scroll gap-20 w-max items-center">

          {/* First Set */}
          {logos.map((logo, index) => (
            <img
              key={index}
              src={logo}
              alt="company-logo"
              className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
            />
          ))}

          {/* Duplicate Set (for infinite loop) */}
          {logos.map((logo, index) => (
            <img
              key={`dup-${index}`}
              src={logo}
              alt="company-logo"
              className="h-14 md:h-16 w-auto object-contain grayscale hover:grayscale-0 hover:scale-110 transition duration-300"
            />
          ))}

        </div>
      </div>

    </section>
  );
}

export default Partners;