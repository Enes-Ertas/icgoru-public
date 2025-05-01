import React, { useEffect, useState } from "react";
import axios from "axios";
import { CSVLink } from "react-csv";
import useGlobalError from "../hooks/useGlobalError";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [stats, setStats] = useState(null);
  const [showConfirmedOnly, setShowConfirmedOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [analysisHistory, setAnalysisHistory] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedUserHistory, setSelectedUserHistory] = useState([]);
  const [sortOrder, setSortOrder] = useState("desc");
  const [expandedAnalysisId, setExpandedAnalysisId] = useState(null);
  const { showError } = useGlobalError();

  const csvHeaders = [
    { label: "E-posta", key: "email" },
    { label: "Admin?", key: "isAdmin" },
    { label: "Onaylı?", key: "isConfirmed" },
    { label: "Kayıt Tarihi", key: "createdAt" },
  ];

  const csvData = users.map((user) => ({
    email: user.email,
    isAdmin: user.isAdmin ? "Evet" : "Hayır",
    isConfirmed: user.isConfirmed ? "Evet" : "Hayır",
    createdAt: user.createdAt
      ? new Date(user.createdAt).toLocaleDateString("tr-TR")
      : "-",
  }));

  const handleViewHistory = async (userId) => {
    try {
      console.log("Geçmişi Görüntüle tıklandı!");
      const token = localStorage.getItem("token");
      const res = await axios.get(`/api/admin/analysis-history/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAnalysisHistory(res.data);
      setSelectedUserId(userId); // ✅ BUNU EKLE!
      setSelectedUserHistory(res.data); // ✅ sadece o kullanıcının geçmişini sakla
    } catch (err) {
      const code = err?.response?.data?.error;
      const fallback = "Geçmiş analiz alınamadı.";
      const msg = code ? t(`error.${code}`, fallback) : fallback;
      showError(msg);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(res.data);
      } catch (err) {
        const code = err?.response?.data?.error;
        const fallback = "Kullanıcılar alınamadı veya yetkiniz yok.";
        const msg = code ? t(`error.${code}`, fallback) : fallback;
        showError(msg);
      }
    };

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("/api/admin/stats", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error("❌ Stats fetch error:", err);
        showError(
          t("error.generic", "Bir hata oluştu. Lütfen tekrar deneyin.")
        );
      }
    };

    fetchUsers();
    fetchStats();
  }, []);

  const handleToggle = async (userId, updates) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.patch(`/api/admin/users/${userId}`, updates, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // local listeyi güncelle
      setUsers((prev) => prev.map((u) => (u._id === userId ? res.data : u)));
    } catch (err) {
      console.error("❌ Güncelleme hatası:", err);
      const code = err?.response?.data?.error;
      const fallback = "Kullanıcı güncellenemedi.";
      const msg = code ? t(`error.${code}`, fallback) : fallback;
      showError(msg);
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm("Bu kullanıcıyı silmek istediğine emin misin?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/api/admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prev) => prev.filter((u) => u._id !== userId));
    } catch (err) {
      console.error("❌ Silme hatası:", err);
      const code = err?.response?.data?.error;
      const fallback = "Kullanıcı silinemedi.";
      const msg = code ? t(`error.${code}`, fallback) : fallback;
      showError(msg);
    }
  };

  return (
    <div
      className="max-w-6xl mx-auto p-6"
      style={{
        backgroundImage: "url('/bg-gray-3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <h1 className="text-2xl font-bold mb-6">🛡️ Admin Panel</h1>

      {/* ✅ Arama kutusunu buraya ekle */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="E-posta ile ara"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 w-full border rounded-lg"
        />
      </div>
      {/* İstatistik kartları */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Kullanıcı Sayısı</p>
            <h2 className="text-xl font-bold">{stats.totalUsers}</h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Admin Sayısı</p>
            <h2 className="text-xl font-bold">{stats.totalAdmins}</h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Toplam Analiz</p>
            <h2 className="text-xl font-bold">{stats.totalAnalyses}</h2>
          </div>
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="text-sm text-gray-500">Bugünkü Analiz</p>
            <h2 className="text-xl font-bold">{stats.todaysAnalyses}</h2>
          </div>
        </div>
      )}

      {/* Hata mesajı */}
      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showConfirmedOnly}
            onChange={() => setShowConfirmedOnly((prev) => !prev)}
            className="form-checkbox h-4 w-4 text-indigo-600"
          />
          <span className="ml-2 text-sm text-gray-700">
            Yalnızca onaylı kullanıcıları göster
          </span>
        </label>
      </div>
      <div className="mb-4 flex justify-between items-center">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={showConfirmedOnly}
            onChange={() => setShowConfirmedOnly((prev) => !prev)}
            className="form-checkbox h-4 w-4 text-indigo-600"
          />
          <span className="ml-2 text-sm text-gray-700">
            Yalnızca onaylı kullanıcıları göster
          </span>
        </label>

        <CSVLink
          data={csvData}
          headers={csvHeaders}
          filename="kullanicilar.csv"
          className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 text-sm"
        >
          📤 CSV Olarak İndir
        </CSVLink>
      </div>

      {/* Kullanıcı tablosu */}
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">#</th>
            <th className="p-2 border text-left">E-posta</th>
            <th className="p-2 border">Admin?</th>
            <th className="p-2 border">Kayıt Tarihi</th>
            <th className="p-2 border">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {users
            .filter((user) =>
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user, idx) => (
              <React.Fragment key={user._id}>
                <tr className="text-center">
                  <td className="p-2 border">{idx + 1}</td>
                  <td className="p-2 border text-left">{user.email}</td>
                  <td className="p-2 border">{user.isAdmin ? "✅" : "❌"}</td>
                  <td className="p-2 border">
                    {user.createdAt
                      ? new Date(user.createdAt).toLocaleDateString("tr-TR", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : "-"}
                  </td>
                  <td className="p-2 border">
                    {/* 🛡️ Admin yap / kaldır */}
                    <button
                      onClick={() =>
                        handleToggle(user._id, {
                          isAdmin: !user.isAdmin,
                          isConfirmed: user.isConfirmed,
                        })
                      }
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      title="Admin durumunu değiştir"
                    >
                      🛡️
                    </button>

                    {/* ✅ Onayı kaldır / onayla */}
                    <button
                      onClick={() =>
                        handleToggle(user._id, {
                          isAdmin: user.isAdmin,
                          isConfirmed: !user.isConfirmed,
                        })
                      }
                      className="text-green-600 hover:text-green-800"
                      title="Onay durumunu değiştir"
                    >
                      ✅
                    </button>

                    {/* 🗑️ Silme */}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="text-red-500 hover:text-red-700"
                      title="Sil"
                    >
                      🗑️
                    </button>

                    <button
                      onClick={() => handleViewHistory(user._id)}
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      title="Geçmişi Görüntüle"
                    >
                      📜
                    </button>
                  </td>
                </tr>

                {/* ✅ Bu tr artık dışarıda ve HTML hatası yok */}
                {selectedUserId === user._id &&
                  selectedUserHistory.length > 0 && (
                    <tr>
                      <td colSpan="5">
                        <div className="p-4 bg-gray-100 rounded-xl mt-2">
                          <h3 className="font-bold mb-2">Analiz Geçmişi</h3>
                          <button
                            onClick={() =>
                              setSortOrder((prev) =>
                                prev === "desc" ? "asc" : "desc"
                              )
                            }
                            className="text-sm text-indigo-600 hover:underline mb-2"
                          >
                            {sortOrder === "desc"
                              ? "🔽 Yeni → Eski"
                              : "🔼 Eski → Yeni"}
                          </button>

                          <table className="w-full border border-gray-300">
                            <thead className="bg-gray-100">
                              <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Analiz Başlığı</th>
                                <th className="p-2 border">Tarih</th>
                              </tr>
                            </thead>
                            <tbody>
                              {[...analysisHistory]
                                .sort((a, b) =>
                                  sortOrder === "desc"
                                    ? new Date(b.timestamp) -
                                      new Date(a.timestamp)
                                    : new Date(a.timestamp) -
                                      new Date(b.timestamp)
                                )
                                .map((analysis, i) => (
                                  <React.Fragment key={analysis._id}>
                                    <tr
                                      className="text-center hover:bg-gray-50 cursor-pointer"
                                      onClick={() =>
                                        setExpandedAnalysisId(
                                          expandedAnalysisId === analysis._id
                                            ? null
                                            : analysis._id
                                        )
                                      }
                                    >
                                      <td className="p-2 border">{i + 1}</td>
                                      <td className="p-2 border font-medium">
                                        {analysis.username}
                                      </td>
                                      <td className="p-2 border">
                                        {new Date(
                                          analysis.timestamp
                                        ).toLocaleDateString("tr-TR", {
                                          year: "numeric",
                                          month: "short",
                                          day: "numeric",
                                        })}
                                      </td>
                                    </tr>

                                    {expandedAnalysisId === analysis._id && (
                                      <tr>
                                        <td
                                          colSpan="3"
                                          className="p-4 bg-gray-100 text-left"
                                        >
                                          <p className="text-gray-700 whitespace-pre-line">
                                            <span className="font-semibold">
                                              🧠 GPT Analizi:
                                            </span>
                                            <br />
                                            {analysis.result}
                                          </p>
                                        </td>
                                      </tr>
                                    )}
                                  </React.Fragment>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  )}
              </React.Fragment>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPanel;
