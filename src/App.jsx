import { Provider, useSelector } from "react-redux";
import "rsuite/dist/rsuite.min.css";

import ScrollToTop from "@/components/common/ScrollTop";
import "../public/assets/scss/index.scss";
import "./CustomStyle/Global/global.scss";
import "./CustomStyle/Global/homeStyle.scss";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import ScrollTopBehaviour from "./components/common/ScrollTopBehaviour";
import NotFoundPage from "./pages/not-found";
import LoginPage from "./pages/others/login";
import ForgotPasswordPage from "./pages/others/forgot-password";
import RegisterPage from "./pages/others/register";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  selectIsUserLoggedIn,
  selectLoading,
  selectUser,
  setLogout,
  setSubscription,
  setUser,
  subAdminProfileAsync,
} from "./Redux/Auth/authSlice";
import { getCookie, removeCookie } from "./CustomServices/GetCookies";
import { userProfileAsync } from "./Redux/Auth/authSlice";
import SellerPrivateRoute from "./CustomServices/PrivateRoutes/SellerPrivateRoutes";
import OnClickLoader from "./CustomCommon/Others/OnClickLoader";
import { existingPlanApi, getCitiesApi } from "./ApiRoutes/SellerApis";
import EmailVerification from "./pages/email-verification/EmailVerification";
import useListenMessages from "./CustomCommon/Messages/useListenMessage";
import ChatModal from "./components/Modals/ChatModal";
import FloatingChatIcon from "./components/common/FloatingChatIcon";
import { selectFilter, setCities } from "./features/properties/propertiesSlice";
import SellerFaq from "./components/faq/SellerFaq";
import { getChatListAsync } from "./Redux/Chat/chatSlice";
import BuyerPrivateRoute from "./CustomServices/PrivateRoutes/BuyerPrivateRoutes";
import AdminPrivateRoutes from "./CustomServices/PrivateRoutes/AdminPrivateRoutes";
import BuyerHome from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerHome";
import BuyerPropertyList from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerPropertyList";
import BuyerTerm from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerTerm";
import BuyerAbout from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerAbout";
import BuyerPrivacy from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerPrivacy";
import BuyerPropertyDetail from "./MainRoles/Buyer/Features/BuyersPropertyDetailPage/components/BuyerPropertyDetail";
import BuyerContactUs from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerContactUs";
import BuyerFaqs from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerFaqs";
import BuyerDeveloper from "./MainRoles/Buyer/Features/DeveloperProfile/BuyerDeveloper";
import AdminModals from "./MainRoles/Admin/Modals/AdminModals";
import BuyerBlog from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerBlog";
import BuyerBlogDetail from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerBlogDetail";
import PrivacyMain from "./MainRoles/Admin/Features/ManagePageContent/Privacy/PrivacyMain";
import TermsConditionMain from "./MainRoles/Admin/Features/ManagePageContent/TermsCondition/TermsConditionMain";
import ResetPasswordPage from "./pages/others/reset-password";
import AddBlogTags from "./MainRoles/Admin/Features/ManageBlog/AddBlogTags";
import { ErrorBoundary } from "react-error-boundary";
import ErrorHandler from "./CustomCommon/Others/ErrorHandler";
import MobileSearch from "./MainRoles/Buyer/Features/BuyerHomePage/Components/HomeComponents/MobileSearch";
import MobileFilter from "./MainRoles/Buyer/Features/BuyerHomePage/Components/HomeComponents/MobileFilter";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminPropertyListPage from "./pages/admin/property/AdminPropertyListPage";
import AdminBlogListPage from "./pages/admin/blog/AdminBlogListPage";
import AdminArchiveProperty from "./pages/admin/property/AdminArchiveProperty";
import AdminFeaturesPropertyPage from "./pages/admin/property/AdminFeaturesPropertyPage";
import AdminPromotedPropertyPage from "./pages/admin/property/AdminPromotedPropertyPage";
import AdminBlogCategoryPage from "./pages/admin/blog/AdminBlogCategoryPage";
import AdminBlogTagsPage from "./pages/admin/blog/AdminBlogTagsPage";
import AdminSellerEnquiryPage from "./pages/admin/enquiry/AdminSellerEnquiryPage";
import AdminGeneralEnquiryPage from "./pages/admin/enquiry/AdminGeneralEnquiryPage";
import CampaignDownloads from "./MainRoles/Admin/Features/ManageEnqueries/CampaignDownloads";
import AdminDeveloperProfilePage from "./pages/admin/developer/AdminDeveloperProfilePage";
import AdminAddDeveloperProfilePage from "./pages/admin/developer/AdminAddDeveloperProfilePage";
import AdminAddUserPage from "./pages/admin/users/AdminAddUserPage";
import AdminFaqPage from "./pages/admin/faq/AdminFaqPage";
import AdminAddBlogCategoryPage from "./pages/admin/blog/AdminAddBlogCategoryPage";
import AdminAddBlogPage from "./pages/admin/blog/AdminAddBlogPage";
import AdminAddFooterPage from "./pages/admin/footer/AdminAddFooterPage";
import AdminFooterPage from "./pages/admin/footer/AdminFooterPage";
import AdminAddFaqPage from "./pages/admin/faq/AdminAddFaqPage";
import AdminAddPropertyPage from "./pages/admin/property/AdminAddPropertyPage";
import AdminUsersPage from "./pages/admin/users/AdminUsersPage";
import AdminAboutUsPage from "./pages/admin/pageContent/AdminAboutUsPage";
import AdminContactUsPage from "./pages/admin/pageContent/AdminContactUsPage";
import AdminFooterSeoPage from "./pages/admin/pageContent/AdminFooterSeoPage";
import AdminPropertyCategoryPage from "./pages/admin/property/AdminPropertyCategoryPage";
import AdminPropertyByCategoryPage from "./pages/admin/property/AdminPropertyByCategoryPage";
import BuyerProfilePage from "./pages/buyer/dashboard-pages/BuyerProfilePage";
import BuyerShortlistPropertyPage from "./pages/buyer/dashboard-pages/BuyerShortlistPropertyPage";
import BuyerOwnersContractedPage from "./pages/buyer/dashboard-pages/BuyerOwnersContractedPage";
import SellerDashboardPage from "./pages/seller/dashboard-pages/SellerDashboardPage";
import SellerManageEnquiriesPage from "./pages/seller/dashboard-pages/SellerManageEnquiriesPage";
import SellerProfilePage from "./pages/seller/dashboard-pages/SellerProfilePage";
import SellerPropertiesPage from "./pages/seller/dashboard-pages/SellerPropertiesPage";
import SellerPostPropertyPage from "./pages/seller/dashboard-pages/SellerPostPropertyPage";
import AdminPropertyDetailPage from "./pages/admin/property/AdminPropertyDetailPage";
import AdminEditBlogPage from "./pages/admin/blog/AdminEditBlogPage";
import AdminBlogSubCategoryPage from "./pages/admin/blog/AdminBlogSubCategoryPage";
import AdminEditBlogCategoryPage from "./pages/admin/blog/AdminEditBlogCategoryPage";
import AdminPropertyDocumentTypePage from "./pages/admin/property/AdminPropertyDocumentTypePage";
import SellerManageSubscriptionPage from "./pages/seller/dashboard-pages/SellerManageSubscriptionPage";
import DeveloperDirectory from "./MainRoles/Buyer/Features/BuyerHomePage/Components/HomeComponents/DeveloperDirectory";
import AdminPropertyAnalyticsPage from "./pages/admin/analytics/AdminPropertyAnalyticsPage";
import AdminRecentActivityPage from "./pages/admin/analytics/AdminRecentActivityPage";
import AdminDeveloperAnalyticsPage from "./pages/admin/analytics/AdminDeveloperAnalyticsPage";
import AdminEditFooterPage from "./pages/admin/footer/AdminEditFooterPage";
import AdminTestimonialPage from "./pages/admin/pageContent/AdminTestimonialPage";
import AdminMediaPage from "./pages/admin/pageContent/AdminMediaPage";
import CampaignMain from "./MainRoles/Admin/Features/ManagePageContent/CampaignPage/CampaignMain";
import CampaignViewPage from "./MainRoles/Admin/Features/ManagePageContent/CampaignPage/CampaignViewPage";
import AdminBuyerListPage from "./pages/admin/developer/AdminBuyerListPage";
import BuyerPropertyRate from "./MainRoles/Buyer/Features/BuyerHomePage/Pages/BuyerPropertyRate";
import PostPropertyLandingPage from "./pages/others/post-property-landing";
import PromotionBannerList from "./MainRoles/Admin/Features/ManagePromotionBanner/PromotionBannerList";
import NewAdminSidebar from "./MainRoles/Admin/AdminLayouts/NewAdminSidebar";
import PropertyListPage from "./pages/buyer/web-pages/PropertyListPage";
import AdminAdvertisementPage from "./pages/admin/enquiry/AdminAdvertisementPage";
import CouponsPage from "./pages/admin/coupons";
import DeveloperRedirect from "./components/DeveloperRedirect";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const profileLoader = useSelector(selectLoading);
  const userStatus = useSelector(selectIsUserLoggedIn);
  const token = getCookie("token");
  const [pageLoader, setPageLoader] = useState(true);

  useListenMessages();

  async function getUserProfile() {
    try {
      setPageLoader(true);
      const response = await dispatch(userProfileAsync()).unwrap();
      if (response.status === 401) {
        dispatch(setLogout(null));
        removeCookie("token");
      }
      if (response.status === 200) {
        dispatch(setUser(response.data[0]));
      }
    } catch (error) {
      throw error;
    } finally {
      setPageLoader(false);
    }
  }

  async function getExistingSubscriptionPlan() {
    try {
      const response = await existingPlanApi();
      if (response.status === 200) {
        dispatch(setSubscription(response?.data?.data));
      }
    } catch (error) {
      throw error;
    }
  }

  async function getAllCities() {
    try {
      const response = await getCitiesApi();
      dispatch(setCities(response.data.city));
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (token && !user) {
      const tokenParts = token.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      if (payload?.role === "user") {
        dispatch(subAdminProfileAsync());
        return;
      } else if (payload?.role === "admin") {
        getUserProfile();
        return;
      } else {
        dispatch(getChatListAsync({ search: "" }));
        getUserProfile();
        getExistingSubscriptionPlan();
      }
    } else {
      setPageLoader(false);
    }
  }, [token, userStatus]);

  useEffect(() => {
    getAllCities();
  }, []);

  if (pageLoader || profileLoader) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <OnClickLoader />
      </div>
    );
  }

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <ChatModal />
        <FloatingChatIcon />
        <ScrollTopBehaviour />
        <ToastContainer />
        <ErrorBoundary fallback={<ErrorHandler />}>
          <Routes>
            <Route path="/">
              <Route
                index
                element={<BuyerHome />}
              />

              <Route
                path="seller/dashboard"
                element={
                  <SellerPrivateRoute>
                    <SellerDashboardPage />
                  </SellerPrivateRoute>
                }
              />
              <Route
                path="seller/my-profile"
                element={
                  <SellerPrivateRoute>
                    <SellerProfilePage />
                  </SellerPrivateRoute>
                }
              />
              <Route
                path="manage-enquiries"
                element={
                  <SellerPrivateRoute>
                    <SellerManageEnquiriesPage />
                  </SellerPrivateRoute>
                }
              />
              <Route
                path="manage-enquiries-new"
                element={
                  <SellerPrivateRoute>
                    <SellerManageEnquiriesPage />
                  </SellerPrivateRoute>
                }
              />
              {/* Buyer  Routes */}
              <Route
                path="my-profile"
                element={
                  <BuyerPrivateRoute>
                    <BuyerProfilePage />
                  </BuyerPrivateRoute>
                }
              />

              {/* Buyer  Routes */}

              <Route path="404" element={<NotFoundPage />} />
              <Route path="contact" element={<BuyerContactUs />} />
              <Route path="seller/faq" element={<SellerFaq />} />
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
              <Route
                path="/auth/reset-password/:token"
                element={<ResetPasswordPage />}
              />
              <Route
                path="/auth/verifyToken/:verificationToken"
                element={<EmailVerification />}
              />
              <Route
                path="/subscription-plan"
                element={
                  <SellerPrivateRoute>
                    <SellerManageSubscriptionPage />
                  </SellerPrivateRoute>
                }
              />
              <Route
                path="/seller/property-list"
                element={
                  <SellerPrivateRoute>
                    <SellerPropertiesPage />
                  </SellerPrivateRoute>
                }
              />
              <Route
                path="/seller/post-property"
                element={
                  <SellerPrivateRoute>
                    <SellerPostPropertyPage />
                  </SellerPrivateRoute>
                }
              />
              <Route
                path="/seller/edit-property/:propertyCode"
                element={
                  <SellerPrivateRoute>
                    <SellerPostPropertyPage />
                  </SellerPrivateRoute>
                }
              />

              <Route
                path="buyer/shortlist-property"
                element={
                  <BuyerPrivateRoute>
                    <BuyerShortlistPropertyPage />
                  </BuyerPrivateRoute>
                }
              />
              <Route
                path="/buyer/owners-contacted"
                element={
                  <BuyerPrivateRoute>
                    <BuyerOwnersContractedPage />
                  </BuyerPrivateRoute>
                }
              />
              {/* admin */}

              <Route
                path="/admin/blog"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogs">
                    <AdminBlogListPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <AdminPrivateRoutes>
                    <AdminDashboardPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/properties"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminPropertyListPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/archived-properties"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminArchiveProperty />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/feature-banner"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminFeaturesPropertyPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/promoted-properties"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminPromotedPropertyPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/document-type"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminPropertyDocumentTypePage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/blog-categories"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogCategory">
                    <AdminBlogCategoryPage />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/blog-sub-categories"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogs">
                    <AdminBlogSubCategoryPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/blog-tags"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogs">
                    <AdminBlogTagsPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/enquiries"
                element={
                  <AdminPrivateRoutes requiredPermission="manageEnquiry">
                    <AdminSellerEnquiryPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/general-enquiries"
                element={
                  <AdminPrivateRoutes requiredPermission="manageEnquiry">
                    <AdminGeneralEnquiryPage />
                  </AdminPrivateRoutes>
                }
              />
                <Route
                path="/admin/advertisement"
                element={
                  <AdminPrivateRoutes requiredPermission="manageEnquiry">
                    <AdminAdvertisementPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/campaign-downloads"
                element={
                  <AdminPrivateRoutes requiredPermission="manageEnquiry">
                    <CampaignDownloads />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/developer-profile"
                element={
                  <AdminPrivateRoutes requiredPermission="manageDeveloperProfile">
                    <AdminDeveloperProfilePage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/add-developer-profile"
                element={
                  <AdminPrivateRoutes requiredPermission="manageDeveloperProfile">
                    <AdminAddDeveloperProfilePage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/edit-developer-profile"
                element={
                  <AdminPrivateRoutes requiredPermission="manageDeveloperProfile">
                    <AdminAddDeveloperProfilePage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/users"
                element={
                  <AdminPrivateRoutes>
                    <AdminUsersPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/faq"
                element={
                  <AdminPrivateRoutes requiredPermission="manageFooter">
                    {" "}
                    <AdminFaqPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/addBlogCategory"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogCategory">
                    <AdminAddBlogCategoryPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/addBlogTags"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogCategory">
                    <AddBlogTags />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/editBlogCategory"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogCategory">
                    <AdminEditBlogCategoryPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/addBlogs"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogs">
                    <AdminAddBlogPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/editBlog"
                element={
                  <AdminPrivateRoutes requiredPermission="manageBlogs">
                    <AdminEditBlogPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/footer"
                element={
                  <AdminPrivateRoutes requiredPermission="manageFooter">
                    <AdminFooterPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/editFooter"
                element={
                  <AdminPrivateRoutes requiredPermission="manageFooter">
                    <AdminEditFooterPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/addFooter"
                element={
                  <AdminPrivateRoutes requiredPermission="manageFooter">
                    <AdminAddFooterPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/add-faq"
                element={
                  <AdminPrivateRoutes requiredPermission="manageFooter">
                    <AdminAddFaqPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/edit-faq"
                element={
                  <AdminPrivateRoutes requiredPermission="manageFooter">
                    <AdminAddFaqPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/user-add-page"
                element={
                  <AdminPrivateRoutes>
                    <AdminAddUserPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/user-edit-page"
                element={
                  <AdminPrivateRoutes>
                    <AdminAddUserPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/add-property"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminAddPropertyPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/edit-property/:propertyCode"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminAddPropertyPage />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/property-preview/:propertyCode"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminPropertyDetailPage />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/property-category-list"
                element={
                  <AdminPrivateRoutes requiredPermission="manageProperty">
                    <AdminPropertyCategoryPage />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/property-by-category-list/:propertyName/:categoryId"
                element={
                  <AdminPrivateRoutes>
                    <AdminPropertyByCategoryPage />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/about-page-content"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <AdminAboutUsPage />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/contact-page-content"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <AdminContactUsPage />
                  </AdminPrivateRoutes>
                }
              />
                  <Route
                path="/admin/terms-and-conditions"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <TermsConditionMain />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/footer-seo"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <AdminFooterSeoPage />
                  </AdminPrivateRoutes>
                }
              />

              <Route
                path="/admin/privacy-page-content"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <PrivacyMain />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/terms-page-content"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <TermsConditionMain />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/property-analytics"
                element={
                  <AdminPrivateRoutes requiredPermission="manageAnalytics">
                    <AdminPropertyAnalyticsPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/developer-analytics"
                element={
                  <AdminPrivateRoutes requiredPermission="manageAnalytics">
                    <AdminDeveloperAnalyticsPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/recent-activities"
                element={
                  <AdminPrivateRoutes requiredPermission="manageAnalytics">
                    <AdminRecentActivityPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/manage-testimonials"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <AdminTestimonialPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/manage-buyers"
                element={
                  <AdminPrivateRoutes
                    requiredPermission={"manageDeveloperProfile"}
                  >
                    <AdminBuyerListPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/manage-media"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <AdminMediaPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/campaign-page"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <NewAdminSidebar>
                      <CampaignMain />
                    </NewAdminSidebar>
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/campaigns/view/:id"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <CampaignViewPage />
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/campaigns/edit/:id"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <NewAdminSidebar>
                      <CampaignMain />
                    </NewAdminSidebar>
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/promotion-banners"
                element={
                  <AdminPrivateRoutes requiredPermission={"managePageContent"}>
                    <NewAdminSidebar>
                      <PromotionBannerList />
                    </NewAdminSidebar>
                  </AdminPrivateRoutes>
                }
              />
              <Route
                path="/admin/coupons"
                element={
                  <AdminPrivateRoutes>
                    <NewAdminSidebar>
                      <CouponsPage />
                    </NewAdminSidebar>
                  </AdminPrivateRoutes>
                }
              />
              {/* Buyer Home Pages */}
              <Route path="/property-list" element={<PropertyListPage />} />
              <Route path="about" element={<BuyerAbout />} />
              <Route path="terms" element={<BuyerTerm />} />
              <Route path="privacy-policy" element={<BuyerPrivacy />} />
              <Route path="faq" element={<BuyerFaqs />} />
              <Route
                path="/:propertyType/:propertyTitle/:propertyCode"
                element={<BuyerPropertyDetail />}
              />
              <Route path="contact-us" element={<BuyerContactUs />} />
              <Route path="search" element={<MobileSearch />} />
              <Route path="filter" element={<MobileFilter />} />
              <Route path="/blog" element={<BuyerBlog />} />
              <Route path="price-trends" element={<BuyerPropertyRate />} />
              <Route
                path="post-your-property"
                element={<PostPropertyLandingPage />}
              />
              <Route
                path="blog/:blogTitle/:blogId"
                element={<BuyerBlogDetail />}
              />
              <Route
                path="/developer/:companySlug/:developerId"
                element={<BuyerDeveloper />}
              />
              {/* Redirect old developer URLs to new format */}
              <Route
                path="/developer/:developerId"
                element={<DeveloperRedirect />}
              />

              <Route
                path="/developer-directory"
                element={<DeveloperDirectory />}
              />

              <Route path="/modal" element={<AdminModals />} />

              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </>
  );
}

export default App;
