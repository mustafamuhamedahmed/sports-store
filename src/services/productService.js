import { get } from "./api";

export const getProducts = async () => {
  return await get("/products");
};

export const getProductById = async (id) => {
  return await get(`/products/${id}`);
};

export const searchProducts = async (query) => {
  return await get(`/products?search=${query}`);
};
