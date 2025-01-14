import axios from "axios";

/**
 * الأساس لجميع طلبات API. قم بتغيير الرابط ليناسب بيئتك.
 */
const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:8080/api"; // استخدم المتغيرات البيئية إذا توفرت

/**
 * دالة لإرسال طلبات GET إلى API.
 * @param {string} endpoint - نهاية الرابط (endpoint) الخاص بالطلب.
 * @param {object} config - إعدادات إضافية اختيارية.
 * @returns {Promise<any>} - بيانات الاستجابة.
 */
export const get = async (endpoint, config = {}) => {
  return apiRequest("get", endpoint, null, config);
};

/**
 * دالة لإرسال طلبات POST إلى API.
 * @param {string} endpoint - نهاية الرابط (endpoint) الخاص بالطلب.
 * @param {object} data - البيانات المُرسلة مع الطلب.
 * @param {object} config - إعدادات إضافية اختيارية.
 * @returns {Promise<any>} - بيانات الاستجابة.
 */
export const post = async (endpoint, data, config = {}) => {
  return apiRequest("post", endpoint, data, config);
};

/**
 * دالة لإرسال طلبات PUT إلى API.
 * @param {string} endpoint - نهاية الرابط (endpoint) الخاص بالطلب.
 * @param {object} data - البيانات المُرسلة مع الطلب.
 * @param {object} config - إعدادات إضافية اختيارية.
 * @returns {Promise<any>} - بيانات الاستجابة.
 */
export const put = async (endpoint, data, config = {}) => {
  return apiRequest("put", endpoint, data, config);
};

/**
 * دالة لإرسال طلبات DELETE إلى API.
 * @param {string} endpoint - نهاية الرابط (endpoint) الخاص بالطلب.
 * @param {object} config - إعدادات إضافية اختيارية.
 * @returns {Promise<any>} - بيانات الاستجابة.
 */
export const del = async (endpoint, config = {}) => {
  return apiRequest("delete", endpoint, null, config);
};

/**
 * دالة عامة لتنفيذ طلبات API.
 * @param {string} method - نوع الطلب (GET/POST/PUT/DELETE).
 * @param {string} endpoint - نهاية الرابط (endpoint) الخاص بالطلب.
 * @param {object} data - البيانات المُرسلة مع الطلب (إن وجدت).
 * @param {object} config - إعدادات إضافية اختيارية.
 * @returns {Promise<any>} - بيانات الاستجابة.
 */
const apiRequest = async (method, endpoint, data = null, config = {}) => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await axios({ method, url, data, ...config });
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

/**
 * دالة للتعامل مع الأخطاء القادمة من API.
 * @param {object} error - كائن الخطأ الناتج عن Axios.
 */
const handleError = (error) => {
  // طباعة الخطأ في وضع التطوير فقط
  if (process.env.NODE_ENV === "development") {
    console.error("API Error:", error);
  }

  // التحقق مما إذا كانت هناك استجابة من الخادم
  if (error.response) {
    const { status, data } = error.response;
    console.error(`Error ${status}:`, data);
    throw data; // إرجاع البيانات الخاصة بالخطأ من الخادم
  } else if (error.request) {
    console.error("No response received from server:", error.request);
    throw new Error("No response received from server. Please try again later.");
  } else {
    console.error("Request setup error:", error.message);
    throw new Error(error.message);
  }
};
