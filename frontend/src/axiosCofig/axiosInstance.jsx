import axios from 'axios';
import store from '../redux/store';
import refreshToken from './useRefreshToken';
const axiosInstance = axios.create({
  baseURL: 'http://localhost:4040/api',
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const state = store.getState();
  // console.log(state)
  const token = state.authReducer.accessToken; 

  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshToken();
        if (newAccessToken) {
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          console.log("new" , newAccessToken)
          return axiosInstance(originalRequest); // Retry with new token
        }
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
