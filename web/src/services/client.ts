import axios from "axios";
import { signInAnon } from "./auth";

const client = () => {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // interceptor to set auth token
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  // interceptor to get auth token.. for anon user
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response && error.response.status === 401) {
        const authToken = await signInAnon();
        const originalReq = error.config;
        axios.defaults.headers.common.Authorization = `Bearer ${authToken}`;
        originalReq.headers.Authorization = `Bearer ${authToken}`;
        return axios(originalReq);
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default client();
