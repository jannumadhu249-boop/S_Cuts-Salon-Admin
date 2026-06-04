import axios from "axios";
import accessToken from "./jwt-token-access/accessToken";

//pass new generated access token here
const getAuthUser = () => {
  const authUser = localStorage.getItem("authUser");
  if (authUser) {
    try {
      const { token } = JSON.parse(authUser);
      return `Bearer ${token}`;
    } catch (error) {
      console.error("Error parsing authUser from localStorage:", error);
      return null;
    }
  }
  return null;
};

//apply base url for axios
const API_URL = "";

const axiosApi = axios.create({
  baseURL: API_URL,
});

axiosApi.interceptors.request.use((config) => {
  const token = getAuthUser();
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 Unauthorized errors
    if (error.response && error.response.status === 401) {
      // Clear auth data
      localStorage.removeItem("authUser");
      
      // Redirect to login page
      window.location.href = "/login";
      
      return Promise.reject({
        ...error,
        message: "Session expired. Please login again."
      });
    }
    
    return Promise.reject(error);
  }
);

export async function get(url, config = {}) {
  return await axiosApi
    .get(url, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function post(url, data, config = {}) {
  return axiosApi
    .post(url, data, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function put(url, data, config = {}) {
  return axiosApi
    .put(url, data, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export async function del(url, config = {}) {
  return await axiosApi
    .delete(url, { ...config })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}
