import axios from "axios";
import { getCookie } from "@/CustomServices/GetCookies";

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

export const getChatListApi = (search) => API.get(`messages/chats?search=${search}`);
export const getMessagesApi = (senderId, propertyId) =>
  API.get(`messages/get/${senderId}/${propertyId}`);
export const sendMessageApi = (id, propertyId, message) =>
  API.post(`messages/send/${id}/${propertyId}`, message);

export const unReadCountApi = (propertyId, senderId) =>
  API.get(`messages/markRead/${propertyId}/${senderId}`);
