import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    const s = localStorage.getItem("sessionUser");
    return s ? JSON.parse(s) : null;
  });
  // ➋ Backend session kontrolü bitene kadar bekleyecek flag
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // 1️⃣ LocalStorage’den yükleme
    const session = localStorage.getItem("sessionUser");
    if (session) {
      setCurrentUser(JSON.parse(session));
    }

    // 2️⃣ Backend’deki session’ı kontrol et
    axios.defaults.withCredentials = true;
    axios
      .get("/api/auth/session/me")
      .then((res) => {
        setCurrentUser(res.data.user);
        localStorage.setItem("sessionUser", JSON.stringify(res.data.user));
      })
      .catch(() => {
        setCurrentUser(null);
        localStorage.removeItem("sessionUser");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
