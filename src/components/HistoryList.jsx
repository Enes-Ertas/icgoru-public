import React from "react";
import { useTranslation } from "react-i18next";

export default function HistoryList({ history, activeIndex, onClickItem }) {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <div className="bg-[#E8E5DF] py-4 px-6 rounded-t-2xl">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          {t("historyList.title", "Son 5 Analiz")}
        </h3>
      </div>
      <ul className="bg-[#F6F4F0] divide-y divide-gray-200 rounded-b-2xl overflow-hidden">
        {history.slice(0, 5).map((item, idx) => {
          const date = item.timestamp
            ? new Date(item.timestamp).toLocaleDateString("tr-TR")
            : "";
          const isActive = idx === activeIndex;
          return (
            <li
              key={idx}
              onClick={() => onClickItem(item, idx)}
              className={`flex justify-between items-center px-4 sm:px-6 py-3 text-sm cursor-pointer ${
                isActive
                  ? "bg-gray-100 shadow-inner"
                  : "hover:bg-gray-100 hover:scale-[1.02] active:scale-95"
              } transition-all`}
            >
              <span className="text-gray-500 text-xs break-words">{date}</span>
              <span className="text-gray-700 font-medium break-words">
                {item.username}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
