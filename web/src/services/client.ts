import axios from "axios";

const client = () => {
  const defaultOptions = {
    baseURL: import.meta.env.VITE_APP_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Create instance
  const instance = axios.create(defaultOptions);

  // Set the AUTH token for any request
  instance.interceptors.request.use(function (config) {
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  });

  return instance;
};

export default client();
