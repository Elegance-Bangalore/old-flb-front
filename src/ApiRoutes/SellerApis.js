import axios from "axios";
import { getCookie } from "@/CustomServices/GetCookies";
import { normalizeFilters } from "@/CustomServices/Constant";

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

export const postPropertyApi = (data) =>
  API.post("property/postProperty", data);

export const updatePropertyApi = (data, propertyCode) =>
  API.post(`property/editProperty?propertyCode=${propertyCode}`, data);

export const getSinglePropertyApi = (propertyCode) =>
  API.get(`property/propertyDetails?propertyCode=${propertyCode}`);

export const sellerPropertyListApi = (filters) =>
  API.get(
    `property/propertyList?query=${filters.search}&propertyType=${filters.propertyType}&page=${filters.page}&limit=6&status=${filters.status}`
  );
export const sellerProfileApi = () => API.get(`seller/profile`);
export const ownerProfileUpdateApi = (data) =>
  API.post(`seller/editProfile`, data);

export const developerProfileUpdateApi = (data) =>
  API.post(`seller/developerProfile`, data);
export const changePasswordApi = (data) =>
  API.post(`auth/changePassword`, data);

export const subscriptionPlanListApi = () => API.get(`seller/planList`);
export const existingPlanApi = () => API.get(`seller/existingPlan`);
export const selectPlanApi = (plan) => API.post(`payment/checkout`, plan);
export const createOrderApi = (data) => API.post(`payment/createOrder`, data);
export const upgradePlanApi = (plan) =>
  API.post(`payment/upgradeSubscription`, plan);
export const downgradePlanApi = (plan) =>
  API.post(`payment/downgradeSubscription`, plan);
export const paymentVerificationApi = (data, id) =>
  API.post(`payment/paymentVerification?_id=${id}`, data);

export const buyerPropertyListApi = (filters) => {
  const normalizedFilters = normalizeFilters(filters);
  console.log("normalizedFilters", normalizedFilters);
  const amenitiesString = normalizedFilters?.aminities?.join("/");
  const city = normalizedFilters.city || "";
  const priceMin = normalizedFilters.priceMin || "";
  const priceMax = normalizedFilters.priceMax || "";
  const Scity = normalizedFilters.city ? "" : normalizedFilters.Scity || "";
  
  return API.get(
    `seller/propertyView?query=${normalizedFilters.search}&propertyType=${
      normalizedFilters.propertyType
    }&page=${
      normalizedFilters.page
    }&limit=${12}&city=${city}&amenities=${amenitiesString}&priceMin=${priceMin}&priceMax=${priceMax}&totalAcre=${
      normalizedFilters.totalAcre
    }&sort=${normalizedFilters.sort}&order=${
      normalizedFilters.order
    }&categoryId=${normalizedFilters.categoryId}&Scity=${Scity}`
  );
};

export const resendEmail = (data) => API.post(`auth/resend`, data);

export const enquiryListApi = (filters) =>
  API.get(
    `seller/inquiryList?filter=${filters.timePeriod}&limit=${
      filters.pageSize
    }&page=${filters.page + 1}&search=${filters.search}`
  );

export const changePhoneApi = (phone) => API.put(`auth/changePhone`, phone);
export const editOwnerProfileUpdateApi = (data) =>
  API.put(`seller/updateprofile`, data);
export const editDeveloperProfileUpdateApi = (data) =>
  API.put(`seller/editDeveloperProfile`, data);
export const visitRequestApi = (page) =>
  API.get(`seller/vistedRequest?page${page}&limit=6`);
export const acceptVisitRequestApi = (id) =>
  API.patch(`seller/vistedRequest/${id}`);
export const viewInquiryApi = (id) => API.post(`seller/viewInquiry`, id);
export const getCitiesApi = (id) => API.get(`seller/cities`, id);
export const sellerDashboardApi = () => API.get(`/dev/sellerDash`);
export const sellerDeletePropertyApi = (id) =>
  API.delete(`seller/deletesellerprop/${id}`);
export const getEnqiryCountApi = () => API.get(`/dev/counts`);
export const getSellerAnalytics = () => API.get(`/analytics/sellerAnalytics`);
export const sellerPromotePropertyApi = (values , id) =>
  API.patch(`/dev/sellerMarkPromoted/${id}` , values);