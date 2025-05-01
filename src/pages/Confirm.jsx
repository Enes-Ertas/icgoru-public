// src/pages/Confirm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useGlobalError from "../hooks/useGlobalError";

export default function Confirm() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({ email: "", code: "" });
  const [msg, setMsg] = useState("");
  const [showResend, setShowResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { showError } = useGlobalError();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  useEffect(() => {
    const email = params.get("email");
    if (email) setForm((f) => ({ ...f, email }));
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setShowResend(false);
    try {
      await axios.post(
        "/api/auth/confirm",
        { email: form.email, code: form.code },
        { headers: { Authorization: "" } }
      );
      setMsg(t("confirm.success"));
      setTimeout(() => navigate("/login?confirmed=true"), 1500);
    } catch (err) {
      const apiKey = err?.response?.data?.error;
      const fallback = t("confirm.error");
      const translated = apiKey ? t(`error.${apiKey}`, fallback) : fallback;
      showError(translated);
      if (translated.toLowerCase().includes("süresi dol")) {
        setShowResend(true);
      }
      if (errorMessage.toLowerCase().includes("süresi dol")) {
        setShowResend(true);
      }
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setMsg("");
    try {
      await axios.post("/api/auth/resend-confirmation", { email: form.email });
      setMsg(t("confirm.resendSuccess"));
    } catch (err) {
      const resendKey = err?.response?.data?.error;
      const resendFallback = t("confirm.resendError");
      const resendMsg = resendKey
        ? t(`error.${resendKey}`, resendFallback)
        : resendFallback;
      showError(resendMsg);
    } finally {
      setIsResending(false);
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

      {/* Main Container */}
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
              alt={t("confirm.logoAlt")}
              className="w-12 h-12 mb-4"
            />
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {t("confirm.title")}
            </h1>
          </div>

          {/* Code Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="code"
              type="text"
              placeholder={t("confirm.codePlaceholder")}
              maxLength={6}
              value={form.code}
              onChange={(e) => setForm({ ...form, code: e.target.value })}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-lg font-semibold
                         hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            >
              {t("confirm.submit")}
            </button>
          </form>

          {/* Messages */}
          {msg && (
            <p className="mt-4 text-center text-sm text-gray-700">{msg}</p>
          )}

          {/* Resend Button */}
          {showResend && (
            <p className="mt-4 text-center">
              <button
                onClick={handleResend}
                disabled={isResending}
                className="text-blue-600 hover:underline focus:outline-none"
              >
                {isResending
                  ? t("confirm.resendLoading")
                  : t("confirm.resendButton")}
              </button>
            </p>
          )}

          {/* Footer Copy */}
          <p className="mt-8 text-center text-sm text-gray-600">
            {t("footer.copy")}
          </p>
        </div>
      </div>
    </>
  );
}
