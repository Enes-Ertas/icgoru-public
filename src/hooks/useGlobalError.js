import { useState, useEffect } from "react";

export default function useGlobalError() {
  const [error, setError] = useState(null);
  const showError = (msg) => setError(msg);
  const clearError = () => setError(null);

  useEffect(() => {
    console.log("🔴 Global error changed:", error);
  }, [error]);

  return { error, showError, clearError };
}
