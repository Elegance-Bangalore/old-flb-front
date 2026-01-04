import { getCookie } from "@/CustomServices/GetCookies";
import axios from "axios";

const apiurl = import.meta.env.VITE_BASE_API_URL;

const API = axios.create({
  baseURL: apiurl,
});

API.interceptors.request.use((req) => {
  const token = getCookie("token");
  req.headers.Authorization = `Bearer ${token}`;
  req.headers["Content-Type"] = "application/json";
  return req;
});

export const savePropertyApi = (data) => API.post(`saveProperties/${data}`);
export const savePropertyListApi = () => API.get("buyer/saveProperties");
export const removeSavePropertyApi = (id) =>
  API.delete(`buyer/saveProperties?propertyId=${id}`);

export const highlyRecommendedListApi = () =>
  API.get(`buyer/highlyRecommended`);
export const newAddedPropertyListApi = () => API.get(`buyer/newlyAdded`);
export const postInquiryApi = (data) => API.post(`buyer/postInquiry`, data);
export const updateBuyerProfileApi = (data) =>
  API.put(`seller/updateprofile`, data);
export const changePhoneNumberApi = (data) => API.put(`auth/changePhone`, data);

export const scheduleVisitApi = (id) => API.post(`buyer/request/${id}`);

export const allPropertyListApi = (filters) =>
  API.get(
    `seller/propertyView?query=${filters.keyword}&propertyType=${filters.propertyType}&page=${1}&limit=${6}`
  );
