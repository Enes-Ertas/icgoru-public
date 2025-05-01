import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Confirm from "./pages/Confirm";
import PrivateRoute from "./components/PrivateRoute";
import ResendConfirmation from "./pages/ResendConfirmation";
import AdminPanel from "./pages/AdminPanel";
import LandingPage from "./pages/LandingPage";
import "./i18n";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfUse from "./pages/TermsOfUse";
import SessionLoginCallback from "./pages/SessionLoginCallback";

function App() {
  return (
    <Router>
      <Routes>
        {/* Açılış sayfası */}
        <Route path="/" element={<LandingPage />} />

        {/* Koruma altında olan route */}
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />

        {/* Açık sayfalar */}
        <Route path="/login" element={<Login />} />
        <Route path="/session-callback" element={<SessionLoginCallback />} />
        <Route path="/register" element={<Register />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/resend-confirmation" element={<ResendConfirmation />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfUse />} />
      </Routes>
    </Router>
  );
}

export default App;
