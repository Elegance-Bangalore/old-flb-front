import { savePropertyListApi, savePropertyApi } from "@/ApiRoutes/BuyersApi";
import {
  allPropertyListApi,
  removeSavePropertyApi,
} from "../../ApiRoutes/buyerApiRoutes";

export async function fetchSavedPropertyList() {
  try {
    return await savePropertyListApi();
  } catch (error) {
    throw error;
  }
}

export async function saveProperty(id) {
  try {
    const response = await savePropertyApi(id);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function removeSaveProperty(id) {
  try {
    const response = await removeSavePropertyApi(id);
    return response;
  } catch (error) {
    throw error;
  }
}

export async function fetchAllPropertyList(
  keyword,
  propertyType,
  page,
  status
) {
  try {
    const response = await allPropertyListApi(
      keyword,
      propertyType,
      page,
      status
    );
    return response;
  } catch (error) {
    throw error;
  }
}
