import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ResendConfirmation() {
  const [params] = useSearchParams();
  const [message, setMessage] = useState("İşleniyor...");

  useEffect(() => {
    const email = params.get("email");

    if (!email) {
      setMessage("❌ Geçersiz e-posta bağlantısı.");
      return;
    }

    axios
      .post("/api/auth/resend-confirmation", { email })
      .then(() => {
        setMessage("✅ Yeni onay bağlantısı e-posta adresinize gönderildi.");
      })
      .catch((err) => {
        setMessage("❌ Onay bağlantısı gönderilemedi.");
        console.error(err);
      });
  }, [params]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Onay Bağlantısı
        </h2>
        <p className="text-gray-700 text-center">{message}</p>
      </div>
    </div>
  );
}

export default ResendConfirmation;
