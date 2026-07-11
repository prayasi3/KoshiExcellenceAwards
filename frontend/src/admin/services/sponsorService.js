import axios from "axios";

const API_URL = "http://localhost:5000/api/sponsors";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSponsors = async () => {
  const response = await axios.get(
    `${API_URL}?limit=100`,
    getAuthConfig()
  );

  return response.data.data.items;
};

export const createSponsor = async (data) => {
  const response = await axios.post(API_URL, data, getAuthConfig());
  return response.data;
};

export const updateSponsor = async (id, data) => {
  const response = await axios.put(
    `${API_URL}/${id}`,
    data,
    getAuthConfig()
  );
  return response.data;
};

export const deleteSponsor = async (id) => {
  const response = await axios.delete(
    `${API_URL}/${id}`,
    getAuthConfig()
  );
  return response.data;
};