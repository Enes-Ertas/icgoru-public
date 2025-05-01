import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";

function UserMenu({ currentUser: userProp, onLogout }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const { currentUser, setCurrentUser } = useUser(); // ✔ context’ten alındı
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="absolute top-4 right-4 text-sm z-50" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-b from-white to-[#f5f5f5] border border-gray-300 rounded-xl shadow-sm hover:bg-gray-100 hover:shadow-md transition-all duration-200 text-gray-700 font-semibold"
      >
        {/* Kullanıcı İkonu + İsim */}
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.8"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.5 20.25a8.25 8.25 0 0115 0v.75H4.5v-.75z"
            />
          </svg>
          <span>{currentUser?.name}</span>
        </div>
        {/* ▼ ikonunu ayrı tutalım */}
        <span className="text-gray-500 ml-1">▼</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-32 rounded-xl border border-gray-300 bg-gradient-to-b from-white to-[#f8f8f8] shadow-[0px_4px_15px_rgba(0,0,0,0.05)]">
          <button
            onClick={onLogout}
            className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-b-xl"
          >
            {t("auth.logout", "Çıkış Yap")}
          </button>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
