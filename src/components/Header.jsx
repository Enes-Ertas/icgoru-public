// src/components/Header.jsx
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function Header() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { currentUser, loading, setCurrentUser } = useUser();
  const location = useLocation();
  console.log("🧠 currentUser:", currentUser);

  if (loading) {
    return (
      <header className="fixed w-full top-0 left-0 z-50 bg-white/60 backdrop-blur-md h-[72px]" />
    );
  }
  const handleNavClick = (sectionId) => {
    if (location.pathname === "/" || location.pathname === "/landing") {
      document
        .getElementById(sectionId)
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: sectionId } });
    }
  };

  const handleLogout = async () => {
    if (currentUser) {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true }
      );
    }
    setCurrentUser(null);
    localStorage.removeItem("sessionUser");
    localStorage.removeItem("token");
    navigate("/");
  };

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed w-full top-0 left-0 z-50 bg-white/60 backdrop-blur-md flex items-center justify-between px-8 py-4">
      {/* Logo */}
      <h1
        className="text-2xl font-bold cursor-pointer"
        onClick={() => {
          console.log("🏁 LOGO click", location.pathname);
          if (location.pathname === "/" || location.pathname === "/landing") {
            setTimeout(() => {
              (document.scrollingElement || document.documentElement).scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }, 50);
          } else {
            navigate("/", { replace: false });
            setTimeout(() => {
              (document.scrollingElement || document.documentElement).scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }, 100);
          }
        }}
      >
        {t("branding.name", "İÇGÖRÜ AI")}
      </h1>

      {/* Nav Links */}
      <nav className="hidden md:flex space-x-6">
        <button
          onClick={() => handleNavClick("features")}
          className="text-gray-800 hover:text-gray-600 transition"
        >
          {t("nav.features", "Features")}
        </button>
        <button
          onClick={() => handleNavClick("how-it-works")}
          className="text-gray-800 hover:text-gray-600 transition"
        >
          {t("nav.howItWorks", "How It Works")}
        </button>
      </nav>

      {/* Language Switcher */}
      <LanguageSwitcher />

      {/* Auth Button */}
      {currentUser ? (
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          {t("auth.logout", "Çıkış Yap")}
        </button>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          {t("auth.login", "Giriş Yap")}
        </button>
      )}
    </header>
  );
}
