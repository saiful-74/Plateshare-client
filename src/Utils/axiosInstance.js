import axios from "axios";

export const api = axios.create({
  baseURL: "https://a-10-backend-theta.vercel.app", 
  headers: {
    "Content-Type": "application/json",
  },
});
