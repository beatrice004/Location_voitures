import axios from "axios";

const axiosAdminClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

axiosAdminClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ADMIN_TOKEN");
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

axiosAdminClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      localStorage.removeItem("ADMIN_TOKEN");
      // window.location.reload();
    } else if (response.status === 404) {
      //Show not found
    }
    throw error;
  }
);

export default axiosAdminClient;
