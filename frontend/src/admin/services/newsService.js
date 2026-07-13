import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getNews = async () => {
  const response = await axios.get(
    `${API_URL}?limit=100`,
    getAuthConfig()
  );

  return response.data.data;
};

export const createNews = async (data) => {
  const response = await axios.post(API_URL, data, getAuthConfig());
  return response.data.data;
};

export const updateNews = async (id, data) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    data,
    getAuthConfig()
  );
  return response.data.data;
};

export const deleteNews = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthConfig()
  );
  return response.data.data;
};