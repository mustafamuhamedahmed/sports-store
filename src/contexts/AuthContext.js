import React, { createContext, useState, useContext, useEffect } from "react";

// إنشاء السياق
const AuthContext = createContext();

// مزود AuthContext
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // تخزين بيانات المستخدم
  const [loading, setLoading] = useState(true); // حالة تحميل البيانات

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  if (loading) {
    return <div>Loading...</div>; // يمكن تخصيص شاشة تحميل هنا
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook مخصص لاستخدام AuthContext
export const useAuth = () => useContext(AuthContext);
