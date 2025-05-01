// src/components/Pricing.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { CheckIcon } from "@heroicons/react/24/outline";

export default function Pricing() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState("free");

  const handleSelect = (planKey) => {
    switch (planKey) {
      case "free":
        return navigate("/register");
      case "pro":
        return navigate("/subscribe");
      case "enterprise":
        return navigate("/contact");
      default:
        return;
    }
  };

  // plan anahtarlarını JSON'dan okuyabilirsiniz
  const planKeys = ["free", "pro", "enterprise"];

  return (
    <section id="pricing" className="px-8 py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900">
          {t("pricing.title")}
        </h2>
        <p className="text-gray-600 mt-2">{t("pricing.subtitle")}</p>
      </div>

      <div className="max-w-5xl mx-auto grid gap-6 grid-cols-1 md:grid-cols-3">
        {planKeys.map((key) => {
          const isActive = key === selectedPlan;
          const plan = t(`pricing.plans.${key}`, { returnObjects: true });
          return (
            <div
              key={key}
              onClick={() => setSelectedPlan(key)}
              className={`
                flex flex-col rounded-2xl p-6 shadow-lg bg-white cursor-pointer transition
                ${
                  isActive
                    ? "border-2 border-blue-600"
                    : "border border-transparent hover:border-gray-300"
                }
              `}
            >
              <h3 className="text-xl font-semibold mb-4">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6">{plan.price}</p>

              <ul className="flex-1 space-y-3 mb-6 text-left">
                {plan.features.map((feat) => (
                  <li key={feat} className="flex items-center">
                    <CheckIcon className="w-5 h-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feat}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(key);
                }}
                className={`
                  mt-auto py-2 rounded-lg font-semibold transition
                  ${
                    isActive
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }
                `}
              >
                {plan.button}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
