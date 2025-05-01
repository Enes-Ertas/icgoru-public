import React, { useState, useEffect } from "react";
import axios from "axios";
import { Circles } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import UsernameInput from "../components/UsernameInput";
import AnalysisResult from "../components/AnalysisResult";
import TweetFeed from "../components/TweetFeed";
import HistoryList from "../components/HistoryList";
import UserMenu from "../components/UserMenu";
import EmptyState from "../components/EmptyState";
import InsightLab from "../components/InsightLab";
import { TailSpin } from "react-loader-spinner";
import { useUser } from "../context/UserContext";
import useGlobalError from "../hooks/useGlobalError";
import GlobalErrorBanner from "../components/GlobalErrorBanner";

export default function Home() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const { i18n, t } = useTranslation();
  const [analysisInProgress, setAnalysisInProgress] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const [estimatedTime, setEstimatedTime] = useState(null);
  const { error, showError, clearError } = useGlobalError();

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage) {
      i18n.changeLanguage(savedLanguage);
    }
  }, []);

  // Kullanıcı ve geçmişi çek
  useEffect(() => {
    const token = localStorage.getItem("token");
    const sessionUser = localStorage.getItem("sessionUser");

    if (!token && sessionUser) {
      console.log("🔵 Twitter session’dan localStorage user bulundu.");
      setCurrentUser(JSON.parse(sessionUser));
    }

    if (token) {
      // JWT doğrulama
      axios
        .get("/api/auth/me", { headers: { Authorization: `Bearer ${token}` } })
        .then((r) => setCurrentUser(r.data))
        .catch(() => {
          localStorage.removeItem("token");
          showError(t("error.unauthorized", "Giriş yapmanız gerekiyor."));
          navigate("/login");
        });

      axios
        .get(
          "/api/history",
          token
            ? { headers: { Authorization: `Bearer ${token}` } }
            : { withCredentials: true }
        )
        .then((r) => setHistory(r.data))
        .catch((err) => {
          console.error("📛 /api/history hatası:", err);
          const code = err?.response?.data?.error;
          const fallback = t("error.generic");
          const msg = code ? t(`error.${code}`, fallback) : fallback;
          showError(msg);
          setHistory([]);
        });
    } else {
      // Session doğrulama
      axios
        .get("/api/auth/session/me", { withCredentials: true })
        .then((res) => {
          console.log("🟢 Session ile kullanıcı bulundu:", res.data);
          setCurrentUser(res.data.user);
          localStorage.setItem("sessionUser", JSON.stringify(res.data.user));
          axios
            .get("/api/history", { withCredentials: true })
            .then((r) => setHistory(r.data))
            .catch((err) => {
              const code = err?.response?.data?.error;
              const fallback = t(
                "error.fetchHistoryFailed",
                "Geçmiş yüklenemedi."
              );
              const msg = code ? t(`error.${code}`, fallback) : fallback;
              showError(msg);
              setHistory([]);
            });
        })
        .catch(() => {
          console.warn(
            "❌ Session başarısız, login sayfasına yönlendiriliyor."
          );
          showError(t("error.unauthorized")); // opsiyonel
          navigate("/login");
        });
    }
  }, [navigate]);

  // Analiz fonksiyonu
  const handleAnalyze = async (username) => {
    // setAnalysisResult(null);
    setLoading(true);
    const config = {
      withCredentials: true, // ← session cookie’nin gitmesi için
      headers: {},
    };
    setAnalysisInProgress(true);
    setMessage("");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.post(
        "/api/start-analysis", // 🔥 Burayı değiştirdik!
        { username, lang: i18n.language },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data?.error === "rate-limit") {
        showError(t("error.rateLimit"));
        setLoading(false);
        setAnalysisInProgress(false);
        return;
      }

      const sess = await axios.get("/api/auth/session/me", {
        withCredentials: true,
      });
      setCurrentUser(sess.data.user);
      localStorage.setItem("sessionUser", JSON.stringify(sess.data.user));
      console.log("🛰️ /api/start-analysis yanıtı:", res.data);

      if (res.status === 202 && res.data.queued) {
        setMessage(
          t(
            "home.queuedMessage",
            "🕒 Analiz sıraya alındı, sonuç bekleniyor..."
          )
        );
        pollAnalysisStatus(username); // ✅ Polling başlat
        return;
      }

      // Normal durum: hemen analiz sonucu geldi (çok nadir olacak).
      const data = res.data;
      console.log("🛰️ Backend'den gelen yeni analiz verisi:", data);
      setAnalysisResult({
        fullAnalysis: data.result,
        traits: data.traits || [],
        analysisId: data._id,
      });
      console.log("✅ Backend'den gelen veri:", data);
      setPosts(data.posts || []);
      setHistory((prev) =>
        [data, ...prev.filter((i) => i.username !== data.username)].slice(0, 5)
      );

      const me = await axios.get("/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(me.data);
    } catch (err) {
      console.error("🛑 handleAnalyze error:", err);
      const apiErrorKey = err?.response?.data?.error;
      const rawMessage = err?.response?.data?.message;
      setAnalysisInProgress(false);
      const fallback = t(
        "error.generic",
        "Bir hata oluştu. Lütfen tekrar deneyin."
      );
      const translated = apiErrorKey
        ? t(`error.${apiErrorKey}`, rawMessage || fallback)
        : rawMessage || fallback;
      showError(translated);
    } finally {
      setLoading(false);
    }
  };
  const handleLogout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    // 1) JWT token'ı sil
    localStorage.removeItem("token");
    // 2) Twitter-session user'ı sil
    localStorage.removeItem("sessionUser");
    // 3) Local state'i temizle
    setCurrentUser(null);

    // 3) HARD DELETE session cookie (Vite / React için)
    document.cookie =
      "connect.sid=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT;";
    // 4) Landing page'e dön
    navigate("/");
    window.location.reload();
  };

  const pollAnalysisStatus = (username) => {
    const token = localStorage.getItem("token");
    const start = Date.now(); // analiz başlangıç anı
    const estimatedTotal = 22; // Ortalama analiz süresi (saniye)
    setRemainingTime(estimatedTotal);

    const uiTimer = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      const remaining = Math.max(estimatedTotal - elapsed, 0);
      setRemainingTime(remaining);
      if (remaining === 0) clearInterval(uiTimer);
    }, 1000);

    const intervalId = setInterval(async () => {
      try {
        const res = await axios.get("/api/history", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setHistory(res.data);

        const matched = res.data.find((item) => {
          return item.username === username;
        });

        if (matched) {
          setRemainingTime(null);
          console.log("✅ Eşleşme bulundu. Süreyi sıfırlıyoruz.");
          const normalizedTraits = (matched.traits || []).map((t) => ({
            trait: t.trait,
            description: t.description,
            emoji: t.emoji || "🧠", // 🎯 Eğer emoji yoksa default 🧠 ata
          }));
          setAnalysisResult({
            fullAnalysis: matched.result,
            traits: normalizedTraits || [],
            analysisId: matched._id,
          });
          setPosts(matched.posts || []);
          setMessage("");
          clearInterval(intervalId);
          setLoading(false);
          setAnalysisInProgress(false);
          setRemainingTime(null); // ✅ Temizlik: süreyi sıfırla
        } else {
          console.log("⏳ Analiz bulunamadı, bekleniyor...");
        }
      } catch (error) {
        console.error("Polling sırasında hata:", error);
        const code = error?.response?.data?.error;
        const fallback = t("error.generic", "Bir hata oluştu.");
        const msg = code ? t(`error.${code}`, fallback) : fallback;
        showError(msg);
        setLoading(false);
        setAnalysisInProgress(false);
        setRemainingTime(null);
        clearInterval(intervalId);
      }
    }, 5000);
  };
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-beige-light to-beige-dark px-4">
      <GlobalErrorBanner error={error} onClose={clearError} />
      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 bg-white/60 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 py-4">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          {t("home.branding", "İçgörü AI")}
        </h1>
        {currentUser && (
          <UserMenu currentUser={currentUser} onLogout={handleLogout} />
        )}
      </header>

      {/* Spacer */}
      <div className="pt-20" />

      {/* Başlık & Quota */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900">
          {t("home.title", "İçgörü AI")}
        </h2>
        {currentUser?.dailyQuota && (
          <p className="text-gray-700 mt-1">
            {t("home.quotaLabel", "Bugünkü analiz hakkınız:")}{" "}
            <strong>{currentUser.dailyQuota.remaining}</strong>
          </p>
        )}
      </div>

      {/* Input */}
      <div className="flex justify-center mb-12">
        <UsernameInput onAnalyze={handleAnalyze} disabled={loading} />
      </div>

      {/* Loading Overlay */}
      {analysisInProgress && (
        <div className="fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm flex flex-col items-center justify-center z-50">
          {analysisInProgress && (
            <InsightLab
              username={currentUser?.name || currentUser?.screenName || ""}
              remainingTime={remainingTime}
            />
          )}
        </div>
      )}

      {/* {message && !loading && (
        <div className="mx-auto mb-6 max-w-xl px-4 py-2 rounded bg-yellow-100 border border-yellow-400 text-yellow-700 text-center">
          {message}
        </div>
      )} */}

      {/* Analiz Sonucu */}
      {analysisResult && (
        <div
          className="w-full max-w-4xl mx-auto mb-12 rounded-2xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]"
          style={{
            background:
              "radial-gradient(at top left, rgba(255,255,255,0.6), transparent)," +
              "linear-gradient(to bottom right, #F9F8F7, #ECE8E4)",
          }}
        >
          <AnalysisResult
            result={analysisResult.fullAnalysis}
            traits={analysisResult.traits}
            analysisId={analysisResult.analysisId}
          />
          {posts.length > 0 && (
            <TweetFeed posts={posts.slice(0, 5)} username={currentUser.name} />
          )}
        </div>
      )}

      {/* Geçmiş Listesi */}
      {!analysisResult && history.length > 0 && (
        <div className="w-full max-w-md mx-auto mb-12 rounded-2xl bg-white p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.05)]">
          <HistoryList
            history={history}
            activeIndex={activeIndex}
            onClickItem={(item, idx) => {
              setAnalysisResult({
                fullAnalysis: item.result,
                traits: item.traits || [],
              });
              setPosts(item.posts || []);
              setActiveIndex(idx);
            }}
          />
        </div>
      )}

      {/* Boş Durum */}
      {!analysisResult && history.length === 0 && <EmptyState />}
    </div>
  );
}
