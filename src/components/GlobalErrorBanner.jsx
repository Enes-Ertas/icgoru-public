import { useTranslation } from "react-i18next";
import { X } from "lucide-react"; // opsiyonel ikon

export default function GlobalErrorBanner({ error, onClose }) {
  const { t } = useTranslation();

  if (!error) return null;

  return (
    <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-6">
      <div className="bg-[#FEE2E2] text-red-800 border border-red-300 rounded-2xl shadow-lg px-6 py-4 relative animate-fade-in">
        {/* Kapat butonu */}
        <button
          className="absolute top-3 right-4 text-red-600 hover:text-red-800 text-sm"
          onClick={onClose}
        >
          <X size={16} />
        </button>

        {/* Mesaj */}
        <p className="text-sm sm:text-base font-medium text-center">
          {t(error)}
        </p>
      </div>
    </div>
  );
}
