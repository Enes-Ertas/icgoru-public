// src/pages/Register.jsx
import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Register() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("/api/auth/register", formData);
      localStorage.setItem("token", res.data.token);
      setMessage(t("register.successMessage"));
      setTimeout(() => {
        navigate(`/confirm?email=${encodeURIComponent(formData.email)}`);
      }, 1500);
    } catch (err) {
      console.error(err);
      const code = err?.response?.data?.error;
      const fallback = t("register.errorMessage", "Kayıt başarısız oldu.");
      const msg = code ? t(`error.${code}`, fallback) : fallback;
      setMessage(msg);
    }
  };

  return (
    <>
      {/* HEADER */}
      <header
        className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md
                         flex items-center justify-between px-8 py-4"
      >
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          {t("branding.name")}
        </h1>
        <div aria-hidden="true" />
      </header>

      <div className="pt-20" />

      {/* MAIN CARD */}
      <div
        className="min-h-screen flex items-center justify-center
                      bg-gradient-to-br from-beige-light to-beige-dark px-4"
      >
        <div
          className="bg-white rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.05)]
                        max-w-md w-full p-8"
        >
          {/* Logo & Title */}
          <div className="flex flex-col items-center mb-8">
            <img
              src="/assets/icons/insight-bulb.svg"
              alt={t("register.logoAlt")}
              className="w-12 h-12 mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {t("register.title")}
            </h1>
            <p className="text-lg text-gray-700">{t("register.subtitle")}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder={t("register.namePlaceholder")}
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="email"
              name="email"
              placeholder={t("register.emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="password"
              name="password"
              placeholder={t("register.passwordPlaceholder")}
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {t("register.submitButton")}
            </button>
          </form>

          {/* Already have account? */}
          <p className="text-center mt-6 text-sm text-gray-600">
            {t("register.haveAccount")}{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {t("register.loginLink")}
            </Link>
          </p>

          {message && (
            <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
          )}

          {/* Card Footer */}
          <p className="mt-8 text-center text-sm text-gray-600">
            {t("footer.copy")}
          </p>
        </div>
      </div>
    </>
  );
}
