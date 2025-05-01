import { HiOutlineSearchCircle } from "react-icons/hi";
import { useTranslation } from "react-i18next"; // 🔥 i18n ekliyoruz

function EmptyState() {
  const { t } = useTranslation(); // ✅ hook'u çağırıyoruz

  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500 animate-fadeIn">
      <HiOutlineSearchCircle size={80} className="text-gray-400 mb-6" />
      <h2 className="text-2xl font-semibold mb-2">
        {t("emptyState.title", "Henüz bir analiz bulunamadı")}
      </h2>
      <p className="text-center max-w-sm">
        {t(
          "emptyState.description",
          "Bir X (Twitter) kullanıcı adı girerek karakter analizi yapmaya başlayabilirsiniz."
        )}
      </p>
    </div>
  );
}

export default EmptyState;
