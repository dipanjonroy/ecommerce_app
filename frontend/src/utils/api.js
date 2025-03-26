import axios from "axios";
import store from "../store/store"
import { logOut, refreshToken } from "../store/userAuthSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true
})

api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if(error.response.status === 401 && !originalRequest._retry ){
      originalRequest._retry = true;

      try {
        await store.dispatch(refreshToken())
        return api(originalRequest)
      } catch (tokenError) {
        await store.dispatch(logOut())
        return Promise.reject(tokenError)
      }
    }

    return Promise.reject(error)
  }
)

export default api;