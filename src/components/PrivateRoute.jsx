import { Navigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTranslation } from "react-i18next";

function PrivateRoute({ children }) {
  const { currentUser, loading } = useUser();
  const token = localStorage.getItem("token");
  const { t } = useTranslation();

  // Backend ve localStorage kontrolü bitene kadar bekleyin
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        {t("auth.loading", "Verifying session...")}
      </div>
    );
  }

  // Giriş yoksa login sayfasına yönlendir
  if (!currentUser && !token) {
    console.warn("🚫 Giriş yapılmamış — /login'e yönlendiriliyor.");
    return <Navigate to="/login" replace />;
  }

  // Giriş varsa, korunan route'u render et
  return children;
}

export default PrivateRoute;
