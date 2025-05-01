// src/components/InsightLab.jsx
import React, { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Oval } from "react-loader-spinner";

export default function InsightLab({ username, remainingTime }) {
  const { t } = useTranslation();
  const [currentPhase, setCurrentPhase] = useState(0);

  const phaseKeys = ["scanning", "detecting", "integrating", "generating"];
  const phases = useMemo(
    () => phaseKeys.map((key) => t(`insightLab.phases.${key}`, key)),
    [t]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 4000); // her 5 saniyede bir faz değişsin
    return () => clearInterval(interval);
  }, [phases.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-8 bg-gradient-to-br from-white via-gray-100 to-white rounded-2xl shadow-lg animate-fade-in">
      {/* Spinner */}
      <div className="mb-6">
        <Oval
          height={50}
          width={50}
          color="#2563EB"
          secondaryColor="#E5E7EB"
          strokeWidth={4}
          strokeWidthSecondary={4}
          ariaLabel="loading-indicator"
        />
      </div>

      {/* Başlık */}
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🔬 {t("insightLab.title", "Insight Engine Running")}
      </h2>

      {/* Faz ve TypingDots */}
      <p className="text-gray-700 text-base mb-2 flex items-center">
        {phases[currentPhase]}
        <span className="typing-dots ml-2" />
      </p>

      {/* Kullanıcı adı gösterimi */}
      <p className="text-gray-500 text-sm mb-2">
        {username
          ? t("insightLab.userMessage", {
              username: `@${username}`,
              defaultValue: "Analysis started for @{{username}}...",
            })
          : t("insightLab.defaultMessage", "Analysis is starting...")}
      </p>

      {/* Estimated Time */}
      {remainingTime && (
        <p className="text-gray-500 text-xs mt-4">
          ⏱️ ~{remainingTime} {t("insightLab.secondsLeft", "seconds left...")}
        </p>
      )}
    </div>
  );
}
