import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {'X-Custom-Header': 'foobar'}
});


export default api;