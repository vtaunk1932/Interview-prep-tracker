// src/api.ts
import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const fetchTopics = async () => {
  const response = await axios.get(`${BASE_URL}/topics`);
  return response.data;
};
