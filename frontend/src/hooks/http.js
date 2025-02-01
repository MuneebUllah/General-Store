import axios from 'axios';
import Swal from 'sweetalert2';
import { dispatch } from '../redux/store/store';
import { startLoading, stopLoading } from '../redux/slices/userSlice';

export const Base_URL = "http://localhost:8000/api";

export const Request = axios.create({
    baseURL: Base_URL,
  });

const useHttp = () =>{
 function configureHeaders() {
        Request.interceptors.request.use(
          (config) => {
            dispatch(startLoading())
            const accessToken = localStorage.getItem('token');
            if (accessToken) {
              config.headers.Authorization = `Bearer ${accessToken}`;
            }
            return config;
          },
          (error) => Promise.reject(error),
        );
      }
      
      // Configure Interceptors
 const configureInterceptors = () => {
        Request.interceptors.response.use(
          (response) =>{
            dispatch(stopLoading())
            return response},
          async (error) => {
            const originalRequest = error.config;
            if (error.response && error.response.status === 401 && !originalRequest._retry) {
              originalRequest._retry = true;
              // Assuming you have a refresh token function
              // const newToken = await refreshToken();
              // localStorage.setItem('token', newToken);
              // originalRequest.headers.Authorization = `Bearer ${newToken}`;
              return Request(originalRequest); // Use the configured instance
            }
            if (error.response && error.response.status === 500) {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
              });
            }
            return Promise.reject(error);
          },
        );
      }
      return {configureHeaders , configureInterceptors}
      
}

export default useHttp