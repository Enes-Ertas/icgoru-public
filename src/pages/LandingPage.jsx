// src/pages/NewLandingPage.jsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import HeroSection from "../components/HeroSection";
import HowItWorks from "../components/HowItWorks";
import Pricing from "../components/Pricing";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { traitIcons } from "../components/TraitCarousel";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Header from "../components/Header";
import { useLocation } from "react-router-dom";
import useGlobalError from "../hooks/useGlobalError";
import GlobalErrorBanner from "../components/GlobalErrorBanner";

export default function NewLandingPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser, setCurrentUser } = useUser();
  const { error, showError, clearError } = useGlobalError();
  // const token = localStorage.getItem("token");
  const isAuthenticated = !!currentUser;
  const location = useLocation();

  // Scroll helper
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document
          .getElementById(location.state.scrollTo)
          ?.scrollIntoView({ behavior: "smooth" });
      }, 200);
    }
  }, [location]);

  const handleStart = () => {
    const token = localStorage.getItem("token");
    token ? navigate("/home") : navigate("/login");
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    } else {
      // Lokasyon tabanlı ilk seçim
      fetch("https://ipapi.co/json/")
        .then((res) => res.json())
        .then((data) => {
          const country = data.country_code;
          const preferredLang = country === "TR" ? "tr" : "en";
          i18n.changeLanguage(preferredLang);
          localStorage.setItem("language", preferredLang);
        })
        .catch((err) => {
          console.error("Lokasyon alınamadı:", err);
          showError(
            t(
              "error.locationFailed",
              "Language could not be set. Defaulted to English."
            )
          );
          i18n.changeLanguage("en");
          localStorage.setItem("language", "en");
        });
    }
  }, []);

  // useEffect(() => {
  //   const handleStorage = () => {
  //     setIsAuthenticated(!!localStorage.getItem("token"));
  //   };
  //   window.addEventListener("storage", handleStorage);
  //   return () => window.removeEventListener("storage", handleStorage);
  // }, []);

  const handleLogout = async () => {
    if (currentUser) {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    }
    // 2️⃣ Client tarafında her ikisini de temizle
    setCurrentUser(null);
    localStorage.removeItem("sessionUser");
    localStorage.removeItem("token");
    // setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <GlobalErrorBanner error={error} onClose={clearError} />
      {/* Header */}
      <Header />

      {/* Spacer */}
      <div className="pt-20" />

      {/* Hero */}
      <HeroSection />

      {/* Features */}
      <section
        id="features"
        className="bg-beige-light px-8 pt-24 pb-16"
        style={{ scrollMarginTop: "5rem" }}
      >
        <div className="max-w-5xl mx-auto mb-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            {t("features.title")}
          </h2>
          <p className="text-gray-600 mt-2">{t("features.subtitle")}</p>
        </div>

        {/* Kartlar */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Kart 1 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <img
                src="/assets/icons/mirror-icon.png"
                alt="MIRROR Icon"
                className="w-8 h-8 mx-auto"
              />
            </div>
            <h3 className="text-center text-xl font-semibold mb-2">
              {t("features.cards.character.title")}
            </h3>
            <p className="text-center text-gray-700">
              {t("features.cards.character.desc")}
            </p>
          </div>
          {/* Kart 2 */}
          {/* Kart 2 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center space-x-2 text-4xl mb-4">
              <img src="/assets/icons/x.svg" alt="X" className="w-8 h-8" />
              <img
                src="/assets/icons/instagram.svg"
                alt="Instagram"
                className="w-8 h-8 opacity-50 grayscale"
                title={t("features.cards.crossPlatform.instagramComing")}
              />
              <img
                src="/assets/icons/linkedin.svg"
                alt="LinkedIn"
                className="w-8 h-8 opacity-50 grayscale"
                title={t("features.cards.crossPlatform.linkedinComing")}
              />
            </div>
            <h3 className="text-xl font-semibold mb-2">
              {t("features.cards.crossPlatform.title")}
            </h3>
            <p className="text-gray-700">
              {t("features.cards.crossPlatform.desc")}
            </p>
            <p className="text-sm text-gray-500 mt-2 italic">
              {t("features.cards.crossPlatform.soonLabelFull")}
            </p>
          </div>

          {/* Kart 3 */}
          <div className="bg-white rounded-2xl shadow-lg p-6 justify-center transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="mb-4">
              <img
                src="/assets/icons/pdf-icon.png"
                alt="PDF Icon"
                className="w-8 h-8 mx-auto"
              />
            </div>
            <h3 className="text-center text-xl font-semibold mb-2">
              {t("features.cards.pdf.title")}
            </h3>
            <p className="text-center text-gray-700">
              {t("features.cards.pdf.desc")}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <HowItWorks />

      {/* Footer */}
      <footer className="mt-auto py-6 bg-white text-center text-sm text-gray-600">
        {t("footer.copy")} •{" "}
        <Link to="/privacy" className="underline">
          {t("footer.privacy", "Gizlilik Politikası")}
        </Link>{" "}
        •{" "}
        <Link to="/terms" className="underline">
          {t("footer.terms", "Kullanım Şartları")}
        </Link>
      </footer>
    </div>
  );
}
