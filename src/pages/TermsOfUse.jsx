// src/pages/TermsOfUse.jsx
import React from "react";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from "react-router-dom";
import LanguageSwitcher from "../components/LanguageSwitcher";
import Header from "../components/Header";

export default function TermsOfUse() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);
  const sections = [
    {
      id: "intro",
      titleKey: "terms.section.intro.title",
      textKey: "terms.section.intro.text",
    },
    {
      id: "license",
      titleKey: "terms.section.license.title",
      textKey: "terms.section.license.text",
    },
    {
      id: "disclaimer",
      titleKey: "terms.section.disclaimer.title",
      textKey: "terms.section.disclaimer.text",
    },
    {
      id: "limitations",
      titleKey: "terms.section.limitations.title",
      textKey: "terms.section.limitations.text",
    },
    {
      id: "law",
      titleKey: "terms.section.law.title",
      textKey: "terms.section.law.text",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-beige-light text-gray-800">
      {/* Header */}
      <Header />
      <div className="pt-20" />

      {/* Hero / Intro */}
      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-gray-900">
            {t("terms.heading", "Kullanım Şartları")}
          </h2>
          <p className="text-gray-700">
            {t(
              "terms.intro",
              "Siteyi kullanmadan önce aşağıdaki şartları lütfen dikkatle okuyun."
            )}
          </p>
        </div>
      </section>

      {/* Content Cards */}
      <main className="flex-1 -mt-12 px-4 pb-16">
        <div className="max-w-5xl mx-auto grid gap-8">
          {sections.map((sec) => (
            <div
              key={sec.id}
              id={sec.id}
              className="bg-white border border-beige-dark rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-2xl font-semibold mb-3 text-gray-900">
                {t(sec.titleKey)}
              </h3>
              <p className="text-gray-700 leading-relaxed">{t(sec.textKey)}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-beige-dark py-6 text-center text-gray-600">
        © {new Date().getFullYear()} İçgörü AI •{" "}
        <Link
          to="/privacy"
          className="underline text-blue-600 hover:text-blue-800"
        >
          {t("footer.privacy", "Gizlilik Politikası")}
        </Link>{" "}
        •{" "}
        <Link
          to="/terms"
          className="underline text-blue-600 hover:text-blue-800"
        >
          {t("footer.terms", "Kullanım Şartları")}
        </Link>
      </footer>
    </div>
  );
}
