import axios from "axios";

const API_BASE_URL = "https://api.example.com"; // غيّر هذا الرابط ليتناسب مع API الخاص بك

export const get = async (endpoint, config = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}${endpoint}`, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const post = async (endpoint, data, config = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const put = async (endpoint, data, config = {}) => {
  try {
    const response = await axios.put(`${API_BASE_URL}${endpoint}`, data, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const del = async (endpoint, config = {}) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}${endpoint}`, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  console.error("API Error:", error);
  throw error.response ? error.response.data : error;
};
