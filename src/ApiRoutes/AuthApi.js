import axios from "axios";

// const apiurl = process.env.REACT_APP_DEV_API_KEY_NEW;
const apiurl = import.meta.env.VITE_BASE_API_URL;
const API = axios.create({
  baseURL: apiurl,
});

API.interceptors.request.use((req) => {
  req.headers.Authorization = "Basic dXNlcjpheXVzaA==";
  req.headers["Content-Type"] = "application/json";
  return req;
});

// Add response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      console.warn('Backend server is not running. Please start your backend server at localhost:5500');
      return Promise.reject(new Error('Backend server is not available. Please check if the server is running.'));
    }
    return Promise.reject(error);
  }
);

export const registerUserApi = (data) => API.post("auth/signup", data);
export const sendOtpApi = (data) => API.post("auth/otp", data);
export const verifyOtpApi = (data) => API.post("auth/verifyOTP", data);

export const resetPasswordApi = (payload, token) => API.post(`auth/resetPassword/?token=${token}` , payload);
export const loginApi = (data) => API.post("auth/login", data);
export const forgotPasswordApi = (data) =>
  API.post("auth/forgotPassword", data);
export const checkUrlApi = (token) =>
  API.get(`auth/linkValidity?token=${token}`);
export const emailVerification = (verificationToken) =>
  API.post(`auth/verifyEmail?verificationToken=${verificationToken}`);

