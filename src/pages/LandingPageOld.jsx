import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPageOld = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isLoggedIn = Boolean(token);

  const handleAnalyzeClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home");
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    // Sayfada kal, refresh yapma
    window.location.reload(); // 🔄 Basit ve etkili: token silinir, isLoggedIn false olur
  };

  return (
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white text-gray-800 font-sans">
        {/* Header */}
        <header className="flex justify-between items-center px-8 py-6">
          <h1 className="text-3xl font-bold">İçgörü AI</h1>
          <button
            onClick={() => {
              if (isLoggedIn) {
                handleLogout(); // sadece token sil
              } else {
                navigate("/login");
              }
            }}
            className="bg-white text-sm font-semibold px-4 py-2 rounded border border-gray-300
             hover:bg-gray-300
             hover:border-gray-400 focus:outline-none focus:ring-0 transition active:scale-95 duration-150 ease-in-out"
          >
            {isLoggedIn ? "Çıkış Yap" : "Giriş Yap"}
          </button>
        </header>

        {/* Hero */}
        <section className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-xl font-bold mb-4">
              Sosyal Medya Karakter Analizi
            </h2>
            <p className="mb-4">
              İçgörü AI, Twitter, Instagram, LinkedIn gibi sosyal medya
              gönderilerinden yola çıkarak kişinin karakterini, ruh hâlini ve
              duygusal eğilimlerini analiz eder. Yapay zekâ destekli bu ücretsiz
              araçla, dijital yansımalarının ardındakini keşfet.
            </p>
            {!isLoggedIn && (
              <button
                onClick={() => navigate("/register")}
                className="bg-gray-200 text-sm font-semibold px-4 py-2 rounded border border-gray-300
             hover:bg-gray-300
             hover:border-gray-400 focus:outline-none focus:ring-0 transition active:scale-95 duration-150 ease-in-out"
              >
                Hemen Kaydol
              </button>
            )}
          </div>
          <img src="/assets/brain.png" alt="Beyin" className="w-40 lg:w-60" />
        </section>

        {/* X Post Analizi */}
        <section className="bg-gray-200 px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <img src="/assets/twitter.svg" alt="Twitter Logo" className="w-24" />
          <div className="max-w-md">
            <h3 className="text-lg font-bold mb-2">X Post Analizi</h3>
            <p className="mb-4">
              Paylaştığın kelimeler, karakterinin izlerini taşır. X
              gönderilerini analiz ederek bilinçaltındaki düşünce akışını ortaya
              çıkarıyoruz.
            </p>
            <button
              onClick={() => {
                handleAnalyzeClick();
              }}
              className="bg-white text-sm font-semibold px-4 py-2 rounded border border-gray-300
             hover:bg-gray-300
             hover:border-gray-400 focus:outline-none focus:ring-0 transition active:scale-95 duration-150 ease-in-out"
            >
              Analize Başla
            </button>
          </div>
        </section>

        {/* Instagram */}
        <section className="px-8 py-16 flex flex-col lg:flex-row-reverse items-center justify-between gap-8">
          <img
            src="/assets/instagram.png"
            alt="Instagram Logo"
            className="w-28"
          />
          <div className="max-w-md">
            <h3 className="text-lg font-bold mb-2">Instagram Analizi</h3>
            <p className="mb-4">
              Renklerin, kompozisyonların ve anlık karelerin bir dili vardır.
              Instagram’daki seçimlerin, iç dünyanı fısıldar.
            </p>
            <button
              disabled
              className="opacity-50 cursor-not-allowed border-0 outline-none ring-0 focus:outline-none focus:ring-0"
            >
              Geliştiriliyor
            </button>
          </div>
        </section>

        {/* Linkedin */}
        <section className="bg-gray-200 px-8 py-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <img
            src="/assets/linkedin.svg"
            alt="Linkedin Logo"
            className="w-24"
          />
          <div className="max-w-md">
            <h3 className="text-lg font-bold mb-2">Linkedin Analizi</h3>
            <p className="mb-4">
              Kariyerinle kurduğun ilişki, sadece bir özgeçmişten ibaret
              değildir. LinkedIn üzerindeki anlatımın, iş yaşamına dair sezgisel
              bir kapı aralar.
            </p>
            <button
              disabled
              className="opacity-50 cursor-not-allowed border-0 outline-none ring-0 focus:outline-none focus:ring-0"
            >
              Geliştiriliyor
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="flex flex-col items-center py-10 bg-white">
          <img src="/assets/openai.svg" alt="OpenAI" className="w-8 mb-2" />
          <p className="text-sm text-gray-600">Powered by OpenAI</p>
        </footer>
      </div>
    </div>
  );
};

export default LandingPageOld;
