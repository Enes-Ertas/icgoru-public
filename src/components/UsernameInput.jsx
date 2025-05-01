// src/components/UsernameInput.jsx
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

function UsernameInput({ onAnalyze, disabled }) {
  const [username, setUsername] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) return; // boş gönderim engellensin
    onAnalyze(trimmed);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 flex justify-center gap-4">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={t("usernameInput.placeholder")}
        className="px-4 py-3 rounded-xl border border-gray-300 bg-gradient-to-b from-[#fafafa] via-[#f7f7f7] to-[#f3f2f0] shadow-[0px_4px_10px_rgba(0,0,0,0.05)] focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <button
        type="submit"
        disabled={disabled}
        className="bg-gradient-to-b from-white to-[#f5f5f5] text-sm font-semibold px-6 py-3 rounded-xl border border-gray-300 shadow-[0px_4px_10px_rgba(0,0,0,0.05)] hover:bg-gray-100 hover:shadow-md transition-all duration-200 active:scale-95"
      >
        {t("usernameInput.button")}
      </button>
    </form>
  );
}

export default UsernameInput;
