// src/components/HowItWorks.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import { Search, Brain, Share, FileText } from "lucide-react";
import {
  UserIcon,
  CpuChipIcon,
  ServerStackIcon,
  DocumentCheckIcon,
} from "@heroicons/react/24/outline";

export default function HowItWorks() {
  const { t } = useTranslation();

  // sadece ikonları tutuyoruz; başlık ve açıklama t(..) ile JSON'dan gelecek
  const steps = [UserIcon, CpuChipIcon, ServerStackIcon, DocumentCheckIcon];

  return (
    <section id="how-it-works" className="bg-white px-8 pt-24 pb-16">
      <div className="max-w-5xl mx-auto mb-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
          {t("howItWorks.title")}
        </h2>
        <p className="text-gray-600 mt-2">{t("howItWorks.subtitle")}</p>
      </div>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
        {/* 1. Adım */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Search className="mx-auto w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {t("howItWorks.cards.connect.title")}
          </h3>
          <p className="text-gray-700">{t("howItWorks.cards.connect.desc")}</p>
        </div>

        {/* 2. Adım */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Brain className="mx-auto w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {t("howItWorks.cards.analyze.title")}
          </h3>
          <p className="text-gray-700">{t("howItWorks.cards.analyze.desc")}</p>
        </div>

        {/* 3. Adım */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <Share className="mx-auto w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {t("howItWorks.cards.explore.title")}
          </h3>
          <p className="text-gray-700">{t("howItWorks.cards.explore.desc")}</p>
        </div>

        {/* 4. Adım */}
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
          <FileText className="mx-auto w-12 h-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            {t("howItWorks.cards.share.title")}
          </h3>
          <p className="text-gray-700">{t("howItWorks.cards.share.desc")}</p>
        </div>
      </div>
    </section>
  );
}
