import axios from "axios";

const API_URL = "http://localhost:5000/api/editions";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getEditions = async () => {
  const response = await axios.get(API_URL, getAuthConfig());
  return response.data.data.items;
};

export const getEdition = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`, getAuthConfig());
  return response.data.data;
};

export const createEdition = async (data) => {
  const response = await axios.post(API_URL, data, getAuthConfig());
  return response.data;
};

export const updateEdition = async (id, data) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    data,
    getAuthConfig()
  );
  return response.data;
};

export const deleteEdition = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`, getAuthConfig());
  return response.data;
};