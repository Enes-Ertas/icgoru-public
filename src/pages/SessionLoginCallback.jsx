import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";
import useGlobalError from "../hooks/useGlobalError";

export default function SessionLoginCallback() {
  const navigate = useNavigate();
  const { setCurrentUser } = useUser();
  const { t } = useTranslation();
  const { showError } = useGlobalError();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/auth/session/me", {
        withCredentials: true,
      })
      .then((res) => {
        console.log("✅ SESSION SUCCESS:", res.data);
        localStorage.setItem("sessionUser", JSON.stringify(res.data.user));
        setCurrentUser(res.data.user);
        navigate("/home");
      })
      .catch((err) => {
        console.warn("❌ SESSION FAILED:", err);
        const code = err?.response?.data?.error;
        const fallback = t("error.unauthorized", "Yetkisiz erişim.");
        const msg = code ? t(`error.${code}`, fallback) : fallback;
        showError(msg);
        navigate("/login");
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p>{t("session.verifying", "Oturum doğrulanıyor...")}</p>
    </div>
  );
}
