// main.jsx
import { UserProvider } from "./context/UserContext";
// 1) Global uncaught exception yakalayıcı
window.addEventListener("error", (event) => {
  // ResizeObserver uyarısını yoksay
  if (
    event.message &&
    event.message.includes("ResizeObserver loop completed")
  ) {
    return;
  }
  console.error("🌐 Global uncaught error:", event.error, event);
});

// 2) Global unhandled promise rejection yakalayıcı
window.addEventListener("unhandledrejection", (event) => {
  console.error("🌐 Global unhandled promise rejection:", event.reason, event);
});

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import React from "react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserProvider>
      {" "}
      {/* ✅ context sarmalayıcı */}
      <App />
    </UserProvider>
  </StrictMode>
);
