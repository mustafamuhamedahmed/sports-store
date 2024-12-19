import { post } from "./api";

export const login = async (email, password) => {
  const data = { email, password };
  return await post("/auth/login", data);
};

export const register = async (userData) => {
  return await post("/auth/register", userData);
};

export const logout = () => {
  localStorage.removeItem("token");
}
export const getCurrentUser = () => {
  return localStorage.getItem("token");
};

export const setAuthToken = (token) => {
  localStorage.setItem("token", token);
};
