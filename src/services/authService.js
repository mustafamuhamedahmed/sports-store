import { post } from "./api"; // استيراد دالة post من ملف api

/**
 * تسجيل دخول المستخدم.
 * @param {string} email - البريد الإلكتروني للمستخدم.
 * @param {string} password - كلمة المرور.
 * @returns {Promise<any>} - بيانات المستخدم بعد تسجيل الدخول.
 */
export const login = async (email, password) => {
  const data = { email, password };
  const response = await post("/auth/login", data);

  // إذا تم تسجيل الدخول بنجاح، احفظ رمز التوثيق (token)
  if (response?.token) {
    setAuthToken(response.token);
  }

  return response;
};

/**
 * تسجيل مستخدم جديد.
 * @param {object} userData - بيانات المستخدم الجديد (مثل الاسم والبريد الإلكتروني وكلمة المرور).
 * @returns {Promise<any>} - بيانات المستخدم بعد التسجيل.
 */
export const register = async (userData) => {
  return await post("/auth/register", userData);
};

/**
 * تسجيل خروج المستخدم.
 */
export const logout = () => {
  localStorage.removeItem("token"); // إزالة رمز التوثيق من التخزين المحلي
};

/**
 * الحصول على رمز التوثيق للمستخدم الحالي.
 * @returns {string|null} - رمز التوثيق إذا كان موجودًا، أو null إذا لم يكن موجودًا.
 */
export const getCurrentUser = () => {
  return localStorage.getItem("token"); // استرجاع رمز التوثيق من التخزين المحلي
};

/**
 * حفظ رمز التوثيق (JWT) في التخزين المحلي.
 * @param {string} token - رمز التوثيق.
 */
export const setAuthToken = (token) => {
  localStorage.setItem("token", token); // حفظ رمز التوثيق في التخزين المحلي
};
