import React, { createContext, useState, useEffect, useContext } from "react";

// إنشاء السياق
const ThemeContext = createContext();

// مزود ThemeContext
export const ThemeProvider = ({ children }) => {
  // محاولة الحصول على السمة من localStorage عند بداية التطبيق
  const savedTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState(savedTheme || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme); // تخزين السمة في localStorage
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook مخصص لاستخدام ThemeContext
export const useTheme = () => useContext(ThemeContext);
