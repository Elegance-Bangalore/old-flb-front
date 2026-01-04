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
      // You can show a user-friendly message here
      return Promise.reject(new Error('Backend server is not available. Please check if the server is running.'));
    }
    return Promise.reject(error);
  }
);

export const createContactUsApi = (data) => API.post(`/contactUs/create`, data);
export const getContactUsApi = () => API.get(`/contactUs/get`);
export const updateContactUsApi = (data) =>
  API.put(`/contactUs/edit/${data._id}`, data);
export const addBlogCategoryApi = (data) =>
  API.post(`admin/category/create`, data);
export const editBlogCategoryApi = (id, data) =>
  API.put(`/admin/category/update/${id}`, data);
export const deleteBlogCategory = (id) =>
  API.delete(`/admin/category/delete/${id}`);
export const addBlogApi = (id = "", data) =>
  API.post(`admin/blog/create/${id}`, data);
export const deleteBlog = (id) => API.delete(`/admin/blog/remove/${id}`);
export const editBlogApi = (id, data) =>
  API.put(`/admin/blog/update/${id}`, data);
export const addFooterApi = (data) => API.post(`admin/footer/create`, data);
export const deleteFooter = (id) => API.delete(`/admin/footer/delete/${id}`);
export const editFooterApi = (id, data) =>
  API.put(`/admin/footer/update/${id}`, data);
export const changeStatus = (id) => API.patch(`/admin/footer/status/${id}`);
export const uploadImageApi = () => API.post(`/admin/blog/upload/image`);
export const dashbordSellerApi = () => API.get(`/seller/dashboard/counts/`);
export const adminEnquiryApi = ({ page, search, sort, pageSize }) =>
  API.get(
    `/admin/enquiryList?page=${
      page + 1
    }&limit=${pageSize}&search=${search}&sort=${sort}`
  );
export const exportEnquiryApi = ({ search, sort }) =>
  API.get(
    `/admin/enquiryList/export?search=${search}&sort=${sort}`,
    { responseType: 'blob' }
  );
export const deleteEnquiryApi = (id) => API.get(`admin/deleteEnquiry/${id}`);

export const postFaqApi = (data) => API.post(`admin/faq/create`, data);

export const updateFaqApi = (data) =>
  API.put(`admin/faq/update/${data._id}`, data);

export const faqListApi = ({ query, category, page, pageSize }) =>
  API.get(
    `admin/faq/get?query=${query}&category=${category}&page=${
      page + 1
    }&limit=${pageSize}`
  );

export const deleteFaqApi = (id) => API.delete(`admin/faq/delete/${id}`);

export const addDeveloperApi = (data) => API.post(`admin/storedeveloper`, data);
export const getDeveloperListApi = ({
  search,
  page,
  pageSize,
  i_am,
  subscribed,
  featured,
}) =>
  API.get(
    `/admin/getdeveloperslist?search=${search}&page=${page}&limit=${pageSize}&i_am=${i_am}&subscription=${subscribed}&featured=${featured}`
  );

export const exportDeveloperApi = ({ search, i_am, subscribed, featured }) =>
  API.get(
    `/admin/exportdevelopers?search=${search}&i_am=${i_am}&subscription=${subscribed}&featured=${featured}`,
    { responseType: 'blob' }
  );

export const updateDeveloperApi = (data) =>
  API.put(`/admin/updatedeveloperprofile`, data);
export const addUserApi = (data) => API.post(`/admin/userCreate`, data);
export const getUsersListApi = () => API.get(`/admin/userManagement`);
export const updateUserApi = (data) =>
  API.put(`/admin/editUser/${data._id}`, data);
export const toggleUserStatusApi = (id) =>
  API.get(`/admin/toggleUserStatus/${id}`);
export const deleteUserApi = (id) => API.delete(`/admin/deleteUser/${id}`);

export const getPropertyListAdminApi = ({
  page,
  pageSize,
  search,
  availabilityStatus,
  propertyType,
  isDeleted,
  propertyApproval,
  city,
}) =>
  API.get(
    `/admin/property_list?query=${search}&page=${page}&limit=${pageSize}&propertyStatus=${availabilityStatus}&propertyType=${propertyType}&isDeleted=${isDeleted}&propertyApproval=${propertyApproval}&city=${city}`
  );

export const updatePropertyStatusApi = (id, status) =>
  API.put(`/admin/updatePropertyStatus/${id}`, status);

export const adminPostPropertyApi = (data) =>
  API.post(`/admin/postProperty/${data.sellerId}`, data);

export const propertyCategoryListApi = () =>
  API.get("/admin/getPropertyCategoryList");

export const deletePropertyCategoryListApi = (id) =>
  API.get(`/admin/deleteCategory/${id}`);

export const addPropertyCategoryApi = (data) =>
  API.post(`/admin/createPropertyCategory`, data);

export const togglePropertyCategoryApi = (id) =>
  API.get(`admin/categoryVisibility/${id}`);

export const sellerDropdownApi = () => API.get(`/admin/sellerMinifiedList`);

export const editPropertyAdminApi = (data) =>
  API.put(`/admin/edit?propertyCode=${data?.propertyCode}`, data);

export const editPropertyCategoryAdmin = (data) =>
  API.put(`/admin/editPropertyCategory/${data?._id}`, data);

export const deletePropertyCategoryApi = (id) =>
  API.delete(`/admin/deleteCategory/${id}`);

export const updateApprovalApi = (id, data) =>
  API.patch(`admin/property/updateApproval/${id}`, data);

export const updateDeveloperToogleApi = (id) =>
  API.patch(`/admin/recoverdeveloperprofile/${id}`);

export const toggleFeaturedDeveloperApi = (id) =>
  API.patch(`/directory/markFeatured/${id}`);

export const archivePropertyApi = (id) =>
  API.patch(`admin/archiveProperty/${id}`);

export const deletePropertyApi = (id) =>
  API.delete(`admin/deleteProperty/${id}`);

export const deleteDeveloperProfileApi = (data) =>
  API.post(`admin/deletedeveloperprofile`, data);

export const toogleFooterStatusApi = (id) =>
  API.patch(`/admin/footer/status/${id}`);

export const getArchivePropertyListAdminApi = ({
  page,
  pageSize,
  search,
  propertyApproval,
  propertyType,
  isDeleted,
}) =>
  API.get(
    `/admin/property_list?query=${search}&page=${
      page + 1
    }&limit=${pageSize}&propertyStatus=${propertyApproval}&propertyType=${propertyType}&isDeleted=${isDeleted}`
  );

export const getSubAdminApi = () => API.get(`/user/userDetails`);
export const adminGeneralEnquiryApi = ({ page, search, sort, pageSize }) =>
  API.get(
    `/general/get?page=${
      page + 1
    }&query=${search}&sort=createdAt&order=${sort}&pageSize=${pageSize}`
  );
export const deleteGeneralEnquiryApi = (id) =>
  API.delete(`/general/delete/${id}`);

export const postGeneralEnquiryApi = (id, answer) =>
  API.post(`general/reply/${id}`, answer);

export const adminDashboardApi = () => API.get(`/admin/getadmindashboard`);

export const propertyByCategoryApi = (id, data) =>
  API.get(
    `/admin/propertyList/${id}?&propertyTypeFilter=${
      data.propertyType
    }&availabilityFilter=${data.propertyApproval}&search=${data.search}&limit=${
      data.pageSize
    }&page=${data.page + 1}`
  );

export const changeCategoryApi = (data) =>
  API.put(`/admin/propertyCategoryUpdate`, data);

export const getBlogCategoryApi = ({ query = "", category = "" }) =>
  API.get(`admin/category/categoryList?query=${query}`);
export const getBlogApi = ({ query: searchByName, pageSize, page, category }) =>
  API.get(
    `/admin/blog/get?searchByName=${searchByName}&page=${
      page + 1
    }&limit=${pageSize}&category=${category}`
  );
export const getFooterApi = (query = "") =>
  API.get(`/admin/footer/get?query=${query}`);

export const createAboutUsApi = (data) => API.post(`/aboutUs/create`, data);
export const getAboutUsApi = () => API.get(`/aboutUs/get`);
export const updateAboutUsApi = (data) =>
  API.put(`/aboutUs/edit/${data._id}`, data);

export const recentActivityAdmin = ({ page }) =>
  API.get(`/analytics/getAnalytics?page=${page}&limit=30`);

export const createBlogTagsApi = (data) =>
  API.post(`admin/category/createTags`, data);

export const getBlogTagsApi = () => API.get(`admin/category/getTags`);

export const updateBlogTagsApi = (data) =>
  API.put(`/admin/category/editTags/${data.id}`, data);

export const deleteBlogTagsApi = (id) =>
  API.delete(`admin/category/deleteTags/${id}`);

export const createFooterSeoApi = (data) => API.post(`/dev/addSeoCities`, data);

export const getFooterSeoApi = () => API.get(`dev/getSeoCities`);

export const updateFooterSeoApi = (data) =>
  API.put(`/dev/updateSeoCity/${data._id}`, data);

export const deleteFooterSeoApi = (id) =>
  API.delete(`/dev/deleteSeoCity/${id}`);

export const createFeatureApi = (data) => API.post(`/home/addCarousel`, data);

export const getFeatureApi = () => API.get(`home/carousel`);
export const getFeatureAdminApi = () => API.get(`home/adminCarousel`);

export const deleteFeatureApi = (id) =>
  API.delete(`/home/deleteCarousel/${id}`);

export const updateFeatureApi = (data) =>
  API.put(`/home/updateCarousel/${data._id}`, data);

export const propertyDropdownApi = () => API.get(`/dev/selectedDetails`);

export const togglePromotedPropertyApi = ({
  propertyAds,
  propertyId,
  type,
  promoteExpires,
  prmotionType,
  promotionCity,
}) =>
  API.patch(`/dev/markPromoted/${propertyId}`, {
    propertyAds,
    type,
    promoteExpires,
    prmotionType,
    promotionCity,
  });

export const addBlogSubCategoryApi = (data) =>
  API.post("admin/category/addSubCategory", data);

export const updateBlogSubCategoryApi = (data, id) =>
  API.put(`/admin/category/updateSubCategory/${id}`, data);

export const deleteBlogSubCategoryApi = (id) =>
  API.delete(`/admin/category/deleteSubCategory/${id}`);

export const blogSubCategoryListApi = () =>
  API.get("/admin/category/subCategoryList");

export const addDocumentTypeApi = (data) => {
  API.post("/documents/createDocumentsType", data);
};
export const updateDocumentTypeApi = (data) =>
  API.put(`/documents/updateDocumentsType/${data.id}`, data);

export const documentTypeListApi = () => API.get("/documents/getDocumentsType");

export const deleteDocumentType = (id) =>
  API.delete(`/documents/deleteDocumentsType/${id}`);

export const propertyAnalyticsApi = ({
  page,
  search,
  startDate,
  endDate,
  pageSize,
  period,
}) =>
  API.get(
    `/propertyAnalytics/propertiesAnalytics?page=${
      page + 1
    }&limit=${pageSize}&query=${search}&startDate=${startDate}&endDate=${endDate}&period=${"custom"}`
  );

export const adminDashboardNewApi = ({ startDate, endDate, period }) =>
  API.get(
    `/admin/getadmindashboard?startDate=${startDate}&endDate=${endDate}&period=${period}`
  );

export const recentActivityApi = ({
  page,
  startDate,
  endDate,
  pageSize,
  period,
}) =>
  API.get(
    `analytics/getAnalytics?startDate=${startDate}&endDate=${endDate}&period=${period}&page=${
      page + 1
    }&limit=${pageSize}`
  );

export const developerAnalyticsApi = ({
  page,
  startDate,
  endDate,
  pageSize,
  period,
}) =>
  API.get(
    `developer/developerAnalytics?startDate=${startDate}&endDate=${endDate}&period=${period}&page=${
      page + 1
    }&limit=${pageSize}`
  );

export const addTestimonialApi = (data) =>
  API.post("/testimonial/createTestimonial", data);
export const getTestimonialApi = () => API.get("/testimonial/getTestimonial");

export const deleteTestimonialApi = (id) =>
  API.delete(`testimonial/deleteTestimonial/${id}`);

export const updateTestimonialApi = (data) =>
  API.put(`testimonial/editTestimonial/${data._id}`, data);

export const addMediaApi = (data) => API.post("/testimonial/addMedia", data);
export const getMediaApi = () => API.get("/testimonial/getallMedia");

export const deleteMediaApi = (id) =>
  API.delete(`testimonial/deleteMedia/${id}`);

export const updateMediaApi = (data) =>
  API.put(`testimonial/editMedia/${data?._id}`, data);

export const getBuyerListApi = ({ search, page, limit }) =>
  API.get(`manage/getBuyers?page=${page}&limit=${limit}&query=${search}`);

export const getCuratedDealsApi = () => API.get(`/home/admincuratedDeals`);

export const editPromotedPropertyApi = (data) =>
  API.put(`dev/editPromoted/${data?.propertyId}`, data);

export const addPromotionalBannerApi = (data) =>
  API.post(`banner/addBanner`, data);

export const editPromotionalBannerApi = (data) =>
  API.put(`banner/editBanner/${data._id}`, data);

export const deletePromotionalBannerApi = (id) =>
  API.delete(`banner/deleteBanner/${id}`);

export const getBannerListApi = (id) =>
  API.get(`/banner/getBanners
`);
export const bannerCountApi = (id) => API.get(`/banner/viewBanners/${id}`);
export const manageSubscriptionApi = (id, payload) =>
  API.post(`/manage/manageSubscription/${id}`, payload);
export const advertisementListApi = ({ page, pageSize }) =>
  API.get(`/advertise/getAdvertise?page=${page + 1}&limit=${pageSize}`);

export const addTermsAndConditionsApi = (data) =>
  API.post(`/terms/addTerms`, data);
export const getTermsAndConditionsApi = () => API.get(`/terms/getTerms`);

export const updateTermsAndConditionsApi = (data) =>
  API.put(`/terms/updateTerms/${data._id}`, data);

export const addCouponApi = (data) => API.post(`/admin/coupons/create`, data);

export const getCouponsApi = () => API.get(`/admin/coupons`);

export const deleteCouponApi = (id) => API.delete(`/admin/coupons/${id}`);

export const updateCouponApi = (id, data) => API.put(`/admin/coupons/${id}`, data);

export const validateCouponApi = (data) => API.post(`/admin/coupons/validate`, data);

export { API };
