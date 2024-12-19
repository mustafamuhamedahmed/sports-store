import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

// Hook مخصص لإدارة حالة المستخدم
const useAuth = () => {
  const context = useContext(AuthContext);

  // التحقق من وجود الـ Context
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { user, login: loginContext, logout: logoutContext } = context;
  
  // حالة التحميل والأخطاء عند تسجيل الدخول أو الخروج
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // تسجيل الدخول مع إدارة حالة التحميل
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      await loginContext(credentials);
    } catch (err) {
      setError("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // تسجيل الخروج مع إدارة حالة التحميل
  const logout = async () => {
    setLoading(true);
    setError(null);
    try {
      await logoutContext();
    } catch (err) {
      setError("Logout failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return { user, login, logout, loading, error };
};

export default useAuth;
