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

export const savePropertyApi = (data) =>
  API.post(`buyer/saveProperties/${data}`);

export const savePropertyListApi = (filters) => {
  const city = filters.city || "";
  const propertyType = filters.propertyType || "";
  return API.get(
    `buyer/saveProperties?propertyType=${propertyType}&query=${city}&propertyStatus=${filters.status}&page=${filters.page}&limit=6`
  );
};
export const removeSaveProperty = (id) => API.delete(`/buyer/delete/${id}`);

export const highlyRecommendedListApi = () =>
  API.get(`buyer/highlyRecommended`);
export const newAddedPropertyListApi = () => API.get(`buyer/newlyAdded`);
export const postInquiryApi = (data) => API.post(`buyer/postInquiry`, data);
export const updateBuyerProfileApi = (data) =>
  API.put(`seller/updateprofile`, data);
export const changePhoneNumberApi = (data) => API.put(`auth/changePhone`, data);
export const changeEmailApi = (data) => API.put("auth/changeEmail", data);

export const ownersContractedApi = ({ status, propertyType, page, pageSize }) =>
  API.get(
    `buyer/buyersEnquiryList?propertyStatus=${status}&filter=${propertyType}&page=${
      page + 1
    }&limit=${pageSize}`
  );

export const getPropertyForHomePage = () => API.get(`/home/categories`);
export const getCuratedDeals = () => API.get(`/home/curatedDeals`);
export const getPropertyByCityBuyerHome = (city) =>
  API.get(`/home/trendingProperties?city=${city}`);
export const scheduleVisitApi = (id) => API.post(`/buyer/request/${id}`);
export const newsavePropertyApi = (id) =>
  API.post(`/buyer/saveProperties/${id}`);

export const toogleSavePropertyApi = (id) =>
  API.post(`/buyer/saveProperties/${id}`);

export const getDeveloperPropertyApi = ({ developerId, currentPage }) =>
  API.get(`/dev/properties/${developerId}`);

export const getDeveloperInfoApi = ({ developerId }) =>
  API.get(`/dev/dasboard/${developerId}`);

export const buyerFaqListApi = ({ query, category }) =>
  API.get(`home/faqs?query=${query}&category=${category}`);

export const footerListApi = () => API.get(`home/footer`);

export const generalInquiryApi = (data) => API.post(`general/create`, data);
export const mostSearchedPropertyApi = (type) =>
  API.get(`/home/mostSearched?propertyType=${type}`);

export const getRequestApi = (page) =>
  API.get(`buyer/accepted/?page=${page}&limit=6`);

export const getBlogListApi = ({ search, page, catId, subCatId }) => {
  let url = `home/Blogs?query=${search}&page=${page}&limit=12`;
  if (catId) {
    url += `&categoryId=${catId}`;
  }
  if (subCatId) {
    url += `&subcategoryId=${subCatId}`;
  }
  return API.get(url);
};

export const getBlogCategoriesApi = () => API.get("/home/blogCategories");

export const getBlogSubCategoriesApi = () => API.get("/home/blogSubCategories");

export const getBlogDetailApi = (id) => API.get(`home/blogDetails/${id}`);
export const getSlotsApi = (id, data) => API.post(`/buyer/slots/${id}`, data);
export const requestVisitApi = (id, data) =>
  API.post(`/buyer/request/${id}`, data);

export const homeFooterSeoApi = () => API.get(`/dev/getpropertType`);

export const suggestedPropertiesApi = (id) =>
  API.get(`/dev/similarProperties/${id}`);

export const downloadBroucherApi = (id) => API.get(`/property/download/${id}`);

export const blogCategoryWiseApi = () => API.get(`admin/blog/categoryBlogs`);

export const nearbyLocationApi = ({ locality, city, state }) =>
  API.get(
    `property/nearplaces?locality=${locality}&city=${city}&state=${state}`
  );

export const featuredDevelopersApi = () => API.get(`/directory/feturedSellers`);
export const sellerDirectoryApi = (search) =>
  API.get(`/directory/sellerDirectory?search=${search}`);

export const statePriceRangeApi = ({ propertyType, page, search }) =>
  API.get(
    `/existingProperties/statesTrends?propertyType=${propertyType}&page=${page}&limit=10&query=${search}`
  );

export const cityPriceRangeApi = ({ propertyType, page, search }) =>
  API.get(
    `/existingProperties/citiesTrends?propertyType=${propertyType}&page=${page}&limit=10&query=${search}`
  );

export const recentPropertiesApi = () => API.get(`/manage/getRecently`);

export const getMidBannerApi = () => API.get("/banner/getMidBanners");

export const getBannerListApi = (propertyType = "") =>
  API.get(`/banner/getBanners?propertyType=${propertyType}
`);

export const getDetailBannerApi = () => API.get("/banner/getDetailBanners");
export const advertiseFormApi = (data) =>
  API.post("/advertise/requestAdvertise", data);

export const getSubCategoryBlogsApi = (id) =>
  API.get(`admin/blog/subCategoryBlogs/${id}`);

export const getBlogsByCategoryApi = (categoryId) =>
  API.get(`/home/blogsByCategory?categoryId=${categoryId}`);

export const getBlogsBySubCategoryApi = (subCategoryId) =>
  API.get(`/home/blogsBySubCategory?subCategoryId=${subCategoryId}`);

export const getHomepageStatsApi = () => API.get('/home/homepageStats');