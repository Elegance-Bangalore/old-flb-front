import { getSubAdminApi } from "@/ApiRoutes/AdminApi";
import { loginApi } from "@/ApiRoutes/AuthApi";
import { sellerProfileApi } from "@/ApiRoutes/SellerApis";

export const loginUser = async (credentials) => {
  try {
    const response = await loginApi(credentials);
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const userProfile = async () => {
  try {
    const response = await sellerProfileApi();
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const subAdminProfile = async () => {
  try {
    const response = await getSubAdminApi();
    return response.data;
  } catch (error) {
    throw error;
  }
};

