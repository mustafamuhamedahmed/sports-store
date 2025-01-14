import { get } from "./api"; // استيراد دالة get من ملف api

/**
 * الحصول على قائمة بجميع المنتجات.
 * @returns {Promise<any>} - قائمة المنتجات.
 */
export const getProducts = async () => {
  return await get("/products");
};

/**
 * الحصول على تفاصيل منتج معين باستخدام المعرف (ID).
 * @param {string|number} id - معرف المنتج.
 * @returns {Promise<any>} - تفاصيل المنتج.
 */
export const getProductById = async (id) => {
  return await get(`/products/${id}`);
};

/**
 * البحث عن منتجات باستخدام استعلام معين.
 * @param {string} query - النص المستخدم للبحث عن المنتجات.
 * @returns {Promise<any>} - قائمة المنتجات التي تطابق الاستعلام.
 */
export const searchProducts = async (query) => {
  return await get(`/products?search=${query}`);
};
