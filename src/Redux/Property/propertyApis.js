import { getFeatureApi } from "@/ApiRoutes/AdminApi";
import {
  highlyRecommendedListApi,
  newAddedPropertyListApi,
  savePropertyListApi,
} from "@/ApiRoutes/BuyersApi";
import {
  sellerPropertyListApi,
  buyerPropertyListApi,
  getSinglePropertyApi,
} from "@/ApiRoutes/SellerApis";

export const sellerPropertyList = async (filters) => {
  try {
    const response = await sellerPropertyListApi(filters);
    return response;
  } catch (error) {
    throw error;
  }
};

export async function allPropertyList(filters) {
  try {
    const response = await buyerPropertyListApi(filters);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function savedPropertyList(filters) {
  try {
    const response = await savePropertyListApi(filters);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function highlyRecommendedList() {
  try {
    const response = await highlyRecommendedListApi();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function newlyAddedPropertyList() {
  try {
    const response = await newAddedPropertyListApi();
    return response;
  } catch (error) {
    throw error;
  }
}

export async function singlePropertyDetail(propertyCode) {
  try {
    const response = await getSinglePropertyApi(propertyCode);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function featuredPropertyBanner() {
  try {
    const response = await getFeatureApi();
    return response;
  } catch (error) {
    console.log("Errors is" , error)
    throw error;
  }
}
