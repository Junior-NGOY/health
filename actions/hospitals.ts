import axios from "axios";

const BASE_API_URL = process.env.API_URL || "";
export const api = axios.create({
  baseURL: BASE_API_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" }
});