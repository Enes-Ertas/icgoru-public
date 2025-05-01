import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useUser } from "../context/UserContext";

export default function HeroSection() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser } = useUser();

  const [isVisible, setIsVisible] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.4 } // %40 göründüğünde aktifleşsin
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  const handleStart = () => {
    const token = localStorage.getItem("token");
    // ✔ Hem JWT hem session bazlı auth kontrolü
    if (currentUser || token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  return (
    <section className="w-full bg-gradient-to-br from-beige-light to-beige-dark">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-8 pt-24 pb-16 gap-12 md:gap-8">
        {/* Sol Kısım */}
        <div className="flex-1 flex flex-col items-start text-left space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            {t("landing.title")}
          </h1>
          <p className="text-xl text-gray-700 max-w-md leading-relaxed">
            {t("landing.subtitle")}
          </p>
          <button
            onClick={handleStart}
            className="px-8 py-4 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 hover:scale-105 transform transition duration-300"
          >
            {t("landing.cta")}
          </button>
        </div>

        {/* Sağ Kısım: Görsel */}
        <div
          ref={imgRef}
          className={`flex-1 flex items-center justify-center mt-12 md:mt-0 transform transition-all duration-700 ease-in-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <img
            src="/assets/mirrored_character_illustration.png"
            alt="Karakter İllüstrasyonu"
            className="w-100 md:w-111 h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}
