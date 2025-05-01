import React, { useState } from "react";

export default function LandingHero({ title, subtitle, ctaText, onCtaClick }) {
  const [clicked, setClicked] = useState(false);

  const handleButtonClick = () => {
    setClicked(true);
    setTimeout(() => {
      onCtaClick();
    }, 400); // 400ms animasyon sonra gerçek yönlendirme
  };

  return (
    <section
      className="w-full flex flex-col items-center justify-center py-32
                 bg-gradient-to-br from-beige-light to-beige-dark px-4"
    >
      {/* Başlık */}
      <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">
        {title}
      </h1>

      {/* Alt metin */}
      <p className="text-lg text-gray-700 text-center max-w-xl mb-8">
        {subtitle}
      </p>

      {/* CTA Butonu */}
      <button
        onClick={handleButtonClick}
        className={`px-8 py-4 text-white text-lg font-semibold
                    rounded-lg shadow-md focus:outline-none
                    focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                    transition-all duration-300 ease-in-out
                    ${
                      clicked
                        ? "bg-blue-700 opacity-50 scale-95"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
      >
        {ctaText}
      </button>
    </section>
  );
}
