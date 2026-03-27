import axios from "axios";

const axiosConfig = axios.create({
  baseURL: process.env.JUDGE_URI,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosConfig;