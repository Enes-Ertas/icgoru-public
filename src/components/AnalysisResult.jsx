// src/components/AnalysisResult.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TraitCarousel from "./TraitCarousel";
import { ChevronDown, ChevronUp } from "lucide-react";

function AnalysisResult({ result, traits, analysisId }) {
  const { t } = useTranslation();

  if (!result) return null;

  // Cümleleri böl, 3 parçaya ayır
  const sentences = result.split(/(?<=\.)\s+/);
  const chunkSize = Math.ceil(sentences.length / 3);
  const chunks = [
    sentences.slice(0, chunkSize).join(" "),
    sentences.slice(chunkSize, 2 * chunkSize).join(" "),
    sentences.slice(2 * chunkSize).join(" "),
  ];

  // Collapsible setup
  const INITIAL_COUNT = 1; // başlangıçta 1 chunk
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? chunks : chunks.slice(0, INITIAL_COUNT);

  // PDF indirme
  const handleDownloadPDF = async (analysisId) => {
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`/api/pdf/${analysisId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          t("analysisResult.downloadError", "Failed to download PDF")
        );
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = `${analysisId}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ PDF indirme hatası:", error);
    }
  };
  return (
    <div className="rounded-lg p-4 mt-4">
      <h2 className="text-xl font-semibold text-gray-700 mb-6 text-center">
        {t("analysisResult.title")}
      </h2>

      {traits?.length > 0 && (
        <div className="mb-4">
          <TraitCarousel traits={traits} />
        </div>
      )}

      <div>
        <div
          className={`relative rounded-md ${
            showAll ? "" : "max-h-[600px] overflow-hidden"
          }`}
        >
          {displayed.map((chunk, idx) => (
            <p
              key={idx}
              className="text-gray-800 text-base leading-7 whitespace-pre-wrap mb-4"
            >
              {chunk}
            </p>
          ))}

          {!showAll && (
            <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-[#f5f3ef] to-transparent pointer-events-none" />
          )}
        </div>
      </div>

      {chunks.length > INITIAL_COUNT && (
        <div className="text-center mt-4">
          <button
            onClick={() => setShowAll(!showAll)}
            aria-label={
              showAll
                ? t("analysisResult.showLess")
                : t("analysisResult.showAll")
            }
            className="inline-flex items-center justify-center p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-full transition"
          >
            {showAll ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </button>
        </div>
      )}

      {
        <div className="mt-8 text-center">
          <button
            onClick={() => handleDownloadPDF(analysisId)}
            className="inline-flex items-center gap-3 px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-100 hover:shadow-md transition-all duration-200"
          >
            <img
              src="/assets/icons/pdf-icon.png"
              alt={t("analysisResult.pdfAlt")}
              className="w-6 h-6"
            />

            {t("analysisResult.downloadPDF")}
          </button>
        </div>
      }
    </div>
  );
}

export default AnalysisResult;
