// src/pages/Login.jsx
import React, { useState } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import {
  useNavigate,
  Link,
  useSearchParams,
  useLocation,
} from "react-router-dom";

export default function Login() {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/home"; // ← ekle

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  useEffect(() => {
    if (searchParams.get("confirmed") === "true") {
      setConfirmationMessage(t("login.confirmedMessage"));
    }
  }, [searchParams, t]);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const res = await axios.post("/api/auth/login", formData, {
        withCredentials: true,
      });
      localStorage.setItem("token", res.data.token);
      setMessage(t("login.successMessage"));
      setTimeout(() => navigate(from, { replace: true }), 1000);
    } catch (err) {
      const code = err?.response?.data?.error;
      const fallback = t("login.errorMessage", "Giriş başarısız oldu.");
      const msg = code ? t(`error.${code}`, fallback) : fallback;
      setMessage(msg);
    }
  };

  return (
    <>
      {/* Header */}
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

      {/* Card */}
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
              alt={t("login.logoAlt")}
              className="w-12 h-12 mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {t("login.title")}
            </h1>
            <p className="text-lg text-gray-700">{t("login.subtitle")}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {confirmationMessage && (
              <p className="bg-green-100 text-green-800 text-sm px-4 py-2 rounded">
                {confirmationMessage}
              </p>
            )}

            <input
              type="email"
              name="email"
              placeholder={t("login.emailPlaceholder")}
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <input
              type="password"
              name="password"
              placeholder={t("login.passwordPlaceholder")}
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
              {t("login.submitButton")}
            </button>
          </form>

          {/* Bottom Link */}
          <p className="text-center mt-6 text-sm text-gray-600">
            {t("login.noAccount")}{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {t("login.registerLink")}
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
