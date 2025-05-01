// src/components/TraitCarousel.jsx
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

// Basit emoji eşleşmeleri
export const traitIcons = {
  // Türkçe ↔️ English eşleştirmeleri
  duyarlı: "💗",
  sensitive: "💗",
  inatçı: "🐂",
  stubborn: "🐂",
  keskin: "🗡️",
  sharp: "🗡️",
  hırslı: "🔥",
  ambitious: "🔥",
  dingin: "🌊",
  calm: "🌊",
  asi: "⚡",
  rebellious: "😈",
  inandırıcı: "🗣️",
  cesur: "💪",
  mizahi: "😂",
  isyankar: "🚫",
  defiant: "🚫",
  "lider ruhlu": "👑",
  "leader-like": "👑",
  leader: "👑",
  içedönük: "🌑",
  introverted: "🌑",
  introspective: "🌑",
  dışadönük: "🌞",
  extroverted: "🌞",
  yaratıcı: "🎨",
  creative: "🎨",
  melankolik: "🌧️",
  melancholic: "🌧️",
  enerjik: "⚡",
  energetic: "⚡",
  kararsız: "⚖️",
  indecisive: "⚖️",
  idealist: "🌈",
  idealistic: "🌈",
  korkusuz: "🦁",
  fearless: "🦁",
  çekingen: "🐭",
  shy: "🐭",
};

function TraitCarousel({ traits }) {
  const { t } = useTranslation();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  if (!traits || traits.length === 0) return null;
  console.log("🎯 Gelen traits:", traits);

  return (
    <div className="rounded-lg p-4 mb-4">
      {ready && (
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={20}
          slidesPerView={1}
          autoHeight={true}
          className="flex flex-col items-center"
        >
          {traits.map((trait, index) => {
            const key = trait.trait.toLowerCase();
            const emoji = trait.emoji
              ? trait.emoji
              : traitIcons[trait.trait.toLowerCase().replace(/\s+/g, "")] ||
                "🧠";

            return (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center text-center space-y-3 px-6 py-6 rounded-2xl shadow-sm bg-white/60 transition transform hover:scale-105 hover:shadow-md duration-200">
                  <div className="text-5xl">{emoji}</div>
                  <h3 className="text-lg font-bold text-blue-800">
                    {t(`traits.${key}`, trait.trait)}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {trait.description}
                  </p>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </div>
  );
}

export default TraitCarousel;
